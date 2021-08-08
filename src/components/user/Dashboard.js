import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
        if (response.ok) {
          window.flash('Tip successfully removed from favorites!');
        }
        return response;
      })
      .catch((error) => error);
  };

  if (!user) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <DashboardLeft />
      <div className="user__info p-3">
        <div className="rounded p-3 mt-4">
          <Flash />
          <h3 className=" text-lg-black my-2 text-center">Your Favorite Fitness Tips</h3>
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
            <h1 className=" text-lg-black text-center my-2">
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
