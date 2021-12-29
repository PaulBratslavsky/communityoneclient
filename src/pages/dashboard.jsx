import { Container } from 'react-bootstrap';
import Pane from '../componets/Pane/pane';
import AddPost from '../componets/AddPost/addPost';
import AddProject from '../componets/AddProject/addProject';

export default function Dashboard() {
  return (
    <Container>
        <Pane>
          <AddProject />
        </Pane>
        <Pane>
          <AddPost />
        </Pane>
    </Container>
  );
}