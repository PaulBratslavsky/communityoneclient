import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const PostDetailStyled = styled.div`
  padding: 1rem;

  h1 {
    color: #7740d9;
    font-weight: bold;
    font-size: 3rem;
  }

  h2 {
    color: #8454d6;
  }

  p {
    color: #070707;
    font-size: 1.4rem;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
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
  const { postID } = useParams();

  const { data, loading, error } = useQuery(POST_QUERY, {
    variables: { postID },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { title, content, author } = data.post;

  return (
    <PostDetailStyled>
      <h1>{title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
      <span>author: {`${author.firstName} ${author.lastName[0]}`}</span>
    </PostDetailStyled>
  );
}
