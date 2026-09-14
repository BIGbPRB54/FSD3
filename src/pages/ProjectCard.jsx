import { useState } from "react";
import { Link } from "react-router-dom";

function ProjectCard({ id, title, description, techStack, link }) {
  const [show, setShow] = useState(false);

  return (
    <article className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{techStack}</p>
      <button type="button" onClick={() => setShow(!show)}>
        {show ? "Hide" : "View-More"}
      </button>
      {show && (
        <div>
          <p>More details about {title}.</p>
          {id && <Link to={`/projects/${id}`}>Open detail page</Link>}
          {link && <a href={link}>Project Link</a>}
        </div>
      )}
    </article>
  );
}

export default ProjectCard;