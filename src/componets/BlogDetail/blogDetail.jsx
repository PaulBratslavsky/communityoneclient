import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const POST_QUERY = gql`
  query POST_QUERY($postID: ID!) {
    post(id: $postID) {
      id
      title
      content
      author {
        id
        firstName
        lastName
      }
      tags
      created_at
      featuredImage {
        formats
      }
    }
  }
`;

export default function PostDetail() {
  const { postID } = useParams();

  const { data, loading, error } = useQuery(POST_QUERY, {
    variables: { postID },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { featuredImage, title, content, author } = data.post;
  return (
    <div>
      {featuredImage && (
        <img src={featuredImage.formats.thumbnail.url} alt={title} />
      )}
      <h1>{title}</h1>
      <p>{content}</p>
      <span>author: {`${author.firstName} ${author.lastName[0]}`}</span>
    </div>
  );
}
