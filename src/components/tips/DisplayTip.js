import { Link } from '@reach/router';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTip } from '../../actions/tip_action';
import store from '../../store';

const DisplayTip = ({
  title, description, id,
}) => {
  const deleteItem = (e, tipId) => {
    e.preventDefault();
    store.dispatch(deleteTip(tipId));
  };
  return (
    <div className="shadow rounded infoCarousel__wrapper-desc-info mx-auto mb-5">
      <h3 className="text-center font-bold text-3xl  test-class">{title}</h3>
      <div className="bg-white align-items-center p-3">
        <p>{description}</p>
      </div>
      <Link to={`/tips/${id}`} className="button-orange p-2 ml-3 text-light font-weight-bold">
        View more details
      </Link>
      <div className="d-flex pt-12">
        <div className="px-3">
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star text-sm-gray" />
        </div>
        <button onClick={(e) => deleteItem(e, id)} type="button" className="text-red-400 focus:border-white">
          <i className="far fa-trash-alt" />
        </button>
      </div>
    </div>
  );
};
DisplayTip.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default DisplayTip;
