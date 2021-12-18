const templateToArray = (strings, ...values) =>
  values.reduce(
    (array, value, index) => [...array, value, strings[index + 1]],
    [strings[0]]
  );
const element =
  (type) =>
  (props) =>
  (...templateString) => {
    const children = templateToArray(...templateString);
    const ele = type ? document.createElement(type) : new DocumentFragment();
    children.flat().forEach((child) => child && ele.append(child));
    if (type && props)
      Object.entries(props).forEach(([key, value]) => {
        if (key.slice(0, 2) === "on")
          ele.addEventListener(key.slice(2).toLowerCase(), value);
        else ele[key] = value;
      });
    return ele;
  };
const component =
  (structure) =>
  (props) =>
  (...templateString) => {
    let state = {};
    const getNode = () =>
      structure(
        {
          ...props,
          children(ele = element``, props) {
            return ele(props)(...templateString);
          },
        },
        [state, setState]
      );
    let node = getNode();
    function setState(newState) {
      if (typeof newState === "function") state = newState(state);
      else state = newState;
      const newNode = getNode();
      node.replaceWith(newNode);
      node = newNode;
    }
    return node;
  };
const commonElements = 
  ["a", "div", "p", "main", "span", "button", "input", "ul", "li", "form", "h1", "h2", "h3"]
    .reduce((prev, type) => ({ ...prev, [type]: element(type) }), {});
export { element, component, commonElements };
