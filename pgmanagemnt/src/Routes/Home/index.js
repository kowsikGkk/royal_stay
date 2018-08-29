import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Front from '../FrontPage/Front';

const Home = ({ userInfo }) => (
  <div>
    <Switch>
      <Route path = '/' exact component = {Front} />
    </Switch>
  </div>
);

export default Home;
