import {
  stream_layers
}
from '../utils/stream-layers';

export default stream_layers(3, 10 + Math.random() * 10, 0.1).map(function(data, i) {
  return {
    key: 'Stream' + i,
    values: data
  };
});
