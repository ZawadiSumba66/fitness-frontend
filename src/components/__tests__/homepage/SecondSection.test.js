import renderer from 'react-test-renderer';
import SecondSection from '../../homepage/SecondSection';

it('matches the second section snapshot', () => {
  const tree = renderer.create(<SecondSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
