import React from "react";
import AssignedProject from "./AssignedProject"

class AllRobotProjects extends React.Component {
  render() {
    let { projects } = this.props;
    projects = projects || [];
    return projects.length === 0 ? (
      <p>There are no projects currently assigned to this robot.</p>
    ) : (
      <div className="flex-container">
        {projects.map((project) => {
          return <AssignedProject key={project.id} project={project} />;
        })}
      </div>
    );
  }
}

export default AllRobotProjects;
