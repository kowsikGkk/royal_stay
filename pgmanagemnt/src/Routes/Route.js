import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import ResetPwd from './ResetPwd/ResetPwd';
import Register from './Register/Register';
import Surf from './Dashboard/Surf/Surf';
import Home from './Home';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/surf" component={Surf} />
      <Route path="/reset-password/:code" component={ResetPwd} />
      <Route path="/register/:code" component={Register} />
    </Switch>
  </div>
);
export default Main;
