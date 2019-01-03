/**************************
 * Import important stuff *
 **************************/

import React from "react";
import { GameTable } from "./GameTable.jsx";
import { Query } from "react-apollo";
import gql from "graphql-tag";

/***********************
 * The Games component *
 ***********************/

function Games() {
	return (
		<div className="gamelist">
			<h2 className="row">
				<span className="col-12">Klubbens spill</span>
			</h2>
			<div className="row">
				<div className="col-12">
					<Query
						query={gql`
							{
								boardgames {
									bggId
									bggUrl
									thumbnailUrl
									title
									minPlayers
									maxPlayers
									playingTime
									mechanics {
										name
									}
								}
							}
						`}
					>
						{({ loading, error, data }) => {
							if (!loading && !error) {
								return <GameTable games={data.boardgames} />;
							}
							return null;
						}}
					</Query>
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

/*************
 * Export it *
 *************/

export { Games };
