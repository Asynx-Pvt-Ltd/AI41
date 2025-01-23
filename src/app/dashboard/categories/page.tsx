"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import { toast } from "react-toastify";
export const dynamic = "force-dynamic";

function Categories() {
  const [categories, setCategories] = useState<any>([]);
  const [formData, setFormData] = useState<{ name: string; fontIcon: string }>({
    name: "",
    fontIcon: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
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
    var slug = formData.name
      .split(" ")
      .map((s) => s.toLowerCase())
      .join("-");

    if (editMode && editingCategory?.id) {
      // Update category
      await fetch(`/api/categories/${editingCategory?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: formData.name,
          slug: slug,
          fontIcon: formData.fontIcon,
        }),
      })
        .then((res) => {
          setSubmitting(false);
          toast.success("Category updated successfully");
        })
        .catch((err) => {
          console.error("Error updating category:", err);
          toast.error("Error updating category");
          setSubmitting(false);
        });
    } else {
      // Create new category
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          slug: slug,
          fontIcon: formData.fontIcon,
        }),
      })
        .then((res) => {
          setSubmitting(false);
          toast.success("Category created successfully");
        })
        .catch((err) => {
          console.error("Error creating category:", err);
          toast.error("Error creating category");
          setSubmitting(false);
        });
    }

    setFormData({
      name: "",
      fontIcon: "",
    });
    setEditMode(false);
    fetchCategories();
  };

  const handleEdit = (category: any) => {
    setEditMode(true);
    setEditingCategory(category);
    setFormData(category);
  };

  const handleDelete = async (id: any) => {
    setLoading(true);
    fetch(`/api/categories/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((d) => {
        setCategories(d);
        setLoading(false);
        toast.success("Category deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
        toast.error("Error deleting category");
        setLoading(false);
      });
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <>
          {/* Category List Table */}
          {loading === false ? (
            <div className="bg-white max-h-[80vh] overflow-y-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Font Icon</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length
                    ? categories.map((category: any) => (
                        <tr key={category.id}>
                          <td className="border px-4 py-2">{category.name}</td>
                          <td className="border px-4 py-2 flex items-center">
                            <i className={category.fontIcon}></i>
                            <lord-icon
                              src={`https://cdn.lordicon.com/${category.fontIcon}.json`}
                              trigger="hover"
                              style={{
                                width: "25" + "px",
                                height: "25" + "px",
                              }}
                            ></lord-icon>
                            <span className="ml-2">{category.fontIcon}</span>
                          </td>
                          <td className="h-auto align-middle justify-center border px-4 py-2">
                            <div className="flex flex-row justify-center">
                              <button
                                className="bg-blue-500 text-white px-4 py-3 mr-2"
                                onClick={() => handleEdit(category)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2"
                                onClick={() => handleDelete(category.id)}
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
          {editMode ? "Edit Category" : "Add Category"}
        </h2>
        {/* Add/Edit Form */}
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

              <label>Lordicon code</label>
              <input
                type="text"
                name="fontIcon"
                placeholder="e.g. jeuxydnh"
                value={formData.fontIcon}
                onChange={handleInputChange}
                className="max-w-52 block mb-4 p-2 border"
              />

              <button
                type="submit"
                className="max-w-48 mt-4 bg-green-500 text-white px-4 py-2"
              >
                {editMode ? "Update Category" : "Add Category"}
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

export default Categories;
