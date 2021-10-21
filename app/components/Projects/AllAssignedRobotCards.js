import React from "react";
import AssignedRobotCard from "./AssignedRobotCard";
import { connect } from "react-redux";
import { fetchProjectsByRobotId } from "../../redux/singleRobot";

class AllAssignedRobotCards extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { robots } = this.props;
    if (robots !== prevProps.robots) {
      robots.map(async (robot) => {
        await this.props.fetchProjectsByRobotId(robot.id);
        this.setState({
          robots: [...this.state.robots, this.props.robot],
        });
      });
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
  };
};

const mapToDispatch = (dispatch) => {
  return {
    fetchProjectsByRobotId: (id) => dispatch(fetchProjectsByRobotId(id)),
  };
};

export default connect(mapToState, mapToDispatch)(AllAssignedRobotCards);
