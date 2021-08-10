import renderer from 'react-test-renderer';
import FavoriteTip from '../../tips/FavoriteTip';

it('matches the favorite tips snapshot', () => {
  const tree = renderer.create(<FavoriteTip />).toJSON();
  expect(tree).toMatchSnapshot();
});
