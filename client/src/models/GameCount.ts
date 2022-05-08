import * as yup from "yup";

export type GameCount = number;

export const gameCountSchema = yup.number().required();

gameCountSchema as yup.SchemaOf<GameCount>;
