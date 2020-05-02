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

const Games = () => (
	<div className="gamelist">
		<h2 className="row">
			<span className="col-12">Klubbens spill</span>
		</h2>
		<div className="row mt-5">
			<div className="col-12">
				<Query query={Games._boardgamesQuery}>
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
						<a
							href="https://boardgamegeek.com/collection/user/bergenbrettspill"
							target="_blank"
							rel="noopener noreferrer"
						>
							profilen vår
						</a>{" "}
						på{" "}
						<a href="https://boardgamegeek.com" target="_blank" rel="noopener noreferrer">
							BoardGameGeek
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
);

Games._boardgamesQuery = gql`
	query {
		boardgames {
			id
			name
			thumbnailUrl
			minPlayers
			maxPlayers
			playingTime
			mechanics
			expands {
				id
				name
				bggUrl
			}
			bggUrl
		}
	}
`;

/*************
 * Export it *
 *************/

export { Games };
