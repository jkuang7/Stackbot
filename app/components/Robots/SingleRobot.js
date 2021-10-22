import React from "react";
import { connect } from "react-redux";
import { fetchRobot } from "../../redux/singleRobot";
import Navbar from "../Navbar";
import AllAssignedProjectCards from "./AllAssignedProjectCards";
import { Link } from "react-router-dom";
import { fetchProjectsByRobotId } from "../../redux/projects";
import ProjectCard from "../Projects/ProjectCard"

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.fetchRobot(this.props.match.params.id);
    this.props.fetchProjectsByRobotId(this.props.match.params.id);
  }

  robotCardImage(robot) {
    return (
      <img className="robotCard__img" src={robot.imageUrl} alt="IMAGE"></img>
    );
  }

  robotCardText(robot) {
    return (
      <div className="robotCard__text">
        <h1>{robot.name}</h1>
        <p>{`Fuel Type: ${robot.fuelType}`}</p>
        <p>{`Fuel Level: ${robot.fuelLevel}`}</p>

        <Link to={`/robots/edit/${robot.id}`}>
          <button type="button">Edit</button>
        </Link>
      </div>
    );
  }

  robotCard(robot) {
    return (
      <div className="robotCard">
        {this.robotCardImage(robot)}
        {this.robotCardText(robot)}
      </div>
    );
  }

  allAssignedProjectCards() {
    let { projects } = this.props;
    projects = projects || [];
    return projects.length !== 0 ? (
      <div className="flex-container">
        {projects.map((project) => {
          return (
            <div className="smallerDiv" key={project.id}>
              <ProjectCard project={project} xBtnBool={false}/>
            </div>
          );
        })}
      </div>
    ) : (
      <p>There are no projects assigned to this robot.</p>
    );
  }

  render() {
    let { robot } = this.props;
    robot = robot || {};
    return (
      <div>
        <Navbar />
        <div className="bigCard">{this.robotCard(robot)}</div>
        <h2>Projects assigned to {robot.name}</h2>
        {this.allAssignedProjectCards()}
        {/* <AllAssignedProjectCards projects={robot.projects} /> */}
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

const mapDispatch = (dispatch) => {
  return {
    fetchRobot: (id) => dispatch(fetchRobot(id)),
    fetchProjectsByRobotId: (id) => dispatch(fetchProjectsByRobotId(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleRobot);
