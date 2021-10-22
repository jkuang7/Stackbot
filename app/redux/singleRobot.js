import Axios from "axios";

//Action Types
const SET_ROBOT = "SET_ROBOT";

//Action Creators
export const setRobot = (robot) => {
  return {
    type: SET_ROBOT,
    robot,
  };
};

//Thunks
export const fetchRobot = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/api/robots/${id}`);
      dispatch(setRobot(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchRobotWithProjects = (id) => {
  return async (dispatch) => {
    try {
      const { data: robot } = await Axios.get(`/api/robots/${id}`);
      const { data: projects } = await Axios.get(`/api/projects/robot/${id}`);
      robot.projects = projects;
      dispatch(setRobot(robot));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createRobot = (robot, history) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(`/api/robots`, robot);
      dispatch(setRobot(data));
      history.push("/robots");
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteRobot = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.delete(`/api/robots/${id}`);
      dispatch(setRobot(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateRobot = (robot, history) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.put(`/api/robots/${robot.id}`, robot);
      dispatch(setRobot(robot));
      history.push("/robots");
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteAssignedRobot = (id) => {
  return async (dispatch) => {
    await Axios.delete(`/api/robotprojects/robots/${id}`);
    const { data } = await Axios.get(`/api/robots/${id}`);
    data.deleted = true;
    dispatch(setRobot(data));
  }
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function robotReducer(state = {}, action) {
  switch (action.type) {
    case SET_ROBOT:
      return { ...action.robot };
    default:
      return state;
  }
}
