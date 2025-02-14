// app/api/projects/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../lib/mongodb';
import Project from '../models/Project';

// GET: Fetch all projects
export async function GET() {
  await connectToDatabase();
  try {
    const projects = await Project.find(); // Fetch projects from the DB
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST: Create a new project
export async function POST(request) {
  await connectToDatabase();
  try {
    const { title, description, link, image } = await request.json();

    if (!title || !description || !image) {
      return NextResponse.json(
        { error: 'Title, description, and image are required' },
        { status: 400 }
      );
    }

    const newProject = new Project({ title, description, link, image });
    await newProject.save(); // Save the new project to the DB

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

// DELETE: Delete a project by ID
export async function DELETE(request) {
  await connectToDatabase();
  try {
    const { projectId } = await request.json(); // Get the project projectId from the request

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const deletedProject = await Project.findByIdAndDelete(id); // Delete the project by ID

    if (!deletedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

// PATCH: Update a project by ID
export async function PATCH(request) {
  await connectToDatabase();
  try {
    const { projectId, title, description, link, image } = await request.json(); // Get the fields to update from request

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Update the project with the provided fields
    const updatedProject = await Project.findByIdAndUpdate(
        projectId,
      { title, description, link, image },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}
