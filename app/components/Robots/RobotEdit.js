import React from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { fetchRobot, updateRobot } from "../../redux/singleRobot";
import { fetchProjectsByRobotId } from "../../redux/projects";
import ProjectCard from "../Projects/ProjectCard";
import { addRobotProject } from "../../redux/robotProjects";
import Axios from "axios";

export class RobotEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      robot: {
        name: "",
        fuelType: "electric",
        fuelLevel: 100,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/0/05/HONDA_ASIMO.jpg",
      },
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddRobot = this.handleAddRobot.bind(this);
  }

  componentDidMount() {
    this.props.fetchRobot(this.props.match.params.id);
    this.props.fetchProjectsByRobotId(this.props.match.params.id);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.robot !== prevProps.robot) {
      this.setState({
        robot: this.props.robot,
      });
    }

    if (this.props.projects !== prevProps.projects) {
      const { data } = await Axios.get("/api/projects");
      const relatedProjects = this.props.projects;
      const unrelatedProjects = data.filter((project) => {
        let projectBool = true;
        relatedProjects.forEach((p) => {
          if (p.id === project.id) projectBool = false;
        });
        return projectBool;
      });
      this.setState({
        projects: unrelatedProjects,
      });
    }
  }

  handleChange(event) {
    this.setState({
      robot: {
        ...this.state.robot,
        [`${event.target.id}`]: event.target.value,
      },
    });
  }

  handleSave(event) {
    event.preventDefault();
    const { robot } = this.state;
    this.props.updateRobot(robot);
  }

  handleAddRobot(event) {
    event.preventDefault();
    const robotId = this.props.robot.id;
    const projectId = event.target.projects.value;
    this.props.addRobotProject(robotId, projectId);
  }

  robotForm() {
    let { robot } = this.state;
    robot = robot || {};
    return (
      <form onSubmit={this.handleSave}>
        <label>
          Robot Name
          <input
            type="text"
            id="name"
            name="name"
            value={robot.name}
            onChange={this.handleChange}
          ></input>
        </label>
        <br></br>

        <label htmlFor="fuelType">Fuel Type</label>
        <select
          name="fuelType"
          id="fuelType"
          value={robot.fuelType}
          onChange={this.handleChange}
        >
          <option value="electric">Electric</option>
          <option value="gas">Gas</option>
          <option value="diesel">Diesel</option>
        </select>
        <br></br>

        <label>
          Fuel Level
          <input
            type="text"
            id="fuelLevel"
            name="fuelLevel"
            value={robot.fuelLevel}
            onChange={this.handleChange}
          ></input>
        </label>
        <br></br>

        <label>
          Robot Image Url
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={robot.imageUrl}
            onChange={this.handleChange}
          ></input>
        </label>
        <br></br>

        <input type="submit" value="Save Changes"></input>
      </form>
    );
  }

  handleSelect() {

  }

  selectProject() {
    let { projects } = this.state;
    projects = projects || [];
    return (
      <div>
        <form onSubmit={this.handleAddRobot}>
          <label htmlFor="projects"></label>
          <select name="projects" id="projects" onClick={this.handleSelect}>
            <option value="">Select Project...</option>
            {projects.map((project) => {
              return (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              );
            })}
          </select>
          <input type="submit" value="Add to Robot"></input>
        </form>
      </div>
    );
  }

  projectRows() {
    let { projects } = this.props;
    return (
      <div>
        {projects.map((project) => {
          return (
            <ProjectCard key={project.id} project={project} xBoolBtn={false} />
          );
        })}
      </div>
    );
  }

  assignedProjects() {
    let { robot } = this.state;
    robot = robot || {};
    return (
      <div>
        <h3>Projects Assigned to {robot.name}</h3>
        <div className="flex-row centerFlex">{this.selectProject()}</div>
        {this.projectRows()}
      </div>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Navbar />
        <h1>Edit Robot</h1>
        {this.robotForm()}
        {this.assignedProjects()}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robot: state.robot,
    projects: state.projects,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchRobot: (id) => dispatch(fetchRobot(id)),
    updateRobot: (robot) => dispatch(updateRobot(robot, history)),
    fetchProjectsByRobotId: (id) => dispatch(fetchProjectsByRobotId(id)),
    addRobotProject: (robotId, projectId) =>
      dispatch(addRobotProject(robotId, projectId)),
    fetchProjectsUnrelatedToRobotId: (robotId, projects) =>
      dispatch(fetchProjectsUnrelatedToRobotId(robotId, projects)),
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(RobotEdit);
