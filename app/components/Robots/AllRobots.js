import React from "react";
import { connect } from "react-redux";
import { fetchRobots } from "../../redux/robots";
import RobotCard from "./RobotCard";
import Navbar from "../Navbar";

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {
  componentDidMount() {
    this.props.fetchRobots();
  }
  render() {
    let { robots } = this.props;
    robots = robots || [];
    return (
      <div>
        <Navbar />
        <div>
          
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
