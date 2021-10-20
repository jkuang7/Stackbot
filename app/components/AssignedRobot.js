import React from "react";
import RobotCard from "./RobotCard";

class AssignedRobot extends React.Component {
  render() {
    let { robot } = this.props;
    console.log(this.props);
    robot = robot || {};
    return (
      <div>
        {/* robot !== {} ? <RobotCard robot={robot} /> : <p></p> */}
      </div>
    );
  }
}

export default AssignedRobot;
