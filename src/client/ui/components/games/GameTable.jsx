/**************************
 * Import important stuff *
 **************************/

import React from "react";
import PropTypes from "prop-types";

/***************************
 * The GameTable component *
 ***************************/

class GameTable extends React.Component {
	static get propTypes() {
		return {
			games: PropTypes.arrayOf(PropTypes.shape({})).isRequired
		};
	}

	static get defaultProps() {
		return {
			games: []
		};
	}

	constructor(props) {
		super(props);
	}

	/**
	 * The list of games, sorted according to user preferences
	 *
	 * @type {Object[]}
	 *
	 * @private
	 */
	get _games() {
		return this.props.games;
	}

	render() {
		return (
			<div className="gamelist">
				<h2 className="row">
					<span className="col-12">Klubbens spill</span>
				</h2>
				<div className="row">
					<div className="col-12">
						<table className="table table-striped table-hover table-responsive">
							<thead>
								<tr>
									<th>{/* Empty on purpose */}</th>
									<th>Tittel</th>
									<th>Spillere</th>
									<th>Spilletid</th>
									<th>Mekanikker</th>
								</tr>
								<tr>
									<th>{/* Empty on purpose */}</th>
									<th>
										<input className="form-control" type="text" />
									</th>
									<th>
										<input className="form-control" type="number" min="1" />
									</th>
									<th className="input-group">
										<input className="form-control" type="number" />
										<div className="input-group-append">
											<span className="input-group-text">±30</span>
										</div>
									</th>
									<th>
										<input className="form-control" type="text" />
									</th>
								</tr>
							</thead>
							<tbody>
								{this._games.map(game => (
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
											{game.minPlayers === game.maxPlayers
												? game.minPlayers
												: `${game.minPlayers} - ${game.maxPlayers}`}
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
						<div className="bgg-aknowledgement">
							<img
								className="d-inline"
								src="https://cf.geekdo-static.com/images/geekdo/bgg_cornerlogo.png"
								alt="BoardGameGeek"
							/>
							<p className="d-inline">
								Data hentet fra{" "}
								<a href="https://boardgamegeek.com" target="_blank" rel="noopener noreferrer">
									BoardGameGeek
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/*************
 * Export it *
 *************/

export default GameTable;
export { GameTable };
