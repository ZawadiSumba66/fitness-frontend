import { Provider } from 'react-redux';
import LocationContext from '@reach/router';
import renderer from 'react-test-renderer';
import store from '../../../store';
import TipDetail from '../../tips/TipDetail';

it('matches the tip detail snapshot', () => {
  const tree = renderer.create(
    <LocationContext>
      <TipDetail />
    </LocationContext>).toJSON();
  expect(tree).toMatchSnapshot();
});
