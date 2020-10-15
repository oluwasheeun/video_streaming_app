import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamEdit = props => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
    // eslint-disable-next-line
  }, []);

  if (!props.stream) {
    return <div>Loading...</div>;
  }

  console.log(props.stream.title);

  return (
    props.stream && (
      <div>
        StreamEdit
        <h2>{props.stream.title}</h2>
      </div>
    )
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
