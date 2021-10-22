import React from "react";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { fetchRobot, updateRobot } from "../../redux/singleRobot";
import { fetchProjectsByRobotId } from "../../redux/projects";

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
  }

  componentDidMount() {
    this.props.fetchRobot(this.props.match.params.id);
    this.props.fetchProjectsByRobotId(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.robot !== prevProps.robot) {
      this.setState({
        robot: this.props.robot,
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

  selectProject() {
    const {robot} = this.state;
    return (
      <div>
        <h3>Projects Assigned to {robot.name}</h3>
        <label htmlFor="projects"></label>

        <select name="projects" id="projects">
          <option value="">Select Project...</option>
        </select>
      </div>
    );
  }

  assignedProjects() {
    let { robot } = this.state;
    robot = robot || {};
    return (
      <div className="flex-row">
        {this.selectProject()}
        <button type="button">Add to Robot</button>
      </div>
    );
  }

  render() {
    console.log(this.props);
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
  };
};

export default connect(mapState, mapDispatch)(RobotEdit);
