const customRender = (reactElement, containr) => {
  // domElement.setAttribute('href', reactElement.props.href)
  // domElement.setAttribute('target', reactElement.props.target)
  // containr.appendChild(domElement)

  const domElement = document.createElement(reactElement.type);
  domElement.innerHTML = reactElement.Children;

  for (const props in reactElement.props) {
    if (props === 'children') continue;
    domElement.setAttribute(props, reactElement.props[props]);
  }
  containr.appendChild(domElement)
};

const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "Click me to visit google",
};
const mainContainer = document.getElementById("root");

customRender(reactElement, mainContainer);
