import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Auth } from "../pages/Auth/Auth";
import { Chat } from "../pages/Chat/Chat";
import { useObservable } from "../store";
import { isLoggedIn$ } from "../store/user";

export function Routes() {
  const isLoggedIn = useObservable<boolean>(isLoggedIn$);
  return (
    <Router>
      <Switch>
        <Redirect from="/" exact to="/auth" />
        <ProtectedRoute
          path="/auth"
          redirectTo="/chat"
          isAuthenticated={!isLoggedIn}
          component={Auth}
        />
        <ProtectedRoute
          path="/chat"
          redirectTo="/auth"
          isAuthenticated={!!isLoggedIn}
          component={Chat}
        />
      </Switch>
    </Router>
  );
}

export function ProtectedRoute(props: {
  path: string;
  redirectTo: string;
  isAuthenticated: boolean;
  component: any;
}) {
  if (props.isAuthenticated) {
    return <Route path={props.path} component={props.component} />;
  } else {
    return <Redirect to={props.redirectTo} />;
  }
}
