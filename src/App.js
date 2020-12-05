import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => {
  const [user, setUser] = useState(null);
  // const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLogIn, setIsLogIn] = useState(false);

  const userVars = {
    user, setUser, email, setEmail, phone, setPhone, userType, setUserType, isLogIn, setIsLogIn
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
