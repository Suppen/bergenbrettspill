"use strict";

const xml2js = require("xml2js");
const https = require("https");
const R = require("ramda");

/**
 * Gets and parses XML from a HTTPS resource
 *
 * @param {String} url	The URL to get the XML from
 *
 * @returns {Promise<Object>}	Promise resolving to a xml2js object with the parsed XML
 *
 * @private
 */
const httpsGetXml = url =>
	new Promise((resolve, reject) =>
		https.get(url, res => {
			const chunks = [];

			res.on("data", chunk => chunks.push(chunk));
			res.on("end", () => resolve(Buffer.concat(chunks)));
			res.on("error", err => reject(err));
		})
	)
		.then(buf => buf.toString("utf-8"))
		.then(xml2js.parseStringPromise);

/**
 * Makes a BoardGameGeek URL from a game ID
 *
 * @param {Number} id	The ID to make the URL from
 *
 * @returns {String}	The URL to the game on BoardGameGeek
 *
 * @private
 */
const makeBggUrl = id => `https://boardgamegeek.com/boardgame/${id}`;

/**
 * Fetches the collection of Bergen Brettspillklubb on BoardGameGeek
 *
 * @returns {Promise<Object[]>}	Promise resolving to a list of xml2js objects containing the club's collection
 *
 * @private
 */
const fetchBBKCollection = () =>
	httpsGetXml("https://boardgamegeek.com/xmlapi2/collection?username=bergenbrettspill&own=1").then(
		R.path(["items", "item"])
	);

/**
 * Gets a map between game IDs and the name the physical game in the club has
 *
 * @param {Object} collection	The collection to make the map for
 *
 * @returns {Map<Number, String>}	Map between game IDs and names
 *
 * @private
 */
const getAlternativeNameMap = R.compose(
	// Make the map
	R.constructN(1, Map),
	// Prepare the data for map creation
	R.map(item => [Number(R.path(["$", "objectid"], item)), R.path(["comment", 0], item)]),
	// Ignore those which don't have a comment
	R.filter(R.has("comment"))
);

/**
 * Fetches a list of games from BoardGameGeek
 *
 * @param {Number[]} ids	The IDs of the games to fetch
 *
 * @returns {Promise<Object[]>}	List of xml2js objects of the games
 *
 * @private
 */
const fetchGameItems = ids =>
	httpsGetXml(`https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion&id=${R.join(",", ids)}`).then(
		R.path(["items", "item"])
	);

/**
 * Processes the raw item objects from BoardGameGeek to more sensible objects
 *
 * @param {Object} item	The game item from BoardGameGeek to process
 *
 * @returns {Object}	The processed item
 *
 * @private
 */
const processGameItem = R.curry((alternativeNameMap, item) =>
	R.compose(
		// Add the BGG URL to the base game if this is an expansion
		R.unless(
			R.compose(
				R.isNil,
				R.prop("expands")
			),
			game => R.set(R.lensPath(["expands", "bggUrl"]), makeBggUrl(game.expands.id), game)
		),
		// Add the BGG URL to the game objects
		game => R.assoc("bggUrl", makeBggUrl(game.id), game),
		// Use the alternative name if there is one
		R.when(({ id }) => alternativeNameMap.has(id), game => R.assoc("name", alternativeNameMap.get(game.id), game)),
		// Extract the useful data into a sensible object
		item => ({
			id: Number(R.path(["$", "id"], item)),
			name: R.compose(
				R.path(["$", "value"]),
				R.find(R.pathEq(["$", "type"], "primary")),
				R.prop("name")
			)(item),
			thumbnailUrl: R.path(["thumbnail", 0])(item),
			minPlayers: Number(R.path(["minplayers", 0, "$", "value"], item)),
			maxPlayers: Number(R.path(["maxplayers", 0, "$", "value"], item)),
			playingTime: Number(R.path(["playingtime", 0, "$", "value"], item)),
			mechanics: R.compose(
				R.map(R.path(["$", "value"])),
				R.filter(R.pathEq(["$", "type"], "boardgamemechanic")),
				R.prop("link")
			)(item),
			expands: R.compose(
				R.ifElse(R.isNil, R.always(null), expands => ({
					id: Number(R.path(["$", "id"], expands)),
					name: R.path(["$", "value"], expands)
				})),
				R.find(R.hasPath(["$", "inbound"])),
				R.filter(R.pathEq(["$", "type"], "boardgameexpansion")),
				R.prop("link")
			)(item)
		})
	)(item)
);

/**
 * Fetches all games Bergen Brettspillklubb owns, according to https://boardgamegeek.com/collection/user/bergenbrettspill
 *
 * @returns {Object[]}	List of all games and expansions the club owns
 */
const fetchGames = () =>
	fetchBBKCollection().then(clubCollection => {
		// Find out which ones have an alternative name, which is written in the comments
		const alternativeNameMap = getAlternativeNameMap(clubCollection);

		// Get the boardgame items from BGG
		return (
			Promise.resolve(clubCollection)
				// Extract the game IDs from the collection
				.then(R.map(R.path(["$", "objectid"])))
				// Query for those IDs
				.then(fetchGameItems)
				// Make some usable game objects
				.then(R.map(processGameItem(alternativeNameMap)))
		);
	});

/**
 * Sets up the board game geek API object
 *
 * @returns {Object}	Object with the API methods on it
 */
const setupBoardGameGeekApi = () => ({
	fetchGames
});

module.exports = setupBoardGameGeekApi;
