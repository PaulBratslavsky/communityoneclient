import React from "react";
import { Form } from "react-bootstrap";

export default function FormInput({
  name,
  type,
  value,
  onChange,
  label,
  placeholder,
  required,
  ...rest
}) {
  return (
    <Form.Group className="mb-3" controlId="formText">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required
        {...rest}
      />
    </Form.Group>
  );
}
