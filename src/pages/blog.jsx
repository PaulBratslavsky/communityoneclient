import React from "react";
import TwoColumns from "../componets/TwoColumns/twoColumns";
import BlogList from "../componets/BlogList/blogList";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import PostDetail from "../componets/BlogDetail/blogDetail";

export default function Blog() {
  const { path } = useRouteMatch();
  return (
    <div>
      <TwoColumns>
        <BlogList />
        <Switch>
          <Route path={`${path}/:postID`}>
            <PostDetail />
          </Route>
        </Switch>
      </TwoColumns>
    </div>
  );
}
