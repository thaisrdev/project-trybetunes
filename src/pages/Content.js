import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import Login from './Login';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import NotFound from './NotFound';

class Content extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/album/:id">
            <Album />
          </Route>

          <Route path="/favorites">
            <Favorites />
          </Route>

          <Route exact path="/profile">
            <Profile />
          </Route>

          <Route exact path="/profile/edit">
            <ProfileEdit />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default Content;
