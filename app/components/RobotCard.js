import React from "react";
import { Link } from "react-router-dom";

class RobotCard extends React.Component {
  render() {
    let { robot } = this.props;
    robot = robot || {};
    return (
      <div className="robotCard">
        <img className="robotCard__img" src={robot.imageUrl} alt="IMAGE"></img>

        <div className="robotCard__text">
          <Link to={`/robots/${robot.id}`}>
            <h1>{robot.name}</h1>
          </Link>
          <p>{`Projects: ${robot.projects.length}`}</p>
          <p>{`Fuel Type: ${robot.fuelType}`}</p>
          <p>{`Fuel Level: ${robot.fuelLevel}`}</p>
        </div>
      </div>
    );
  }
}

export default RobotCard;
