import Axios from "axios";

//Action Types
const ROBOT_PROJECT = "SET_ROBOT_PROJECT";

//Action Creators
export const setRobotProject = (robotProject) => {
  return {
    type: ROBOT_PROJECT,
    robotProject,
  };
};

//Thunks
export const addRobotProject = (robotId, projectId) => {
  return async (dispatch) => {
    try {
      await Axios.post(`/api/robotprojects/`, {
        robotId,
        projectId,
      });

      dispatch(
        setRobotProject({
          robotId,
          projectId,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteRobotProject = (robotId, projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.delete(`/api/robotprojects/`, {
        data: { robotId, projectId },
      });
      dispatch(setRobotProject({ robotId, projectId }));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function robotProjectReducer(state = {}, action) {
  switch (action.type) {
    case ROBOT_PROJECT:
      return action.robotProject;
    default:
      return state;
  }
}
