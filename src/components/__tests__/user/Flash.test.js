import renderer from 'react-test-renderer';
import Flash from '../../user/Flash';

it('matches the flash snapshot', () => {
  const tree = renderer.create(<Flash />).toJSON();
  expect(tree).toMatchSnapshot();
});
