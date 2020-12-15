import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => {
  const [user, setUser] = useState(null);
  // const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [description, setDescription] = useState("这个用户很懒，他什么也没有说");
  const [userType, setUserType] = useState(1);
  const [identityType, setIdentityType] = useState(null);
  const [identityNum, setIdentityNum] = useState(null);
  const [level, setLevel] = useState(1);
  const [city, setCity] = useState(null);
  const [isLogIn, setIsLogIn] = useState(false);

  const userLogIn = (userinfo) => {
    setUser(userinfo.name);
    setPhone(userinfo.phone_num);
    setDescription(userinfo.description);
    setUserType(userinfo.user_type);
    setIdentityType(userinfo.identity_type);
    setIdentityNum(userinfo.identity_num);
    setLevel(userinfo.level);
    setCity(userinfo.city);
    setIsLogIn(true);
  };

  const userVars = {
    user, setUser, phone, setPhone, description, setDescription, userType, setUserType, identityType, setIdentityType, identityNum, setIdentityNum, level, setLevel, city, setCity, isLogIn, setIsLogIn, userLogIn
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home userVars={userVars} />
          </Route>
          <Route exact path="/signin">
            <SignIn userVars={userVars} />
          </Route>
          <Route exact path="/signup">
            <SignUp userVars={userVars} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
};

export default App;
