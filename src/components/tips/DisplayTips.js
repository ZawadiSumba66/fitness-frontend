import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { fetchTips } from '../../actions/tip_action';
import DisplayTip from './DisplayTip';
import DashboardLeft from '../user/DashboardLeft';
import Flash from '../user/Flash';

const DisplayTips = ({ tips }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTips());
  }, []);
  if (!tips) {
    return <h1>loading</h1>;
  }
  return (
    <div>
      <DashboardLeft />
      <div className="user__info p-3">
        <div className="rounded p-3 mt-4">
          <Flash />
        </div>
      </div>
      <div className="d-flex flex-column mb-5">
        <div>
          <Carousel>
            {tips.map((tip) => (
              <Carousel.Item key={tip.id}>
                <DisplayTip
                  key={tip.id}
                  id={tip.id}
                  title={tip.title}
                  description={tip.description}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ tips: state.tipsReducer.tips });

DisplayTips.propTypes = {
  tips: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, null)(DisplayTips);
