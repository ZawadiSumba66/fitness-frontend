import renderer from 'react-test-renderer';
import Header from '../../homepage/Header';

it('matches the header snapshot', () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});
