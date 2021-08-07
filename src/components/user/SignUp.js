import { connect } from 'react-redux';
import { useState } from 'react';
import { Link } from '@reach/router';
// import PropTypes from 'prop-types';
import { signupUser } from '../../actions/user_action';
import store from '../../store';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [image, setImage] = useState(null);

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
      image,
    };
    store.dispatch(signupUser(user));
  };

  return (

    <div className="d-flex flex-column signup-form w-50 mx-auto">
      <div>
        <i className="fas fa-heartbeat" />
        <span className="font-weight-bold">KEEP IT FIT</span>
      </div>
      <p> Hi there! Sign up and start looking for fitness healthy tips that you can practise</p>
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
        <input
          onChange={handleFileUpload}
          type="file"
          name="image"
          className="mt-3"
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

// const mapDispatchToProps = (dispatch) => ({
//   signup: () => dispatch(signupUser),
// });

const mapStateToProps = (state) => ({
  error: state.userReducer.signup_error,
});

SignUp.propTypes = {
  // signup: PropTypes.func.isRequired,
  // error: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(SignUp);
