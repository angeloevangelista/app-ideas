import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Calculator from './pages/Calculator';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Calculator} />
      </Switch>
    </BrowserRouter>
  );
}