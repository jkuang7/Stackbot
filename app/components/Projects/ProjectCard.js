import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteProject,
  deleteAssignedProject,
} from "../../redux/singleProject";
import { fetchProjects, fetchProjectsByRobotId } from "../../redux/projects";

class ProjectCard extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleUnassign = this.handleUnassign.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { projectToBeRemoved, robot } = this.props;
    if (
      this.props.xBtnBool &&
      projectToBeRemoved !== prevProps.projectToBeRemoved
    ) {
      this.props.fetchProjects();
    } else if (
      !this.props.xBtnBool &&
      projectToBeRemoved !== prevProps.projectToBeRemoved
    ) {
      console.log("Testing?")
      this.props.fetchProjectsByRobotId(robot.id);
    }
  }

  handleUnassign(event) {
    
    this.props.deleteAssignedProject(event.target.value);
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
        <button type="button" value={project.id} onClick={this.handleUnassign}>
          Unassign
        </button>
      </div>
    );
  }

  projectCardText() {
    let { project } = this.props;
    return (
      <div className="">
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
    console.log(this.props);
    return <div className="projectCard">{this.projectCardText()}</div>;
  }
}

const mapState = (state) => {
  return {
    robot: state.robot,
    projectToBeRemoved: state.project,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteProject: (id) => dispatch(deleteProject(id)),
    fetchProjects: () => dispatch(fetchProjects()),
    deleteAssignedProject: (id) => dispatch(deleteAssignedProject(id)),
    fetchProjectsByRobotId: (id) => dispatch(fetchProjectsByRobotId(id))
  };
};

export default connect(mapState, mapDispatch)(ProjectCard);
