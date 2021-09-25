import React from "react";
import { Image } from "react-bootstrap";

export default function Avatar({ imgUrl, size = 75 }) {
  const styles = { height: `${size}px`, width: `${size}px` };
  return (
    <Image className="avatar" src={imgUrl} roundedCircle style={styles} />
  );
}
