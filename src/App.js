import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import { Header } from "./components/Header";
import { Watchlist } from "./components/Watchlist";
import { Watched } from "./components/Watched";
import { Add } from "./components/Add";
import "./App.css";
import { GlobalProvider } from "./context/GlobalState";
import "./font-awesome/css/all.min.css";
import Anasayfa from './components/dashboard/Anasayfa';
// eslint-disable-next-line react/prefer-stateless-function
function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Watchlist />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/watched">
            <Watched />
          </Route>
          <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={CreateProject} />
            <Route path="/anasayfa" component={Anasayfa} />
            <Route exact path="/watchlist">
            <Watchlist />
          </Route>
          <Route path="/addmovie">
            <Add />
          </Route>
          <Route path="/watchedlist">
            <Watched />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;


// <Switch>
//             
//           </Switch>