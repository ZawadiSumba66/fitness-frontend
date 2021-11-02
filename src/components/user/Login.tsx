import { connect } from 'react-redux';
import { useState } from 'react';
import { Link } from '@reach/router';
import { loginUser } from '../../actions/user_action';
import store from '../../store';
import Flash from './Flash';

type LoginProps = {
  errors: string;
};

const Login = ({ errors }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    store.dispatch(loginUser(user));
  };

  return (

    <div className="d-flex flex-column signup-form justify-content-center px-10 md:px-60 fitness-image">
      <div>
        <i className="fas fa-heartbeat" />
        <span className="font-bold">KEEP IT FIT</span>
      </div>
      <p className="text-white font-bold"> Welcome Back! Lets continue with our journey of keeping fit</p>
      <Flash />
      <div className="errors">
        {errors ? (
          <div>
            <li className="text-danger">Invalid email or password</li>
          </div>
        ) : (
          ''
        )}
      </div>
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
        <button
          type="submit"
          className="button-orange btn text-light text-uppercase font-weight-bold w-100 mt-4"
          value="Sign up"
        >
          login
        </button>
      </form>
      <p className="pt-5 text-center text-white">Don`t have an account?</p>
      <Link
        to="/signup"
        className="text-center text-dark font-bold"
      >
        SignUp
      </Link>
    </div>
  );
};

type LoginState = {
  userReducer: {
    login_backend_error: string,
  }
};

const mapStateToProps = (state: LoginState) => ({
  errors: state.userReducer.login_backend_error,
});

export default connect(mapStateToProps)(Login);
