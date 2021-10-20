import React from "react";
import { Link } from "react-router-dom";

class ProjectCard extends React.Component {
  render() {
    let { project } = this.props;
    project = project || {};
    return (
      <div className="projectCard">
        <Link to={`/projects/${project.id}`}>
          <h1>{project.title}</h1>
        </Link>
        <p>{`Completed: ${project.completed}`}</p>
        <p>{`Deadline: ${project.deadline}`}</p>
        <p>{`Priority: ${project.priority}`}</p>
      </div>
    );
  }
}

export default ProjectCard;
