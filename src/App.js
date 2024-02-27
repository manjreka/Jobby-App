import {Switch, Redirect, Route} from 'react-router-dom'

import Jobs from './components/Jobs'
import Login from './components/Login'
import Home from './components/Home'
import JobDetails from './components/jobDetails'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/login" component={Login} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
