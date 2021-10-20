import React from "react";
import Navbar from "../Navbar";

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class RobotForm extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <Navbar/>
        <h1>Robot Name</h1>
        <form>
          <label htmlFor="robotName">Robot Name:</label>
          <input type="text" id="robotName" ></input>
          <br></br>
          <br></br>
          <input type="submit" value="Submit"></input>
        </form>
        
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    
  };
};

const mapDispatch = (dispatch) => {
  return {
    
  };
};

export default RobotForm;
