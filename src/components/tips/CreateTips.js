import { connect } from 'react-redux';
import { useState } from 'react';
// import PropTypes from 'prop-types';
import store from '../../store';
import { createTip } from '../../actions/tip_action';
import DashboardLeft from '../user/DashboardLeft';
import Flash from '../user/Flash';

const CreateTips = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const handleFileUpload = (files) => {
    setImage(files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tip = {
      title,
      description,
      benefits,
      instructions,
      image,
    };
    store.dispatch(createTip(tip));
  };

  return (
    <div>
      <DashboardLeft />
      <div className="user__info p-3">
        <div className="rounded p-3 mt-4">
          <Flash />
        </div>
      </div>
      <div className="create-tips">
        <form onSubmit={handleSubmit}>
          <div className="row mx-auto w-50 bg-white p-5">
            <h3>Create Fitness Tips</h3>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Enter the Title"
              className="form-control"
              rows="3"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              placeholder="Enter a brief description"
              className="form-control mt-3"
              rows="3"
            />
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              name="instructions"
              placeholder="Add some instructions to follow"
              className="form-control mt-3"
              rows="3"
            />
            <textarea
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              name="benefits"
              placeholder="What are some of the benefits a user will gain"
              className="form-control mt-3"
              rows="3"
            />
            <div className="d-flex flex-column pt-2">
              <input
                onChange={(e) => handleFileUpload(e.target.files)}
                type="file"
                name="image"
              />
              <br />
              <input
                type="submit"
                className="button-orange text-light btn font-weight-bold"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createtip: () => dispatch(createTip),
});

const mapStateToProps = (state) => ({
  error: state.tipsReducer.error,
});

// CreateTips.propTypes = {
//   createtip: PropTypes.func.isRequired,
//   // error: PropTypes.string.isRequired,
// };
export default connect(mapStateToProps, mapDispatchToProps)(CreateTips);
