import React from "react";
import { Image } from "react-bootstrap";

export default function Avatar({ imgUrl, size = 75, firstName, lastName, showName = false }) {
  const styles = { height: `${size}px`, width: `${size}px` };
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <Image className="avatar" src={imgUrl} roundedCircle style={styles} />
      { showName && <p className="mt-3 fw-bold">{`${firstName} ${lastName[0]}`}</p> }
    </div>
  );
}
