import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

const StreamList = props => {
  useEffect(() => {
    props.fetchStreams();

    // eslint-disable-next-line
  }, []);

  const renderAdmin = stream => {
    if (stream.userId === props.currentUserId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className='ui button negative'
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return props.streams.map(stream => {
      return (
        <div className='item' key={stream.id}>
          {renderAdmin(stream)}
          <i className='large middle aligned icon camera'></i>
          <div className='content'>
            <Link to={`/streams/${stream.id}`} className='header'>
              {stream.title}
            </Link>
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const renderCreate = () => {
    if (props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui button primary'>
            {' '}
            Create Stream
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Stream</h2>
      <div className='ui celled list'>{renderList()}</div>
      <div>{renderCreate()}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    streams: Object.values(state.stream),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
