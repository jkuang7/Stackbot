import React from "react";
import { deleteAssignedProject } from "../../redux/singleProject";
import { connect } from "react-redux";

class AssignedProjectCard extends React.Component {
  constructor() {
    super();
    this.handleUnassign = this.handleUnassign.bind(this);
  }

  handleUnassign(event) {
    this.props.deleteAssignedProject(event.target.value);
  }

  render() {
    let { project } = this.props;
    project = project || {};
    return (
      <div>
        <p>{project.title}</p>
        <p>{`Completed: ${project.completed}`}</p>
        <p>{`Deadline: ${project.deadline}`}</p>
        <p>{`Priority: ${project.priority}`}</p>
        <button type="button" value={project.id} onClick={this.handleUnassign}>
          Unassign from robot
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robot: state.robot
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteAssignedProject: (id) => dispatch(deleteAssignedProject(id)),
  };
};

export default connect(mapState, mapDispatch)(AssignedProjectCard);
