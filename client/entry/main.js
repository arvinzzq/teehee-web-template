import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from 'pages/home/containers/Home';
import Blog from 'pages/blog/containers/Blog';

const Entry = () => (
  <Router>
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/blog" component={Blog} />
      <Redirect from="/" to="/home" />
    </Switch>
  </Router>
);

ReactDOM.render(<Entry />, document.getElementById('app'));