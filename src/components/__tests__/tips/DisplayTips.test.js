import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../store';
import DisplayTips from '../../tips/DisplayTips';

it('matches the Display Tips snapshot', () => {
  const tree = renderer.create(<Provider store={store}><DisplayTips /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
