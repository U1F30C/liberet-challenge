import Head from "next/head";
import React from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { AppNavbar } from "../../components/navbar";
import { RechargeModal } from "../../components/recharge-modal";
import { Service } from "../../models/service";
import { servicesService } from "../../services/services.service";
import { walletService } from "../../services/wallet-service";

export default class ServicesList extends React.Component<
  any,
  { services: Service[]; credits: string; showModal: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { services: [], credits: "0", showModal: false };
    this.onRecharge = this.onRecharge.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  async fetchData() {
    const services = await servicesService.getAllServices();
    const credits = await walletService.getCredits();
    this.setState({ services, credits });
  }
  componentDidMount() {
    this.fetchData();
  }

  async doAction(service: Service) {
    const isConsumable = service.serviceType == "Immediate";
    if (isConsumable) {
      await servicesService
        .useService(service.id)
        .catch(() => console.log("No hay suficientes créditos"));
    } else {
      const isStartable = !service.activeServices[0];
      if (isStartable) {
        await servicesService.startService(service.id);
      } else {
        await servicesService.stopService(service.id);
      }
    }
    await this.fetchData();
  }

  onCloseModal() {
    this.setState({ showModal: false });
  }

  async onRecharge(amount: string) {
    await walletService.rechargeCredits(amount);

    this.setState({ showModal: false });
    await this.fetchData();
  }

  render() {
    return (
      <>
        <AppNavbar />
        <Container className="md-container">
          <Container>
            <Row className="justify-content-md-between">
              <div />
              <h2></h2>
              <Button
                variant="success"
                onClick={() => this.setState({ showModal: true })}
              >
                Créditos: {this.state.credits}
              </Button>
            </Row>
            <h1>Servicios</h1>
            <RechargeModal
              show={this.state.showModal}
              onCancel={this.onCloseModal}
              onSave={this.onRecharge}
            />

            <Container>
              <Row className="justify-content-md-between">
                {this.state.services.map((service) => {
                  const isConsumable = service.serviceType == "Immediate";

                  const isStartable = !service.activeServices[0];
                  const isPayable =
                    parseFloat(service.cost) <= parseFloat(this.state.credits);

                  return (
                    <>
                      <Card className="sml-card">
                        <Card.Body>
                          <Card.Title>{service.name}</Card.Title>
                          <Card.Text>
                            Costo: {service.cost}{" "}
                            {isConsumable ? "" : " por minuto"}
                          </Card.Text>
                          <Button
                            variant="primary"
                            onClick={() => this.doAction(service)}
                            disabled={isConsumable && !isPayable}
                          >
                            {isConsumable
                              ? "Usar servicio"
                              : isStartable
                              ? "Activar servicio"
                              : "Detener servicio"}
                          </Button>
                        </Card.Body>
                      </Card>
                    </>
                  );
                })}
              </Row>
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
      </>
    );
  }
}
