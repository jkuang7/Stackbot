import React from "react";

class AssignedProjectCard extends React.Component {
  render() {
    let { project } = this.props;
    project = project || {};
    console.log(project);
    return (
      <div >
        <p>{project.title}</p>
        <p>{`Completed: ${project.completed}`}</p>
        <p>{`Deadline: ${project.deadline}`}</p>
        <p>{`Priority: ${project.priority}`}</p>
        <button type="button">Unassign from robot</button>
      </div>
    );
  }
}

export default AssignedProjectCard;
