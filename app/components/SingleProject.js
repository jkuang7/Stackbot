import React from "react";
import { connect } from "react-redux";
import { fetchProject } from "../redux/singleProject";
import Navbar from "./Navbar";
import AllProjectRobots from "./AllProjectRobots";

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
  }

  projectCardDescription(project) {
    return <p className="centerFlex">{project.description}</p>;
  }

  projectCardText(project) {
    return (
      <div className="projectCard__text">
        <h1>{project.title}</h1>
        <p>{`Deadline: ${project.deadline}`}</p>
        <p>{`Completed: ${project.completed}`}</p>
        <p>{`Priority: ${project.priority}`}</p>
      </div>
    );
  }

  projectCard(project) {
    return (
      <div className="projectCard--description">
        {this.projectCardDescription(project)}
        {this.projectCardText(project)}
      </div>
    );
  }

  render() {
    let { project } = this.props;
    project = project || {};
    return (
      <div>
        <Navbar />
        <div className="bigCard">{this.projectCard(project)}</div>
        <h2>Robots assigned to this project</h2>
        <AllProjectRobots robots={project.robots} />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.project,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
