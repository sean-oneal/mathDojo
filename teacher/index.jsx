import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import user from './reducers/index.jsx';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { Login } from './teacher/Login.jsx';
import { Auth } from './teacher/Auth.jsx';
import { TeacherSignup } from './teacher/Signup.jsx';
import { TeacherDashboard } from './teacher/TeacherDashboard.jsx';
import { StudentProfile } from './teacher/StudentProfile.jsx';

let store = createStore(user);


class Root extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/teacher" component={Auth}/>
          <Route path="/teacher/login" component={Login}/>
          <Route path="teachersignup" component={TeacherSignup}/>
          <Route path="/teacher/teacherdashboard" component={TeacherDashboard}/>
          <Route path="studentprofile" component={StudentProfile}/>
        </Router>
      </Provider>
    );
  }

}

render(<Root/>, document.getElementById('app'));
