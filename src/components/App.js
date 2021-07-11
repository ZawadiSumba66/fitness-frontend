import './App.css';
import { Router } from '@reach/router';
import SignUp from './user/SignUp';
import Login from './user/Login';

const App = () => (
  <div>
    <Router>
      <Login path="/login" />
      <SignUp path="/signup" />
    </Router>
  </div>
);

export default App;
