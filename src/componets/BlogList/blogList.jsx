import React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const POSTS_QUERY = gql`
  query {
    posts {
      id
      author {
        id
        firstName
        lastName
      }
      title
      tags
      content
      private
      featuredImage {
        formats
      }
    }
  }
`;

export default function BlogList() {
  const { loading, error, data } = useQuery(POSTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2>All Posts</h2>
      {data.posts.map((post) => {
        return (
          <div key={post.id}>
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
