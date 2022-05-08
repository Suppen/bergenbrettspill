import { SchemaOf } from "yup";

/**
 * Creates a fetcher which fetches JSON, parses it, and validates it against a yup schema
 *
 * @param schema The yup schema to validate the data against
 *
 * @returns A function taking the same parameters as {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch } and returning a promise resolving to the parsed and validated data
 */
const createJSONFetcher =
	<T>(schema: SchemaOf<T>) =>
	(...args: Parameters<typeof fetch>): Promise<T> =>
		// Use the browser's fetch api to fetch the data itself
		fetch(...args)
			// Parse the response as JSON
			.then(res => res.json())
			// Validate it against the schema
			.then(data => schema.cast(data) as Promise<T>);

export default createJSONFetcher;
export { createJSONFetcher };
