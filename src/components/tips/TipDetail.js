import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
// import { Spinner } from 'react-bootstrap';
import DashboardLeft from '../user/DashboardLeft';
import Flash from '../user/Flash';
import { fetchTip } from '../../actions/tip_action';
import createfavorite from '../../actions/favorite_action';

const TipDetail = ({ tip, id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTip(id));
  }, []);

  if (!tip) {
    return <h1>loading</h1>;
  }

  if (!localStorage.getItem('token')) {
    navigate('/');
  }

  const handleSubmit = () => {
    createfavorite('favorite', id)
      .then((response) => {
        if (response.ok) {
          window.flash('House successfuly added to favourites!');
        }
        return response;
      })
      .catch((error) => error);
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
              <h3 className="font-weight-bold mb-2 text-orange">
                {tip.title}
              </h3>
              <p>{tip.description}</p>
            </div>

            <div className="my-2 d-flex justify-content-between">
              <div className="mr-5">
                <div className="d-flex align-items-center">
                  <div className="px-2">
                    <p className="font-weight-bold text-uppercase">Instructions</p>
                    <p>{tip.instructions}</p>
                  </div>
                </div>
              </div>
              <div className="r">
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

const mapStateToProps = (state) => ({
  tip: state.tipsReducer.tip,
});

TipDetail.propTypes = {
  tip: PropTypes.instanceOf(Array).isRequired,
  id: PropTypes.number.isRequired,
};
export default connect(mapStateToProps, null)(TipDetail);
