import Axios from "axios";

//Action Types
const SET_PROJECTS = "SET_PROJECTS";
const SET_UNRELATED_PROJECTS = "SET_UNRELATED_PROJECTS";

//Action Creators
export const setProjects = (projects) => {
  return {
    type: SET_PROJECTS,
    projects,
  };
};

export const setUnrelatedProjects = (unrelatedProjects) => {
  return {
    type: SET_UNRELATED_PROJECTS,
    unrelatedProjects,
  };
};

//Thunks
export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get("/api/projects");
      dispatch(setProjects(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchProjectsByRobotId = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/api/projects/robot/${id}`);
      dispatch(setProjects(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchProjectsUnrelatedToRobotId = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/api/projects/notrobot/${id}`);
      dispatch(setUnrelatedProjects(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function projectsReducer(state = [], action) {
  switch (action.type) {
    case SET_PROJECTS:
      return [...action.projects];
    case SET_UNRELATED_PROJECTS:
      return [...action.unrelatedProjects]
    default:
      return state;
  }
}
