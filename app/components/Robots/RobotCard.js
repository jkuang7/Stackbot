import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteRobot, deleteAssignedRobot } from "../../redux/singleRobot";
import { fetchRobots, fetchRobotsByProjectId } from "../../redux/robots";

class RobotCard extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUnassign = this.handleUnassign.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { robotToBeRemoved, project } = this.props;
    if (
      this.props.xBtnBool &&
      robotToBeRemoved !== prevProps.robotToBeRemoved
    ) {
      this.props.fetchRobots();
    } else if (
      !this.props.xBtnBool &&
      robotToBeRemoved !== prevProps.robotToBeRemoved
    ) {
      this.props.fetchRobotsByProjectId(project.id);
    }
  }

  handleUnassign(event) {
    this.props.deleteAssignedRobot(event.target.value);
  }

  handleDelete(event) {
    this.props.deleteRobot(event.target.value);
  }

  robotCardImg() {
    const { robot } = this.props;
    return (
      <img className="robotCard__img" src={robot.imageUrl} alt="IMAGE"></img>
    );
  }

  robotButtons() {
    const { robot } = this.props;
    return this.props.xBtnBool ? (
      <button type="button" onClick={this.handleDelete} value={robot.id}>
        x
      </button>
    ) : (
      <div>
        <button type="button" value={robot.id} onClick={this.handleUnassign}>
          Unassign
        </button>
      </div>
    );
  }

  robotCardText() {
    let { robot } = this.props;
    return (
      <div className="robotCard__text">
        <Link to={`/robots/${robot.id}`}>
          <h1>{robot.name}</h1>
        </Link>
        <p>{`Projects: ${robot.projects.length}`}</p>
        <p>{`Fuel Type: ${robot.fuelType}`}</p>
        <p>{`Fuel Level: ${robot.fuelLevel}`}</p>
        {this.robotButtons()}
      </div>
    );
  }

  render() {
    return (
      <div className="robotCard">
        {this.robotCardImg()}
        {this.robotCardText()}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.project,
    robotToBeRemoved: state.robot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteRobot: (id) => dispatch(deleteRobot(id)),
    fetchRobots: () => dispatch(fetchRobots()),
    deleteAssignedRobot: (id) => dispatch(deleteAssignedRobot(id)),
    fetchRobotsByProjectId: (id) => dispatch(fetchRobotsByProjectId(id)),
  };
};

export default connect(mapState, mapDispatch)(RobotCard);
