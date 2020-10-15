import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, updateStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = props => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  const onSubmit = updateValues => {
    props.updateStream(props.match.params.id, updateValues);
  };

  if (!props.stream) {
    return <div>Loading...</div>;
  }

  return (
    props.stream && (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={{
            title: props.stream.title,
            description: props.stream.description,
          }}
          onSubmitHandler={onSubmit}
        />
      </div>
    )
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, updateStream })(
  StreamEdit
);
