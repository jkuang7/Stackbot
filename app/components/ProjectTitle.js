import React from "react";

class ProjectTitle extends React.Component {
  render() {
    let { project } = this.props;
    project = project || {};

    return (
      <div className="projectCard noBorder">
        <h1 className="projectCard__header">{project.title}</h1>
        <div className="projectCard__text">
          <p>{`Completed: ${project.completed}`}</p>
          <p>{`Deadline: ${project.deadline}`}</p>
          <p>{`Priority: ${project.priority}`}</p>
        </div>
      </div>
    );
  }
}

export default ProjectTitle;
