import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from '../components/NavBar';

import Home from './home';
import Display from './display';
import Upload from './upload';
import Instructions from './instructions';

const App = () => (
  <div>
    <NavBar links={[{ text: 'home', path: '/' }, { text: 'instructions', path: '/instructions' }, { text: 'start designing', path: '/upload' }]} />
    <Route exact path="/" component={Home} />
    <Route exact path="/upload" component={Upload} />
    <Route exact path="/instructions" component={Instructions} />
  </div>
);

export default App;
