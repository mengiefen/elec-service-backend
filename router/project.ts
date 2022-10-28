import Project from './../models/Project';
import express, { Request, Response } from 'express';

const projectRouter = express.Router();

// Get all projects
projectRouter.get('/projects', async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new project
projectRouter.post('/projects', async (req: Request, res: Response) => {
  const project = new Project({
    name: req.body.name,
    category: req.body.category,
    division: req.body.division,
    pm: req.body.pm,
  });

  try {
    const savedProject = await project.save();
    res.status(201).send(savedProject);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a project by id
projectRouter.get('/projects/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a project
projectRouter.put('/projects/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a project
projectRouter.delete('/projects/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    res.status(200).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default projectRouter;
