import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../store';
import SignUp from '../../user/SignUp';

it('matches the signup page snapshot', () => {
  const tree = renderer.create(<Provider store={store}><SignUp /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
