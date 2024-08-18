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
							src="https://cf.geekdo-images.com/HZy35cmzmmyV9BarSuk6ug__thumb/img/gbE7sulIurZE_Tx8EQJXnZSKI6w=/fit-in/200x150/filters:strip_icc()/pic7779581.png"
							alt="BoardGameGeek"
						/>
						<p>
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
