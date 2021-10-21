import React from "react";

class AssignedProjectCard extends React.Component {
  render() {
    let { project } = this.props;
    project = project || {};
    console.log(project);
    return (
      <div></div>
    );
  }
}

export default AssignedProjectCard;
