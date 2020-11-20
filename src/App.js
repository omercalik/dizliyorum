import React from 'react';
//import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Router } from '@reach/router';
import Navbar from './components/layout/Navbar';
import Home from './components/dashboard/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateList from './components/projects/CreateList';
import Profile from './components/profile/Profile';
import { Add } from './components/profile/Lists/Add';
import MyLists from './components/profile/Lists/MyLists';
import { TopList } from './components/profile/Lists/TopList';
import { NowPlaying } from './components/profile/Lists/NowPlaying';
import ListPage from './components/profile/Lists/ListPage';
import Movie from './components/movie/Movie';

//import "./App.css";

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Router>
          <Home exact path="/" />
          <SignIn path="/signin" />
          <SignUp path="/signup" />
          <CreateList path="/create" />
          <Profile path="/profile" />
          <Add path="/add" />
          <MyLists path="/lists" />
          <ListPage path="lists/:title" />
          <TopList path="/toplists" />
          <NowPlaying path="/nowplaying" />
          <Movie path="/:movieId" />
        </Router>
      </div>
    );
  }
}

export default App;
