import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';
<<<<<<< HEAD
import Login from './Login';
=======
import SignIn from './SignIn';
import SignUp from './SignUp';
>>>>>>> 04e82073b0f4e53cdb947c45d27efa10f4a27117

const App = () => {
  const [user, setUser] = useState(null);
  // const [password, setPassword] = useState(null);
<<<<<<< HEAD
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLogIn, setIsLogIn] = useState(false);

  const userVars = {
    user, setUser, email, setEmail, phone, setPhone, userType, setUserType, isLogIn, setIsLogIn
=======
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
>>>>>>> 04e82073b0f4e53cdb947c45d27efa10f4a27117
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home userVars={userVars} />
          </Route>
<<<<<<< HEAD
          <Route exact path="/login">
            <Login userVars={userVars} />
=======
          <Route exact path="/signin">
            <SignIn userVars={userVars} />
          </Route>
          <Route exact path="/signup">
            <SignUp userVars={userVars} />
>>>>>>> 04e82073b0f4e53cdb947c45d27efa10f4a27117
          </Route>
        </Switch>
      </div>
    </Router>
  )
};

export default App;
<<<<<<< HEAD



//react-scripts
=======
>>>>>>> 04e82073b0f4e53cdb947c45d27efa10f4a27117
