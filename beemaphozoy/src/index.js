import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const data = [
  {
    id: 1,
    name: "Matti",
    status: "Sponsor",
    latitude: 62.24,
    longitude: 25.72,
  },
  {
    id: 2,
    status: "Sponsor",
    name: "Jukka",
    latitude: 62.26,
    longitude: 25.75,
  },
  {
    id: 3,
    status: "Bee-friend",
    name: "Tiina",
    latitude: 62.28,
    longitude: 25.69,
  }
]

ReactDOM.render(
  <React.StrictMode>
    <App data={data}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();