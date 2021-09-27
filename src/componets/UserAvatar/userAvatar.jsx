import React, { useEffect } from "react";
import { Image, Spinner } from "react-bootstrap";
import classNames from "classnames";
import { gql, useLazyQuery } from "@apollo/client";

const USER_QUERY = gql`
  query {
    currentUser {
      id
      firstName
      lastName
      avatarImage {
        url
      }
    }
  }
`;

export default function UserAvatar({ size = 75, className }) {
  const styles = { height: `${size}px`, width: `${size}px` };
  const [ getAvatar, { data, loading }] = useLazyQuery(USER_QUERY)
  useEffect(() => {
      getAvatar()
  }, [getAvatar])

  if (loading) return <Spinner aniamtion="grow" />;
    if (!data) return null;

  const { firstName, avatarImage: url } = data.currentUser;
  return (
    <div
      className={classNames(
        "d-flex justify-content-center align-items-center flex-row",
        className
      )}
    >
      <Image className="avatar" src={url.url} roundedCircle style={styles} />
      <span className="mx-2 text-white fs-5">Hi, {firstName}!</span>
    </div>
  );
}
