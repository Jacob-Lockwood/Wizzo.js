> **Important:** This legacy version of Wizzo.js will no longer be continued and has been replaced by [skra-pa-pa/wizzo](https://github.com/skra-pa-pa/wizzo), which includes TypeScript support and is *not* just a weird React alternative.

# Wizzo.js
Little drop-in React-inspired JavaScript framework. Like React without the virtual DOM or transpilation. "Wizzo" is the working title. 
Instead of using JSX, Wizzo uses a tagged template literal syntax to create elements.

This React code:
```js
import ReactDOM from "react-dom";
import { useState } from "react";
function App(props) {
  const [title, setTitle] = useState("Hello!");
  return (
    <div className="app">
      <h1>{title}</h1>
      <p>Hello, {props.name}!</p>
      <input type="text" onBlur={({ target }) => setTitle(target.value)} value={title} />
    </div>
  );
}
ReactDOM.render(<App name="World" />, document.getElementById("root"));
```
Becomes this Wizzo code:
```js
import { component, commonElements } from "wizzo";
const { h1, div, p, input } = commonElements;
const app = component((props, [state, setState]) => 
  div({ className: "app" })`
    ${h1()`${title}`}
    ${p()`Hello, ${props.name}!`}
    ${input({ 
      type: "text", 
      onChange: ({ target }) => setState({ title: target.value }) 
    })``
  `
);
document.getElementById("root").appendChild(app({ name: "World" })``);
```
The "wizzo" NPM package is coming soon.

## Docs

### `element`
The `element` export is a function to create a Wizzo element. It takes in a type of element and returns an element function.
For example, a `div` element can be created like so:
```js
import { element } from "wizzo";
const div = element("div");
```
Now `div` can be used in any Wizzo component:
```js
return (
  div(props)`
    children
  `
);
```
Here, `props` is an object of attributes to pass to the `div`, and the tagged template string is the `div`'s children, and can contain text, other elements, or other components.

Example of a Wizzo element with props and children:
```js
div({ className: "myDiv" })`
  Hello, world!
  ${div({ className: "inner" })`
    This is an inner div.
  `}
`
```
You can even make a container with no tag name, just like `React.Fragment`! This uses `DocumentFragment` internally.
```js
const frag = element("");
// or
const frag = element();
```
Many common elements can be found in the [`commonElements`](#commonElements) export.

### `component`
The `component` export is a function to create a Wizzo component. It takes in a structure function and returns a function similar to a Wizzo element, taking in props as an object and children as a tagged template string.
The structure function takes in a `props` object with a special `children` function returning the children passed to the component, and an array containing a `state` object and a `setState` function.
For example, a simple `welcome` component displaying the word `Hello` and a name from its props could be created like so:
```js
const welcome = component((props) => 
  p({ className: "welcome" })`
    Hello, ${props.name}!
  `
);
```
Now `welcome` can be used in any other Wizzo component or element:
```js
const app = component((props) => 
  div({ className: "app" })`
    ${h1()`My great app`}
    ${welcome({ name: "World" })``}
  `
);
```
A more complex component will likely need to manage state. This is where `state` and `setState` come in.
`state` is just a plain old object. `setState` is a function that takes in either an object containing the new state, or a callback taking in the old state and returning the new state.
Here is an example of a component using state:
```js
const complicated = component((props, [state, setState]) => {
  // initial state
  if (!state.init) setState({ text: props.text, init: true });
  // event handler
  const onChange = ({ target }) => setState({ text: target.value });
  // structure
  return (
    div({ className: "myDiv" })`
      ${input({ type: "text", onChange, value: state.text })}
      ${state.text && p()`You wrote: ${state.text}`}
    `
  );
});
```

### `commonElements`
The `commonElements` export contains element declarations for `a`,`div`,`p`,`main`,`span`,`button`,`input`,`ul`,`li`,`form`,`h1`,`h2`, and `h3`. You can use it like so:
```js
import { commonElements } from "wizzo";
const { div, p, button: btn, main } = commonElements;
```
