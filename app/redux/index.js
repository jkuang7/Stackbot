import { combineReducers } from "redux";
import projectsReducer from "./projects";
import robotsReducer from "./robots";
import robotReducer from "./singleRobot";
import projectReducer from "./singleProject";
import robotProjectReducer from "./robotProjects";

const appReducer = combineReducers({
  projects: projectsReducer,
  project: projectReducer,
  robots: robotsReducer,
  robot: robotReducer,
  robotProject: robotProjectReducer
});

export default appReducer;
