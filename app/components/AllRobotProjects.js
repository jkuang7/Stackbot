import React from "react";
import ProjectTitle from "./ProjectTitle";

class AllRobotProjects extends React.Component {
  render() {
    let { projects } = this.props;
    projects = projects || [];
    return projects.length === 0 ? (
      <p>There are no projects currently assigned to this robot</p>
    ) : (
      <div>
        {projects.map((project) => {
          return <ProjectTitle key={project.id} project={project} />;
        })}
      </div>
    );
  }
}

export default AllRobotProjects;
