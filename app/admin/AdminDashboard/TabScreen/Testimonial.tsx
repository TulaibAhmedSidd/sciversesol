"use client";
import RefreshButton from "@/app/components/RefreshButton";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TestimonialTabScreen = ({ isAdmin }: { isAdmin: boolean }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    text: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/testimonial", {
        // headers: { "x-is-admin": isAdmin.toString() }, // Admin or user view
      });
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!newTestimonial.text || !newTestimonial.author) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/testimonial", newTestimonial);
      setNewTestimonial({ text: "", author: "" });
      fetchTestimonials(); // Refresh list
    } catch (error) {
      console.error("Error adding testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string,statusBool:boolean) => {
    try {
      await axios.patch(`/api/testimonial/${id}`, { approved: statusBool });
      fetchTestimonials(); // Refresh list
    } catch (error) {
      console.error("Error approving testimonial:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Add New Testimonial Form */}
      <h1 className="text-xl font-bold mb-4">Testimonial Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Label and Textarea for Testimonial Text */}
        <div>
          <label
            htmlFor="testimonialText"
            className="block text-sm font-medium text-gray-700"
          >
            Testimonial Text
          </label>
          <textarea
            id="testimonialText"
            placeholder="Enter testimonial text"
            value={newTestimonial.text}
            onChange={(e) =>
              setNewTestimonial({ ...newTestimonial, text: e.target.value })
            }
            className="p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
          />
        </div>

        {/* Label and Input for Author Name */}
        <div>
          <label
            htmlFor="authorName"
            className="block text-sm font-medium text-gray-700"
          >
            Author Name
          </label>
          <input
            id="authorName"
            type="text"
            placeholder="Enter author name"
            value={newTestimonial.author}
            onChange={(e) =>
              setNewTestimonial({ ...newTestimonial, author: e.target.value })
            }
            className="p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
      <div className="flex gap-2 items-center mt-8 mb-4">
        <h3 className="text-xl font-semibold ">Testimonials List</h3>
        <RefreshButton onClick={fetchTestimonials} />
      </div>
      {/* Pending Testimonials */}
      <h3 className="text-xl font-semibold mt-8">Pending Testimonials</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        testimonials
          .filter((t: any) => !t.approved)
          .map((t: any) => (
            <div
              key={t._id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm space-y-2"
            >
              <p className="text-gray-800">{t.text}</p>
              <p className="text-gray-500">— {t.author}</p>
              {/* {isAdmin && ( */}
              <button
                onClick={() => handleApprove(t._id,true)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
              {/* )} */}
            </div>
          ))
      )}

      {/* Approved Testimonials */}
      <h3 className="text-xl font-semibold mt-8">Approved Testimonials</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        testimonials
          .filter((t: any) => t.approved)
          .map((t: any) => (
            <div
              key={t._id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm space-y-2"
            >
              <p className="text-gray-800">{t.text}</p>
              <p className="text-gray-500">— {t.author}</p>
              <button
                onClick={() => handleApprove(t._id,false)}
                className="mt-2 px-4 py-2  text-red-900 rounded-lg hover:bg-red-300"
              >
                Reject
              </button>
            </div>
          ))
      )}
    </div>
  );
};

export default TestimonialTabScreen;
