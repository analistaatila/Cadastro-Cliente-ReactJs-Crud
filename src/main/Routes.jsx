import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import Funcionarios from '../components/funcionarios/Funcionarios'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/Funcionarios' component={Funcionarios} />
        <Redirect from='*' to='/' />
    </Switch>