import React from "react";
import { connect } from "react-redux";
import { fetchRobot } from "../redux/singleRobot";
import Navbar from "./Navbar";

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.fetchRobot(this.props.match.params.id);
  }
  render() {
    let { robot } = this.props;
    robot = robot || {};
    console.log(robot);
    return (
      <div>
        <Navbar />
        <div className="robotCard">
          <img
            className="robotCard__img"
            src={robot.imageUrl}
            alt="IMAGE"
          ></img>

          <div className="robotCard__text">
            <h1>{robot.name}</h1>
            <p>{`Fuel Type: ${robot.fuelType}`}</p>
            <p>{`Fuel Level: ${robot.fuelLevel}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robot: state.robot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchRobot: (id) => dispatch(fetchRobot(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleRobot);
