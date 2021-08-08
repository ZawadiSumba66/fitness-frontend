import { connect } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { loginUser } from '../../actions/user_action';
import store from '../../store';
import Flash from './Flash';

const Login = ({ errors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors) {
      const user = {
        email,
        password,
      };
      store.dispatch(loginUser(user));
    }
    window.flash(errors, 'warning');
  };

  return (

    <div className="d-flex flex-column signup-form w-50 mx-auto">
      <div>
        <i className="fas fa-heartbeat" />
        <span className="font-weight-bold">KEEP IT FIT</span>
      </div>
      <p> Welcome Back! Lets continue with our journey of keeping fit</p>
      <Flash />
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Enter your email"
          className="form-control mt-3"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mt-3"
        />
        <input
          type="submit"
          value="Log in"
          className="button-orange btn text-light text-uppercase font-weight-bold w-100 mt-4"
        />
      </form>
      <p className="pt-5 text-center">Don`t have an account?</p>
      <Link
        to="/signup"
        className="text-center"
      >
        SignUp
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.userReducer.login_error,
});

Login.propTypes = {
  errors: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Login);
