import { combineReducers } from "redux";
import projectsReducer from "./projects";
import robotsReducer from "./robots";
import robotReducer from "./singleRobot";
import projectReducer from "./singleProject";

const appReducer = combineReducers({
  projects: projectsReducer,
  project: projectReducer,
  robots: robotsReducer,
  robot: robotReducer,
});

export default appReducer;
