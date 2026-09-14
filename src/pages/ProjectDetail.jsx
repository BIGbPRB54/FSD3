import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/projects/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Project not found");
        }

        setProject(data);
      } catch (err) {
        setError(err.message || "Failed to load project details.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return <section><h2>Loading project...</h2></section>;
  }

  if (error) {
    return <section><h2>Project not found</h2><p>{error}</p></section>;
  }

  if (!project) {
    return <section><h2>Project not found</h2></section>;
  }

  return (
    <section>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p><strong>Tech Stack:</strong> {project.techStack}</p>
      {project.link && (
        <p>
          <a href={project.link} target="_blank" rel="noreferrer">
            Visit project
          </a>
        </p>
      )}
    </section>
  );
}

export default ProjectDetail;
