import { createRoot } from 'react-dom/client'
import { jsx as _jsx } from 'react/jsx-runtime'
import App from './App.jsx'
import React from 'react'

// const ReactElement = {
//   type: "a",
//   props: {
//     href: "https://google.com",
//     target: "_blank",
//   },
//   children: "Click me to visit google",
// };

// const anotherElement = (
//     <a href="https://google.com">Click me to visit google</a>
// )

// let user = 'sherry'

// const reactElement = React.createElement(
//     'h1',
//     {target:'_blank'},
//     'hello ',
//     user
// )


createRoot(document.getElementById('root')).render(
    <App />
)
