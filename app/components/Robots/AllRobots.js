import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

  navRobotForm() {
    return (
      <div className="flex-row">
        <h1>All Robots</h1>
        <Link to="/robots/add">
          <button type="button">Add Robot</button>
        </Link>
      </div>
    );
  }

  allRobots() {
    const { robots } = this.props;
    return (
      <div className="robots">
        {robots.map((robot) => {
          return <RobotCard key={robot.id} robot={robot} xBtnBool={true} />;
        })}
      </div>
    );
  }

  render() {
    console.log(this.props);
    const { robots } = this.props;
    return (
      <div>
        <Navbar />
        {this.navRobotForm()}
        {robots.length !== 0 ? (
          this.allRobots()
        ) : (
          <p>There are no robots registered in the database.</p>
        )}
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
