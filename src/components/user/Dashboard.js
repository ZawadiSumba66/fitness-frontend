import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import FavoriteTip from '../tips/FavoriteTip';
import DashboardLeft from './DashboardLeft';
import Flash from './Flash';
import createfavorite from '../../actions/favorite_action';
import { fetchUser } from '../../actions/user_action';

const Dashboard = ({ user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleRemove = (id) => {
    createfavorite('unfavourite', id)
      .then((response) => {
        if (response.status === 200) {
          window.flash('Tip successfully removed from favorites!');
        }
        return response;
      })
      .catch((error) => error);
  };

  if (!user) {
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
          <h3 className="font-bold text-4xl my-2 text-center">Your Favorite Fitness Tips</h3>
          {user.favorites.length !== 0 ? (
            <div className="row">
              {user.favorites.map((tip) => (
                <FavoriteTip
                  key={tip.id}
                  title={tip.title}
                  description={tip.description}
                  handleRemove={() => handleRemove(tip.id)}
                />
              ))}
            </div>
          ) : (
            <h1 className=" text-3xl text-center my-2">
              No Favourites found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

Dashboard.propTypes = {
  user: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps, null)(Dashboard);
