import React from "react";
import { Form, Col } from "react-bootstrap";
export default function FormSelect({
  name,
  loading,
  label,
  onChange,
  value,
  disabled,
  options,
  optionKey,
  defaultOption,
  error,
  errorMessage,
  ...rest
}) {
  return (
    <Form.Group as={Col} controlId="formGridLive">
      <Form.Label>{label}</Form.Label>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form.Select
          name={name}
          aria-label="Default select example"
          onChange={onChange}
          value={value}
          disabled={disabled}
          {...rest}
        >
          <option>{defaultOption}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option[optionKey]}
            </option>
          ))}
        </Form.Select>
      )}
      {error.projects && errorMessage.projects}
    </Form.Group>
  );
}
