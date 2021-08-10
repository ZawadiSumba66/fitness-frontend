import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../store';
import TipDetail from '../../tips/TipDetail';

it('matches the tip detail snapshot', () => {
  const tree = renderer.create(<Provider store={store}><TipDetail /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});
