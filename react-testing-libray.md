# React Testing Library

## What is React Testing Library?

In this lesson, you will learn how to test your React components with the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). React Testing Library is a UI-Layer testing framework that helps us ensure that our React components are rendering and behaving properly.

The main advantages of RTL over other UI-layer testing frameworks are:

* It is built explicitly for testing React components.
* It allows us to test our components in a way that mimics real user interactions.

The logic behind this is that a user will not care about the implementation details of a React component such as the component's state, the props passed to it, etc. The user will only care about whether they are able to use the app. We should test our application with these same motivations.

Before we jump into the lesson, let's take a quick look at an example that shows off the power and elegance of the React Testing Library.

> Note: this lesson assumes that you have a basic understanding of the [Jest](https://jestjs.io/docs/getting-started) testing framework.

Take a moment to observe the code sample below. It shows a GroceryList component with a few items. You can click on the checkboxes to mark that you've added one of these items to your cart. You can see the code for this component in the file `GroceryList.js`.

```javascript
const GroceryList = () => {
  return (
      <div>
        <h1>Grocery List</h1>
        <ul>
          <li>
            <label htmlFor="item1">Apples</label>
            <input type="checkbox" id="item1" />
          </li>
          <li>
            <label htmlFor="item2">Milk</label>
            <input type="checkbox" id="item2" />
          </li>
          <li>
            <label htmlFor="item3">Cereal</label>
            <input type="checkbox" id="item3" />
          </li>
        </ul>
      </div>
  )
};

export default GroceryList;
```

Next, let's look at a unit test using RTL. Observe how it mimics a user clicking the first checkbox:

```javascript
import { render, clearScreenDown, cleanup } from '@testing-library/react';
import GroceryList from './components/GroceryList';
import userEvent from '@testing-library/user-event';

test('should mark the first checkbox as checked', () => {
  // render the grocery list
  render(<GroceryList />);
  // grab the apple item
  const appleItem = screen.getByLabelText('Apples');
  // simulate a "click" on the apple checkbox
  userEvent.click(appleItem);
  // assert that the apple checkbox was checked
  expect(appleItem).toBeChecked();
});
```

Can you see how we are able to test the `GroceryList` component without knowing any of its implementation details? This is what makes RTL so powerful. We can test our React components as if we are real user and not worry about the specific logic that went behind coding them.

Don't worry if you cannot understand every single line of the code snippet above. In the upcoming exercises, we will cover RTL so that you can understand everything that's going on.

#### Instructions

For this lesson, we will be using the project called Passing Thoughts from to [Learn React](https://www.codecademy.com/courses/react-101/projects/react-hooks-passing-thoughts) course for all of our exercises. This is a React app that allows you to fill out a simple input form and post a "thought". Once the thought is posted, it will disappear after 15 seconds.

Before jumping into the lesson, play around with the App in your browser and explore its components in yur code editor. In this lesson, we will explore how we can test the features of this application from the user perspective including:

* verifying that components are present at the start of the program
* mimicking user interactions
* verifying that components have changed after the user interacts with the program
* verifying the presence of components that render asynchronously
* verifying the behavior of components that make API calls

#### Concept Review

Want to quickly review some concepts you've been learning? Take a look at this material's [cheatsheet](https://www.codecademy.com/learn/learn-react-testing/modules/react-testing-library/cheatsheet)!

### Setting up React Testing Library

In order to use React Testing Library, we will need to include the `@testing-library/react` package in our project by using npm lik so:

```bash
npm install @testing-library/react --save-dev
```

Once we have added `@testing-library/react` to our project, we can import the two essential values, `render` and `screen`, into our tests.

* `render()` is a function that we can use to virtually render components and make them available in our unit tests. Similar to `ReactDOM.render()`, RTL's `render()` function takes in JSX as an argument.
* `screen` is a special object which can be thought of as a representation of the browser window. We can make sure that our virtually rendered components are available in the test by using the `screen.debug()` method which prints out all the DOM contents.

The `screen` object has a few other methods that we'll cover in the upcoming exercises but for now, let's look at an example.

Look at the code snippet below, it shows the output of a unit test that prints out the DOM contents of the `Greeting` component.

```javascript
import { render, screen } from '@testing-library/react';

const Greeting = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

test("should prints out the contents of the DOM", () => {
  render(<Greeting />);
  screen.debug();
});
```

After importing the `render` and `screen` values from `@testing-library/react`, a test is created using the `test()` function from the [Jest testing framework](https://jestjs.io/docs/getting-started). Inside, the `<Greeting>` component is virtually rendered and then the resulting virtual DOM is printed via the `screen.debug()` method.

Notice how the output shows the rendered contents of `<Greeting>` (an `<h1>` element) and not the component itself. As was mentioned in the first exercise, React Testing Library strives to produce a testing environment that is as close to the user's experience as possible.

#### Instructions

Install `@testing-library/react`.

To verify that you have successfully added the package to your project, navigate to **package.json** and check that `'@testing-library/react'` appears in the `'devDependencies'` array.

> Use `npm install package-name --save-dev` to add the package to your project.

In Thought.test.js import `render()` and `screen` from `@testing-library/react`.

> Your syntax should look something like this:
> ```javascript
> import { render, screen } from '@testing-library/react';
> ```

Now, let's try rendering the `<Thought>` component in our test.

Inside the provided `test()` in `Thought.test.js` call the `render()` function and pass in the `<Thought />` component. The `<Thought /> component expects 2 props:

1) `thought`: use the provided `thought` object.
2) `removeThought`: pass an empty function `() => {}`

### Querying with RTL

Now that we know how to set up RTL, we can finally start testing our React components. To do so, we first have to query for and extract the DOM nodes from our virtually rendered components. Then, we can check and see if the extracted DOM nodes were rendered as expected. Fortunately for us, RTL has many built-in query methods that greatly simplify this process. In this exercise, we will cover the `.getByX` query methods.

There are a number of `.getByX` query methods to choose from, and they are all accessible as methods on the `screen` object. Look at the example below, the `.getByTest()` method is used to extract a DOM element with text that matches a specified string.

```javascript
import { render, screen } from '@testing-library/react';

const Button = () => {
  return (
    <button type="submit">Submit</button>
  );
};

test('A "Submit" button is rendered', () => {
  // Rende the Button component
  render(<Button />);
  
  // Extract the <button>Submit</button> node
  const button = screen.getByText('Submit');
});
```

Similarly, another method is `.getByRole()` that allows us to extract a DOM node by its role type. Look at the example below, it shows us another way we can query for the `<button>` element using `.getByRole()`.

```javascript
import { render, screen } from '@testing-library/react';

const Button = () => {
  return (
    <button type="submit" disabled>Submit</button>
  );
};

test('extracts the button DOM node', () => {
  // Rende the Button component
  render(<Button />);
  
  // Extract the <button>Submit</button> node
  const button = screen.getByRole('button');
});
```

RTL has a bunch of these `.getByX` methods, but instead of memorizing them all, it is best to look at the [docs](https://testing-library.com/docs/queries/about/) to find the one that best suits your needs.

Now that we know how to query DOM nodes, we can test them using [Jest assertions](https://jestjs.io/docs/expect). Recall that in the first exercise we saw the assertion `expect.toBeChecked()`. This isn't part of the regular set of Jest matchers, but instead is an extension provided by the `testing-library/jest-dom` library.

You can install this library using the command `npm install testing-library/jest-dom --save-dev`. The entire library can then be imported into our test file like so:

```javascript
import '@testing-library/jest-dom';
```

Here is an example of the `expect.toBeDisabled()` matcher being used to test a DOM node extracted with the `screen.getByRole()` method.

```javascript
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const Button = () => {
  return (
    <button type="submit" disabled>Submit</button>
  );
};

test('should show the button as disabled', () => {
  // Render Button Component
    render(<Button />);
    
    // Extact <button>Submit</button> node
  const button = screen.getByRole('button');
  
  // Assert button is disabled
  expect(button).toBeDisabled();
})
```

Once again, there are many jest matchers. In this lesson we'll get a chance to see a number of the most common ones, however, instead of memorizing all of them, it is best to just follow the [`jest-dom` docs](https://github.com/testing-library/jest-dom).

#### Instructions

Let's start making assertions on the Passing Thoughts application.

First, install the `@testing-library/jest-dom` library as a developer dependency.

In `Tought.test.js` import the `@testing-library/jest-dom` library.

Let's start by confirming that the stating header element with the text "Passing Thoughts" is rendered when the `App` component is rendered. First, we'll grab the element using query methods.

In the first test of the `Tought.test.js` file bellow the call to `render(<App />)`:

* Use the `.getByText()` method from the `screen` object to extract the header node of the `App` component.
* Assign the return node to a variable called `header`.

Within the first test, call the `expect().toHaveTextContent()` assertion to confirm that the header node does indeed contain the text "Passing Thoughts".

Now, let's write some tests for the `Thoght` component which gets rendered each time the user writes down a new thought. Take a look at app rendered in the browser and try adding a new thought. Notice that an 'x' button gets rendered for removing that thought. Let's confirm that this 'x' button gets rendered using the `.getByRole()` query method.

In the second test of the `Thought.test.js` file, below the call to `render(<Thought... />)`:

* Use the `.getByRole()` method from `screen` to extract the button node of the `Thought` component.
* Assign the button node to a variable named `button`.

Now, we could just test to see if the button was rendered using the `expect().toBeInTheDocument()` matcher, but for the sake of variety, let's test to see if the button is "enabled".

Use the [docs](https://github.com/testing-library/jest-dom#custom-matchers) to find the appropriate jest assertion for this. Then, below your query for the button node, use a jest assertion to check if the button is enabled.

Your code should be something like this:

```javascript
expect(node).toBeEnabled();
```

Well done! Let's run our tests and confirm that our application is working properly. Run `npm test` in your terminal, and you should see two passing tests!

(Optional) To see what happens when the tests fail, try changing a few things:

* In the first test, change your `expect().toHaveTextContent` assertion to "Hello World".
* In the second test, change your `expect().toBeEnabled` assertion to `expect().toBeDisabled`.

### Different Query Methods

Now that we know how to perform queries with `.getByX` methods, it is time for us to move on to the other query method variants. RTL has two other categories of query methods called `.queryByX` and `.findByX`.

Look at the code below. It shows the code for a simple component that renders a header with the text `'Hello World'` and then changes the text to `'Goodbye!'` 500ms after the user clicks a button. We will be using this `App` component to demonstrate the different query types.

```javascript
import { useState } from 'react';
 const App = () => {
   const [text, setText] = useState('Hello World');
   
   // Chamges header text after interval of 500ms
   const handleClick = () => {
     setTimeout(() => {
       setText('Goodbye!');
     }, 500);
   };
   
   return (
       <div>
         <h1>{text}</h1>
         <button onClick={handleClick}>Click Me</button>
     </div>
   );
 };
 
 export default App;
```

Let's start with the `.queryByX` variants. The `.queryByX` methods return `null` if they don't find a DOM node, unlike the `.getByX` methods which throw an error and immediately cause the test to fail. This is useful when asserting that an element is NOT present in the DOM.

In this example, we want to confirm that the `header` does not (yet) contain the text `'Goodbye!'`.

```javascript
import App from './components/App';
import { render, screen } from '@testing-library/react';

test('Header should not show Goodbye yet', () => {
  // Render App
  render(<App />);
  
  // Attempt to extract header element
  const header = screen.queryByText('Goodbye!');
  
  // Assert null as we have not clicked the button
    expect(header).toBeNull();
});
```

By using the `.queryByText()` variant when there is no element with the text `'Goodbye!'`, the value `null` is returned, and we can successfully validate this with `expect(header).toBeNull()`. If the `.getByText()` method were used instead, the test would fail immediately due to the error rather than continuing on to the `expect()` assertion.

Next, let's discuss the `.findByX` variants. The `.findByX` methods are used to query for asynchronous elements which will eventually appear in the DOM. For example, if the user is waiting for the result of an API call to resolve before data is displayed. The `.findByX` methods work by returning a Promise which resolves when the queried element renders in the DOM. As such, the `async`/`await` keywords can be user to enable asynchronous logic.

In this example, we want to confirm what the `header` will display the text `'Goodbye!'` after the button is clicked. This example use the `userEvent` library, which will be covered in depth in the next exercise, to simulate clicking on the button.

```javascript
import App from './components/App';
import { render, screen } from '@testing-library/react';

test('should show text content as Goodbye', async () => {
  // Render App
  render(<App />);
  
  // Extract button node
  const button = screen.getByRole('button');
  
  // Click button
  userEvent.click(button);
  
  // Wait for the text 'Goodbye!' to appear
  const header = await screen.findByText('Goodbye!');
  
  // Assert header to exist in the DOM
    expect(header).toBeInTheDocument();
});
```

In  the example above we use `.findByText()` since the `'Goodbye!'` message does not render immediately. This is because our `handleClick()` function changes the text after an interval of 500ms. So, we have to wait a bit before the new text is rendered in the DOM.

Observe the `async` and `await` keywords in the example above. Remember that `findBy` methods return a Promise and thus the callback function that carries out the unit test must be identified as `async` while the `screen.findByText()` method mus be preceded by `await`.

#### Instructions

Suppose we with to post a new thought with the text content `'Oreos are delicious'`. Before we do that though, we want to make sure that this thought isn't already in our list of thoughts.

In the first test of **Thought.test.js** use the `.queryByText()` method and search for a thought with the text content `'Oreos are delicious'`. Assign the result of the query to a variable called `emptyThought`.

In the first test of **Thought.test.js** use an appropriate assertion to check if the result of your query is `null`.

The second test of the **Thought.test.js** file mimics a user posting a thought with the text content `'Oreos are delicious'` using the `userEvent` library (we'll cover how you can do this in the next exercise!).

Below, we use the `.getByText()` method to assert that the thought is present in the DOM. However, since the thought is getting posted asynchronously, `.getByText()` is unable to retrieve it and the test is failing (confirm for yourself by running `npm test`).

Replace the `.getByText()` method with a call to the appropriate query variant such the test waits for the element with the text `'Oreos are delicious'` to appear.

### Mimicking User Interactions

So far we've learned how to query and extract the different DOM nodes from our React components. Now, it's time for us to learn how to mimic user interactions e.g. clicking a checkbox, typing text, etc. Once again, this entire process has been made easier for us with the help of another library in the `!@testing-library` suite: `@testing-library/user-event`.

The library can be installed with the command below:

```bash
npm install @testing-library/user-event --save-dev
```

The library exports a single object, `userEvent`, that can imported in a test file like so:

```javascript
import userEvent from '@testing-library/user-event';
```

The `userEvent` object contains many built-in methods that allow us to mimic user interactions. Typically, they follow the same syntax pattern:

```javascript
userEvent.interactionType(nodeToInteractWith);
```

Here is an example where we mimic a user filling a text box. Note that in this case, a second argument is provided as the text to be typed into the box.

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

const GreetingForm = () => {
  return (
    <form>
      <label htmlFor="greeting">Greeting</label>
      <input id="greeting" type="text" />
      <input type="submit" value="Submit" />
    </form>
  );
};

test('should show text content as Hey Mack!', () => {
    // Render the component to test
    render(<GreetingForm />);

    // Extract the textbox component
    const textbox = screen.getByRole('textbox');

    // Simulate typing 'Hey Mack!'
    userEvent.type(textbox, 'Hey Mack!');

    // Asssert textbox has text content 'Hey Mack!'
    expect(textbox).toHaveValue('Hey Mack!');
});
```

In the example above, the `userEvent.type()` method is used which accepts a DOM node to interact with (`textbox`) and a string to type into that node (`'Hey Mack!'`).

The `userEvent` object has methods for [simulating clicks](https://testing-library.com/docs/ecosystem-user-event/#clickelement-eventinit-options) (`userEvent.click()`),[hovering](https://testing-library.com/docs/ecosystem-user-event/#hoverelement), and much more. Once again, instead of memorizing all of these, it is recommended that you read the [docs](https://github.com/testing-library/user-event) to find the method best suited for your needs. 

#### Instructions

Let's now `userEvent` to mimic user interactions in our tests for Passing Thoughts.

First, install `@testing-library/user-event` as a developer dependency.

> Use `npm install package-name@version --save-dev` to add the package to your project.

In **Thought.test.js** import `userEvent` fom `@testing-library/user-event`.

In the first test of **Thought.test.js**, we would like to remove the taught with the text `'This is a place for your passing thoughts'` that is added as the first thought when the application first renders (refresh the browser to see it).

We've started this test for you:

1) We render the `App` component
2) We then gram the first `'x'` button
3) Finally, later in the test, we check to see if that element is null

This test will fail unless we mimic clicking on the `button` in between steps 2 and 3 (verify this by running `npm test`).

Use a method from the `userEvent` object to mimic a user pressing the retrieved `button` so that the final `expect()` assertion passes. Then, run `npm test` to see that the first test now passes!

In the second test of **Thought.test.js** file we'd like to mimic adding a new thought. We've started this test for you:

1) At the top of the test, we render `App`.
2) Then we grab the `input` element where a user can type the thought and the `submit` button to add the thought.
3) At the end of the test we assert that a thought with the text `'Did I gorget my keys?'` was added to the DOM.

This test will fail unless we mimic typing into the `input` and clicking the `submit` button in between steps 2 and 3.

First, use a method from the `userEvent` object to mimic a user typing into this `input` element with the text `'Did I forget my keys?'`.

Now that we've mimicked a user typing `'Did I forget my keys?'`, it's time for us to post this thought by clicking the `submit` button. In the second test of Thought.test.js, simulate a user clicking the `submit` button by using a method from the `userEvent` object.

### The waitFor() method

In the previous exercise we've learned about the `.findByX` query methods that allows us to test components that render asynchronously. But what about components that disappear asynchronously?

Look at the example below. We have a component that displays a header. This header is removed after 250ms when the button "Remove Header" is clicked.

```javascript
// file: header.js
export const Header = () => {
  const handleClick = () => {
    setTimeout(() => {
      document.querySelector('h1').remove();
    }, 250);
  };
  
  return (
    <div>
      <h1>Hey Everybody</h1>
      <button onClick={handleClick}>Remove Header</button>
    </div>
  );
}
```

How would you test that the header is removed? Using `screen.findByX()` methods won't work because there won't be an element to query for once it's removed! Using only `screen.queryByX()` methods won't work either as the component is removed asynchronously.

Fortunately, RTL provides another function that can be used for asynchronous testing that will be perfect for this scenario - the `waitFor()` function. In order to use this function, we need to import it from `@testing-library/react`:

```javascript
import { waitFor } from '@testing-library/react';
```

As with the other async function, the `waitFor()` function returns a Promise, so we have to preface its call with the `await` keyword. It takes a callback function as an argument where we can make asynchronous calls, perform queries, and/or run assertions.

```javascript
await waitFor(() => {
  expect(someAsyncMethod).toHaveBeenCalled();
  const someAsyncNode = screen.getByText('hello world');
  expect(someAsyncNode).toBeInTheDocument();
})
```

Now, let's get back to the example. To test that a component disappears asynchronously, we can combine the `waitFor()` function with `.queryByX()` methods:

```javascript
import { waitFor, react, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Header } from './header';

test('should remove heade display', async () => {
  // Render Header
  render(<Header />);
  
  // Extract button node
  const button = screen.getByRole('button');
  
  // Click button
  userEvent.click(button);
  
  // Wait fot the element to be removed
  await waitFor(() => {
    const header = screen.queryByText('Hey Everybody');
    expect(header).toBeNull();
  });
});
```

In our unit test, the header will be removed 250ms after the button has been clicked. The callback function inside `waitFor()` confirms this by querying for this element and then waiting for the `expect()` assertion to pass.

The `waitFor()` method can also optionally accept an `options` object as a second argument. This object can be used to control how long to wait for before aborting and much more. Thought the details of this `options` object are beyond the scope of the lesson, you can read more about it in the [docs](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor).

#### Instructions

In the provided test in the **Thought.test.js** file, there is code that mimics a user posting a thought with the text content `'I have to call my mom.'`. The test then attempts to test that the thought will eventually disappear, however it fails! Let's introduce the `waitFor()` function to fix this test.

In **Thought.test.js**, import `waitFor` from `@testing-library/react`.

Use `waitFor()` to assert that this thought will eventually be removed from the DOM. Your callback should be written using arrow-function syntax.

> Since we are checking for something to *eventually* be removed, we will use the `expect(node).toBeNull()` assertion and a `screen.queryByX()` method to query for the `node`. Wrapping this in a `waitFor()` allows us to wait for the node to be removed.
> 
> ```javascript
> await waitFor(() => {
>   const thought = screen.queryByText('I have to call my mom.');
>   expect(thought).toBeNull();
> });
> ```

### Review

Good job! We can now use React Testing Library (RTL) to test our React components. Let's quickly review what we've learned so far:

* React Testing Library allows us to test React components by mimicking real user interactions.
* In order to make your component available in the unit test, we have to use the `render()` function. We can check to see the available components in our rendered DOM by using the `screen.debug()` method. `screen` is a special object that can be thought of as a representation of the browser window.
* RTL has bvuilt in query methods (`.getByX`, `findByX`, `queryByX`) that allows us to extract the DOM nodes from your components. We can use these query methods by using the `screen` object e.g. `screen.getByText()`.
* We can test the behavior of these extracted nodes by using the jest matchers provided by the `@testing-library/jest-dom` library. E.g. `expect().toBeChecked().
* We can mimic user interactions by using methods provided by the `testing-library/user-event` library. An example method is `userEvent.click()`.
* Besides `.findByX`, RTL has the `waitFor()` asynchronous function that can be used to test asynchronous events such as an element being removed asynchronously or a component making an API call.

Want to learn more about testing your React components? Check out the article(s) below!

[Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
