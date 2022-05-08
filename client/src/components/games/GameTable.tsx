import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { BGGGame, fetchBGGGames } from "../../models/BGGGame";

interface GameTableProps {
	games: BGGGame[];
}

const GameTable = ({ games }: GameTableProps): JSX.Element | null => {
	const [filter, setFilter] = useState<{
		name: string;
		players: number;
		playingTime: number;
		mechanics: string;
	}>({
		name: "",
		players: NaN,
		playingTime: NaN,
		mechanics: ""
	});
	const [sortBy, setSortBy] = useState<{
		prop: "name" | "minPlayers" | "playingTime" | "mechanics";
		direction: "ASC" | "DESC";
	}>({
		prop: "name",
		direction: "ASC"
	});
	const filterInputs: Record<keyof typeof filter, React.MutableRefObject<HTMLInputElement | null>> = {
		name: useRef<HTMLInputElement | null>(null),
		players: useRef<HTMLInputElement | null>(null),
		playingTime: useRef<HTMLInputElement | null>(null),
		mechanics: useRef<HTMLInputElement | null>(null)
	};

	const updateFilter = () => {
		setFilter({
			name: filterInputs.name.current?.value ?? "",
			players: Number.parseInt(filterInputs.players.current?.value as string), // TODO Fix type
			playingTime: Number.parseInt(filterInputs.playingTime.current?.value as string), // TODO Fix type
			mechanics: filterInputs.mechanics.current?.value ?? ""
		});
	};
	const updateSort = (prop: typeof sortBy.prop): void =>
		setSortBy(sortBy => ({
			prop,
			direction: sortBy.prop === prop && sortBy.direction === "ASC" ? "DESC" : "ASC"
		}));
	const getSortIcon = (prop: typeof sortBy.prop): JSX.Element | null => {
		if (sortBy.prop !== prop) {
			return null;
		}
		return <FontAwesomeIcon icon={sortBy.direction === "ASC" ? faSortDown : faSortUp} />;
	};

	const applyFilter = (gamesToFilter: NonNullable<typeof games>): NonNullable<typeof games> => {
		let filtered = [...gamesToFilter];
		if (filter.name !== "") {
			filtered = filtered.filter(({ name }) => name.toLowerCase().includes(filter.name.toLowerCase()));
		}
		if (!Number.isNaN(filter.players)) {
			filtered = filtered.filter(
				({ minPlayers, maxPlayers }) => minPlayers <= filter.players && maxPlayers >= filter.players
			);
		}
		if (!Number.isNaN(filter.playingTime)) {
			filtered = filtered.filter(
				({ playingTime }) => playingTime >= filter.playingTime - 30 && playingTime <= filter.playingTime + 30
			);
		}
		if (filter.mechanics !== "") {
			filtered = filtered.filter(({ mechanics }) =>
				mechanics.some(mechanic => mechanic.toLowerCase().includes(filter.mechanics.toLowerCase()))
			);
		}

		return filtered;
	};
	const applySort = (gamesToSort: NonNullable<typeof games>): NonNullable<typeof games> => {
		const sorted = [...gamesToSort].sort((a, b) => {
			if (a[sortBy.prop] > b[sortBy.prop]) {
				return 1;
			}
			if (b[sortBy.prop] > a[sortBy.prop]) {
				return -1;
			}
			return 0;
		});

		if (sortBy.direction === "DESC") {
			return sorted.reverse();
		}
		return sorted;
	};

	const groupExpansions = (
		gamesToGroup: NonNullable<typeof games>
	): (NonNullable<typeof games>[number] & { expansions: NonNullable<typeof games> })[] => {
		const grouped: ReturnType<typeof groupExpansions> = [];
		for (const game of grouped) {
			if (game.expands !== undefined) {
				continue;
			}

			const clonedGameObj: ReturnType<typeof groupExpansions>[number] = { ...game, expansions: [] };
			clonedGameObj.expansions = gamesToGroup.filter(game => game.expands?.id === clonedGameObj.id);

			grouped.push(clonedGameObj);
		}

		return grouped;
	};

	if (games === null) {
		return null;
	}

	const preparedGames = groupExpansions(applySort(applyFilter(games)));

	return (
		<table className="table table-striped table-hover table-responsive">
			<thead>
				<tr>
					<th>{/* Empty on purpose */}</th>
					<th onClick={() => updateSort("name")}>
						Tittel
						{getSortIcon("name")}
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
						<input ref={filterInputs.name} onChange={updateFilter} className="form-control" type="text" />
					</th>
					<th>
						<input
							ref={filterInputs.players}
							onChange={updateFilter}
							className="form-control"
							type="number"
							min="1"
						/>
					</th>
					<th className="input-group">
						<input
							ref={filterInputs.playingTime}
							onChange={updateFilter}
							className="form-control"
							type="number"
						/>
						<div className="input-group-append">
							<span className="input-group-text">±30</span>
						</div>
					</th>
					<th>
						<input
							ref={filterInputs.mechanics}
							onChange={updateFilter}
							className="form-control"
							type="text"
						/>
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
											{expansion.name.replace(new RegExp(`^${game.name}(: )?`), "")}
										</a>
									</li>
								))}
							</ul>
						</td>
						<td>
							{game.minPlayers === game.maxPlayers
								? game.minPlayers
								: `${game.minPlayers} - ${game.maxPlayers}`}
						</td>
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

const GameTableContainer = (): JSX.Element | null => {
	const [games, setGames] = useState<BGGGame[] | null>(null);
	useEffect(() => {
		let mounted = true;

		void (async () => {
			const games = await fetchBGGGames();

			if (!mounted) {
				return;
			}

			setGames(games);
		});

		return () => {
			mounted = false;
		};
	}, []);

	return games === null ? null : <GameTable games={games} />;
};

export default GameTableContainer;
export { GameTable, GameTableContainer };
