import React from "react";
import DefaultLayout from "../layouts/default/DefaultLayout";
import GameTable from "./GameTable.jsx";

const Games = (): JSX.Element => (
	<DefaultLayout>
		<div className="gamelist">
			<h2 className="row">
				<span className="col-12">Klubbens spill</span>
			</h2>
			<div className="row mt-5">
				<div className="col-12">
					<GameTable />
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
	</DefaultLayout>
);

export default Games;
export { Games };
