import React from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { fetchProject, toggleComplete } from "../../redux/singleProject";
import { fetchRobotsByProjectId } from "../../redux/robots";
import RobotCard from "../Robots/RobotCard";

class SingleProject extends React.Component {
  constructor() {
    super();
    this.allAssignedRobotCards = this.allAssignedRobotCards.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(event) {
    this.props.toggleComplete(
      event.target.value,
      !this.props.project.completed
    );
  }

  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
    this.props.fetchRobotsByProjectId(this.props.match.params.id);
  }

  projectCardDescription(project) {
    return <p>{project.description}</p>;
  }

  projectCardText(project) {
    return (
      <div className="">
        <h1>{project.title}</h1>
        <p>{`Deadline: ${project.deadline}`}</p>
        <p>{`Completed: ${project.completed}`}</p>
        <p>{`Priority: ${project.priority}`}</p>
        <div>
          <Link to={`/projects/edit/${project.id}`}>
            <button type="button">Edit</button>
          </Link>
          <button
            type="button"
            onClick={this.handleComplete}
            value={project.id}
          >
            Toggle Complete
          </button>
        </div>
      </div>
    );
  }

  projectCard(project) {
    return (
      <div className="modelContainer__card">
        {this.projectCardDescription(project)}
        {this.projectCardText(project)}
      </div>
    );
  }

  allAssignedRobotCards() {
    let { robots } = this.props;
    robots = robots || [];
    return robots.length !== 0 ? (
      <div className="flex-container">
        {robots.map((robot) => {
          return (
            <div className="modelContainer--smallerDiv" key={robot.id}>
              <RobotCard robot={robot} xBtnBool={false} />
            </div>
          );
        })}
      </div>
    ) : (
      <p>There are no robots assigned to this project.</p>
    );
  }

  render() {
    let { project } = this.props;
    project = project || {};
    return (
      <div>
        <Navbar />
        <div className="modelContainer__bigCard">
          {this.projectCard(project)}
        </div>
        <h2>Robots assigned to this project</h2>
        {this.allAssignedRobotCards()}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.project,
    robots: state.robots,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id)),
    fetchRobotsByProjectId: (id) => dispatch(fetchRobotsByProjectId(id)),
    toggleComplete: (id, completed) => dispatch(toggleComplete(id, completed)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
