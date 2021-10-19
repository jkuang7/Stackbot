import React from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/projects";
import Navbar from "./Navbar";
import ProjectCard from "./ProjectCard";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }
  render() {
    console.log(this.props.projects);
    let { projects } = this.props;
    projects = projects || projects;
    return (
      <div>
        <Navbar />
        <div className="projects">
          {projects.map((project) => {
            return <ProjectCard project={project} key={project.id} />;
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
