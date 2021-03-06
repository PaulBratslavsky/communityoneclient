import React from "react";
import TwoColumns from "../componets/TwoColumns/twoColumns";
import BlogList from "../componets/BlogList/blogList";
import { Route, Routes } from "react-router-dom";
import PostDetail from "../componets/BlogDetail/blogDetail";
import Pane from "../componets/Pane/pane";
import { Container } from 'react-bootstrap';

export default function Blog() {
  return (
    <Container>
      <TwoColumns>
        <Pane>
          <BlogList />
        </Pane>
        <Routes>
          <Route path=":postID" element={<PostDetail />} />
        </Routes>
      </TwoColumns>
    </Container>
  );
}
