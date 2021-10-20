import React from "react";
import AssignedRobot from "./AssignedRobot";
import { connect } from "react-redux";
import { fetchProjectsByRobotId } from "../../redux/singleRobot";

class AllProjectRobots extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.robots !== prevProps.robots) {
      this.props.robots.map(async (robot) => {
        await this.props.fetchProjectsByRobotId(robot.id);
        this.setState({
          robots: [...this.state.robots, this.props.robot],
        });
      });
    }
  }

  render() {
    let { robots } = this.state;
    robots = robots || [];
    return robots.length === 0 ? (
      <p>There are no robots currently assigned to this project.</p>
    ) : (
      <div className="flex-container">
        {this.state.robots.map((robot) => {
          return <AssignedRobot key={robot.id} robot={robot} />;
        })}
      </div>
    );
  }
}

const mapToState = (state) => {
  return {
    robot: state.robot,
  };
};

const mapToDispatch = (dispatch) => {
  return {
    fetchProjectsByRobotId: (id) => dispatch(fetchProjectsByRobotId(id)),
  };
};

export default connect(mapToState, mapToDispatch)(AllProjectRobots);
