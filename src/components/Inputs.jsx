import React from "react";
import PropTypes from "prop-types";

const Inputs = ({ id, type, placeholder, value, setter }) => {
  return (
    <>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
        id={id}
        type={type}
        value={value}
        onChange={setter}
        placeholder={placeholder}
        required
      />
    </>
  );
};

Inputs.PropType = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setter: PropTypes.func.isRequired,
};

export default Inputs;
