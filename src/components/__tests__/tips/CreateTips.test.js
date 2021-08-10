import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../store';
import CreateTips from '../../tips/CreateTips';

it('matches the create Tips snapshot', () => {
  const tree = renderer.create(<Provider store={store}><CreateTips /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
