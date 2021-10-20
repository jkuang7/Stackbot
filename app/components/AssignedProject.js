import React from "react";

class AssignedProject extends React.Component {
  render() {
    let { project } = this.props;
    project = project || {};

    return (
      <div className="projectCard">
        <h1>{project.title}</h1>
        <div>
          <p>{`Completed: ${project.completed}`}</p>
          <p>{`Deadline: ${project.deadline}`}</p>
          <p>{`Priority: ${project.priority}`}</p>
        </div>
      </div>
    );
  }
}

export default AssignedProject;
