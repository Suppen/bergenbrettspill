import createJSONFetcher from "./jsonFetcher";
import * as yup from "yup";
import fetchMock from "jest-fetch-mock";

describe("createJSONFetcher", () => {
	// Set up some test data for the entire thing
	const url = "https://example.com";
	const testSchema = yup.object({ testProp: yup.string().required() });
	const validData = { testProp: "test" } as yup.Asserts<typeof testSchema>;
	const validDataJSON = JSON.stringify(validData);
	const invalidData = { badProp: "Bad" };
	const invalidJSON = "Invalid JSON";

	const jsonFetcher = createJSONFetcher(testSchema);

	expect(() => testSchema.validateSync(validData)).not.toThrow();
	expect(() => testSchema.validateSync(invalidData)).toThrow();
	expect(() => void JSON.parse(invalidJSON)).toThrow();

	// Clear the fetch mock after each test
	// XXX Need to be beforeEach, not afterEach for some reason. https://github.com/jefflau/jest-fetch-mock/issues/184
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it("should pass the arguments on to fetch", async () => {
		// Create some test params to pass to the fetcher
		const testParams = ["a", "b"] as unknown as Parameters<ReturnType<typeof createJSONFetcher>>;
		fetchMock.mockResponseOnce(validDataJSON);

		try {
			await jsonFetcher(...testParams);
		} catch (err) {
			// Errors are not interesting here
		} finally {
			// Verify the parameters were passed to fetch
			expect(fetchMock.mock.calls[0]).toEqual(testParams);
		}
	});

	it("should fetch valid data", async () => {
		// Set up the mock
		fetchMock.mockResponseOnce(validDataJSON);

		// Create the fetcher and run it
		const result = await jsonFetcher(url);

		// Verify result
		expect(result).toEqual(validData);
	});

	it("should reject with fetch's error if fetch rejects", () => {
		// Set up the mock
		const err = new Error("Error");
		fetchMock.mockRejectOnce(err);

		// Run the fetcher and expect it to throw the error
		return expect(() => jsonFetcher(url)).rejects.toStrictEqual(err);
	});

	it("should reject on invalid JSON", () => {
		// Make fetch return a response with the invalid JSON
		fetchMock.mockResponseOnce(invalidJSON);

		return expect(() => jsonFetcher(url)).rejects.toThrow();
	});
});
