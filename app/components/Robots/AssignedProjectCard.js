import React from "react";
import ProjectCard from "../Projects/ProjectCard";

class AssignedProjectCard extends React.Component {
  render() {
    let { project } = this.props;
    project = project || {};

    return (
      <div className="smallerDiv">{project !== {} ? <ProjectCard project={project} /> : <p></p>}</div>
    );
  }
}

export default AssignedProjectCard;
