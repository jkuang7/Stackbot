import Axios from "axios";

//Action Types
const REMOVE_ROBOT_PROJECT = "SET_ROBOT_PROJECT";

//Action Creators
export const setRobotProject = (robotProject) => {
  return {
    type: REMOVE_ROBOT_PROJECT,
    robotProject,
  };
};

//Thunks
export const deleteRobotProject = (robotId, projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.delete(`/api/robotprojects/`, {
        data: { robotId, projectId },
      });
      dispatch(setRobotProject({robotId, projectId}));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function robotProjectReducer(state = {}, action) {
  switch (action.type) {
    case REMOVE_ROBOT_PROJECT:
      return action.robotProject;
    default:
      return state;
  }
}
