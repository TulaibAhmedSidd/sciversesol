// components/StatTabScreen.js

"use client";

import Loading from "@/app/components/Loading";
import RefreshButton from "@/app/components/RefreshButton";
import axios from "axios";
import React, { useEffect, useState } from "react";

const StatTabScreen = () => {
    const [stats, setStats] = useState([]);
    const [newStat, setNewStat] = useState({ label: "", count: 0, suffix: "+" });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/stats");
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newStat.label || newStat.count <= 0) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            if (editMode) {
                await axios.patch(`/api/stats/${editId}`, newStat);
                setEditMode(false);
                setEditId(null);
            } else {
                await axios.post("/api/stats", newStat);
            }
            setNewStat({ label: "", count: 0, suffix: "+" });
            fetchStats();
        } catch (error) {
            console.error("Error adding/updating stat:", error);
        } finally {
            setLoading(false);
            setEditMode(false)
        }
    };

    const handleDeleteStat = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/stats/${id}`, { id: id });
            fetchStats();
        } catch (error) {
            console.error("Error deleting stat:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">{editMode ? "Edit Stat" : "Add New Stat"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Label and Input for Stat Label */}
                <div>
                    <label htmlFor="label" className="block text-sm font-medium text-gray-700">Stat Label</label>
                    <input
                        type="text"
                        id="label"
                        placeholder="Enter stat label"
                        value={newStat.label}
                        onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                        className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Label and Input for Stat Count */}
                <div>
                    <label htmlFor="count" className="block text-sm font-medium text-gray-700">Stat Count</label>
                    <input
                        type="number"
                        id="count"
                        placeholder="Enter stat count"
                        value={newStat.count}
                        onChange={(e) => setNewStat({ ...newStat, count: parseInt(e.target.value) })}
                        className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Label and Input for Suffix */}
                <div>
                    <label htmlFor="suffix" className="block text-sm font-medium text-gray-700">Suffix</label>
                    <input
                        type="text"
                        id="suffix"
                        placeholder="Enter suffix"
                        value={newStat.suffix}
                        onChange={(e) => setNewStat({ ...newStat, suffix: e.target.value })}
                        className="p-2 w-full rounded-md border border-gray-300 mt-1 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md mt-4"
                >
                    {editMode ? "Edit Stat" : "Add Stat"}
                </button>
            </form>

            <div className="flex gap-2 items-center mt-8 mb-4">
                <h3 className="text-xl font-semibold ">Stats List</h3>
                <RefreshButton onClick={fetchStats} />
            </div>
            <ul className="space-y-4">
                {loading ? (
                    <Loading />) : stats.length === 0 ? (
                        <li className="bg-white p-4 rounded-lg shadow-md">No stats found.</li>
                    ) : (
                    stats.map((stat) => (
                        <li key={stat._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <span>{stat.label}: {stat.count}{stat.suffix}</span>
                            <div className="flex gap-1">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                    onClick={() => {
                                        setEditMode(true);
                                        setNewStat({ label: stat.label, count: stat.count, suffix: stat.suffix });
                                        setEditId(stat._id);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleDeleteStat(stat._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default StatTabScreen;
