// We are still going to use a class for this component
// Because we need to make use of the state once again, but also because we are going to fetch some data
// fetching data for feeding a component MUST BE DONE in a special place that only exists in class based components!

import { Component } from "react";
// import { ListGroup } from "react-bootstrap"; // this imports the whole library and uses a small portion of it
import ListGroup from "react-bootstrap/ListGroup"; //this shakes off all the unnecessary weight of the library and takes in only the list group component
import Spinner from "react-bootstrap/Spinner"; //this shakes off all the unnecessary weight of the library and takes in only the list group component
import Alert from "react-bootstrap/Alert"; //this shakes off all the unnecessary weight of the library and takes in only the list group component
import Badge from "react-bootstrap/Badge"; //this shakes off all the unnecessary weight of the library and takes in only the list group component

import { parseISO, format } from "date-fns";

// 1) We are going to create an empty state, for holding the reservations list at a later point
// 2) We are going to bind between UI and STATE, and so the INTERFACE will be updated automatically by the render() method
// 3) Now it's time to fill up the STATE! We are going to fetch the reservations list and use this.setState() to put them into the state
// 4) We shouldn't launch our fetchReservations() function from render().... because render() fires again every time the setState is used
// 5) we should find a method that is GUARANTEED to execute ONLY ONCE!
// 6) and that method is called componentDidMount, and if present, will be executed after the initial render() invokation!

// - first render invocation takes into the page the static elements: the tile, an empty list, the side components etc...
// - after the first render, componentDidMount gets executed AUTOMATICALLY (if one is present)
// - componentDidMount takes care of executing the fetch() for us, because it's guaranteed to NOT be executed again!
// - after getting the data from the API, componentDidMount usually sets the state with the data (not re-triggered by the setState)
// - after setting the state, the render() method wakes up again AUTOMATICALLY and fires again.
// This time evaluates what's changed in the UI (thanks to the VIRTUAL DOM) and updates only that piece of information that requires changing.

class ReservationList extends Component {
  state = {
    reservations: [],
    // we initialize the reservations state with an empty array for conveniency (we don't need to check for validity of the state)
    isLoading: true,
    hasAlert: false,
    alertMessage: { variant: "", message: "" },
  };

  fetchReservations = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/reservation"
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          this.setState({
            hasAlert: true,
            alertMessage: { variant: "info", message: "No resvervations yet!" },
          });
        }
        console.log("RESERVATIONS LIST!", data);
        // we need to set the new state in order to trigger the change in the UI
        // this.setState({ reservations: data, isLoading: false });
        this.setState({ reservations: data });
      } else {
        console.log("Error happened during fetch");

        this.setState({ hasError: true });
        // this.setState({ isLoading: false });
        this.setState({
          hasAlert: true,
          alertMessage: {
            variant: "danger",
            message: "Oh no, we had an issue retrieving your data! ☹",
          },
        });
      }
    } catch (error) {
      // if connection is unavailable you will fall here
      console.log("Unable to fetch");
      this.setState({ hasError: true });
      this.setState({
        hasAlert: true,
        alertMessage: {
          variant: "danger",
          message: "Fatal Error, unable to fetch your data! 💀",
        },
      });
      //   this.setState({ isLoading: false });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount = () => {
    // this method has a reserved keyword (you cannot create your own "componentDidMount" method)
    // this method guarantees to be executing JUST ONCE at the end of the component mounting process
    this.fetchReservations();
    console.log("I'm the COMPONENTDIDMOUNT");
    // this method is mostly used for fetching data
  };

  render() {
    // let's try to launch it from the render() method
    // this.fetchReservations(); // infinite loop
    // WRONG INDEA
    // Don't do your fethces in the render method.
    // the render() method will be triggered by a setState, so you can't call functions that use setState inside.
    console.log("I'm the RENDER method");
    return (
      <div className="mt-3">
        <h2>Reservations List</h2>
        {/* {!this.state.hasError &&
          !this.state.isLoading &&
          this.state.reservations.length === 0 && (
            <Alert variant="info">
              No reservations yet to show, try again later...
            </Alert>
          )} */}
        {this.state.hasAlert && (
          <Alert variant={this.state.alertMessage.variant}>
            {this.state.alertMessage.message}
          </Alert>
        )}
        {this.state.isLoading && <Spinner animation="grow" variant="success" />}
        <ListGroup>
          {this.state.reservations.map(bookedTable => (
            <ListGroup.Item key={bookedTable._id}>
              {bookedTable.name} for {bookedTable.numberOfPeople}
              <Badge variant="dark" className="ml-3">
                {format(parseISO(bookedTable.dateTime), "MMMM do yyyy — HH:mm")}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default ReservationList;
