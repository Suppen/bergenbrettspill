import * as yup from "yup";

export interface Env {
	BACKEND_URL: string;
}

export const envSchema = yup.object({
	BACKEND_URL: yup.string().required()
});

envSchema as yup.SchemaOf<Env>;
