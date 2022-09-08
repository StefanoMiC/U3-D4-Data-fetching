import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

// 1) Create a Form with react-bootstrap
// 2) Control your inputs with a two way data binding = value & onChange
// 3) Having a centralised place where you can manage the form input values AKA the state!
// 4) You are going to handle the onSubmit event, by taking the values from the state and perform a fetch with POST method
// and the state values as payload.

// name --> string
// phone --> string/number
// numberOfPeople --> string/number
// dateTime --> string
// smoking --> boolean
// specialRequests --> string

class ReservationForm extends Component {
  state = {
    // this state object is going to collect all our input values
    // AS WE'RE TYPING THEM!
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: 1,
      dateTime: "",
      smoking: false,
      specialRequests: "",
    },
  };

  handleChange = (propertyToSet, valueToSet) => {
    this.setState({
      reservation: {
        ...this.state.reservation,
        [propertyToSet]: valueToSet,
      },
      // the problem comes from the fact that object properties
      // cannot take directly their names out of function parameters :(
      // in order to use a variable/argument/constant as a property name in an
      // object, you need to EVALUATE that variable/argument/constant!
      // put it into []! that will take the value of your argument (not its name)
      // and use it as the property name
    });
  };

  handleSubmit = async e => {
    // e is the form submission event, your function gets it automatically!
    e.preventDefault();
    // e.preventDefault() will STOP the default behaviour of the form aka refreshing the page!

    // we have 2 ways of dealing with Promises:
    // 1) chain .then methods
    // fetch("https://striveschool-api.herokuapp.com/api/reservation", {
    //   method: "POST",
    //   body: JSON.stringify(this.state.reservation),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       alert("everything went fine");

    //       //this will only reset the form if everything go fine
    //       //   this.setState({
    //       //     reservation: {
    //       //       name: "",
    //       //       phone: "",
    //       //       numberOfPeople: 1,
    //       //       dateTime: "",
    //       //       smoking: false,
    //       //       specialRequests: "",
    //       //     },
    //       //   });

    //       return response.json();
    //     } else {
    //       alert("something went wrong");
    //     }
    //   })
    //   .then(reservationObj => console.log(reservationObj))
    //   .catch(error => {
    //     alert("something went wrong");
    //     console.log(error);
    //     //this will only reset the form if everything go fine
    //     //   this.setState({
    //     //     reservation: {
    //     //       name: "",
    //     //       phone: "",
    //     //       numberOfPeople: 1,
    //     //       dateTime: "",
    //     //       smoking: false,
    //     //       specialRequests: "",
    //     //     },
    //     //   });
    //   })
    //   .finally(() => {
    //     console.log("this will happen regardless of the outcome of the fetch!");
    //     this.setState({
    //       reservation: {
    //         name: "",
    //         phone: "",
    //         numberOfPeople: 1,
    //         dateTime: "",
    //         smoking: false,
    //         specialRequests: "",
    //       },
    //     });
    //   });

    // 2) async/await
    // all the values are already safely stored in this.state.reservation
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/reservation",
        {
          method: "POST",
          body: JSON.stringify(this.state.reservation),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        // the "ok" property tells us the positive outcome of the network call
        alert("reservation saved");
        // this.setState({
        //   reservation: {
        //     name: "",
        //     phone: "",
        //     numberOfPeople: 1,
        //     dateTime: "",
        //     smoking: false,
        //     specialRequests: "",
        //   },
        // });

        const reservationObj = await response.json();

        console.log(reservationObj);
      }
    } catch (error) {
      console.log(error);
      // this means most likely your internet connection has a problem
      // ...because you never reached the server in the first place!
    } finally {
      this.setState({
        reservation: {
          name: "",
          phone: "",
          numberOfPeople: 1,
          dateTime: "",
          smoking: false,
          specialRequests: "",
        },
      });
    }
  };

  render() {
    return (
      <div className="my-3 text-center">
        <h2>Reservation Form</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>What's your name?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insert your name here"
              value={this.state.reservation.name}
              onChange={event => {
                this.handleChange("name", event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>What's your phone number?</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Insert number like: +34900000000"
              value={this.state.reservation.phone}
              onChange={e => {
                //setState merges the object you're passing to it
                //it's a MERGING process, you are responsible to keep the previous properties there.

                // this.setState({
                //   reservation: {
                //     // I'd like to remember also the OTHER existing values!
                //     // I have to set the new reservation object starting from
                //     // what I already have! otherwise I'm losing all the other properties (name, numberOfPeople etc.)
                //     ...this.state.reservation,
                //     // the spread operator ... is taking into here
                //     // all the existing pairs of key/value from the object
                //     // I'm spreading
                //     phone: event.target.value,
                //   },
                // });

                this.handleChange("phone", e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>How many people are you bringing with you?</Form.Label>
            <Form.Control
              as="select"
              value={this.state.reservation.numberOfPeople}
              onChange={e => {
                this.handleChange("numberOfPeople", e.target.value);
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>When are you coming?</Form.Label>
            <Form.Control
              type="datetime-local"
              value={this.state.reservation.dateTime}
              onChange={e => {
                this.handleChange("dateTime", e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Do you smoke?"
              // the "value" property in checkboxes is NOT true/false!
              // in order to take true/false as a value from a checkbox
              // we need to read another property: 'checked'
              checked={this.state.reservation.smoking}
              onChange={e => {
                this.handleChange("smoking", e.target.checked);
              }}
            />
          </Form.Group>

          {this.state.reservation.smoking && (
            <Form.Group>
              <Form.Label>Special Request</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Insert any special requests here"
                value={this.state.reservation.specialRequests}
                onChange={e => {
                  this.handleChange("specialRequests", e.target.value);
                }}
              />
            </Form.Group>
          )}

          <Button variant="info" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default ReservationForm;
