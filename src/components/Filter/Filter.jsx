import React from "react";
import PropTypes from "prop-types";

export const Filter = ({ onChange }) => {
  return (
    <label>
      find contact's by name{" "}
      <input onChange={onChange} name="filter" type="text" />
    </label>
  );
};
Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
