import { useState, useEffect } from 'react';
import Bus from '../../actions/bus';
/* eslint-disable @typescript-eslint/no-shadow */
const Flash = () => {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    Bus.addListener('flash', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    });
  }, []);

  if (visibility) {
    return (
      <div className={`alert alert-${type} alert__wrapper w-100`}>
        <p>{message}</p>
      </div>
    );
  }

  return <div />;
};

export default Flash;
/* eslint-enable @typescript-eslint/no-shadow */
