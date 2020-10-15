import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

const StreamDelete = props => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);

    // eslint-disable-next-line
  }, []);

  const actions = () => {
    const { id } = props.match.params;

    return (
      <Fragment>
        <button
          onClick={() => props.deleteStream(id)}
          className='ui button negative'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </Fragment>
    );
  };

  if (!props.stream) {
    return <div>Loading...</div>;
  }

  const renderContent = () => {
    if (!props.stream) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete the stream with title: ${props.stream.title}`;
  };

  return (
    <Modal
      title='Delete Stream'
      content={renderContent()}
      actions={actions()}
      onDismiss={() => history.push('/')}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
