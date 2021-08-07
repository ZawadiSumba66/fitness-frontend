import '../App.css';
import { Router } from '@reach/router';
import SignUp from './user/SignUp';
import Login from './user/Login';
import Dashboard from './user/Dashboard';
import CreateTips from './tips/CreateTips';
import Home from './Home';
import DisplayTips from './tips/DisplayTips';
import TipDetail from './tips/TipDetail';

const App = () => (
  <div>
    <Router>
      <Login path="/login" />
      <SignUp path="/signup" />
      <Dashboard path="/dashboard" />
      <CreateTips path="/create-tip" />
      <DisplayTips path="/tips" />
      <TipDetail path="/tips/:id" />
      <Home path="/" />
    </Router>
  </div>
);

export default App;
