import React from "react";

export default function UserCard({ user }) {
  return (
    <div>
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p>{user.bio}</p>
      <div>Projects: {user.projects.length}</div>
      <div>Issues: {user.issues.length}</div>
      <div>
        <img src={user.avatarImage.url} alt="avatar" />
      </div>
    </div>
  );
}
