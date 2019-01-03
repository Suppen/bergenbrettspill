/**************************
 * Import important stuff *
 **************************/

import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

/***************************
 * The GameTable component *
 ***************************/

class GameTable extends React.Component {
	static get propTypes() {
		return {
			games: PropTypes.arrayOf(
				PropTypes.shape({
					thumbnailUrl: PropTypes.string.isRequired,
					title: PropTypes.string.isRequired,
					minPlayers: PropTypes.number.isRequired,
					maxPlayers: PropTypes.number.isRequired,
					playingTime: PropTypes.number.isRequired,
					mechanics: PropTypes.arrayOf(
						PropTypes.shape({
							name: PropTypes.string.isRequired
						})
					).isRequired
				})
			).isRequired
		};
	}

	static get defaultProps() {
		return {
			games: []
		};
	}

	constructor(props) {
		super(props);

		// Set initial state
		this.state = {
			filter: {
				title: "",
				players: NaN,
				playingTime: NaN,
				mechanics: ""
			},
			sortBy: {
				prop: "title",
				direction: "ASC"
			}
		};

		/**
		 * Handles for the filter input elements
		 *
		 * @type {Object}
		 *
		 * @private
		 */
		this._filterInputs = {
			title: null,
			players: null,
			playingTime: null,
			mechanics: null
		};

		// Bind methods
		this._updateFilter = this._updateFilter.bind(this);
		this._updateSort = this._updateSort.bind(this);
		this._getSortIcon = this._getSortIcon.bind(this);
	}

	/**
	 * Updates the filter
	 *
	 * @returns {undefined}
	 *
	 * @private
	 */
	_updateFilter() {
		this.setState({
			filter: {
				title: this._filterInputs.title.value,
				players: Number.parseInt(this._filterInputs.players.value),
				playingTime: Number.parseInt(this._filterInputs.playingTime.value),
				mechanics: this._filterInputs.mechanics.value
			}
		});
	}

	/**
	 * Updates the prop to sort on
	 *
	 * @param {String} prop	The name of the prop to sort on
	 *
	 * @returns {undefined}
	 *
	 * @private
	 */
	_updateSort(prop) {
		this.setState(({ sortBy }) => ({
			sortBy: {
				prop,
				direction: R.ifElse(
					sortBy => R.equals(sortBy.prop, prop) && R.equals(sortBy.direction, "ASC"),
					R.always("DESC"),
					R.always("ASC")
				)(sortBy)
			}
		}));
	}

	/**
	 * The list of games, sorted according to user preferences
	 *
	 * @type {Object[]}
	 *
	 * @private
	 */
	get _games() {
		// Shorthand for the filter props
		const { title, players, playingTime, mechanics } = this.state.filter;

		// Shorthand for the sorting
		const { prop, direction } = this.state.sortBy;

		// Make the filter and sort functions
		const maybeReverse = R.ifElse(() => R.equals(direction, "ASC"), R.identity, R.reverse);
		const sort = R.sortBy(R.prop(prop));
		const filterTitle = R.filter(
			R.compose(
				R.contains(R.toLower(title)),
				R.toLower,
				R.prop("title")
			)
		);
		const filterPlayers = R.ifElse(
			() => Number.isNaN(players),
			R.identity,
			R.filter(game => R.and(R.prop("minPlayers", game) <= players, R.prop("maxPlayers", game) >= players))
		);
		const filterPlayingTime = R.ifElse(
			() => Number.isNaN(playingTime),
			R.identity,
			R.filter(
				R.compose(
					R.both(R.gte(R.__, R.subtract(playingTime, 30)), R.lte(R.__, R.add(playingTime, 30))),
					R.prop("playingTime")
				)
			)
		);
		const filterMechanics = R.filter(
			R.compose(
				R.ifElse(
					R.isEmpty,
					R.T,
					R.compose(
						R.any(R.contains(R.toLower(mechanics))),
						R.map(R.toLower),
						R.map(R.prop("name"))
					)
				),
				R.prop("mechanics")
			)
		);

		// Process the game list
		return R.compose(
			maybeReverse,
			sort,
			filterTitle,
			filterPlayers,
			filterPlayingTime,
			filterMechanics
		)(this.props.games);
	}

	/**
	 * Gets the sort icon for a prop
	 *
	 * @param {String} prop	The prop to get the sort icon for
	 *
	 * @returns {React.Component|null}	The sort icon as a React component, or null
	 *
	 * @private
	 */
	_getSortIcon(prop) {
		return R.ifElse(
			R.equals(this.state.sortBy.prop),
			R.ifElse(
				() => R.equals(this.state.sortBy.direction, "ASC"),
				R.always(<FontAwesomeIcon icon={faSortDown} />),
				R.always(<FontAwesomeIcon icon={faSortUp} />)
			),
			R.always(null)
		)(prop);
	}

	render() {
		const games = this._games;

		return (
			<table className="table table-striped table-hover table-responsive">
				<thead>
					<tr>
						<th>{/* Empty on purpose */}</th>
						<th onClick={this._updateSort.bind(this, "title")}>
							Tittel
							{this._getSortIcon("title")}
						</th>
						<th onClick={this._updateSort.bind(this, "minPlayers")}>
							Spillere
							{this._getSortIcon("minPlayers")}
						</th>
						<th onClick={this._updateSort.bind(this, "playingTime")}>
							Spilletid
							{this._getSortIcon("playingTime")}
						</th>
						<th>Mekanikker</th>
					</tr>
					<tr>
						<th>{`${games.length} søketreff`}</th>
						<th>
							<input
								ref={input => (this._filterInputs.title = input)}
								onChange={this._updateFilter}
								className="form-control"
								type="text"
							/>
						</th>
						<th>
							<input
								ref={input => (this._filterInputs.players = input)}
								onChange={this._updateFilter}
								className="form-control"
								type="number"
								min="1"
							/>
						</th>
						<th className="input-group">
							<input
								ref={input => (this._filterInputs.playingTime = input)}
								onChange={this._updateFilter}
								className="form-control"
								type="number"
							/>
							<div className="input-group-append">
								<span className="input-group-text">±30</span>
							</div>
						</th>
						<th>
							<input
								ref={input => (this._filterInputs.mechanics = input)}
								onChange={this._updateFilter}
								className="form-control"
								type="text"
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					{games.map(game => (
						<tr key={game.bggId}>
							<td>
								<a href={game.bggUrl} target="_blank" rel="noopener noreferrer">
									<img src={game.thumbnailUrl} alt={game.title} />
								</a>
							</td>
							<td>
								<a href={game.bggUrl} target="_blank" rel="noopener noreferrer">
									{game.title}
								</a>
							</td>
							<td>
								{game.minPlayers === game.maxPlayers ? game.minPlayers : `${game.minPlayers} - ${game.maxPlayers}`}
							</td>
							<td>{game.playingTime}</td>
							<td>
								<ul className="list-unstyled">
									{game.mechanics.map(({ name }) => (
										<li key={name}>{name}</li>
									))}
								</ul>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

/*************
 * Export it *
 *************/

export { GameTable };
