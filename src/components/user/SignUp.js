import { connect } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { signupUser } from '../../actions/user_action';
import store from '../../store';

const SignUp = ({ error }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleFileUpload = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatar !== '') {
      // const formData = new FormData();
      // formData.append('user[username]', userName);
      // formData.append('user[email]', email);
      // formData.append('user[password]', password);
      // formData.append('user[password_confirmation]', passwordConfirmation);
      // formData.append('user[avatar]', avatar);
      const user = {
        username: userName,
        email,
        password,
        password_confirmation: passwordConfirmation,
        avatar,
      };
      console.log(user);
      store.dispatch(signupUser(user));
    } else {
      window.alert(error);
    }
  };

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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
          name="passwordconfirmation"
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
          value="Create Account"
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
  error: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(SignUp);
