
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TeamMemberManagement() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', role: '', expertise: '' });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/teammember');
      setTeamMembers(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await axios.patch('/api/teammember', { memberId: editId, updatedFields: newMember });
      } else {
        await axios.post('/api/teammember', newMember);
      }
      setNewMember({ name: '', role: '', expertise: '' });
      setEditMode(false);
      setEditId(null);
      fetchTeamMembers();
    } catch (error) {
      console.error('Error saving team member:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setNewMember({ name: member.name, role: member.role, expertise: member.expertise });
    setEditMode(true);
    setEditId(member._id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete('/api/teammember', { data: { memberId: id } });
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="team-management" className={''}>
      <h2 className="fancy-heading">Team Member Management</h2>

      <h3 className="text-xl font-semibold mb-4">{editMode ? 'Edit' : 'Add'} Team Member</h3>
      <form className="space-y-4" autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" value={newMember.name} onChange={handleInputChange} placeholder="Enter name" className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <input type="text" name="role" value={newMember.role} onChange={handleInputChange} placeholder="Enter role" className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <div>
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise</label>
          <input type="text" name="expertise" value={newMember.expertise} onChange={handleInputChange} placeholder="Enter expertise" className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500" required />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md mt-4">{editMode ? 'Update' : 'Add'} Team Member</button>
      </form>

      <div className="flex gap-2 items-center mt-8 mb-4">
        <h3 className="text-xl font-semibold">Team Members List</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Expertise</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member._id}>
                <td className="p-4">{member.name}</td>
                <td className="p-4">{member.role}</td>
                <td className="p-4">{member.expertise}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(member)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-1">Edit</button>
                  <button onClick={() => handleDelete(member._id)} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
