import React from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { createProject } from "../../redux/singleProject";

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class ProjectForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = event.target.projectName.value;
    this.props.createProject({
      title,
    });
    event.target.projectName.value = "";
  }

  projectForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="projectName">Project Name:</label>
        <input type="text" id="projectName" name="projectName"></input>
        <br></br>
        <br></br>
        <input type="submit"></input>
      </form>
    );
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Add Project</h1>
        {this.projectForm()}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    createProject: (project) => dispatch(createProject(project, history)),
  };
};

export default connect(mapState, mapDispatch)(ProjectForm);
