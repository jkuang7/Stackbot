import React from "react";
import RobotCard from "./RobotCard";

class AssignedRobot extends React.Component {
  render() {
    let { robot, state } = this.props;
    robot = robot || {};
    robot.projects = state.projects;
    return (
      <div className="smallerDiv">
        {robot !== {} ? <RobotCard robot={robot}/> : <p></p>}
      </div>
    );
  }
}

export default AssignedRobot;
