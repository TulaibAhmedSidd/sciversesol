"use client";
import Loading from "@/app/components/Loading";
import RefreshButton from "@/app/components/RefreshButton";
import { checkArrNull } from "@/app/utils/helperFunc";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BrandTabScreen = (props: any) => {
  const { activeTab } = props;
  const [brands, setbrands] = useState([]);
  const [newBrand, setNewBrand] = useState("");
  const [loaddelete, setloaddelete] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchbrands();
  }, []);

  const fetchbrands = async () => {
    setloading(true);
    try {
      const response = await axios.get("/api/brand");
      setbrands(response.data);
    } catch (error) {
      console.error("Error fetching Brand:", error);
    } finally {
      setloading(false);
      seterror("");
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newBrand?.length <= 0 || newBrand == "") {
      seterror("Please add some text to add brand.");
      return;
    }
    setloading(true);
    if (editMode) {
      handleUpdateBrand(e);
    } else {
      try {
        await axios.post("/api/brand", { name: newBrand });
        setNewBrand("");
        fetchbrands(); // Refresh Brand list after adding a new one
      } catch (error) {
        console.error("Error adding Brand:", error);
      } finally {
        setloading(false);
        seterror("");
      }
    }
  };
  const handleUpdateBrand = async (e: any) => {
    setloading(true);
    try {
      await axios.patch(`/api/brand/${editId}`, {
        name: newBrand,
        brandId: editId,
      });
      setNewBrand("");
      fetchbrands();
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error("Error adding brand:", error);
    } finally {
      setloading(false);
      setEditMode(false);
      setEditId(null);
    }
  };
  const handleDeleteBrand = async (id: any) => {
    setloaddelete(true);
    try {
      await axios.delete(`/api/brand/${id}`);
      fetchbrands(); // Refresh Brand list after deletion
    } catch (error) {
      console.error("Error deleting Brand:", error);
    } finally {
      setloaddelete(false);
      seterror("");
    }
  };
  return (
    <div>
      {/* brands Tab */}
      {/* {activeTab === "brands" && isAdmin && ( */}
      <div>
        {/* <h2 className="text-2xl font-semibold mb-4">Product brands</h2> */}

        {/* Add New Brand */}
      <h1 className="text-xl font-bold mb-4">Brand Management</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand Name</label>
          <input
            type="text"
            id="brand"
            placeholder="Brand Name"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            className="p-2 w-full rounded-md border border-gray-300"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            {editMode ? "Edit Brand" : "Add Brand"}
          </button>
        </form>

        {/* Brand List */}
        <div className="flex gap-2 items-center mt-8 mb-4">
          <h3 className="text-xl font-semibold ">Brand List</h3>
          <RefreshButton onClick={fetchbrands} />
        </div>
        <ul className="space-y-4">
          {loading ? (
                     <Loading />
          ) : checkArrNull(brands) ? (
            <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              No data found, Please add some.
            </li>
          ) : (
            brands?.map((Brand: any) => (
              <li
                key={Brand?._id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>{Brand?.name}</span>
                <div className="flex gap-1">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setEditMode(true);
                      setNewBrand(Brand?.name);
                      setEditId(Brand?._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    disabled={loaddelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDeleteBrand(Brand?._id)}
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

export default BrandTabScreen;
