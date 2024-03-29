import React from 'react';
import { Router } from '@reach/router';
import Navbar from './components/layout/Navbar';
import Home from './components/dashboard/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateList from './components/profile/Lists/CreateList';
import Profile from './components/profile/Profile';
import Game from './components/game/Game';
import GameHome from './components/game/GameHome';
import MyLists from './components/profile/Lists/MyLists';
import { TopList } from './components/profile/Lists/TopList';

import ListPage from './components/profile/Lists/ListPage';
import Movie from './components/movie/Movie';
import TV from './components/tv_serial/TV';
import TVDetailPage from './components/tv_serial/TVDetailPage';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import YorumProfile from './components/profile/yorumProfile';
import UserLists from './components/profile/Lists/UserLists';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Router>
          <HomePage exact path="/" />
          <SignIn path="/signin" />
          <SignUp path="/signup" />
          <CreateList path="/create" />
          <Profile path="/profile" />
          <YorumProfile path="/profileYorum" />
          <MyLists path="/lists" />
          <ListPage path="lists/:title" />
          <TopList path="/toplists" />
          <Home path="/movies" />
          <Movie path="/:movieId" />
          <TV path="/tvserials" />
          <TVDetailPage path="/tvserials/:TVId" />
          <GameHome path="/oyun" />
          <Game path="/oyun/:gameSlug" />
          <UserLists path="/userlists" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
