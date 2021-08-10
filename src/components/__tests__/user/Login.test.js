import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../store';
import Login from '../../user/Login';

it('matches the login page snapshot', () => {
  const tree = renderer.create(<Provider store={store}><Login /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
