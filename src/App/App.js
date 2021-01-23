import React, { useContext } from 'react'
import './App.css';
import Layout from '../components/Layout/Layout'
import Login from '../components/Login/Login'
import { UserContext } from '../global/globalContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const { userInfo } = useContext(UserContext)
  return (
    <div className="app">
      {
        !userInfo.name ? (
          <Login />
        ) : (

            <Router>
              <Switch>
                <Route path='/' exact>
                  <Layout />
                </Route>
                <Route path='/:id' exact>
                  <Layout />
                </Route>
              </Switch>
            </Router>
          )
      }
    </div>
  );
}

export default App;
