import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteRobot } from "../../redux/singleRobot";
import { fetchRobots } from "../../redux/robots";

class RobotCard extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUnassign = this.handleUnassign.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { deletedRobot } = this.props;
    if (deletedRobot !== prevProps.deletedRobot) {
      this.props.fetchRobots();
    }
  }

  handleUnassign(event) {
    console.log(event.target.value);
  }

  handleDelete(event) {
    this.props.deleteRobot(event.target.value);
  }

  robotCardImg(robot) {
    return (
      <img className="robotCard__img" src={robot.imageUrl} alt="IMAGE"></img>
    );
  }

  robotCardText(robot) {
    let { projects } = robot;
    projects = projects || [];
    return (
      <div className="robotCard__text">
        <Link to={`/robots/${robot.id}`}>
          <h1>{robot.name}</h1>
        </Link>
        <p>{`Projects: ${projects.length}`}</p>
        <p>{`Fuel Type: ${robot.fuelType}`}</p>
        <p>{`Fuel Level: ${robot.fuelLevel}`}</p>
        {this.props.xBtnBool ? (
          <button type="button" onClick={this.handleDelete} value={robot.id}>
            x
          </button>
        ) : (
          <div>
            <button type="button" value={robot.id}>
              Mark Complete
            </button>
            <button
              type="button"
              value={robot.id}
              onClick={this.handleUnassign}
            >
              Unassign
            </button>
          </div>
        )}
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

const mapState = (state) => {
  return {
    deletedRobot: state.robot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteRobot: (id) => dispatch(deleteRobot(id)),
    fetchRobots: () => dispatch(fetchRobots()),
  };
};

export default connect(mapState, mapDispatch)(RobotCard);
