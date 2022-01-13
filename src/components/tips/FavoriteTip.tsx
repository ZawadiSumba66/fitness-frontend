import { Link } from '@reach/router';

type TipFavorite = {
  title: string,
  description: string,
  id: number,
  handleRemove: () => void;
};

const FavoriteTip = ({
  title, description, handleRemove, id,
}: TipFavorite) => (
  <div className="col-md-4 my-2">
    <div className="shadow rounded favourites__card mx-auto pl-3">
      <div className="position-relative">
        <h3 className="text-center font-weight-bold test-name">
          <Link to={`/tips/${id}`}>
            {' '}
            {title}
          </Link>
        </h3>
        <p>{description}</p>
        <button
          onClick={handleRemove}
          type="button"
          className="button-orange font-weight-bold text-light btn mt-2"
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

export default FavoriteTip;
