import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Link } from '@reach/router';
import { signupUser } from '../../actions/user_action';
import store from '../../store';
import Flash from './Flash';

type UserProps = {
  backend: string[];
};

const SignUp = ({ backend }: UserProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setLoading] = useState(false);
  // const [image, setImage] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    } as const;
    store.dispatch(signupUser(user));
    console.log(backend);
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
            {backend.map((item: string) => (
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
        className="text-center text-dark font-bold"
      >
        Login
      </Link>
    </div>
  );
};

type SignupState = {
  userReducer: {
    signup_backend_error: string[]
  }
};

const mapStateToProps = (state: SignupState) => ({
  backend: state.userReducer.signup_backend_error,
});

export default connect(mapStateToProps)(SignUp);
