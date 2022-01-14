import { Container } from "react-bootstrap";
import Pane from "../componets/Pane/pane";
import { Routes, Route, Link } from "react-router-dom";
import TwoColumns from "../componets/TwoColumns/twoColumns";
import AddProject from "../componets/AddProject/addProject";
import AddPost from "../componets/AddPost/addPost";

const path = "/dashboard";

export default function Dashboard() {
  return (
    <Container>
      <TwoColumns>
        <Pane>menu</Pane>
        <Pane>
          dashboard
          <div>
            <h1>Hey welcome home!</h1>
            <div className="links">
              <Link to={`${path}/projects`} className="link">
                Projects
              </Link>
              <Link to={`${path}/posts`} className="link">
                Posts
              </Link>
              <Link to={`${path}/issues`} className="link">
                Issues
              </Link>
            </div>
            <div className="tabs">
            <Routes>
              <Route path={`/projects`}  element={<AddProject />} />
              <Route path={`/posts`}  element={<AddPost />} />
              <Route path={`/issues`}  element={<h1>Issues</h1>} />
            </Routes>
            </div>
          </div>
        </Pane>
      </TwoColumns>
    </Container>
  );
}
