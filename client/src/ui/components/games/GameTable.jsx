/**************************
 * Import important stuff *
 **************************/

import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

/***************************
 * The GameTable component *
 ***************************/

const GameTable = ({ games }) => {
	const [filter, setFilter] = useState({
		title: "",
		players: NaN,
		playingTime: NaN,
		mechanics: ""
	});
	const [sortBy, setSortBy] = useState({
		prop: "name",
		direction: "ASC"
	});
	const filterInputs = {
		title: useRef(),
		players: useRef(),
		playingTime: useRef(),
		mechanics: useRef()
	};

	const updateFilter = () => {
		setFilter({
			title: filterInputs.title.current.value,
			players: Number.parseInt(filterInputs.players.current.value),
			playingTime: Number.parseInt(filterInputs.playingTime.current.value),
			mechanics: filterInputs.mechanics.current.value
		});
	};
	const updateSort = prop =>
		setSortBy(sortBy => ({
			prop,
			direction: R.ifElse(
				sortBy => R.equals(sortBy.prop, prop) && R.equals(sortBy.direction, "ASC"),
				R.always("DESC"),
				R.always("ASC")
			)(sortBy)
		}));
	const getSortIcon = prop => {
		return R.ifElse(
			R.equals(sortBy.prop),
			R.ifElse(
				() => R.equals(sortBy.direction, "ASC"),
				R.always(<FontAwesomeIcon icon={faSortDown} />),
				R.always(<FontAwesomeIcon icon={faSortUp} />)
			),
			R.always(null)
		)(prop);
	};

	const applyFilter = R.compose(
		// Mechanics
		R.unless(
			() => R.isEmpty(filter.mechanics),
			R.filter(({ mechanics }) => R.any(R.includes(R.toLower(filter.mechanics)), R.map(R.toLower, mechanics)))
		),
		// Playing time
		R.unless(
			() => Number.isNaN(filter.playingTime),
			R.filter(({ playingTime }) => playingTime >= filter.playingTime - 30 && playingTime <= filter.playingTime + 30)
		),
		// Players
		R.unless(
			() => Number.isNaN(filter.players),
			R.filter(({ minPlayers, maxPlayers }) => minPlayers <= filter.players && maxPlayers >= filter.players)
		),
		// Title
		R.unless(
			() => R.isEmpty(filter.title),
			R.filter(({ name }) => R.contains(R.toLower(filter.title), R.toLower(name)))
		)
	);
	const applySort = R.compose(
		R.when(() => sortBy.direction === "DESC", R.reverse),
		R.sortBy(R.prop(sortBy.prop))
	);
	const groupExpansions = R.compose(
		R.filter(R.propSatisfies(R.isNil, "expands")),
		R.map(game => R.assoc("expansions", R.filter(R.pathEq(["expands", "id"], game.id), games), game))
	);

	const prepareGames = R.compose(
		groupExpansions,
		applySort,
		applyFilter
	);

	const preparedGames = prepareGames(games);

	return (
		<table className="table table-striped table-hover table-responsive">
			<thead>
				<tr>
					<th>{/* Empty on purpose */}</th>
					<th onClick={() => updateSort("name")}>
						Tittel
						{getSortIcon("title")}
					</th>
					<th onClick={() => updateSort("minPlayers")}>
						Spillere
						{getSortIcon("minPlayers")}
					</th>
					<th onClick={() => updateSort("playingTime")}>
						Spilletid
						{getSortIcon("playingTime")}
					</th>
					<th>Mekanikker</th>
				</tr>
				<tr>
					<th>{`${preparedGames.length} søketreff`}</th>
					<th>
						<input ref={filterInputs.title} onChange={updateFilter} className="form-control" type="text" />
					</th>
					<th>
						<input ref={filterInputs.players} onChange={updateFilter} className="form-control" type="number" min="1" />
					</th>
					<th className="input-group">
						<input ref={filterInputs.playingTime} onChange={updateFilter} className="form-control" type="number" />
						<div className="input-group-append">
							<span className="input-group-text">±30</span>
						</div>
					</th>
					<th>
						<input ref={filterInputs.mechanics} onChange={updateFilter} className="form-control" type="text" />
					</th>
				</tr>
			</thead>
			<tbody>
				{preparedGames.map(game => (
					<tr key={game.id}>
						<td>
							<a href={game.bggUrl} target="_blank" rel="noopener noreferrer">
								<img src={game.thumbnailUrl} alt={game.name} />
							</a>
						</td>
						<td>
							<p>
								<a href={game.bggUrl} target="_blank" rel="noopener noreferrer">
									{game.name}
								</a>
							</p>
							<ul className="expansions">
								{game.expansions.map(expansion => (
									<li key={expansion.id}>
										<a href={expansion.bggUrl} target="_blank" rel="noopener noreferrer">
											{R.replace(new RegExp(`^${game.name}(: )?`), "", expansion.name)}
										</a>
									</li>
								))}
							</ul>
						</td>
						<td>{game.minPlayers === game.maxPlayers ? game.minPlayers : `${game.minPlayers} - ${game.maxPlayers}`}</td>
						<td>{game.playingTime}</td>
						<td>
							<ul className="list-unstyled">
								{game.mechanics.map(name => (
									<li key={name}>{name}</li>
								))}
							</ul>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

GameTable.propTypes = {
	games: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			thumbnailUrl: PropTypes.string.isRequired,
			minPlayers: PropTypes.number.isRequired,
			maxPlayers: PropTypes.number.isRequired,
			playingTime: PropTypes.number.isRequired,
			mechanics: PropTypes.arrayOf(PropTypes.string).isRequired,
			expands: PropTypes.shape({
				id: PropTypes.number.isRequired,
				name: PropTypes.string.isRequired,
				bggUrl: PropTypes.string.isRequired
			}),
			bggUrl: PropTypes.string.isRequired
		}).isRequired
	)
};

/*************
 * Export it *
 *************/

export { GameTable };
