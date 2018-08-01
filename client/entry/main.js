import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from 'pages/home/containers/Home';
import Blog from 'pages/blog/containers/Blog';

const Entry = () => (
  <Router>
    <div>
      <Redirect from="/" to="/home" />
      <Route exact path="/home" component={Home} />
      <Route exact path="/blog" component={Blog} />
    </div>
  </Router>
);

ReactDOM.render(<Entry />, document.getElementById('app'));