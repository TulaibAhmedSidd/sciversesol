"use client";
import Loading from "@/app/components/Loading";
import RefreshButton from "@/app/components/RefreshButton";
import axios from "axios";
import { useState, useEffect } from "react";

export default function WhatsAppNumbers() {
  const [numbers, setNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [makePrimary, setMakePrimary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/whatsApp");
      const data = await res.json();
      setNumbers(data);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNumber = async (e) => {
    e.preventDefault();
    const regex = /^92[0-9]{10}$/;

    if (!regex.test(newNumber)) {
      setFormError("Number must be in the format 923032115055");
      return;
    }

    try {
      const res = await fetch("/api/whatsApp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ WhatsAppNumber: newNumber, makePrimary }),
      });
      if (res.ok) {
        fetchNumbers();
        setNewNumber("");
        setMakePrimary(false);
      } else {
        const data = await res.json();
        setFormError(data.error);
      }
    } catch (error) {
      console.error("Error adding number:", error);
    }
  };
  const handleDeleteNum = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/whatsApp/${id}`);
      fetchNumbers(); // Refresh Brand list after deletion
    } catch (error) {
      console.error("Error deleting number:", error);
    } finally {
      setLoading(false);
    }
  };
  const setPrimary = async (numObj) => {
    const regex = /^92[0-9]{10}$/;

    try {
      const res = await axios.put(`/api/whatsApp/${numObj?._id}`,

        {
          id: numObj?._id,
          makePrimary: true,
          WhatsAppNumber: numObj?.WhatsAppNumber
        }

      );
      if (res) {
        fetchNumbers();
        setNewNumber("");
        setMakePrimary(false);
      } else {
        const data = await res.json();
        setFormError(data.error);
      }
    } catch (error) {
      console.error("Error adding number:", error);
    }
  };
  const handleNumberChange = (value) => {
    const regex = /^92[0-9]{10}$/; // Regex for numbers starting with '92' and followed by 10 digits
    setNewNumber(value);

    if (!regex.test(value)) {
      setFormError("Number must be in the format 923032115055");
    } else {
      setFormError(""); // Clear the error if the format is correct
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">WhatsApp Number Management</h1>
      <h3 className="text-sm font-medium mb-2">A primary number means this will be used when redirecting to whatsApp.</h3>

      {/* Add Number Form */}
      <form onSubmit={addNumber} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Enter WhatsApp Number (e.g., 923032115055)"
          value={newNumber}
          onChange={(e) => handleNumberChange(e.target.value)}
          className={`border p-2 rounded w-full ${formError ? "border-red-500" : "border-gray-300"}`}
        />
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={makePrimary}
            onChange={(e) => setMakePrimary(e.target.checked)}
          />
          <label>Set as Primary</label>
        </div>
        {formError && <p className="text-red-500">{formError}</p>}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Number
        </button>
      </form>
      <div className="flex gap-2 items-center mt-8 mb-4">
        <h3 className="text-xl font-semibold ">WhatsApp Numbers List</h3>
        <RefreshButton onClick={fetchNumbers} />
      </div>
      {/* Numbers List */}
      <div className="overflow-x-auto">
        <table className="min-w-full border ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Number</th>
              <th className="border p-2 text-left">Primary</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  <Loading />
                </td>
              </tr>
            ) : numbers.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4">No numbers available.</td>
              </tr>
            ) : (
              numbers?.map((num) => (
                <tr key={num?._id} className="border-t">
                  <td className="p-2">{num?.WhatsAppNumber}</td>
                  <td className="p-2">{num?.makePrimary ? "Yes" : "No"}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => setPrimary(num)}
                    >
                      Set Primary
                    </button>
                    <button
                      disabled={num?.makePrimary}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteNum(num?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}