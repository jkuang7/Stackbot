import React from "react";
import AssignedRobotCard from "./AssignedRobotCard";
import { connect } from "react-redux";
import { fetchRobotWithProjects } from "../../redux/singleRobot";
import { fetchRobotsByProjectId } from "../../redux/robots";

class AllAssignedRobotCards extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { robots, robot, project } = this.props;
    console.log("TIME TO UPDATE!")
    if (robots !== prevProps.robots) {
      console.log("BUT WHY NOT THIS?");
      robots.map(async (robot) => {
        await this.props.fetchRobotWithProjects(robot.id);
        this.setState({
          robots: [...this.state.robots, this.props.robot],
        });
      });
    } else if (robot.deleted !== prevProps.robot.deleted) {
      console.log("TESTING?");
      this.props.fetchRobotsByProjectId(project.id);
    }
  }

  allAssignedRobots(robots) {
    return (
      <div className="flex-container">
        {robots.map((robot) => (
          <AssignedRobotCard key={robot.id} robot={robot} />
        ))}
      </div>
    );
  }

  render() {
    let { robots } = this.state;
    robots = robots || [];
    return robots.length === 0 ? (
      <p>There are no robots currently assigned to this project.</p>
    ) : (
      this.allAssignedRobots(robots)
    );
  }
}

const mapToState = (state) => {
  return {
    robot: state.robot,
    robots: state.robots
  };
};

const mapToDispatch = (dispatch) => {
  return {
    fetchRobotWithProjects: (id) => dispatch(fetchRobotWithProjects(id)),
    fetchRobotsByProjectId: (id) => dispatch(fetchRobotsByProjectId(id)),
  };
};

export default connect(mapToState, mapToDispatch)(AllAssignedRobotCards);
