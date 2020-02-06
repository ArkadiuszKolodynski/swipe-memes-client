import React from "react";
import { Card } from "react-bootstrap";
import gravatarUrl from "gravatar-url";

class User extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.props.match.params.id && this.getUser(this.props.match.params.id);
  }

  render() {
    if (this.state.user === null) return "";
    return (
      <Card className="my-5 bg-dark text-light">
        <Card.Header className="bg-primary">User</Card.Header>
        <Card.Body>
          <img
            className="rounded-circle mb-3"
            src={gravatarUrl(this.state.user.email, {
              size: 60,
              default: "identicon"
            })}
            alt="avatar"
          />
          <Card.Text>
            <i>{this.state.user.login}</i>
          </Card.Text>
          <Card.Text>
            E-mail:{" "}
            <a href={`mailto:${this.state.user.email}`}>
              {this.state.user.email}
            </a>
          </Card.Text>
          {this.state.user.isPrivileged && (
            <Card.Text>
              <strong>Privileged user</strong>
            </Card.Text>
          )}
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
    );
  }

  async getUser(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/user/${id}`);
      if (response.ok) {
        const user = await response.json();
        this.setState({ user });
        console.log(user);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default User;
