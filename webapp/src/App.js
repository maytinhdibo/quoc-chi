import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './style/App.scss';
import './style/table.scss';
import 'react-table/react-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import Login from './page/account/Login';
import DashBoard from './page/app/DashBoard';
import Page404 from './page/404';
import auth from './../src/services/auth.services';
import { Alert, setAlert } from './components/Alert';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.alert = React.createRef();
  }
  componentDidMount(){
    setAlert(this.alert);
  }
  render() {
    console.log(auth);
    return (
      <div id="App">
        <Alert ref={this.alert}/>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute signout={this.signout} auth={true} path="/dashboard" component={DashBoard} />
            <Route exact component={Page404} />
          </Switch>
        </Router>
      </div>
    );
  }

}


function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuth ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default App;
