"use strict";

const xml2js = require("xml2js");

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
	fetch(url)
		.then(res => res.text())
		.then(xml2js.parseStringPromise)

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
const fetchBBKCollection = async () => {
	const data = await httpsGetXml("https://boardgamegeek.com/xmlapi2/collection?username=bergenbrettspill&own=1");

	return data.items.item;
};

/**
 * Gets a map between game IDs and the name the physical game in the club has
 *
 * @param {Object} collection	The collection to make the map for
 *
 * @returns {Map<Number, String>}	Map between game IDs and names
 *
 * @private
 */
const getAlternativeNameMap = collection => {
	const modified = collection.filter(item => "comment" in item).map(item => [Number(item.$.objectid), item.comment[0]]);

	return new Map(modified);
};

/**
 * Fetches a list of games from BoardGameGeek
 *
 * @param {Number[]} ids	The IDs of the games to fetch
 *
 * @returns {Promise<Object[]>}	List of xml2js objects of the games
 *
 * @private
 */
const fetchGameItems = async ids => {
	// BoardGameGeek limits this request to 20 items per request. Batch query them

	let items = [];
	for (let i = 0; i < ids.length; i += 20) {
		const batchIds = ids.slice(i, i + 20);
		const result = await httpsGetXml(`https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion&id=${batchIds.join(",")}`);
		items = [...items, ...result.items.item];
	}

	return items;
};

/**
 * Processes the raw item objects from BoardGameGeek to more sensible objects
 *
 * @param {Object} item	The game item from BoardGameGeek to process
 *
 * @returns {Object}	The processed item
 *
 * @private
 */
const processGameItem = alternativeNameMap => item => {
	const game = {
		id: Number(item.$.id),
		name: item.name.find(n => n.$.type === "primary").$.value,
		thumbnailUrl: item.thumbnail[0],
		minPlayers: Number(item.minplayers[0].$.value),
		maxPlayers: Number(item.maxplayers[0].$.value),
		playingTime: Number(item.playingtime[0].$.value),
		mechanics: item.link.filter(l => l.$.type === "boardgamemechanic").map(l => l.$.value),
		expands: (item => {
			const expands = item.link.filter(l => l.$.type === "boardgameexpansion").find(l => l.$.inbound !== undefined);

			if (expands === null || expands === undefined) {
				return null;
			}
			return {
				id: Number(expands.$.id),
				name: expands.$.value
			};
		})(item)
	};

	if (alternativeNameMap.has(game.id)) {
		game.name = alternativeNameMap.get(game.id);
	}

	game.bggUrl = makeBggUrl(game.id);

	if (game.expands !== null) {
		game.expands.bggUrl = makeBggUrl(game.expands.id);
	}

	return game;
};

/**
 * Fetches all games Bergen Brettspillklubb owns, according to https://boardgamegeek.com/collection/user/bergenbrettspill
 *
 * @returns {Object[]}	List of all games and expansions the club owns
 */
const fetchGames = async () => {
	const clubCollection = await fetchBBKCollection();

	// Find out which ones have an alternative name, which is written in the comments
	const alternativeNameMap = getAlternativeNameMap(clubCollection);

	// Get the boardgame items from BGG
	const gameItems = await fetchGameItems(clubCollection.map(item => item.$.objectid));
	return gameItems.map(processGameItem(alternativeNameMap));
};

/**
 * Sets up the board game geek API object
 *
 * @returns {Object}	Object with the API methods on it
 */
const setupBoardGameGeekApi = () => ({
	fetchGames
});

module.exports = setupBoardGameGeekApi;
