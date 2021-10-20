import React from "react";
import ProjectCard from "../Projects/ProjectCard";

class AssignedProject extends React.Component {
  render() {
    let { project } = this.props;
    project = project || {};

    return (
      <div className="smallerDiv">{project !== {} ? <ProjectCard project={project} /> : <p></p>}</div>
    );
  }
}

export default AssignedProject;
