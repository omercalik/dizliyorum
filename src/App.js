import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/dashboard/Home';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateList from './components/projects/CreateList';
import Profile from './components/profile/Profile';
import { Add } from './components/profile/Lists/Add';
import MyLists from './components/profile/Lists/MyLists';
import { TopList } from './components/profile/Lists/TopList';
import { NowPlaying } from './components/profile/Lists/NowPlaying';
import { List } from './components/profile/Lists/List';

//import "./App.css";

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={CreateList} />
            <Route path="/profile" component={Profile} />
            <Route path="/add" component={Add} />
            <Route path="/lists" component={MyLists} />
            <Route path="/list/:title" component={List} />
            <Route path="/toplists" component={TopList} />
            <Route path="/nowplaying" component={NowPlaying} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
