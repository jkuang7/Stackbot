import React from "react";
import AssignedRobot from "./AssignedRobot";

class AllProjectRobots extends React.Component {
  render() {
    let { robots } = this.props;
    robots = robots || [];
    return robots.length === 0 ? (
      <p>There are no robots currently assigned to this project.</p>
    ) : (
      <div>
        {robots.map((robot) => {
          return <AssignedRobot key={robot.id} robot={robot} />;
        })}
      </div>
    );
  }
}

export default AllProjectRobots;
