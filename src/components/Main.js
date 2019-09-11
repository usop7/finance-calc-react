import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Loan from './Loan'
import Mortgage from './Mortgage'
import Savings from './Savings'

const Main = () => (
  <main className="container">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/mortgage' component={Mortgage}/>
      <Route path='/loan' component={Loan}/>
      <Route path='/savings' component={Savings}/>
    </Switch>
  </main>
)

export default Main
