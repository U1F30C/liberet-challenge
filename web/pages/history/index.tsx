import React from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Log } from "../../models/log";
import { logsService } from "../../services/logs.service";
const LogOperationMap = {
  Consume: "Servicio usado",
  Start: "Servicio activado",
  Stop: "Servicio desactivado",
};

export default class LogHistory extends React.Component<
  null,
  { logs: Log[] }
> {
  constructor(props) {
    super(props);
    this.state = { logs: [] };
  }
  async fetchData() {
    const logs = await logsService.getAllLogs();
    this.setState({ logs });
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Container className="md-container">
        <Container>
          <h1>Historial</h1>

          <Container>
            {this.state.logs.map((log) => {
              return (
                <>
                  <Row className="justify-content-md-between w-100">
                    <Card className="sml-card w-100">
                      <Card.Body>
                        <Card.Title>
                          {LogOperationMap[log.operation]}
                        </Card.Title>
                        <Card.Text>Costo: {log.cost}</Card.Text>
                        <Card.Text>Servicio: {log.service.name}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Row>
                </>
              );
            })}
          </Container>
        </Container>

        <footer className="cntr-footer">
          <a
            href="https://vercel.com?filter=next.js&utm_source=github&utm_medium=example&utm_campaign=next-example"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className="sml-logo" />
          </a>
        </footer>
      </Container>
    );
  }
}
