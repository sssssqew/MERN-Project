import React from "react";
import PropTypes from "prop-types";

const hello = ({ name, source, size }) => {
  return (
    <div>
      hello, {name} from {source} folder !! (${size})
    </div>
  );
};

hello.propTypes = {
  name: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  size: PropTypes.number
};

export default hello;
