import * as yup from "yup";

export interface BGGGame {
	id: number;
	name: string;
	thumbnailUrl: string;
	minPlayers: number;
	maxPlayers: number;
	playingTime: number;
	mechanics: string[];
	bggUrl: string;
	expands?: Pick<BGGGame, "id" | "name" | "bggUrl">;
}

const bggGameSchemaBase = yup.object({
	id: yup.number().required(),
	name: yup.string().required(),
	thumbnailUrl: yup.string().required(),
	minPlayers: yup.number().required(),
	maxPlayers: yup.number().required(),
	playingTime: yup.number().required(),
	mechanics: yup.array(yup.string().required()).required(),
	bggUrl: yup.string().required()
});

export const bggGameSchema = bggGameSchemaBase.shape({
	expands: bggGameSchemaBase.pick(["id", "name", "bggUrl"])
});

bggGameSchema as yup.SchemaOf<BGGGame>;
