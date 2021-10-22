import Axios from "axios";

//Action Types
const SET_ROBOTS = "SET_ROBOTS";

//Action Creators
export const setRobots = (robots) => {
  return {
    type: SET_ROBOTS,
    robots,
  };
};

//Thunks
export const fetchRobots = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get("/api/robots");
      dispatch(setRobots(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchRobotsByProjectId = () => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.get("/api/robots/project/:id");
      
    } catch(err) {
      console.log(err);
    }
  }
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function robotsReducer(state = [], action) {
  switch (action.type) {
    case SET_ROBOTS:
      return [...action.robots];
    default:
      return state;
  }
}
