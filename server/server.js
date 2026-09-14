import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 5000);
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
const projectsFile = process.env.PROJECTS_DATA_FILE || './data/projects.json';

const contacts = [];

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

function readProjects() {
  const fullPath = path.resolve(__dirname, projectsFile);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileData);
}

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/projects', (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const projects = readProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  return res.json(project);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const emailPattern = /@/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const submission = { name, email, message };
  contacts.push(submission);

  return res.status(201).json({
    message: 'Message submitted successfully.',
    submission
  });
});

app.get('/api/contact', (req, res) => {
  res.json(contacts);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
