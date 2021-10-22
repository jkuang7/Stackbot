import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProject } from "../../redux/singleProject";
import { fetchProjects } from "../../redux/projects";

class ProjectCard extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { deletedProject } = this.props;
    if (deletedProject !== prevProps.deletedProject) {
      this.props.fetchProjects();
    }
  }
  handleDelete(event) {
    this.props.deleteProject(event.target.value);
  }

  render() {
    let { project } = this.props;
    project = project || {};
    return (
      <div className="projectCard smallerDiv">
        <Link to={`/projects/${project.id}`}>
          <h1>{project.title}</h1>
        </Link>
        <p>{`Completed: ${project.completed}`}</p>
        <p>{`Deadline: ${project.deadline}`}</p>
        <p>{`Priority: ${project.priority}`}</p>
        <button type="button" onClick={this.handleDelete} value={project.id}>
          x
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    deletedProject: state.project,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteProject: (id) => dispatch(deleteProject(id)),
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(ProjectCard);
