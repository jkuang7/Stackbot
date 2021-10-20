import React from "react";
import { Link } from "react-router-dom";

class RobotCard extends React.Component {
  robotCardImg(robot) {
    return (
      <img className="robotCard__img" src={robot.imageUrl} alt="IMAGE"></img>
    );
  }

  robotCardText(robot) {
    return (
      <div className="robotCard__text">
        <Link to={`/robots/${robot.id}`}>
          <h1>{robot.name}</h1>
        </Link>
        <p>{`Projects: ${robot.projects.length}`}</p>
        <p>{`Fuel Type: ${robot.fuelType}`}</p>
        <p>{`Fuel Level: ${robot.fuelLevel}`}</p>
      </div>
    );
  }

  render() {
    let { robot } = this.props;
    robot = robot || {};

    return (
      <div className="robotCard">
        {this.robotCardImg(robot)}
        {this.robotCardText(robot)}
      </div>
    );
  }
}

export default RobotCard;
