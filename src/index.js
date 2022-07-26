/*
My first steps in React.js
===============================
This is, in fact, a three app:
= Todo list with 'useReducer' hook (inspired by https://www.robinwieruch.de/react-usereducer-hook/)
= News list with 'Hacker News API' and 'axios' lib (inspired by https://www.robinwieruch.de/react-hooks-fetch-data/)
= React 'Tic-Tack-Toe' game from official React tutorial (https://reactjs.org/)
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Todo } from './todo/Todo.js';
import { News } from './news/News.js';
import { Game } from './tic-toc/TicToc.js'

  const App = () => {
    return (
      <>
        <Todo />
        <News />
        <Game />
      </>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
  
  