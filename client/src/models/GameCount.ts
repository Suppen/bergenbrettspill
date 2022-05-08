import * as yup from "yup";
import { env } from "../env";
import createJSONFetcher from "../fetchers/jsonFetcher";

/** Number of games Bergen Brettspillklubb owns */
export type GameCount = number;

/** Schema for validating a GameCount */
export const gameCountSchema = yup.number().min(0).integer().required();
gameCountSchema as yup.SchemaOf<GameCount>;

/**
 * Fetches the number of games Bergen Brettspillklubb owns
 *
 * @returns Number of games Bergen Brettspillklubb owns
 */
export const fetchGameCount = (): Promise<GameCount> =>
	createJSONFetcher(gameCountSchema.required())(`${env.BACKEND_URL}/games/count`);
