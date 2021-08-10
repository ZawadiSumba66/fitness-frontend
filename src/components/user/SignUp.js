import { connect } from 'react-redux';
import { useState } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { signupUser } from '../../actions/user_action';
import store from '../../store';
import Flash from './Flash';

const SignUp = ({ backend }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };
    store.dispatch(signupUser(user));
  };

  return (

    <div className="d-flex flex-column signup-form mx-5">
      <div>
        <i className="fas fa-heartbeat" />
        <span className="font-weight-bold">KEEP IT FIT</span>
      </div>
      <p> Hi there! Sign up and start looking for fitness healthy tips that you can practise</p>
      <Flash />
      <div className="errors">
        {backend ? (
          <div>
            {backend.map((item) => (
              <li className="text-danger" key={Date.now() * Math.random()}>{item}</li>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Enter your username"
          className="form-control"
        />
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
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          name="password_confirmation"
          placeholder="Confirm your password"
          className="form-control mt-3"
        />
        <br />
        <input
          type="submit"
          className="button-orange btn text-light text-uppercase font-weight-bold w-100 mt-4"
          value="Sign up"
        />
      </form>
      <p className="pt-5 text-center">Have an account?</p>
      <Link
        to="/login"
        className="text-center"
      >
        Login
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  backend: state.userReducer.signup_backend_error,
});

SignUp.propTypes = {
  backend: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(SignUp);
