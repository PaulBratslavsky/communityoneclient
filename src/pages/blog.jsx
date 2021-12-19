import React from "react";
import TwoColumns from "../componets/TwoColumns/twoColumns";
import BlogList from "../componets/BlogList/blogList";
import { Route, Routes } from "react-router-dom";
import PostDetail from "../componets/BlogDetail/blogDetail";

export default function Blog() {
  return (
    <div>
      <TwoColumns>
        <BlogList />
        <Routes>
          <Route path=":postID" element={<PostDetail />} />
        </Routes>
      </TwoColumns>
    </div>
  );
}
