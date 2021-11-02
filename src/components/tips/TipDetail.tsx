import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import { Spinner } from 'react-bootstrap';
import DashboardLeft from '../user/DashboardLeft';
import Flash from '../user/Flash';
import { fetchTip, UserTips } from '../../actions/tip_action';
import createfavorite from '../../actions/favorite_action';

type DetailTip = {
  tip: UserTips,
  id: number
};

const TipDetail: React.FunctionComponent<any> = ({ tip, id }: DetailTip) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTip(id));
  }, []);

  if (!tip) {
    return (
      <div className="d-flex justify-content-center align-items-center spinner__wrapper">
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  console.log(id);

  if (!localStorage.getItem('token')) {
    navigate('/');
  }

  const handleSubmit = () => {
    createfavorite('favorite', id)
      .then((response) => {
        if (response.status === 200) {
          window.flash('Tip successfuly added to favourites!');
        }
        return response;
      })
      .catch((error) => {
        window.flash('Tip was already added to favourites!', 'danger');
        return error;
      });
  };

  return (
    <div>
      <DashboardLeft />
      <div className="user__info p-3">
        <div className="rounded p-3 mt-4">
          <Flash />
        </div>
      </div>
      <div className="min-vh-100 bg-main p-3">
        <Flash />
        <div className="shadow no-gutters rounded bg-white mb-3 row infoCarousel__wrapper-desc-info-detail mx-auto">
          <div className="p-3">
            <div className="">
              <h3 className="font-bold text-3xl mb-2 text-orange">
                {tip.title}
              </h3>
              <p>{tip.description}</p>
            </div>

            <div className="my-2 d-flex justify-content-between more-details">
              <div>
                <div className="d-flex align-items-center">
                  <div className="px-2">
                    <p className="font-weight-bold text-uppercase">Instructions</p>
                    <p>{tip.instructions}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center">
                  <div className="px-2">
                    <p className="font-weight-bold text-uppercase">Benefits</p>
                    <p>{tip.benefits}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="details-btn btn button-orange text-light font-weight-bold"
              type="button"
              onClick={handleSubmit}
            >
              Add to favourites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type TipState = {
  tipsReducer: {
    tip: UserTips
  }
};

const mapStateToProps = (state: TipState) => ({
  tip: state.tipsReducer.tip,
});

export default connect(mapStateToProps, null)(TipDetail);
