"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import { toast } from "react-toastify";

function JobRoles() {
  const [jobRoles, setJobRoles] = useState<any>([]);
  const [formData, setFormData] = useState<{ name: string }>({
    name: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingJobRole, setEditingJobRole] = useState<any>(null);

  const fetchJobRoles = async () => {
    setLoading(true);
    const response = await fetch("/api/job-roles");
    const data = await response.json();
    setJobRoles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobRoles();
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formData.name === "") {
      toast.error("Add name");
      return;
    }

    setSubmitting(true);
    const slug = formData.name
      .split(" ")
      .map((s) => s.toLowerCase())
      .join("-");

    if (editMode && editingJobRole?.id) {
      // Update job role
      await fetch(`/api/job-roles/${editingJobRole?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: formData.name,
          slug: slug,
        }),
      })
        .then((res) => {
          setSubmitting(false);
          toast.success("Job Role updated successfully");
        })
        .catch((err) => {
          console.error("Error updating job role:", err);
          toast.error("Error updating job role");
          setSubmitting(false);
        });
    } else {
      // Create new job role
      await fetch("/api/job-roles", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          slug: slug,
        }),
      })
        .then((res) => {
          setSubmitting(false);
          toast.success("Job Role created successfully");
        })
        .catch((err) => {
          console.error("Error creating job role:", err);
          toast.error("Error creating job role");
          setSubmitting(false);
        });
    }

    setFormData({ name: "" });
    setEditMode(false);
    fetchJobRoles();
  };

  const handleEdit = (jobRole: any) => {
    setEditMode(true);
    setEditingJobRole(jobRole);
    setFormData(jobRole);
  };

  const handleDelete = async (id: any) => {
    setLoading(true);
    fetch(`/api/job-roles/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((d) => {
        setJobRoles(d);
        setLoading(false);
        toast.success("Job Role deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting job role:", err);
        toast.error("Error deleting job role");
        setLoading(false);
      });
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Job Roles</h1>
        <>
          {loading === false ? (
            <div className="bg-white max-h-[80vh] overflow-y-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobRoles.length
                    ? jobRoles.map((jobRole: any) => (
                        <tr key={jobRole.id}>
                          <td className="border px-4 py-2">{jobRole.name}</td>
                          <td className="h-auto align-middle justify-center border px-4 py-2">
                            <div className="flex flex-row justify-center">
                              <button
                                className="bg-blue-500 text-white px-4 py-3 mr-2"
                                onClick={() => handleEdit(jobRole)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2"
                                onClick={() => handleDelete(jobRole.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
            </div>
          )}
        </>
        <h2 className="text-xl font-bold mt-4">
          {editMode ? "Edit Job Role" : "Add Job Role"}
        </h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col mt-8">
          {submitting === false ? (
            <>
              <label>
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="max-w-52 block mb-4 p-2 border"
              />

              <button
                type="submit"
                className="max-w-48 mt-4 bg-green-500 text-white px-4 py-2"
              >
                {editMode ? "Update Job Role" : "Add Job Role"}
              </button>
            </>
          ) : (
            <div className="flex flex-row justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}

export default JobRoles;
