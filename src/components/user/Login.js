import { connect } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { loginUser } from '../../actions/user_action';

const Login = ({ login, errors }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors) {
      window.alert(errors);
    } else {
      login()
    }
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
        <button type="submit">
          Login
        </button>
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

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(loginUser),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
