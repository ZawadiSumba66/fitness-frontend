import renderer from 'react-test-renderer';
import Footer from '../../homepage/Footer';

it('matches the footer snapshot', () => {
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
});
