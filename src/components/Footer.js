import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-dark footer text-center text-light">
        Swipe Memes © {new Date().getFullYear()}
      </footer>
    );
  }
}

export default Footer;
