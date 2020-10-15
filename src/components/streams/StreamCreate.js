import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = props => {

  const onSubmit = (formValues) => {
    props.createStream(formValues);
  }

  return (
    <StreamForm onSubmitHandler={onSubmit} />
  );
};

export default connect(null, { createStream })(StreamCreate);
