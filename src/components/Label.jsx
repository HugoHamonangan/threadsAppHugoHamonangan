import React from "react";
import PropTypes from "prop-types";

const Label = ({ label }) => {
  return (
    <>
      <label
        className="block capitalize text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
    </>
  );
};

Label.PropType = {
  label: PropTypes.string.isRequired,
};

export default Label;
