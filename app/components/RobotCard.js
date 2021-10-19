import React from "react";

class RobotCard extends React.Component {
  render() {
    let { robot } = this.props;
    robot = robot || {};
    console.log(robot.imageUrl);
    return (
      <div className="robotCard">
        <img className = "robotCard__img" src={robot.imageUrl} alt="IMAGE"></img>
        <div className="robotCard__text">
          <h1>{robot.name}</h1>
          <p>{`Projects: ${robot.projects.length}`}</p>
          <p>{`Fuel Type: ${robot.fuelType}`}</p>
          <p>{`Fuel Level: ${robot.fuelLevel}`}</p>
        </div>
      </div>
    );
  }
}

export default RobotCard;
