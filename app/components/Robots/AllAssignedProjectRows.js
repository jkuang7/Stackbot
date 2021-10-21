import React from "react";
import AssignedProjectRow from "./AssignedProjectRow";

class AllAssignedProjectRows extends React.Component {
  allAssignedProjects(projects) {
    return (
      <div className="flex-container">
        {projects.map((project) => {
          return <AssignedProjectRow key={project.id} project={project} />;
        })}
      </div>
    );
  }
  render() {
    let { projects } = this.props;
    projects = projects || [];
    return projects.length === 0 ? (
      <p>There are no projects currently assigned to this robot.</p>
    ) : (
      this.allAssignedProjects(projects)
    );
  }
}

export default AllAssignedProjectRows;
