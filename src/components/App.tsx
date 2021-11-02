import '../styles/App.css';
import { Router, RouteComponentProps } from '@reach/router';
import SignUp from './user/SignUp';
import Login from './user/Login';
import Dashboard from './user/Dashboard';
import CreateTips from './tips/CreateTips';
import Home from './Home';
import DisplayTips from './tips/DisplayTips';
import TipDetail from './tips/TipDetail';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

const App: React.FunctionComponent<any> = () => (
  <div>
    <Router>
      <RouterPage path="/" pageComponent={<Home />} />
      <RouterPage path="/login" pageComponent={<Login />} />
      <RouterPage path="/signup" pageComponent={<SignUp />} />
      <RouterPage path="/dashboard" pageComponent={<Dashboard />} />
      <RouterPage path="/create-tip" pageComponent={<CreateTips />} />
      <RouterPage path="/tips" pageComponent={<DisplayTips />} />
      <RouterPage path="/tips/:id" pageComponent={<TipDetail />} />
    </Router>
  </div>
);

export default App;
