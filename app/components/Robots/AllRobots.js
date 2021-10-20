import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobots } from "../../redux/robots";
import RobotCard from "./RobotCard";
import Navbar from "../Navbar";

//CSS Variables
const flexRow = "flex-row";
const spaceBetween = "space-between";

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {
  constructor() {
    super();
    // this.handleAddRobot = this.handleAddRobot.bind(this);
  }
  componentDidMount() {
    this.props.fetchRobots();
  }
  // handleAddRobot(event) {

  // }
  render() {
    let { robots } = this.props;
    robots = robots || [];
    return (
      <div>
        <Navbar />
        <div className={flexRow}>
          <h1>All Robots</h1>
          <Link to="/robots/add"><button type="button">Add Robot</button></Link>
        </div>
        <div className="robots">
          {robots.map((robot) => {
            return <RobotCard robot={robot} key={robot.id} />;
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robots: state.robots,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchRobots: () => dispatch(fetchRobots()),
  };
};

export default connect(mapState, mapDispatch)(AllRobots);
