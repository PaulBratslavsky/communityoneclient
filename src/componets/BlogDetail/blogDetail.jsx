import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const PostDetailStyled = styled.div`
  h1 {
    color: black;
    padding: 1rem;
  }

  h2 {
    color: grey;
  }

  p {
    color: grey;
  }
`;

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
  // get post id from url
  const { postID } = useParams();
  console.log(postID, "WHY IS THIS NOT WORKING");
  

  // get data from graph ql api
  const { data, loading, error } = useQuery(POST_QUERY, {
    variables: { postID },
  });

  // check if data is loading or has errors
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { featuredImage, title, content, author } = data.post;

  // render post detail

  return (
    <>
    argh
    <PostDetailStyled>
      {featuredImage && (
        <img src={featuredImage.formats.thumbnail.url} alt={title} />
      )}
      <ReactMarkdown>{content}</ReactMarkdown>
      <span>author: {`${author.firstName} ${author.lastName[0]}`}</span>
    </PostDetailStyled>
    </>
  );
}
