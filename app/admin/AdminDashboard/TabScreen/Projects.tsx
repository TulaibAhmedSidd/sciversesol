"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await axios.patch('/api/projects', { projectId: editId, ...newProject });
      } else {
        await axios.post('/api/projects', newProject);
      }
      setNewProject({
        title: '',
        description: '',
        link: '',
        image: '',
      });
      setEditMode(false);
      setEditId(null);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setNewProject({
      title: project?.title || '',
      description: project?.description || '',
      link: project?.link || '',
      image: project?.image || '',
    });
    setEditMode(true);
    setEditId(project._id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete('/api/projects', { data: { projectId: id } });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="project-management">
      <h2 className="fancy-heading">Project Management</h2>

      <h3 className="text-xl font-semibold mb-4">{editMode ? 'Edit' : 'Add'} Project</h3>
      <form className="space-y-4" autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleInputChange}
            placeholder="Enter project title"
            className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Enter project description"
            className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
          <input
            type="url"
            name="link"
            value={newProject.link}
            onChange={handleInputChange}
            placeholder="Enter project link"
            className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={newProject.image}
            onChange={handleInputChange}
            placeholder="Enter image URL"
            className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md mt-4"
        >
          {editMode ? 'Update' : 'Add'} Project
        </button>
      </form>

      <div className="flex gap-2 items-center mt-8 mb-4">
        <h3 className="text-xl font-semibold">Projects List</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Link</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ?
                <p>Loading...</p>
                :
                projects?.map((project) => (
                  <tr key={project._id}>
                    <td className="p-4">{project?.title}</td>
                    <td className="p-4">{project?.description}</td>
                    <td className="p-4">
                      <a href={project?.link} target="_blank" rel="noopener noreferrer">
                        {project?.link}
                      </a>
                    </td>
                    <td className="p-4">
                      <img src={project?.image} alt={project?.title} style={{ width: '40px', height: '40px' }} />
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="bg-blue-500 text-white px-4 py-2 w-full rounded-md mr-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project?._id)}
                        className="bg-red-600 text-white px-4 py-2 w-full rounded-md mt-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
