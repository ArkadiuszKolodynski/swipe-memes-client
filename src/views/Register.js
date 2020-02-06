import React from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
  }
  render() {
    return (
      <div className="my-5">
        {this.state.showAlert && (
          <Alert
            variant="danger"
            onClose={() => {
              this.setState({ showAlert: false });
            }}
            dismissible
          >
            Try again!
          </Alert>
        )}
        <Card bg="dark" className="text-light">
          <Card.Header className="bg-primary">Register</Card.Header>
          <Card.Body>
            <Form
              onSubmit={event => {
                event.preventDefault();
                this.submitForm();
              }}
            >
              <Form.Group controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref="email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="login">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  ref="login"
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  ref="password"
                  required
                />
              </Form.Group>
              <Button className="mt-2" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

  async submitForm() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        method: "POST",
        body: JSON.stringify({
          email: this.refs.email.value,
          login: this.refs.login.value,
          password: this.refs.password.value
        }),
        headers: {
          "Content-type": "application/json"
        }
      });
      console.log(response);
      if (response.ok) {
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default Register;
