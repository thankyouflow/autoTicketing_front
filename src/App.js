import React from 'react';
import './App.css';
import Login from './Login';
import Ticketing from './Ticketing';
import { Route, Switch } from 'react-router-dom';
import ErrorCatch from './ErrorCatch';


function App() {

  return (
    <div className="App">
        <ErrorCatch>
        <Route exact path="/" component={Login}/>
        </ErrorCatch>
        <Switch>
            <Route path="/ticketing" component={Ticketing}/>
        </Switch>

    </div>
  );
}

export default App;
