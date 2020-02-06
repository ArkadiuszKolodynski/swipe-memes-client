import React from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.refs.login.focus();
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
            Invalid credentials!
          </Alert>
        )}
        <Card bg="dark" className="text-light">
          <Card.Header className="bg-primary">Login</Card.Header>
          <Card.Body>
            <Form
              onSubmit={event => {
                event.preventDefault();
                this.submitForm();
              }}
            >
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
      const response = await fetch("http://localhost:3000/api/v1/auth", {
        method: "POST",
        body: JSON.stringify({
          login: this.refs.login.value,
          password: this.refs.password.value
        }),
        headers: {
          "Content-type": "application/json"
        }
      });
      if (response.ok) {
        const token = await response.json();
        localStorage.setItem("jwt", token.jwt);
        this.props.setAuthenticated(true);
      } else if (response.status === 401) {
        this.setState({ showAlert: true });
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default Login;
