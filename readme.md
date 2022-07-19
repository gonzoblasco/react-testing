# Learn React Testing

## Unit Testing with Jest

### Installing Jest

Before we can begin testing our code with Jest, the `jest` package must first be installed and configured. We will download Jest via the Node Package Manager (NPM) by running the following command in our terminal:

`npm install jest --save-dev`

The `npm install jest`command installs the `jest`node package and the `--save-dev`flag specifies to save it as a developer dependency. At this point, we should see `"jest"`included in the **package.json** file un `"devDependencies"`:

```json
"devDependencies": {
    "jest": "<version number>"
}
```

> *Note: If you were to install Jest locally on your machine you would need to include de `-g` global flag to get access to the command line tools.*

Now that we have Jest installed, let's create a file to write our tests. the Jest API looks for files that are either inside of a **__tests__/** directory or any file that ends in either **.test.js** or **.specs.js**.

Once you have your test files created (more on writing test logic in the upcoming exercises), Jest provides a terminal command to run test files individually: `jest <filepath/filename>`. For example, to run the **math.test.js** test file we might write:

`jest __tests__/math.test.js`

![](https://static-assets.codecademy.com/Courses/jest/jest-2-single-file.png)

We can also run tests on all of the files that have the **.test.js** or **.spec.js** extension or are within a **__tests__/** folder by simply running the `jest` command on its own:

![](https://static-assets.codecademy.com/Courses/jest/jest-2-all-files.png)

#### Instructions

Before we can begin testing the language app we should install Jest. Use the proper command to install the `jest` package as a developer dependency.

To confirm that you've done this properly, open up **package.json** and you should see Jest listed in the `"devDependencies"` section.

Throughout the following exercises of this lesson we will be testing a command-line language app that outputs how many countries an inputted language is spoken in. The application can be found in the **language_spoken.js** file.

Given that file name, create a test file with an appropriate name.

We'll learn about how tests are written later on in this lessonm, but for now, we'll use a provided example test just to see what happens when it is tested. Place the following test code into the newly created **__tests__/language_spoken.test.js** file:

```javascript
test("Jest properly installed and configured!", () => {})
```

### Configuring Jest

Before we move on to actually writing our tests, we should cover a few best practices.

By default, each test produces the terminal output that we saw in the previous exercise. Jest allows us to customize this output by using command line flags. Though there are many command-line flags, one of the most commonly used is the `--coverage` flag:

`jest __tests__/ --coverage`

This `--coverage` flag allows us to get a report of which lines of our code were actually tested. In addition to beign outputted in the terminal, this report becomes available in a directory named **coverage/** that is created at runtime.

![](https://static-assets.codecademy.com/Courses/jest/jest_3_1.png)

This report can help us make sure that our code has been thoroughly tested. From the report, we can see that there are four categories of our code that are being analyzed.

* **Statement** coverage analyzes the percentage of the program's statements that have been executed.
* **Branch** coverage analyzes the percentage of the program's edge cases that have executed.
* **Function** coverage analyzes the percent of the program's functions that have been called during testing.
* **Line** coverage analyzes the pecentage of the program's executable lines in the source file that have been executed.

Currently, each of those sections will show up at 0% coverage which makes sense - we haven't written any tests yet! Strategies for interpreting and analyzing this coverage report are outside of the scope of this lesson, however, you should keep an eye on how this report changes as we continue to write our tests.

Though the coverage report is incredibly useful, it can be annoying to type out the full command every time we want to run our tests! Therefore, it is a good practice to preconfigure our test commands in our **package.json** file to allow us to run tests through `npm`with a simple terminal command.

To do this, we set up the `"test"` script in our **package.json** file's `"scripts"`property:

```json
"scripts": {
    // other scripts...
    "test": "jest __tests__/ --coverage"
}
```

We can now run tests on all of our Jest test files while also creating a coverage report by running this terminal command:

`npm test`

In the future, if we wanted to change how we run our tests, we could adjust the **package.json** file and then continue using the `npm test`command. At any point, we are still able to use `jest` commands directly in the terminal.

#### Instructions

We'd like to be able to execute our test with the `npm test` command.

Enable this by editing the `"test"` script in the **package.json** file. It should run jest tests on the files found in the **__tests__/** directory while also producing a coverage report.

### Unit Testing with Jest (Part 1)

Now that Jest is installed and configured it is time to set up our first unit test. A unit test is designed to test the smallest unit of your code, like a single function.

Let's consider testing some functions from a module called `recipes.js`. This module has two functions we'd like to test:

* `findRecipe()` takes a name of a recipe and makes an API call to find the specified recipe. When the request resolves, the provided callback is executed with the fetched data. The data will be an object containing ingredients and their quantities for the recipe.
* `getIngredients()` converts an object retrieved using `findRecipe()` into an array of just the ingredients.

Below, we can see an example of how these funtions might be used (the actual implementation of them isn't important):

```javascript
import { findRecipe, getIngredients } from './recipes.js';

findRecipe('pesto', (recipe) => {
    console.log(recipe);
    /*
    Prints {
        'Basil': '2 cups',
        'Pine Nuts': '2 tablespoons',
        'Garlic': '2 cloves',
        'Olive Oil': '0.5 cups',
        'Grated Parmesan': '0.5 cups'
    }
     */
    
    console.log(getIngredients(recipe));
    // Prints ["Basil", "Pine Nuts", "Garlic", "Olive Oil", "Grated Parmesan"]
});
```

When unit testing, each function should be tested in isolation. In Jest, we do this by creating separate containers for our testing logic using the `test()` function.

The `test()` function take three arguments:

1) A string describing what is being tested.
2) A callback function containing assertions and other testing logic.
3) An optional timeout in milliseconds that specifies how long a test should wait before automatically aborting. If unspecified, this defaults to 5000ms.

If we wanted to test the functions from the `recipes` modulce, we could use the `test()` function to create containers for each, like so:

```javascript
// file: __tests__/recipes.test.js

// import the function to test
import { findRecipes, getIngredients } from "./recipes.js";

test("Get the full recipe for Pesto", async () => {
    // testing logic for findRecipe() omitted...
}, 10000);

test("Get only the ingredients list for Pesto", () => {
    // testing logic for getIngredients() omitted...
});
```

Les's look at the tests in the example.

* With the first argument of `test()`, we state the purpose of the test - to get the recipe for Pesto. This string shouldn't explain the implementation of the function being tested, only the desired result.
* A callback function is passed as the second argument to `test()`. Inside is where we will write our testing logic (we will cover this soon in more detail in the next exercise). Since the function being tested makes an asynchronous API call, this callback is marked as `async` (again, we'll come back to this).
* Lastly, with the third argument, we specify that we want to see if this operation can be carried out in under 10000ms (10 seconds) since making the API call may take some time.
* The second `test()` follows the same pattern, however, the function being tested is not asynchronous so the `async` keyword is omitted from the callback function. Also, by leaving out the third argument, we are using the default 5000ms timeout.

Each time we create a new `test()` function call, we create a separate entry in our testing output when we run `npm test`. Running the `npm test` command for the example above would produce this output:

![](https://static-assets.codecademy.com/Courses/jest/jest_4_1_recipes.png)

#### Instructions

Since we will now begin writing tests for `languageSpoken` object, you will notice that its methods have been imported to the **language_spoken.test.js** file. We will begin by testing the `countryExtractor()` function.

First, call the `test()` function. For now, you can call the function without any argument.

Next, we'll add a description. The `countryExtractor()` function is designed to take an array of country objects containing their name, capital, etc..., and convert it to an array of just the country names. For example:

```javascript
const countriesAllData = [
    {name: "Argentina", capital: "Buenos Aires"},
    {name: "Belize", capital: "Belmopan"},
    {name: "Bolivia", capital: "Sucre"} 
];

const countryNames = countryExtractor(countriesAllData);

console.log(countryNames);

// Prints ["Argentina", "Belize", "Bolivia"]
```

In the `test()` function call you just made, describe the test by passing in a string as the first argument.

Next, we'll need a place to put our testing logic. Pass an empty (for now) arrow function as the second argument to `test()`.

For the third and final parameter, let's force Jest to use the default timeout.

### Unit Testing with Jest (Part 2)

With our `test()` container set up, it is time to finish our first unit test by writing *assertions* to validate the various features of our code. To do this, Jest provides the `expect()` function.

The `expect()` function asserts how we expect our program to run and is used evrery time that we want to write a test. However, this function is rarely used alone - it can almost always be found in conjunction with *matcher methods*, like `.toBe()`, in the example below:

```javascript
expect(2+2).toBe(4)
```

The value passed to `expect()` should be an expression that you want to test (`2+2`) while the matcher method determines how that expression will be validated and what the expected value of that expression is (`.toBe(4)`).

Let's look again at the `getIngredients`method in the `recipes`module to see how `expect()`assertions fit into a `test()`.

Remember, `getIngredients()` converts an object containing ingredients and their quantities for a recipe into an array of just the ingredients. To test this function, we can add testing logic to the callback passed to the `test()` function:

```javascript
// file: __tests__/recipes.test.js

// import the function to test
import { getIngregients } from "./recipes.js";

test("Get only the ingredients list for Pesto", () => {
    // arrange
    const pestoRecipe = {
        'Basil': '2 cups',
        'Pine Nuts': '2 tablespoons',
        'Garlic': '2 cloves',
        'Olive Oil': '0.5 cups',
        'Grated Parmesan': '0.5 cups'
    };
    
    const expectedIngredients = ["Basil", "Pine Nuts", "Garlic", "Olive Oil", "Grated Parmesan"];
    
    // act
    const actualIngredients = getIngregients(pestoRecipe);
    
    // assertion
    expect(actualIngredients).toEqual(expectedIngredients);
});
```

In this example, we follow the **Arrange**, **Act**, **Assert** pattern in the callback passed to `test()`:

* Arrange: We first declare the input (`pestoRecipe`) to be passed to the function being tested (`getIngredients()`) as well as the expected output (`expectedIngredients`).
* Act: We then pass the input variable into the function being tested and store the result in a new variable (`actualIngredients`).
* Assert: Finally, we use the `expect()` assertion function and the `.toEqual()` matcher to compare the values of the expected output with the actual output.

Multiple `expect()` assertions can be made within a single call to `test()`. Regardless of the number of assertions made within an unit test, in order for the entire test to pass, all assertions must pass.

> *Note: The `.toBe()` matcher can be used to compare simple data types for equality while the `.toEqual()` matcher is userd to perform deep equality comparisons.*

#### Instructions

Take a look at the **language_spoken.test.js* file. In the `test()` function you created last time, we created a container to test the `countryExtractor()` function. As the description string states, this function is designed to `"convert array of country data objects to array of countries"`.

As you can see, the arrange and act portions have been taken care of. It's your job to make the assertions.

Below the comment `// assertions` use the `expect()` function and pass the value we would like to test.

Use the `.toEqual()` matcher method to define what value `actualValue` is expected to be.

### Matcher Functions

Congrats on writing your first unit test! In the last exercise, you used the `expect()` assertion function along with the `.toEqual()` matcher method. Let's learn about a few more common matcher methods.

Take a look at the file below where we've now added a number of new assertions to test the ``