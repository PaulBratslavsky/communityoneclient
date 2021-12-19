import { Container } from 'react-bootstrap';
import Pane from '../componets/Pane/pane';
import MarkdownEditor from '../componets/MarkdownEditor/markdownEditor';
import AddProject from '../componets/AddProject/addProject';

export default function Dashboard() {
  return (
    <Container>
        <Pane>
          <AddProject />
        </Pane>
        <Pane>
          <h2>Work in progress.</h2>
          <p>Working on being able to post markdown blog to strapi.</p>
          <MarkdownEditor />
        </Pane>
    </Container>
  );
}
