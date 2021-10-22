import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects } from "../../redux/projects";
import Navbar from "../Navbar";
import ProjectCard from "./ProjectCard";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  navProjectForm() {
    return (
      <div className="flex-row">
        <h1>All Projects</h1>
        <Link to="/projects/add">
          <button type="button">Add Project</button>
        </Link>
      </div>
    );
  }

  allProjects(projects) {
    return (
      <div className="projects">
        {projects.map((project) => {
          return <ProjectCard key={project.id} project={project} xBtnBool={true} />;
        })}
      </div>
    );
  }

  render() {
    let { projects } = this.props;
    projects = projects || [];
    return (
      <div>
        <Navbar />
        {this.navProjectForm()}
        {this.allProjects(projects)}
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
