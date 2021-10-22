import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteRobot } from "../../redux/singleRobot";
import { fetchRobots } from "../../redux/robots";
import { deleteAssignedRobot } from "../../redux/singleRobot";
import { fetchRobotsByProjectId } from "../../redux/robots";

class RobotCard extends React.Component {
  constructor() {
    super();
    this.state = {
      removeRobot: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUnassign = this.handleUnassign.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { robot, project } = this.props;
    if (this.props.xBtnBool && robot !== prevProps.robot) {
      this.props.fetchRobots();
    } else if(!this.props.xBtnBool && robot !== prevProps.robot) {
      this.props.fetchRobotsByProjectId(project.id);
    }
  }

  handleUnassign(event) {
    this.props.deleteAssignedRobot(event.target.value);
  }

  handleDelete(event) {
    this.props.deleteRobot(event.target.value);
  }

  robotCardImg(robot) {
    return (
      <img className="robotCard__img" src={robot.imageUrl} alt="IMAGE"></img>
    );
  }

  robotButtons(robot) {
    return this.props.xBtnBool ? (
      <button type="button" onClick={this.handleDelete} value={robot.id}>
        x
      </button>
    ) : (
      <div>
        <button type="button" value={robot.id}>
          Mark Complete
        </button>
        <button type="button" value={robot.id} onClick={this.handleUnassign}>
          Unassign
        </button>
      </div>
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
        {this.robotButtons(robot)}
      </div>
    );
  }

  render() {
    let { someRobot } = this.props;
    let { removeRobot } = this.state;
    someRobot = someRobot || {};
    removeRobot = removeRobot || false;
    return !removeRobot ? (
      <div className="robotCard">
        {this.robotCardImg(someRobot)}
        {this.robotCardText(someRobot)}
      </div>
    ) : (
      <p></p>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.project,
    robots: state.robots,
    robot: state.robot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteRobot: (id) => dispatch(deleteRobot(id)),
    fetchRobots: () => dispatch(fetchRobots()),
    deleteAssignedRobot: (id) => dispatch(deleteAssignedRobot(id)),
    fetchRobotsByProjectId: (id) => dispatch(fetchRobotsByProjectId(id)),
  };
};

export default connect(mapState, mapDispatch)(RobotCard);
