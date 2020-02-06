import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import gravatarUrl from "gravatar-url";
import jwtDecode from "jwt-decode";
import Footer from "./components/Footer";
import Login from "./views/Login";
import Meme from "./views/Meme";
import Memes from "./views/Memes";
import NotFound from "./views/NotFound";
import Register from "./views/Register";
import Tag from "./views/Tag";
import Upload from "./views/Upload";
import User from "./views/User";

import logo from "./logo.svg";

class App extends React.Component {
  state = { authenticated: false, user: null };

  componentDidUpdate() {
    if (
      localStorage.getItem("jwt") &&
      !this.state.authenticated &&
      !this.state.user
    ) {
      const user = jwtDecode(localStorage.getItem("jwt"));
      this.setState({ authenticated: true, user });
    } else if (localStorage.getItem("jwt") && !this.state.authenticated) {
      this.setState({ authenticated: true });
    } else if (localStorage.getItem("jwt") && !this.state.user) {
      const user = jwtDecode(localStorage.getItem("jwt"));
      this.setState({ user });
    }
  }

  componentDidMount() {
    if (localStorage.getItem("jwt")) {
      const user = jwtDecode(localStorage.getItem("jwt"));
      this.setState({ authenticated: true, user });
    }
  }

  render() {
    return (
      <Router>
        <Navbar bg="dark" fixed="top" variant="dark">
          <Link to="/">
            <Navbar.Brand>
              <img
                alt="logo"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Swipe Memes
            </Navbar.Brand>
          </Link>
          <div className="ml-auto">
            {!this.state.authenticated && !this.state.user && (
              <div>
                <Link to="/login" className="btn btn-primary mx-1">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary mx-1">
                  Register
                </Link>
              </div>
            )}
            {this.state.authenticated && this.state.user && (
              <div className="text-light">
                <span className="mx-1">
                  <img
                    className="rounded-circle"
                    src={gravatarUrl(this.state.user.email, {
                      default: "identicon",
                      size: 30
                    })}
                    alt="avatar"
                  />
                  {` ${this.state.user.login} `}
                </span>
                <Link to="/upload" className="btn btn-primary mx-1">
                  Upload meme
                </Link>
                <Button
                  className="mx-1"
                  variant="primary"
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    this.setState({ authenticated: false, user: null });
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </Navbar>
        <Container>
          <Row>
            <Col sm="0" lg="3" />
            <Col sm="12" lg="6">
              <Switch>
                <Route
                  path="/login"
                  children={props =>
                    !this.state.authenticated ? (
                      <Login
                        {...props}
                        setAuthenticated={this.setAuthenticated}
                        setUser={this.setUser}
                      />
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                />
                <Route
                  path="/register"
                  children={props =>
                    !this.state.authenticated ? (
                      <Register {...props} />
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                />
                <Route path="/meme/:id" component={Meme} />
                <Route path="/memes/:page" component={Memes} />
                <Route path="/tag/:tag" component={Tag} />
                <Route path="/tag/:tag/:page" component={Tag} />
                <Route path="/user/:id" component={User} />
                <Route
                  path="/upload"
                  children={props => <Upload {...props} />}
                />
                <Route path="/" exact component={Memes} />
                <Route path="/" component={NotFound} />
              </Switch>
            </Col>
            <Col sm="0" lg="3" />
          </Row>
        </Container>
        <Footer />
      </Router>
    );
  }

  setAuthenticated = status => {
    this.setState({ authenticated: status });
  };

  setUser = user => {
    this.setState({ user });
  };
}

export default App;

// function App() {
//   return (
//     <Router>
//       <Navbar bg="dark" fixed="top" variant="dark">
//         <Link to="/">
//           <Navbar.Brand>
//             <img
//               alt="logo"
//               src={logo}
//               width="30"
//               height="30"
//               className="d-inline-block align-top"
//             />{" "}
//             Swipe Memes
//           </Navbar.Brand>
//         </Link>
//         <div className="ml-auto">
//           <Link to="/login" className="btn btn-primary mx-1">
//             Login
//           </Link>
//           <Link to="/register" className="btn btn-primary mx-1">
//             Register
//           </Link>
//         </div>
//       </Navbar>
//       <Container>
//         <Row>
//           <Col sm="0" lg="3" />
//           <Col sm="12" lg="6">
//             <Switch>
//               <Route path="/login" component={Login} />
//               <Route path="/register" component={Register} />
//               <Route path="/meme/:id" component={Meme} />
//               <Route path="/memes/:page" component={Memes} />
//               <Route path="/user/:id" component={User} />
//               <Route path="/" component={Memes} />
//             </Switch>
//           </Col>
//           <Col sm="0" lg="3" />
//         </Row>
//       </Container>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
