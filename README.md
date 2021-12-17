# Wizzo.js
Little drop-in React-inspired JavaScript framework. Like React without the virtual dom or transpilation. "Wizzo" is the working title. 
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
import { component, element } from "wizzo";
const div = element("div"),
  h1 = element("h1"),
  p = element("p"),
  inp = element("input");
const app = component((props, [state, setState]) => 
  div({ className: "app" })`
    ${h1()`${title}`}
    ${p()`Hello, ${props.name}!`}
    ${inp({ 
      type: "text", 
      onChange: ({ target }) => setState({ title: target.value }) 
    })``
  `
);
document.getElementById("root").appendChild(app({ name: "World" })``);
```
The "wizzo" NPM package is coming soon.
