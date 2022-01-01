import React from "react";
import { Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormDatePicker({
  setDate,
  date,
  error,
  errorMessage,
}) {
  return (
    <Form.Group as={Col} controlId="formGridGitHub">
      <Form.Label>Due Date</Form.Label>
      <DatePicker selected={date} onChange={setDate} />
      {error.dueDate && errorMessage.dueDate}
    </Form.Group>
  );
}
