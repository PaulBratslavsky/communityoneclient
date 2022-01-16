import { Form } from "react-bootstrap";
export const CustomHeader = (props) => {
  return (
    <div>
      <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
      <div className="customHeaderLabel">{props.displayName}</div>
    </div>
  );
};
