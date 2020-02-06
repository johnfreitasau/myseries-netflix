import React from 'react';
import Header from './Header';

import Genres from './Genres';
import NewGenre from './NewGenre';
import EditGenre from './EditGenre';

import Series from './Series'
import NewSeries from './NewSeries';
import EditSeries from './EditSeries';
import InfoSeries from './InfoSeries';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const Home = () => {
  return (
    <h1>Home</h1>
  );
}

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          {/* Genders */}
          <Route path='/' exact component={ Home } />
          <Route path='/genres' exact component={ Genres } />
          <Route path='/genres/new' exact component={ NewGenre } />
          <Route path='/genres/:id' exact component={ EditGenre } />
          
          {/* Series */}
          <Route path='/series' exact component={ Series } />
          <Route path='/series/new' exact component={ NewSeries } />
          <Route path='/series/:id' exact component={ EditSeries } />
          <Route path='/series/info/:id' exact component={ InfoSeries } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
