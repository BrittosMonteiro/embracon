import Form from "./components/form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Col className="col-sm-12 col-md-4">
        <Row className="mb-2">
          <span>
            Preencha os seus dados no formulário abaixo para que possamos entrar
            em contato
          </span>
        </Row>
        <Form />
      </Col>
    </Container>
  );
}

export default App;
