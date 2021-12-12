import React from "react";
import { Image } from "react-bootstrap";
import classNames from "classnames";

export default function Avatar({ imgUrl, size = 75, firstName, lastName, showName = false, className }) {
  const styles = { height: `${size}px`, width: `${size}px` };
  return (
    <div className={classNames("d-flex justify-content-center align-items-center flex-column", className)}>
      { imgUrl && <Image className="avatar" src={imgUrl} roundedCircle style={styles} /> }
      { showName && <p className="mt-3 fw-bold">{`${firstName && firstName} ${lastName && lastName[0]}`}</p> }
    </div>
  );
}
