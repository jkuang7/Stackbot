import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProject } from "../../redux/singleProject";
import { fetchProjects, fetchProjectsByRobotId } from "../../redux/projects";
import { deleteRobotProject } from "../../redux/robotProjects";

class ProjectCard extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleUnassign = this.handleUnassign.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { robotProject, projectToRemove, robot } = this.props;
    if (this.props.xBtnBool && projectToRemove !== prevProps.projectToRemove) {
      this.props.fetchProjects();
    } else if (
      !this.props.xBtnBool &&
      robotProject !== prevProps.robotProject
    ) {
      this.props.fetchProjectsByRobotId(robot.id);
    }
  }

  handleUnassign(event) {
    const { robot, project } = this.props;
    this.props.deleteRobotProject(robot.id, project.id);
  }

  handleDelete(event) {
    this.props.deleteProject(event.target.value);
  }

  projectButtons() {
    const { project } = this.props;
    return this.props.xBtnBool ? (
      <button type="button" onClick={this.handleDelete} value={project.id}>
        x
      </button>
    ) : (
      <div>
        <button type="button" onClick={this.handleUnassign}>
          Unassign
        </button>
      </div>
    );
  }

  projectCardText() {
    let { project } = this.props;
    return (
      <div className="modelContainer__projectText">
        <Link to={`/projects/${project.id}`}>
          <h1>{project.title}</h1>
        </Link>
        <p>{`Completed: ${project.completed}`}</p>
        <p>{`Deadline: ${project.deadline}`}</p>
        <p>{`Priority: ${project.priority}`}</p>
        {this.projectButtons()}
      </div>
    );
  }

  render() {
    return <div className="modelContainer__card">{this.projectCardText()}</div>;
  }
}

const mapState = (state) => {
  return {
    robot: state.robot,
    projectToRemove: state.project,
    robotProject: state.robotProject,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteProject: (id) => dispatch(deleteProject(id)),
    fetchProjects: () => dispatch(fetchProjects()),
    deleteRobotProject: (robotId, projectId) =>
      dispatch(deleteRobotProject(robotId, projectId)),
    fetchProjectsByRobotId: (id) => dispatch(fetchProjectsByRobotId(id)),
  };
};

export default connect(mapState, mapDispatch)(ProjectCard);
