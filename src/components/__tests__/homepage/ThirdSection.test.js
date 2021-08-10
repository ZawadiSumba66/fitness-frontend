import renderer from 'react-test-renderer';
import ThirdSection from '../../homepage/ThirdSection';

it('matches the third section snapshot', () => {
  const tree = renderer.create(<ThirdSection />).toJSON();
  expect(tree).toMatchSnapshot();
});
