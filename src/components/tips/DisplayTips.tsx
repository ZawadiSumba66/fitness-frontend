import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Carousel, Spinner } from 'react-bootstrap';
import { fetchTips, UserTips } from '../../actions/tip_action';
import DisplayTip from './DisplayTip';
import DashboardLeft from '../user/DashboardLeft';
import Flash from '../user/Flash';

type TipsDisplay = {
  tips: UserTips[]
};

const DisplayTips: React.FunctionComponent<any> = ({ tips }: TipsDisplay) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTips());
  }, []);
  if (!tips) {
    return (
      <div className="d-flex justify-content-center align-items-center spinner__wrapper">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div>
      <DashboardLeft />
      <div className="user__info p-3">
        <div className="rounded p-3 mt-4">
          <Flash />
        </div>
      </div>
      <div className="d-flex flex-column mt-10 mb-5">
        <div>
          <Carousel data-ride="carousel">
            {tips.map((tip: any) => (
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

type StateTips = {
  tipsReducer: {
    tips: string[]
  }
};

const mapStateToProps = (state: StateTips) => ({ tips: state.tipsReducer.tips });

export default connect(mapStateToProps, null)(DisplayTips);
