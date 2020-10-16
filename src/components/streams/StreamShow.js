import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = props => {
  const { id } = props.match.params;
  const videoRef = useRef();

  useEffect(() => {
    props.fetchStream(id);
    buildPlayer();

    // eslint-disable-next-line
  }, []);

  const buildPlayer = () => {
    if (!props.stream) {
      return;
    }

    const player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });

    player.attachMediaElement(videoRef.current);
    player.load();
  };

  if (!props.stream) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls />
      <h1>{props.stream.title}</h1>
      <h5>{props.stream.description}</h5>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
