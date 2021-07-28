import { connect } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import store from '../../store';
import { createTip, fetchTips } from '../../actions/tip_action';

// const FormData = require('form-data');

const CreateTips = ({ error }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image !== '') {
      // const user = new FormData();
      // user.append('username', userName);
      // user.append('email', email);
      // user.append('password', password);
      // user.append('password_confirmation', passwordConfirmation);
      // user.append('avatar', avatar);
      const tip = {
        title,
        description,
        benefits,
        instructions,
        image,
      };
      console.log(tip);
      store.dispatch(createTip(fetchTips));
      navigate('/tips');
    } else {
      window.alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="Enter the Title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="textarea"
          name="description"
          placeholder="Enter a Description"
        />
        <input
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          type="textarea"
          name="instructions"
          placeholder="Add some instructions to follow"
        />
        <input
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          type="textarea"
          name="benefits"
          placeholder="What are some of the benefits a user wil gain"
        />
        <input
          onChange={handleFileUpload}
          type="file"
          name="image"
        />
        <input
          type="submit"
          className="main-btn primary-shadow"
          value="Create a tip"
        />
      </form>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   signup: () => dispatch(signupUser),
// });

const mapStateToProps = (state) => ({
  error: state.tipsReducer.error,
});

CreateTips.propTypes = {
  // signup: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(CreateTips);
