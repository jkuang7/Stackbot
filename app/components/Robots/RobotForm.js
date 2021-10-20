import React from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { createRobot } from "../../redux/singleRobot";

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class RobotForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.robotName.value;
    this.props.createRobot({
      name,
    });
    event.target.robotName.value = "";
  }

  render() {
    console.log(this.props.robot);
    return (
      <div>
        <Navbar />
        <h1>Add Robot</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="robotName">Robot Name:</label>
          <input type="text" id="robotName" name="robotName"></input>
          <br></br>
          <br></br>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robot: state,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    createRobot: (robot) => dispatch(createRobot(robot, history)),
  };
};

export default connect(mapState, mapDispatch)(RobotForm);
