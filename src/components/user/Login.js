import { connect } from 'react-redux';
import { useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { loginUser } from '../../actions/user_action';
import store from '../../store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    store.dispatch(loginUser(user));
  };

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          type="submit"
          className="main-btn primary-shadow"
          value="Log in"
        />
      </form>
      <p>Don`t have an account?</p>
      <Link
        to="/signup"
      >
        SignUp
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.userReducer.login_error,
});

// const mapDispatchToProps = (dispatch) => ({
//   login: () => dispatch(loginUser()),
// });

// Login.propTypes = {
//   errors: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps)(Login);
