import React from "react";
import AssignedProjectRow from "./AssignedProjectRow";

class AllAssignedProjectRows extends React.Component {
  allAssignedProjects(projects) {
    projects = projects || [];
    return (
      <div className="flex-column">
        {projects.map((project) => {
          return (
            <AssignedProjectRow
              key={project.id}
              robot={this.props.robot}
              project={project}
            />
          );
        })}
      </div>
    );
  }
  render() {
    let { robot } = this.props;
    robot = robot || {};
    return robot.projects && robot.projects.length > 0 ? (
      this.allAssignedProjects(robot.projects)
    ) : (
      <p>There are no projects currently assigned to this robot.</p>
    );
  }
}

export default AllAssignedProjectRows;
