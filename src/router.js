import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/home/index";
import Search from "./pages/search/index";
const PrimaryLayout = () => (
  <div className="primary-layout">
    <main>
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </main>
  </div>
);

export default PrimaryLayout;