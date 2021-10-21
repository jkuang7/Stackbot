import React from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { fetchProject, updateProject } from "../../redux/singleProject";

export class ProjectEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      project: {
        title: "",
        deadline: new Date(),
        priority: 1,
        completed: false,
        description: "",
      },
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.project !== prevProps.project) {
      console.log(this.props.project);
      console.log(prevProps.project);
      this.setState({
        project: this.props.project,
      });
    }
  }

  handleChange(event) {
    this.setState({
      project: {
        ...this.state.project,
        [`${event.target.id}`]: event.target.value,
      },
    });
  }

  handleSave(event) {
    event.preventDefault();
    const { project } = this.state;
    this.props.updateProject(project);
  }

  // formatDate = (date = new Date()) => {
  //   const month = date.getUTCMonth() + 1;
  //   const day = date.getUTCDate();
  //   const year = date.getUTCFullYear();
  //   return `${month}/${day}/${year}`;
  // };

  projectForm() {
    let { project } = this.state;
    project = project || {};
    return (
      <form onSubmit={this.handleSave}>
        <label>
          Project Title
          <input
            type="text"
            id="title"
            name="title"
            value={project.title}
            onChange={this.handleChange}
          ></input>
        </label>
        <br></br>

        <label>
          Deadline
          <input
            type="text"
            id="deadline"
            name="deadline"
            value={project.deadline} //Verify this works
            onChange={this.handleChange}
          ></input>
        </label>
        <br></br>

        <label>
          Priority
          <input
            type="text"
            id="priority"
            name="priority"
            value={project.priority}
            onChange={this.handleChange}
          ></input>
        </label>
        <br></br>

        <label>
          Complete
          <input
            type="text"
            id="completed"
            name="completed"
            value={project.completed}
            onChange={this.handleChange}
          ></input>
        </label>
        <br></br>

        <input type="submit" value="Save Changes"></input>
      </form>
    );
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Edit Project</h1>
        {this.projectForm()}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.project
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id)),
    updateProject: (project) => dispatch(updateProject(project, history)),
  };
};

export default connect(mapState, mapDispatch)(ProjectEdit);
