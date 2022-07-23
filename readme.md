# Learn React Testing

## Unit Testing with Jest

### Installing Jest

Before we can begin testing our code with Jest, the `jest` package must first be installed and configured. We will download Jest via the Node Package Manager (NPM) by running the following command in our terminal:

`npm install jest --save-dev`

The `npm install jest`command installs the `jest`node package and the `--save-dev`flag specifies to save it as a developer dependency. At this point, we should see `"jest"`included in the **package.json** file un `"devDependencies"`:

```json
[{"devDependencies": {
    "jest": "<version number>"
}}]
```

> *Note: If you were to install Jest locally on your machine you would need to include de `-g` global flag to get access to the command line tools.*

Now that we have Jest installed, let's create a file to write our tests. the Jest API looks for files that are either inside of a **__tests__/** directory or any file that ends in either **.test.js** or **.specs.js**.

Once you have your test files created (more on writing test logic in the upcoming exercises), Jest provides a terminal command to run test files individually: `jest <filepath/filename>`. For example, to run the **math.test.js** test file we might write:

`jest __tests__/math.test.js`

![](https://static-assets.codecademy.com/Courses/jest/jest-2-single-file.png)

We can also run tests on all the files that have the **.test.js** or **.spec.js** extension or are within a **__tests__/** folder by simply running the `jest` command on its own:

![](https://static-assets.codecademy.com/Courses/jest/jest-2-all-files.png)

#### Instructions

Before we can begin testing the language app we should install Jest. Use the proper command to install the `jest` package as a developer dependency.

To confirm that you've done this properly, open up **package.json**, and you should see Jest listed in the `"devDependencies"` section.

Throughout the following exercises of this lesson we will be testing a command-line language app that outputs how many countries an inputted language is spoken in. The application can be found in the **language_spoken.js** file.

Given that file name, create a test file with an appropriate name.

We'll learn about how tests are written later on in this lesson, but for now, we'll use a provided example test just to see what happens when it is tested. Place the following test code into the newly created **__tests__/language_spoken.test.js** file:

```javascript
test("Jest properly installed and configured!", () => {})
```

### Configuring Jest

Before we move on to actually writing our tests, we should cover a few best practices.

By default, each test produces the terminal output that we saw in the previous exercise. Jest allows us to customize this output by using command line flags. Though there are many command-line flags, one of the most commonly used is the `--coverage` flag:

`jest __tests__/ --coverage`

This `--coverage` flag allows us to get a report of which lines of our code were actually tested. In addition to being outputted in the terminal, this report becomes available in a directory named **coverage/** that is created at runtime.

![](https://static-assets.codecademy.com/Courses/jest/jest_3_1.png)

This report can help us make sure that our code has been thoroughly tested. From the report, we can see that there are four categories of our code that are being analyzed.

* **Statement** coverage analyzes the percentage of the program's statements that have been executed.
* **Branch** coverage analyzes the percentage of the program's edge cases that have executed.
* **Function** coverage analyzes the percent of the program's functions that have been called during testing.
* **Line** coverage analyzes the percentage of the program's executable lines in the source file that have been executed.

Currently, each of those sections will show up at 0% coverage which makes sense - we haven't written any tests yet! Strategies for interpreting and analyzing this coverage report are outside the scope of this lesson, however, you should keep an eye on how this report changes as we continue to write our tests.

Though the coverage report is incredibly useful, it can be annoying to type out the full command every time we want to run our tests! Therefore, it is a good practice to preconfigure our test commands in our **package.json** file to allow us to run tests through `npm`with a simple terminal command.

To do this, we set up the `"test"` script in our **package.json** file's `"scripts"`property:

```json
[{"scripts": {
    "test": "jest __tests__/ --coverage"
}}]
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

Below, we can see an example of how these functions might be used (the actual implementation of them isn't important):

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

If we wanted to test the functions from the `recipes` module, we could use the `test()` function to create containers for each, like so:

```javascript
// file: __tests__/recipes.test.js

// import the function to test
import { findRecipe, getIngredients } from "./recipes.js";

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

The `expect()` function asserts how we expect our program to run and is used every time that we want to write a test. However, this function is rarely used alone - it can almost always be found in conjunction with *matcher methods*, like `.toBe()`, in the example below:

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

Multiple `expect()` assertions can be made within a single call to `test()`. Regardless of the number of assertions made within a unit test, in order for the entire test to pass, all assertions must pass.

> *Note: The `.toBe()` matcher can be used to compare simple data types for equality while the `.toEqual()` matcher is used to perform deep equality comparisons.*

#### Instructions

Take a look at the **language_spoken.test.js* file. In the `test()` function you created last time, we created a container to test the `countryExtractor()` function. As the description string states, this function is designed to `"convert array of country data objects to array of countries"`.

As you can see, the arrange and act portions have been taken care of. It's your job to make the assertions.

Below the comment `// assertions` use the `expect()` function and pass the value we would like to test.

Use the `.toEqual()` matcher method to define what value `actualValue` is expected to be.

### Matcher Functions

Congrats on writing your first unit test! In the last exercise, you used the `expect()` assertion function along with the `.toEqual()` matcher method. Let's learn about a few more common matcher methods.

Take a look at the file below where we've now added a number of new assertions to test the `getIngredients()` method from the `recipes` module.

```javascript
// file: __tests__/recipes.test.js
import {getIngregients} from "./recipes.js";

test("Get only the ingredients list for Pesto", () => {
  // arrange
  const pestoRecipe = {
    'Basil': '2 cups',
    'Pine Nuts': '2 tablespoons',
    'Garlic': '2 cloves',
    'Olive Oil': '0.5 cups',
    'Grated Parmesan': '0.5 cups'
  };

  const expectedIngredients = [
    "Basil",
    "Pine Nuts",
    "Garlic",
    "Olive Oil",
    "Grated Parmesan"];

  // act
  const actualIngredients = getIngregients(pestoRecipe);

  // assertion
  expect(actualIngredients).toBeDefined();
  expect(actualIngredients).toEqual(expectedIngredients);
  expect(actualIngredients).toHaveLength(5);
  expect(actualIngredients).toContain("Basil");
  expect(actualIngredients).not.toContain("Ice Cream");
});
```

Let's go over the matchers used in this example:

1) `.toBeDefined()` is used to verify that a variable is not `undefined`. This is often the first thing checked.
2) `.toEqual()` is used to perform deep equality checks between values.
3) `.toBe()` is similar to `.toEqual()` but is used to compare primitive values.
4) `.toBeTruthy()` is used to verify whether a value is truthy or not.
5) `.not` is used before another matcher to verify that opposite result is true.
6) `.toContain()` is used when we want to verify that an item is in an array. In this case, since the `.not` matcher is used, we are verifying that `"Ice Cream"` is NOT in the array.

As mentioned in the previous lesson, there are many matches. Rather than memorizing all of them, you should consult the complete list in the [Jest Documentation](https://jestjs.io/docs/expect).

#### Instructions

Let's put our new-found knowledge to use and write some more tests for our `countryExtractor()` function. Based on the provided `inputObject`, we expect the first value of the `actualValue` array to be `"Argentina"`

Now, directly under the previous assertion, let's write a test to verify that the `actualValue` array contains the string `"Belize"`.

Let's write another assertion that expects the following statement to return `true`: `actualValue[2] === "Bolivia"`.

### Testing Async Code with Jest (Part 1)

Armed with how to write simple unit tests, we will now add a layer of complexity by exploring how to test asynchronous code in Jest.

Let's return to the `findRecipe()` function from the `recipes` module. Remember, the `findRecipe()` method will make an asynchronous [REST API](https://www.codecademy.com/articles/what-is-rest) call and pass the resolved data to a callback function. We might use this function to find the ingredients for pesto like so:

```javascript
findRecipe("pesto", (recipes) => {
  console.log(recipes);
  /*
  Prints: {
    "pesto": {
      "Basil": "2 cups",
      "Pine Nuts": "2 tablespoons",
      "Garlic": "2 cloves",
      "Olive Oil": "0.5 cups",
      "Grated Parmesan": "0.5 cups"
    }
   */
});
```

If we wanted to make sure that this function does in fact get the requested data, we may be tempted to put our `expect()` assertion inside the callback function like so:

```javascript
test("get the full recipe for pesto", () => {
  // arrange
  const dish = "pesto";
  const expectedRecipe = {
    "Basil": "2 cups",
    "Pine Nuts": "2 tablespoons",
    "Garlic": "2 cloves",
    "Olive Oil": "0.5 cups",
    "Grated Parmesan": "0.5 cups"
  };
  
  // act
  findRecipe(dish, (actualRecipe) => {
    // assertion
    expect(actualRecipe).toEqual(expectedRecipe);
  });
})
```

This logic seems fairly sound. When the API call resolves, the provided callback will be executed with the fetched data(`actualRecipe`) which can be compared to `expectedRecipe`.

However, this test would leave us vulnerable to a false positive, meaning it would pass even if our API call and/or assertion failed! By default, Jest is not aware that it must wait for asynchronous callbacks to resolve before finishing a test. From Jest's perspective, it executed the findRecipe() call and then moved on. When it didn't immediately encounter any failing `expect()` assertion, the test passed!

We can see this more clearly by replacing the assertion used above with an obvious failing assertion like `expect(undefined).toBeDefined()`.

```javascript
test('get full recipe for pesto', () => {
  // arrange
  const dish = "pesto";
  const expectedRecipe = {
    "Basil": "2 cups",
    "Pine Nuts": "2 tablespoons",
    "Garlic": "2 cloves",
    "Olive Oil": "0.5 cups",
    "Grated Parmesan": "0.5 cups"
  };
  
  // act
  findRecipe(dish, (actualRecipe) => {
    // assertion
    expect(undefined).toBeDefined();
  });
})
```

Running this test will produce a bewildering pass! Again, Jest has no way to know the callback is asynchronous, so it will not wait for it, and it will not see the failing `expect()` assertion. 

To fix this issue, Jest allows us to add a `done` parameter in the `test()` callback function. The value of `done` is a function and, when included as a parameter, Jest knows that the test should not finish until this `done()` function is called.

Let-s take a final look at the test for the `findRecipe()` function, this time using the `done` parameter:

```javascript
// This time we'll use the `done` parameter

test("get the full recipe for pesto", (done) => {
  // arrange
  const dish = "pesto";
  const expectedRecipe = {
    "Basil": "2 cups",
    "Pine Nuts": "2 tablespoons",
    "Garlic": "2 cloves",
    "Olive Oil": "0.5 cups",
    "Grated Parmesan": "0.5 cups"
  };
  
  // act
  findRecipe(dish, (actualRecipe) => {
    // assertion
    try{
      expect(actualRecipe).toEqual(expectedRecipe);
      done();
    } catch(error) {
      done.fail(error);
    }
  });
})
```

Let's break down this example:

* In the first line of code, the `done` parameter is added to the callback passed to `test()`. Jest now knows to wait until the function is called before concluding the test.
* The `done()` function is called after the `expect()` assertion is made. This way, the `expect()` is guaranteed to be seen and any false/positives will be caught.

You should notice that the `expect()` and `done()` call are being made in a `try` block. Without this, if the assertion were to fail, `expect()` would through an error before the `done()` function gets a chance to be called, From Jest's perspective, the reason for the test failure would be a timeout error (since `done()` was never called) rather than the actual error thrown by the failed `expect()` assertion.

By using a `catch` block, we can capture the `error` value thrown and pass it to `done()`, which then displays it in the test output. Though not required, this is a best practice and will yield better test outputs.

#### Instructions

Let's start by seeing how we are receiving a false positive.

Take a look at *language_spoken.test.js* where we've added a second `test()` to test the functionality of the `countryListLookup()` function. This function makes an asynchronous request to a REST API to get back a list of countries where a given language is spoken. The fetched `result` is then passed to our provided callback.

If you look closely at the provided assertion being made, `expect(undefined).toBeDefined()`, this test should fail, however, as we just learned, the test will provide a false positive!

Let's begin by running the test command in the terminal to verify that our test is returning a false positive. The test should PASS (don't use the `done()` parameter yet!).

Now, let's make sure that the test actually fails this time by rewriting the asynchronous test to use the `done()` callback as a parameter.

You should wrap the `expect(undefined).toBeDefined()` assertion in a `try`/`catch` block and then call `done()` at the appropriate time to notify Jest when to end the test.

To verify that you did this properly, run the `npm test` command in the terminal. Your test should now fail.

### Testing Async Code with Jest (Part 2)

We will now explore testing functions that return a [Promise](https://www.codecademy.com/learn/asynchronous-javascript/modules/javascript-promises). Let's return to the `findRecipe()` function altered slightly. Instead of passing the fetched data to a callback, the function will now return a Promise. We now can use this function, along with the `await` keyword, like so:

```javascript
const recipe = await findRecipe("pesto");
console.log(recipe);
/*
Prints {
    "Basil": "2 cups",
    "Pine Nuts": "2 tablespoons",
    "Garlic": "2 cloves",
    "Olive Oil": "0.5 cups",
    "Grated Parmesan": "0.5 cups"
}
 */
```

Jest supports the use of the `async` and `await` keywords, making handling Promises a breeze! Our test for the `findRecipe()` function can now be written like so:

```javascript
test('get the full recipe for pesto', async () => {
  // Arrange
  const dish = "pesto";
  const expectedRecipe = {
    "Basil": "2 cups",
    "Pine Nuts": "2 tablespoons",
    "Garlic": "2 cloves",
    "Olive Oil": "0.5 cups",
    "Grated Parmesan": "0.5 cups"
  };
  
  // Act
  const actualRecipe = await findRecipe(dish);
  
  // Assertion
  expect(actualRecipe).toEqual(expectedRecipe);
})
```

Remember, when using the `async` and `await` keywords, the `async` keyword is placed before the function that contains asynchronous code. In this case, that would be the callback passed to `test()`. Then, the `await` keyword is placed in front of the asynchronous function call `findRecipe()`.

With the inclusion of the `async`/`await` keywords, Jest will wait for any `await` statement to resolve before continuing on.

We will now test the `countryListLookup()` function again. However now, this function has been altered slightly to simply return a Promise instead of a callback with the fetched data. The provided `test()` is written in a logical order however it is not set up to handle asynchronous code!

Verify this by running the test command. The test should fail as `countryListLookup()` will return an empty object.

Now that the false-negative has been identified, rewrite the test using the `async` and `await` syntax.

### Mocking with Jest (Part 1)

Over the past few exercises, we have been analyzing the `findRecipe()` function which makes an REST API call to fetch the recipe data. Testing a real REST API is not ideal for a few reasons:

* We aren't concerned about whether the function that performs the PAI call works.
* Incorporating REST API calls into our tests can create fragile tests that may fail simply due to network issues.
* If we were interacting with a production-grade database, we could accidentally alter official data.

A safer and more efficient way to write our tests would be to create a mock function that bypasses the API call and returns values that we control instead. Luckily, Jest provides us with a way to mock functions and even entire modules to do just that!

Creating the mock function and then replacing the real function with the mocked one requires two separate steps. For the sake of clarify, we will break down this process over this exercise and the next. First, let's go over the steps to create a mocked function.

1) First we need to create a directory labeled **__mocks__/** in the same directory as the module that we want to mock. Later on, Jest will know to look for this directory when mocking the specified module.
2) Next, inside the directory, we create a file with the same name as the module that will be mocked.
3) Then, we create a module with the functionality that we want. Functions that want to mock can be created using `jest.fn()` - the function provided by the Jest Library for creating [mock functions](https://jestjs.io/docs/mock-function-api).
4) Lastly, we export the module.

The function that makes the API calls is called `apiRequest()` and it is exported from a file called **utils/api-request.js**. To mock this file and the `apiRequest()` function, we might write something like this:

```javascript
// file: utils/__mocks__/api-request.js
const apiRequest = jest.fn(() => {
  return Promise.resolve({
    status: "",
    data: {}
  });
});

export default apiRequest
```

Let's break down this example:

* Since we are mocking the **utils/api-request.js** file, we created a file called **utils/__mocks__/api-request.js**.
* Inside, we declared an `apiRequest()` function that is assigned a value of `jest.fn()`.
* By passing a callback function to `jest.fn()`, we can define the behavior of the mocked function. In this case, we have the mocked function return a custom Promise that matches the structure expected by our application (an object with `status` and `data` properties).
* Lastly, we export `apiRequest` as the default export.

In the next exercise, we'll see how we can replace the actual `apiRequest()` function with our mocked version and even further define how our mock function will behave within our tests. For now, however, let's practice making a mock function!

#### Instructions

Back in our `langauge_spoken` app, take a look at the `countryListLookup()` function. This function calls the `httpRequest()` function (see **utils/http-request.js**). Let's replace this `httpRequest` function with a mock!

First, create a folder called **__mocks__/** inside the **utils** folder. Then, create a file called **http-request.js** inside the **__mocks__** folder.

Nice work! We now have a place to define our mocked `httpRequest()` function.

Inside the newly created **http-request.js** file, create an exported function.

Inside the `jest.fn()`, pass a callback function that returns the resolved Promise below:

```javascript
Promise.resolve({
  status: "",
  data: {}
});
```

### Mocking with Jest (Part 2)

Now that we have a module set up with our mocked function it's time to use it within our Jest test for `findRecipe()`. Remember, we want to replace the actual `apiRequest()` function with the mocked one we created!

Let's take a look at the steps to use a function that we've created in our **__mocks__/** directory in our tests.

1) First, in the test file, we import the real function. This allows the test to work as it would otherwise if no mock existed.
2) Then use the `jest.mock()` function provided by Jest to override the value with the mocked one defined in the **__mocks__/** folder. `jest.mock()` accepts a string as an argument that should match the filepath to the file being mocked.

> *Note: This second step is only required when mocking local modules. When mocking modules installed into the `node_modules` directory, the module will automatically be mocked when it is imported in step 1.*`

```javascript
// import the actual module
import apiRequest from './api-request.js';

// then tell Jest to use the mocked version!
jest.mock('./api-request.js');
```

Following these steps will cause any `apiRequest()` function calls made in the Jest tests to use the mocked version instead.

We can also further manipulate how specific methods in the mocked module behave by using special methods attached to functions mocked with `jest.fn()`. One of these methods is `mockFunction.mockResolvedValueOnce()`, which accepts a value that the next call to `mockFunction()` will resolve to.

```javascript
// file: __tests__/recipes.js

import { findRecipe } from './recipes.js';

// Import the actual module
import apiRequest from './api-request.js';

// Then tell Jest to use the mocked version!
jest.mock('./api-request.js');

test("get the full recipe for a dish", async () => {
  // Arrange
  const dish = "Pesto";
  const expectedValue = {
    "Magical Deliciousness": "3 cups"
  };
  
  // Set the resolved value for the next call to apiRequest()
  const mockResponse = {
    status: "mock",
    data: expectedValue
  };
  apiRequest.mockResolvedValueOnce(mockResponse);
  
  // Act
  const actualRecipe = await findRecipe(dish);
  
  // Assertion
  expect(actualRecipe).toEqual(expectedValue);
});
```

In the example above, the `mockResolvedValueOnce()` method is used to determine what the next call to the `apiRequest()` function will resolve to. This method may be called any number of times in a test and may be useful if you'd like to finely control what each call to your mocked function resolves to.

There are many other methods available for controlling mocked functions. To see a full list of these methods, check out the [Jest Documentation](https://jestjs.io/docs/mock-function-api).

#### Instructions

In the last exercise, you mocked the `httpRequest()` function in the **__mocks__/** folder. Now, back in the **language_spoken_test.js** file we can use it!

At the top of the **language_spoken.test.js** file, let's begin by importing the `httpRequest` function from the `../utils/http-request.js` file. You should use the default import syntax:

```javascript
import { function as Module } from '/path/to/module.js'
```

Then, notify Jest that we want the file to be mocked!

Now that we are using the mocked version of the `httpRequest()` function, we can control what value it resolves to, so we can test `countryListLookup()` without using a real API.

In the second `test()` in **language_spoken.test.js**, the variable `resolvedValue` has been defined for you. Below, a call to `countryListLookup()` is made which is the function that use `httpRequest()`!

Before the call to `countryListLookup()` use the `.mockResolvedValueOnce()` to mock the next resolved value of `httpRequest()` to be `resolvedValue`.

If you've completed the previous steps properly the `expect()` assertion made at the bottom of the second `test()` should now pass.

Run the test command in the terminal, and you should see two passing tests. Also notice in the coverage report that the `httpRequest()` file is no longer being covered by our tests!

### Let's Review!

Great work! We have covered a lot over this lesson. Let's take a moment to review:

* We have learned that Jest is an easy-to-use framework for testing in a JavaScript environment because it combines a test-runner with assertion methods like the `expect()` API.
* We also learned some basic syntax involved with creating a simple unit test, such as the `test()` function.
* After tackling basic unit tests we adventured into de realm of testing asynchronous code with Jest by using the `done` parameter to wait for asynchronous callbacks and the `async`/`await` keywords to wait for Promises to resolve.
* Lastly, we learned how to mock functions using `jest.fn()` and make use of mocked modules with `jest.mock()` by mocking the Axios module.

While we have learned a lot there is always more knowledge to be obtained, and we encourage you to continue exploring Jest and its wonderful features!

## Currency Comparison

You just learned how to leverage the power of Jest to create unit tests. Let's put that knowledge to use! For this project, you'll be testing a Node.js application called Currency Comparison.

### Installing and Configuring Jest

Before we get started take a moment to familiarize yourself with the Currency Comparison application. Start the application by running the command `npm start` in the terminal. Try using a yearly salary of 50000 USD and try converting into Canadian Dollar (CAD).

Then, take a look at the **currency_comparison.js** file to see some functions that we will be testing.

> Run `npm start` in the terminal, then respond with `5000` for the first prompt, and `CAD` for the second.

Now that we have taken the time to explore the ins and outs of the Currency Comparison app, let's begin testing it with Jest, We will begin by installing Jest!

To verify that you've successfully installed Jest, open up the **package.json** file. You should see Jest in the `"devDependencies"` (you may need to close and then re-open the **package.json** file to see the changes).

> Run `npm install jest --save-dev` in the terminal.

Ok so we just downloaded Jest, now it's time to configure the `npm test` command to run the test files in the **__tests__/** directory and output a coverage report.

Make sure that everything has been set up correctly once you're done by running the test command in the terminal. We should see passing tests as well as a coverage report for the provided test file (**currency_comparison.test.js**).

> Edit the `"test"` script in the package.json file to read `"test": "jest __tests__/ --coverage"`. After, run `npm test` in the terminal.

Ok so we just downloaded Jest, now it's time to configure the `npm test` command to run the test files in the `**__tests__/** directory and output a coverage report.

Make sure that everything has been set up correctly once you're done bye running the test command in the terminal. We should see passing tests as well as a coverage report for the provided test file (**currency_comparison.test.js**).

> Edit the `"test"` script in the package.json file to read `"test": "jest __tests__/ --coverage"`. After, run `npm test` in the terminal.

Now that we have everything set up, let's take a look at the **currency_comparison.js** file provided in the **__tests__/** directory. At the top, we've declared a value called `testSalary` which is an instance of the `CurrencyComparison` constructor with a starting salary of `5000`. Each `CurrencyComparison` instance has a number of methods that we'd like to test, and we'll be using this `testSalary` value in all of our tests.

Let's first test the `testSalary.currencyConversion()` function. It accepts two arguments:

* an object of conversion rates between Euros and other currencies
* a string for the currency to convert to

It then returns the exchange rate for USD to that currency rounded to 2 decimal points. You might call it like this:

```javascript
const salary = new CurrencyComparison(5000);
const rates = {
  "MXN": 19.9021,
  "CAD": 1.2121,
  "EUR": .8235
};
const usdToEur = salary.currencyConversion(rates, 'EUR');
console.log(usdToEur); // Prints .82
```

To test this function, let's first create a container for it with `test()`.

> Remember, `test()` accepts a description string, a callback, and an optional timeout. Here's a suggestion for the description:
> ```
> 'Get conversion rate for currency'
> ```

To test this function we'll need test inputs and expected outputs for the "arrange" portion of the test. Copy this code into your test.

```javascript
// arrange
const currencyCode1 = 'CAD'
const expectedValue1 = 1.21
const currencyCode2 = 'EUR'
const expectedValue2 = .82
const rates = {
  "MXN": 19.9021,
  "CAD": 1.2121, 
  "EUR": .8235  
}
```

> Using the arrange, act, and assert model can help keep your test organized. For example, the copied code would go under the "arrange" portion of the test.

Now, with our "arrange" step handled, let's move on to the "act" step. In this step, we call the function that we are testing and store the actual results.

Call the `testSalary.currencyConversion()` function with `rates` and `currencyCode1` and store the result in a new variable called `actualValue1`. Repeat with `currencyCode2` ando store the result in a variable called `actualValue2`.

> The "act" portion of your test may look like this:
> ```javascript
> // act
> const actualValue1 = functionToTest(parameter1, parameter2)
> const actualValue2 = functionToTest(parameter1, parameter2)
> ```

Finally, verify that the actual values from the function call match the expected values using a combination of the `expect()` function and matchers (e.g. `toBe()`). You should have two assertions, one per `actualValueX` and `expectedValueX` that you have.

Once you have added the assertions, don't forget to run the test command in the terminal to make sure that the test passes!

> Note: You should focus on the first test in the output. The second and third tests will automatically pass at this point. You will edit those tests in future tasks.

> Your assertion should look something like this:
>
> ```javascript
> // Assert
> expect(actualValue1).toBe(expectedValue1);
> expect(actualValue2).toBe(expectedValue2);
> ```
> 
> **Solution**
> ```javascript
> test('Get conversion rate for currency', () => {
>   // Arrange
>   const currencyCode1 = 'CAD';
>   const expectedValue1 = 1.21;
>   const currencyCode2 = 'EUR';
>   const expectedValue2 = .82;
> 
>   const rates = {
>     "MXN": 19.9021,
>     "CAD": 1.2121,
>     "EUR": .8235
>   }
> 
>   // Act
>   const actualValue1 = testSalary.currencyConversion(rates, currencyCode1);
>   const actualValue2 = testSalary.currencyConversion(rates, currencyCode2);
> 
>   // Assert
>   expect(actualValue1).toBe(expectedValue1);
>   expect(actualValue2).toBe(expectedValue2);
> });
> ```

Now, we'll give you an opportunity to do this on your own. Let's test the function `testSalary.hourlyPayUSD()`. It accepts a conversion rate and returns the hourly pay in USD converted using that rate. We expect it to behave like this:

```javascript
const salary = new CurrencyComparison(5000);
const rateCAD = 1.21;
const hourlyPayCAD = salary.hourlyPayUSD(rateCAD);
console.log(result); // Prints 20.66
```

Note: the `testSalary` value has already been declared for you at the top of the test file with a starting salary of `50000`.

> To write a test for the `testSalary.hourlyPayUSD` method, you should:
> 
> * Create a container using the `test()` function.
> * Arrange: define test input values and expected output values.
> * Act: call the `testSalary.hourlyPayUSD()` method, passing in the test input value. Store the result in a new variable.
> * Assert: use the `expect().toBe()` assertion and matcher methods to verify that the actual output matches the expected output.
> * Run `npm test` in the terminal. You should see the second test pass!
> 
> **Solution**
> ```javascript
> test('Convert USD salary to hourly CAD pay', () => {
>   // Arrange
>   const exchangeRate = 1.21;
>   const expectedValue = 20.66;
> 
>   // Act
>   const actualValue = testSalary.hourlyPayUSD(exchangeRate);
> 
>   // Assertions
>   expect(actualValue).toBe(expectedValue);
> })
> ```

### Unit tests with Callbacks and Promises

Each instance of `CurrencyComparison` will have a `response()` method that accepts three arguments:

1) A currency code (such as `'EUR'` or `'MXN'`)
2) The exchange rate for that currency (such as 1.21)
3) A callback to handle the `result` data.

The `result` data passed to the callback will be an object containing all relevant data pertaining to the currency comparison> the salary, the hourly pay in USD, and the hourly pay in the provided currency.

You might call it like this:

```javascript
const salary = new CurrencyComparison(5000);
const currencyCode = 'EUR';
const exchangeRate = 1.21;

salary.responde(currencyCode,  exchangeRate, result => {
  console.log(result);
  // Prints
  // {
  //   USD, 25,
  //   EUR: 20.66,
  //   salary: 50000,
  // }
})
```

In the third test, we've already taken care of the "arrange" and "act" steps for testing the `.response()` method.

Add assertions to the test that verify that the `result` data matches the `expectedValue` data. You will need to:

* use the `done` parameter in the `test()` to ensure that the test waits for the callback to be executed.
* use the appropriate matcher method to compare `result` and `expectedValue` which are both objects.

For the best output message, make sure to wrap your assertions in a `try` block.

> Remember to pass `done` as an argument to the callback for `test()`. Additionally, when comparing objects, you should use the `.toEqual()` matcher.
> 
> **Solution**
> ```javascript
> // Act
> testSalary.response(currencyCode, exchangeRate, result => {
>   // Assert
>   try {
>     expect(result).toEqual(expectedValue);
>     done();
>   } catch (error) {
>     done(error);
>   }
> });

A `CurrencyComparison` instance has the method `.fetchCurrencyExchange()`. This function makes an asynchronous API call and returns an array with two items: the `data` object and the REST API `status` code. When the response is successful, the status will be `'200'`. Below you can see the implementation (also found in **country_exchange.js**):

```javascript
const result = await salary.fetchCurrencyExchange();
console.log(result) // Prints: [{ data }, 200]
```

Add assertions to the fourth `test()` to verify that the response array from `.fetchCurrencyExchange()` contains a `'200'` status code in the first index (`[1]`). Remember you will need to modify the `test()` callback to handle asynchronous code.

> Remember that the `test()` callback function should begin with the indicator `async`. Also, the `await` indicator should come before moving on down the call stack.
> 
> In this case, we want to check that `actualResponse[1]` is equal to `'200'`.
>
> **Solution**
> ```javascript
> test("Recieves current currency exhchange data", async () => {
>   // Arrange
>  const expectedValue = 200
> 
>   // Act
>   const actualValue = await testSalary.fetchCurrencyExchange();
> 
>   // Assertions
>   expect(actualValue[1]).toBe(expectedValue);
> });
> ```

### Mocking

Congratulations, you have written a test for each of the functions in **currency_comparison.js**!

However, if you take a look at the **currency_comparison.js** file, the `.fetchCurrentExchange()` method makes a call to a real REST API using the function `fetchData` from the **./utils/fetch-data** file, which is not a good practice. Instead, we should actually be mocking this function.

Let's begin by creating a **__mocks__/** directory inside the **utils/** directory. Then, place an empty file within **__mocks__/** that will mock the **fetch-data.js** file.

> Create a directory inside the **utils/** folder named **__mocks__/**. Within that directory, create a file named **fetch-data.js**.

Now let's populate the newly created file with function called `fetchData`. The function should be mocked using `jest.fin()` and should return the following value:

```javascript
Promise.resolve({ status: "Mock", data: {}})
```

Make sure to export this function as the `default` export.

Your **__mocks__/fetch-data.js** file should declare a function called `fetchData` assigned to `jest.fn()`. Then, pass a callback function to `jest.fn()` that returns the resolved `Promise` listed above. Finally, make sure to export this function as the `default` export.

> **Solution**
> ```javascript
> const fetchData = jest.fn(() => Promise.resolve({ status: "Mock", data: {}}));
> export default fetchData;
> ```

With the mock function created, let's now notify Jest that we will be using the mocked `fetchData` function instead of the real one.

At the top of **currency_comparison.js**, import `fetchData` from `**../utils/fetch-data.js**. Then, tell jest to mock that file.

With this change, the `test()` you last wrote should now fail since the response will hve a status of `"Mock"`. Update the test to expect the value `"Mock"`.

> The top of the **currency_comparison.js** file should contain at least the following two commands:
>
> ```javascript
> import fetchData from '../utils/fetch-data';
> jest.mock('../utils/fetch-data');
> ```

Finally, let's take a look at the final `test()`. Notice that the "arrange", "act", and "assert" steps have been taken care of. However, the est will fail because our mocked `fetchData()` function is always set to return the object `{ status: "Mock", data: {}}`. Instead, it should resolve to the object assigned to `mockResponse`.

Mock response data has been provided in the `mockResponse` variable. Use the appropriate jest function to set `mockResponse` as the resolved value for our mock `fetchData` function.

> Jest provides the `mockedFunction.mockResolvedValueOne()` method. This could be used to determine what will be returned from our mock `fetchData()` function. 
> ```javascript
> fetchData.mockResolvedValueOnce(mockResponse);
> ```

