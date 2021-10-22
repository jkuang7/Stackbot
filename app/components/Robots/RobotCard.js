import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteRobot } from "../../redux/singleRobot";
import { fetchRobots, fetchRobotsByProjectId } from "../../redux/robots";
import { deleteRobotProject } from "../../redux/robotProjects";

class RobotCard extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUnassign = this.handleUnassign.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { robotProject, project } = this.props;
    if (this.props.xBtnBool && robotProject !== prevProps.robotProject) {
      this.props.fetchRobots();
    } else if (
      !this.props.xBtnBool &&
      robotProject !== prevProps.robotProject
    ) {
      this.props.fetchRobotsByProjectId(project.id);
    }
  }

  handleUnassign(event) {
    const { robot, project } = this.props;
    this.props.deleteRobotProject(robot.id, project.id);
  }

  handleDelete(event) {
    this.props.deleteRobot(event.target.value);
  }

  robotCardImg() {
    const { robot } = this.props;
    return (
      <img className="robotCard__img" src={robot.imageUrl} alt="IMAGE"></img>
    );
  }

  robotButtons() {
    const { robot } = this.props;
    return this.props.xBtnBool ? (
      <button type="button" onClick={this.handleDelete} value={robot.id}>
        x
      </button>
    ) : (
      <div>
        <button type="button" value={robot.id} onClick={this.handleUnassign}>
          Unassign
        </button>
      </div>
    );
  }

  robotCardText() {
    let { robot } = this.props;
    return (
      <div className="robotCard__text">
        <Link to={`/robots/${robot.id}`}>
          <h1>{robot.name}</h1>
        </Link>
        <p>{`Projects: ${robot.projects.length}`}</p>
        <p>{`Fuel Type: ${robot.fuelType}`}</p>
        <p>{`Fuel Level: ${robot.fuelLevel}`}</p>
        {this.robotButtons()}
      </div>
    );
  }

  render() {
    return (
      <div className="robotCard">
        {this.robotCardImg()}
        {this.robotCardText()}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.project,
    robotProject: state.robotProject,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteRobot: (id) => dispatch(deleteRobot(id)),
    fetchRobots: () => dispatch(fetchRobots()),
    deleteRobotProject: (robotId, projectId) =>
      dispatch(deleteRobotProject(robotId, projectId)),
    fetchRobotsByProjectId: (id) => dispatch(fetchRobotsByProjectId(id)),
  };
};

export default connect(mapState, mapDispatch)(RobotCard);
