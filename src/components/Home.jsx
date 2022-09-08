import { Component } from "react";

import {
  Container,
  Row,
  Col,
  Carousel,
  ListGroup,
  Badge,
} from "react-bootstrap";

import arrayOfPastas from "../data/menu.json"; /* this creates a variable that we can use: arrayOfPastas */
import ReservationForm from "./ReservationForm";
import ReservationList from "./ReservationList";

class Home extends Component {
  // the render() method is the ONLY MANDATORY part of a class based component

  // in class components, you have a particular way of storing temporary data, like a temporary memory object that you can use!
  // this "memory" object is called THE STATE

  // We have the state ONLY in class based components!
  // state is also a reserved keyword

  state = {
    // We want to keep track of the selected pasta dish
    selectedPasta: null,
  };

  render() {
    // console.log(this.state.selectedPasta);
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="mt-md-5">
            <ReservationList />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="mt-md-5">
            <ReservationForm />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="mt-md-5">
            <Carousel>
              {/* The map method takes an array and returns a piece of JSX, REMEMBER to assign a unique key prop to the immediate element you are returning */}
              {arrayOfPastas.map((pasta, index) => (
                <Carousel.Item
                  key={`dish-${index}`}
                  className={
                    this.state.selectedPasta?.id === pasta.id && "selectedState"
                  }
                >
                  <img
                    className="d-block w-100"
                    src={pasta.image}
                    alt="First slide"
                    onClick={() => {
                      console.log("you clicked an image!");

                      //   Every time I click the image, change the selectedPasta value in the state

                      // the state object is READ-ONLY!
                      // the only way for changing the state object is by using..
                      // a specific method called setState() found on the "this" object => this.setState()

                      // this is horribly wrong!! --> this.state.selectedPasta = {}  DONT DO IT!
                      this.setState({ selectedPasta: pasta });
                    }}
                  />
                  {this.state.selectedPasta &&
                    this.state.selectedPasta.id === pasta.id && (
                      <Badge
                        pill
                        variant="success"
                        style={{ position: "absolute", top: 10, right: 15 }}
                      >
                        Selected
                      </Badge>
                    )}
                  <Carousel.Caption>
                    <h3>{pasta.name}</h3>
                    <p>{pasta.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-3">
          <Col xs={12} md={6} className="text-center">
            {/* we need to check whether we have a state different than "null" before we try to use its data */}
            {/* failing in doing so will make you application break */}
            {this.state.selectedPasta ? (
              <>
                <h3>Reviews for {this.state.selectedPasta.name}</h3>
                <ListGroup variant="flush">
                  {/* I want to generate as many List items as I have elements in the comments array,
                        that can be found in the selectedPasta property in the state */}
                  {this.state.selectedPasta.comments.map((review, i) => (
                    <ListGroup.Item key={`review-${i}`}>
                      {review.author} — {review.comment}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            ) : (
              <p>
                No Reviews to be shown yet! <br /> Click on an image to see them
              </p>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
