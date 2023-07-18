import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateFolder from "./components/CreateFolder";
import Dashboard from "./components/Dashboard";
import EditFolder from "./components/EditFolder"
import LandingPage from "./components/LandingPage";
import FolderPage from "./components/FolderPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={["/home","/","/folders/recent"]} >
            <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/folders/:folder_id">
            <FolderPage />
          </Route>
          <Route path="/folders">
            <Dashboard />
          </Route>
          <Route path="/new-folder">
            <CreateFolder />
          </Route>
          <Route path="/edit-folder/:folder_id">
            <EditFolder />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
