import { connect } from 'react-redux';
import { useState } from 'react';
import { navigate, Link } from '@reach/router';
// import PropTypes from 'prop-types';
import { signupUser } from '../../actions/user_action';
import store from '../../store';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleFileUpload = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const user = new FormData();
    // user.append('username', username);
    // user.append('email', email);
    // user.append('password', password);
    // user.append('password_confirmation', passwordConfirmation);
    // user.append('avatar', avatar);
    const user = {
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
      avatar,
    };
    console.log(user);
    store.dispatch(signupUser(user));
    navigate('/dashboard');
  };

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          placeholder="Enter your username"
        />
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
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          name="password_confirmation"
          placeholder="Confirm your password"
        />
        <input
          onChange={handleFileUpload}
          type="file"
          name="avatar"
        />
        <input
          type="submit"
          className="main-btn primary-shadow"
          value="Sign up"
        />
      </form>
      <p>Have an account?</p>
      <Link
        to="/login"
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
