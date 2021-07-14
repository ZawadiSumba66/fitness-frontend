import './App.css';
import { Router } from '@reach/router';
import SignUp from './user/SignUp';
import Login from './user/Login';
import Dashboard from './user/Dashboard';
import CreateTips from './tips/CreateTips';

const App = () => (
  <div>
    <Router>
      <Login path="/login" />
      <SignUp path="/signup" />
      <Dashboard path="/dashboard" />
      <CreateTips path="/create-tip" />
    </Router>
  </div>
);

export default App;
