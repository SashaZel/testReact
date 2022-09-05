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
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './index.css';
import { App } from './app/App';
import { Todo } from './todo/Todo.js';
import { News } from './news/News.js';
import { Game } from './tic-toc/TicToc.js';
import { Search } from './search/Search.js';
import { Details } from './details/Details';
import { NotFound } from './not-found/notFound';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/search" element={<Search />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/news" element={<News />} />
        <Route path="/game" element={<Game />} />
        <Route path="/details" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

