import React from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { fetchProject, updateProject } from "../../redux/singleProject";
import { fetchRobotsByProjectId } from "../../redux/robots";
import RobotCard from "../Robots/RobotCard";
import Axios from "axios";
import { addRobotProject } from "../../redux/robotProjects";

export class ProjectEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      project: {
        title: "",
        deadline: "",
        priority: 1,
        completed: false,
        description: "",
      },
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddToProject = this.handleAddToProject.bind(this);
  }

  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
    this.props.fetchRobotsByProjectId(this.props.match.params.id);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.project !== prevProps.project) {
      this.setState({
        project: this.props.project,
      });
    }

    if (this.props.robotProject !== prevProps.robotProject) {
      this.props.fetchRobotsByProjectId(this.props.match.params.id);
    }

    if (this.props.robots !== prevProps.robots) {
      const { data } = await Axios.get("/api/robots");
      const relatedRobots = this.props.robots;
      const unrelatedRobots = data.filter((robot) => {
        let robotBool = true;
        relatedRobots.forEach((r) => {
          if (r.id === robot.id) robotBool = false;
        });
        return robotBool;
      });

      this.setState({
        unrelatedRobots,
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

  handleAddToProject(event) {
    event.preventDefault();
    const projectId = this.props.project.id;
    const robotId = event.target.robots.value;
    this.props.addRobotProject(robotId, projectId);
  }

  formatDate = (date) => {
    const dateArr = date.split("-");
    dateArr.push(dateArr.shift());
    return dateArr.join("/");
  };

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
            value={this.formatDate(project.deadline)}
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

  selectRobot() {
    let { unrelatedRobots } = this.state;
    unrelatedRobots = unrelatedRobots || [];

    return (
      <div>
        <form onSubmit={this.handleAddToProject}>
          <label htmlFor="projects"></label>
          <select name="robots" id="robots">
            <option value="">Select Project...</option>
            {unrelatedRobots.map((robot) => {
              return (
                <option key={robot.id} value={robot.id}>
                  {robot.name}
                </option>
              );
            })}
          </select>
          <input type="submit" value="Add to Project"></input>
        </form>
      </div>
    );
  }

  robotRows() {
    let { robots } = this.props;
    return robots.length !== 0 ? (
      <div>
        {robots.map((robot) => {
          return <RobotCard key={robot.id} robot={robot} xBoolBtn={false} />;
        })}
      </div>
    ) : (
      <p>There are no robots currently assigned to this project.</p>
    );
  }

  assignedRobots() {
    let { project } = this.state;
    return (
      <div>
        <h3>Robots Assigned to {project.title}</h3>
        <div>{this.selectRobot()}</div>
        {this.robotRows()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Edit Project</h1>
        {this.projectForm()}
        {this.assignedRobots()}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.project,
    robots: state.robots,
    robotProject: state.robotProject,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id)),
    updateProject: (project) => dispatch(updateProject(project, history)),
    fetchRobotsByProjectId: (id) => dispatch(fetchRobotsByProjectId(id)),
    addRobotProject: (robotId, projectId) =>
      dispatch(addRobotProject(robotId, projectId)),
  };
};

export default connect(mapState, mapDispatch)(ProjectEdit);
