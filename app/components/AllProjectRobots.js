import React from "react";
import AssignedRobot from "./AssignedRobot";
import { connect } from "react-redux";
import { fetchProjectsByRobotId } from "../redux/projects";

class AllProjectRobots extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.robots !== prevProps.robots) {
      this.props.robots.map(async (robot) => {
        await this.props.fetchProjectsByRobotId(robot.id);
      });
    }
  }
  render() {
    let { robots, state } = this.props;
    robots = robots || [];
    return robots.length === 0 ? (
      <p>There are no robots currently assigned to this project.</p>
    ) : (
      <div className="flex-container">
        {robots.map((robot) => {
          return <AssignedRobot key={robot.id} robot={robot} state={state} />;
        })}
      </div>
    );
  }
}

const mapToState = (state) => {
  return {
    state: state,
  };
};

const mapToDispatch = (dispatch) => {
  return {
    fetchProjectsByRobotId: (id) => dispatch(fetchProjectsByRobotId(id)),
  };
};

export default connect(mapToState, mapToDispatch)(AllProjectRobots);
