import React from "react";

class RobotCard extends React.Component {
  render() {
    let { robot } = this.props;
    robot = robot || {};
    return (
      <div className="robotCard">
        <div>
          <img src={robot.imageUrl}></img>
        </div>
        <div>
          <h1>{robot.name}</h1>
          <p>{robot.fuelType}</p>
          <p>{robot.fuelLevel}</p>
        </div>
      </div>
    );
  }
}

export default RobotCard;
