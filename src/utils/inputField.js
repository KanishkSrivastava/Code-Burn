import React from 'react';

const InputField = ({ type, name, value, onChangeEvent, placeHolder, error }) => (
  <input
    className={error}
    type={type}
    name={name}
    value={value}
    onChange={onChangeEvent}
    placeholder={placeHolder}
  />
);
export default InputField;
