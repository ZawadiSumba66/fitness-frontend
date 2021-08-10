import PropTypes from 'prop-types';

const FavoriteTip = ({ title, description, handleRemove }) => (
  <div className="col-md-4 my-2">
    <div className="shadow rounded favourites__card mx-auto pl-3">
      <div className="position-relative">
        <h3 className="text-center font-weight-bold test-name">
          {title}
        </h3>
        <p>{description}</p>
        <button
          onClick={handleRemove}
          type="button"
          className="button-orange font-weight-bold text-light btn"
        >
          Remove
        </button>
      </div>
      <div className="d-flex justify-content-between align-items-center p-3">
        <div>
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star checked" />
          <span className="fa fa-star text-sm-gray" />
        </div>
      </div>
    </div>
  </div>
);

FavoriteTip.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default FavoriteTip;
