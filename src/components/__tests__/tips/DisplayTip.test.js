import renderer from 'react-test-renderer';
import DisplayTip from '../../tips/DisplayTip';

it('matches the Display Tip snapshot', () => {
  const tree = renderer.create(<DisplayTip />).toJSON();
  expect(tree).toMatchSnapshot();
});
