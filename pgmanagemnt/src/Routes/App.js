import React from 'react';
import Home from './Home';
import styles from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { validSession: false };
  }
  componentWillMount() {
    if (this.props.token) {
      this.props.dispatch(getUserDetails());
    }
  }   
  render() {
    const { notification, isLoggedin, showMessageAlert } = this.props;
    return (
      <div className={styles.flexContent}>
        <Home/>
      </div>
    );
  }
}
App.propTypes = {
  // isLoggedin: PropTypes.string.isRequired,
};

App.defaultProps = {
  // userId: null,
};
const mapStateToProps = state => ({
  // token: state.login.get('data').get('userSessionToken'),
  // userInfo: state.login.get('userInfo'),
  // showMessageAlert: state.messageAlert.get('visible'),
  // notification: state.notification.get('visible'),
  // isLoggedin: state.login.get('loggedIn'),
});
export default App;
