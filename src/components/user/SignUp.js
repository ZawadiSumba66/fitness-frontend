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
  const [isLoading, setLoading] = useState(false);
  // const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('username', username);
    // formData.append('email', email);
    // formData.append('password', password);
    // formData.append('password_confirmation', passwordConfirmation);
    // formData.append('image', image);
    const user = {
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };
    store.dispatch(signupUser(user));
    setLoading(false);
  };

  return (

    <div className="flex flex-1 flex-column signup-form px-10 md:px-60 fitness-image">
      <div>
        <i className="fas fa-heartbeat" />
        <span className="font-bold">KEEP IT FIT</span>
      </div>
      <p className="text-white font-bold pb-3"> Hi there! Sign up and start looking for fitness healthy tips that you can practise</p>
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
        {/* <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        /> */}
        <br />
        <button
          type="submit"
          className="button-orange btn text-light text-uppercase font-weight-bold w-100 mt-4"
          value="Sign up"
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <p className="pt-5 text-center text-white">Have an account?</p>
      <Link
        to="/login"
        className="text-center text-white"
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
