"use client";
import Loading from "@/app/components/Loading";
import { checkArrNull } from "@/app/utils/helperFunc";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RefreshButton from "@components/RefreshButton";
const CategoryTabScreen = (props: any) => {
  const { activeTab } = props;
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loaddelete, setloaddelete] = useState(false);
  const [loading, setloading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setloading(false);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloading(true);
    if (editMode) {
      handleUpdateCategory(e);
    } else {
      try {
        await axios.post("/api/category", { name: newCategory });
        setNewCategory("");
        fetchCategories(); // Refresh category list after adding a new one
      } catch (error) {
        console.error("Error adding category:", error);
      } finally {
        setloading(false);
      }
    }
  };
  const handleUpdateCategory = async (e: any) => {
    setloading(true);
    try {
      await axios.patch(`/api/category/${editId}`, {
        name: newCategory,
        categoryId: editId,
      });
      setNewCategory("");
      fetchCategories(); // Refresh category list after adding a new one
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setloading(false);
      setEditMode(false);
      setEditId(null);
    }
  };

  const handleDeleteCategory = async (id: any) => {
    setloaddelete(true);
    try {
      await axios.delete(`/api/category/${id}`);
      fetchCategories(); // Refresh category list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setloaddelete(false);
    }
  };
  return (
    <div>
      {/* Categories Tab */}
      {/* {activeTab === "categories" && isAdmin && ( */}
      <div>
        {/* Add New Category */}
        <h1 className="text-xl font-bold mb-4">Categories Management</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            id="category"
            placeholder="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="p-2 w-full rounded-md border border-gray-300"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            {editMode ? "Edit Category" : "Add Category"}
          </button>
        </form>

        {/* Category List */}
        <div className="flex gap-2 items-center mt-8 mb-4">
          <h3 className="text-xl font-semibold ">Category List</h3>
          <RefreshButton onClick={fetchCategories} />
        </div>
        <ul className="space-y-4">
          {loading ? (
            <Loading />
          ) : checkArrNull(categories) ? (
            <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              No data found, Please add some.
            </li>
          ) : (
            categories?.map((category: any) => (
              <li
                key={category?._id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>{category?.name}</span>
                <div className="flex gap-1">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setEditMode(true);
                      setNewCategory(category?.name);
                      setEditId(category?._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    disabled={loaddelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDeleteCategory(category?._id)}
                  >
                    {loaddelete ? "Deleting" : "Delete"}
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      {/* )} */}
    </div>
  );
};

export default CategoryTabScreen;
