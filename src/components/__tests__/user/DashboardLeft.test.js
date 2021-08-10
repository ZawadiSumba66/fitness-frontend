import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../store';
import DashboardLeft from '../../user/DashboardLeft';

it('matches the dashboard left snapshot', () => {
  const tree = renderer.create(<Provider store={store}><DashboardLeft /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
