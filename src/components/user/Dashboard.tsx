import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import FavoriteTip from '../tips/FavoriteTip';
import DashboardLeft from './DashboardLeft';
import Flash from './Flash';
import createfavorite from '../../actions/favorite_action';
import { fetchUser, UserFavorites } from '../../actions/user_action';

interface UserDashboard {
  user: UserFavorites
}

const Dashboard: React.FunctionComponent<any> = ({ user }: UserDashboard) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleRemove = (id: number) => {
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
  if (user.favorites) {
    return (
      <div>
        <DashboardLeft />
        <div className="user__info p-3">
          <div className="rounded p-3 mt-4">
            <Flash />
            <h3 className="font-bold text-2xl md:text-4xl my-2 text-orange text-center">Your Favorite Fitness Tips</h3>
            <div className="row">
              {user.favorites.map((tip: any) => (
                <FavoriteTip
                  key={tip.id}
                  id={tip.id}
                  title={tip.title}
                  description={tip.description}
                  handleRemove={() => handleRemove(tip.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

type SignupState = {
  userReducer: {
    user: UserFavorites
  }
};

const mapStateToProps = (state: SignupState) => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps, null)(Dashboard);
