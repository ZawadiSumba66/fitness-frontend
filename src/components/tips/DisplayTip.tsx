import { Link } from '@reach/router';

type TipDisplay = {
  title: string,
  description: string,
  id: number,
};

const DisplayTip = ({
  title, description, id,
}: TipDisplay) => (
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
    </div>
  </div>
);

export default DisplayTip;
