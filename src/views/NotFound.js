import React from "react";

class NotFound extends React.Component {
  state = {};
  render() {
    return (
      <div className="w-100 my-5 text-center text-light">
        <h1 className="display-1">
          404
          <br />
          not found!
        </h1>
      </div>
    );
  }
}

export default NotFound;
