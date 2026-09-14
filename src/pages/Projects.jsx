import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch("/api/projects");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load projects");
        }

        setProjects(data);
        setError("");
      } catch (err) {
        setError(err.message || "Something went wrong while loading projects.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return <section><h2>Loading projects...</h2></section>;
  }

  if (error) {
    return <section><h2>Projects</h2><p className="error">{error}</p></section>;
  }

  return (
    <section>
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;