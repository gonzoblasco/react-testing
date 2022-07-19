import {
    capitalize,
    getAlpha2Code,
    countryExtractor,
    countryListLookup,
    getResponse
} from "../language_spoken.js";

test("convert array of country data objects to array of countries", () => {
    // Arrange
    const inputObject =[
        {name: "Argentina", capital: "Buenos Aires"},
        {name: "Belize", capital: "Belmopan"},
        {name: "Bolivia", capital: "Sucre"}
    ];
    const expectedValue = ["Argentina", "Belize", "Bolivia"];

    // Act
    const actualValue = countryExtractor(inputObject);

    // Assertions
    expect(actualValue).toEqual(expectedValue);
});