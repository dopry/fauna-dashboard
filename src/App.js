import React, { Component } from 'react';
import {Router, Route, Redirect, IndexRoute, browserHistory} from 'react-router';
import Container from './Container'
import {IndexInfo} from './Indexes'
import {IndexForm} from './IndexForm'
import {ClassInfo} from './Classes'
import {ClassForm} from './ClassForm'
import {DatabaseInfo} from './Databases'
import {DatabaseForm} from './DatabaseForm'
import './App.css';

const Home = () =>(
  <p>
    Welcome to FaunaDB. Browse and create databases, inspect and define schemas, and query instance data.
  </p>
);

const NotFound = () => (<h1>404.. This page is not found!</h1>);

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/db' component={Container}>
          <IndexRoute component={Home} />
          <Route path='/databases' component={DatabaseForm} />
          <Route path='/**/databases' component={DatabaseForm} />
          <Route path='/**/info' component={DatabaseInfo} />

          <Route path='/classes' component={ClassForm}/>
          <Route path='/classes/:name' component={ClassInfo}/>
          <Route path='/**/classes' component={ClassForm}/>
          <Route path='/**/classes/:name' component={ClassInfo}/>

          <Route path='/indexes' component={IndexForm}/>
          <Route path='/indexes/:name' component={IndexInfo}/>
          <Route path='/**/indexes' component={IndexForm}/>
          <Route path='/**/indexes/:name' component={IndexInfo}/>

          <Route path='*' component={NotFound} />
        </Route>
        <Redirect from="/" to="/db" />
      </Router>
    );
  }
}

export default App;
