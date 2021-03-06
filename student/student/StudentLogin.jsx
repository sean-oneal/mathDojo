import React from 'react';
import { render } from 'react-dom';
import Axios from '../../node_modules/axios/lib/axios.js';
import { connect } from 'react-redux';
import { setUser, setStudent, setCorrect, setIncorrect } from './../actions/index.jsx';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Alerts } from './../partials/Alerts.jsx';

class StudentLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      alertToUser: null,
      classrooms: []
    };
  }

  componentWillMount() {
    this.getClassrooms();
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  clearFields() {
    $('input[name=classroom]:checked').val('');
    $('#inputUsername').val('');
    $('#inputPassword').val('');
  }

  getClassrooms() {
    var context = this;
    Axios.get('http://localhost:3000/student/classrooms')
    .then(function(res) {
      if (res.data.error) {
        console.log('unable to login');
        context.setState({alertToUser: 'unsuccessfulsignin'});
      } else {
        console.log('res.data:' + JSON.stringify(res.data));
        context.setState({classrooms: res.data});
      }
    });
  }

  login(username, password, classroom) {
    var context = this;
    if (!username || !password || !classroom) {
      context.setState({alertToUser: 'invalidformsubmission'});
      return;
    }
    var context = this;
    Axios.post('http://localhost:3000/student/login', {
      username: username,
      password: password,
      classroom: classroom
    })
    .then(function(res) {
      if (res.data.error) {
        console.log('unable to login');
        context.setState({alertToUser: 'unsuccessfulsignin'});
      } else {
        console.log('res.data:' + JSON.stringify(res.data));
        context.props.dispatch(setStudent({
          studentUsername: res.data.username,
          classroom: res.data.classroom,
          level: res.data.level,
          imageUrl: res.data.imageUrl
        }));
        console.log('Login Props:' + JSON.stringify(context.props));
        browserHistory.push('arena');
      }
    }).catch(function(err) {
      context.clearFields();
      context.setState({alertToUser: 'unsuccessfulsignin'});
    });
  }

  dismissAlert() {
    this.setState({alertToUser: null});
  }

  render () {
    let alertToUser = this.state.alertToUser !== null ? <Alerts alert={this.state.alertToUser} dismiss={this.dismissAlert.bind(this)}/> : <div></div>;

    return (
      <div className="container" onSubmit={this.handleSubmit}>
        <form className="form-signin">
          {this.state.classrooms.map((classroom) => (
            <div className="radio">
              <label>
                <input type="radio" name="classroom" id={classroom} value={classroom} />
                {classroom}
              </label>
            </div>
          ))}
          <h2 className="form-signin-heading">Student login</h2>
          <label className="sr-only">Username</label>
          <input type="username" id="inputUsername" className="form-control" placeholder="Username" required autoFocus/>
          <label className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          <button onClick={() => this.login($('#inputUsername').val(), $('#inputPassword').val(), $('input[name=classroom]:checked').val())} className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <hr></hr>
          <button onClick={() => { this.clearFields(); browserHistory.push('teacherlogin'); } } className="btn btn-lg btn-primary btn-block" type="submit">Teacher Login</button>
        </form>
        <div id='alerts'>
          {alertToUser}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  classroom: state.classroom,
  studentUsername: state.studentUsername,
  level: state.level,
  imageUrl: state.imageUrl
});

StudentLogin = connect(mapStateToProps)(StudentLogin);

export { StudentLogin };
