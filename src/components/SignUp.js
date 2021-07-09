import { connect } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import createUser from '../actions/user_action';

const SignUp = ({ newUser, isLogin, history }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState('');

  const uploadFile = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'hn9aamrp');
    const response = await axios({
      url: 'https://api.cloudinary.com/v1_1/db69dlggn/image/upload',
      method: 'POST',
      data: formData,
    });
    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgPath = await uploadFile(avatar);
    await newUser({
      userName, email, password, passwordConfirmation, imgPath,
    });
    if (isLogin === true) {
      history.push('/');
    } else {
      setMessage('welcome');
    }
    return message;
  };

  return (
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
        onChange={(e) => setAvatar(e.target.files[0])}
        type="file"
        name="avatar"
      />
      <button type="submit">
        Create Account
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  isLogin: state.authReducer.isLogin,
});
const mapDispatchToProps = (dispatch) => ({
  newUser: (estate) => dispatch(createUser(estate)),
});

SignUp.propTypes = {
  newUser: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Array).isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
