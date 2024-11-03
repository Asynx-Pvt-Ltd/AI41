"use client";
import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import Image from "next/image";
import { PutBlobResult } from "@vercel/blob";
import { toast } from "react-toastify";
import AdvancedEditor from "@/app/components/AdvancedEditor";
export const dynamic = "force-dynamic";
function Tools() {
  const [tools, setTools] = useState<any>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputFileRefThumbnail = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    shortDescription: "",
    url: "",
    category: "",
    pricing: "",
    categoryId: -1,
    tags: [],
  });
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pricing, setPricing] = useState("Free");
  const [categories, setCategories] = useState<any>([]);
  const [iconError, setIconError] = useState<any>("");
  const [thumbnailError, setThumbnailError] = useState<any>("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingTool, setEditingTool] = useState<any>(null);
  const fetchTools = async () => {
    setLoading(true);
    setCategory("");
    setPricing("Free");
    const response = await fetch("/api/tools");
    const data = await response.json();
    console.log("====================================");
    console.log("tools -->", data);
    console.log("====================================");
    setTools(data);
    setLoading(false);
  };
  // Fetch tools from the backend
  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          console.log("====================================");
          console.log("Failed to fetch categories");
          console.log("====================================");
          return;
        }
        const data = await response.json();
        setCategory(data[0].name);
        setCategoryId(data[0].id);
        setFormData({ ...formData, categoryId: data[0].id });
        setFormData({ ...formData, category: data[0].name });
        setCategories(data);
      } catch (error: any) {
        console.log("====================================");
        console.log("error.message --->", error.message);
        console.log("====================================");
      }
    };

    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormData({ ...formData, [name]: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add or update tool
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitting(true);
    var data: any = {
      name: formData.name,
      description: formData.description,
      shortDescription: formData.shortDescription,
      url: formData.url,
      categoryId: formData.categoryId !== -1 ? formData.categoryId : categoryId,
      pricing: formData.pricing || pricing,
      category: formData.category || category,
      tags: formData.tags,
    };
    if (
      formData.name === "" ||
      formData.shortDescription === "" ||
      formData.description === "" ||
      formData.url === "" ||
      formData.category === "" ||
      formData.categoryId === ""
    ) {
      toast.error("Add necessary data");
      setSubmitting(false);
      return;
    }
    if (inputFileRef.current?.files?.length === 0 && editMode === false) {
      // setIconError('No Icon selected')
      toast.error("No icon selected");
      setSubmitting(false);
      return;
    }
    if (
      inputFileRefThumbnail.current?.files?.length === 0 &&
      editMode === false
    ) {
      // setThumbnailError('No Thumbnail Selected')
      toast.error("No thumbnail selected");
      setSubmitting(false);

      return;
    } else {
      setIconError("");
      setThumbnailError("");
      if (
        inputFileRef.current?.files &&
        inputFileRef.current.files.length > 0
      ) {
        const response = await fetch(
          `/api/image/upload?filename=${inputFileRef.current?.files[0].name}`,
          {
            method: "POST",
            body: inputFileRef.current?.files[0],
          }
        );
        const url = ((await response.json()) as PutBlobResult).url;
        data = { ...data, icon: url };
      }
      if (
        inputFileRefThumbnail.current?.files &&
        inputFileRefThumbnail.current?.files.length > 0
      ) {
        const response = await fetch(
          `/api/image/upload?filename=${inputFileRefThumbnail.current?.files[0].name}`,
          {
            method: "POST",
            body: inputFileRefThumbnail.current?.files[0],
          }
        );
        const url = ((await response.json()) as PutBlobResult).url;
        data = { ...data, thumbnail: url };
      }
      if (
        editMode === true &&
        (editingTool?.id !== "" ||
          editingTool?.id !== null ||
          editingTool?.id !== undefined)
      ) {
        // Update tool
        await fetch(`/api/tools/${editingTool?.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        })
          .then((res) => {
            setSubmitting(false);

            console.log("====================================");
            console.log("res --->", res);
            console.log("====================================");
          })
          .catch((err) => {
            console.log("====================================");
            console.log("err updating --->", err);
            console.log("====================================");
          });
      } else {
        // Create new tool
        await fetch("/api/tools", {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then((res) => {
            setSubmitting(false);
            console.log("====================================");
            console.log("res --->", res);
            console.log("====================================");
            // const newTools = tools.push(tool)
            // setTools(newTools)
          })
          .catch((err) => {
            console.log("====================================");
            console.log("err posting --->", err);
            console.log("====================================");
          });
      }
    }
    // Refresh tools list
    setFormData({
      name: "",
      description: "",
      url: "",
    });
    setEditMode(false);
    fetchTools();
  };

  const handleEdit = (tool: {
    name: string;
    icon: string;
    description: string;
    url: string;
    categoryId: number;
  }) => {
    setEditMode(true);
    const category = categories.filter(
      (c: { id: any }) => c.id === tool?.categoryId
    );
    setCategory(category.name);
    setEditingTool(tool);
    setFormData(tool);
  };

  console.log("====================================");
  console.log("tools --->", tools);
  console.log("====================================");

  const handleDelete = async (id: any) => {
    setLoading(true);
    fetch(`/api/tools/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((d) => {
        setTools(d);
        setLoading(false);
      })
      .catch((err) => {
        console.log("====================================");
        console.log("err --->", err);
        console.log("====================================");
      });
  };

  const handleCategoryChange = (e: { target: { value: string } }) => {
    const c = categories.filter((c: any) => c.name === e.target.value);
    setCategory(e.target.value);
    setFormData({ ...formData, category: e.target.value, categoryId: c[0].id });
  };

  const handlePricingChange = (e: { target: { value: string } }) => {
    setPricing(e.target.value);
    setFormData({ ...formData, pricing: e.target.value });
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Tools</h1>

        <>
          {loading === false ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4">Icon</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">URL</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {tools.length > 0 &&
                  tools?.map((tool: any) => (
                    <tr key={tool.id}>
                      <td className="border px-4 py-2">
                        <Image
                          src={tool.icon}
                          alt={tool.name}
                          width={32}
                          height={32}
                          className="w-8 h-8"
                        />
                      </td>
                      <td className="border px-4 py-2">{tool.name}</td>
                      <td className="border px-4 py-2">
                        {tool.description.length > 250
                          ? `${tool.description.slice(0, 250)}...`
                          : tool.description}
                      </td>
                      <td className="border px-4 py-2">
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tool.url}
                        </a>
                      </td>
                      <td className="h-auto align-middle border px-4 py-2">
                        <div className="flex flex-row">
                          <button
                            className="bg-blue-500 text-white px-4 py-3 mr-2"
                            onClick={() => handleEdit(tool)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2"
                            onClick={() => handleDelete(tool.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-row justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
            </div>
          )}
        </>

        <h2 className="text-xl font-bold mt-4">Add Tool</h2>
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
              <label>
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="shortDescription"
                placeholder="Short Description"
                rows={3}
                value={formData.shortDescription}
                onChange={handleInputChange}
                className="block mb-4 p-2 border"
              />
              <label>
                Description <span className="text-red-500">*</span>
              </label>
              {/* <textarea
                name='description'
                placeholder='Description'
                rows={10}
                value={formData.description}
                onChange={handleInputChange}
                className='block mb-4 p-2 border'
              /> */}
              <AdvancedEditor
                value={formData.description}
                onChange={(html) =>
                  setFormData({ ...formData, description: html })
                }
              />
              <div className="flex flex-row items-center">
                <span className="pt-2 pr-2">
                  Icon: <span className="text-red-500">*</span>
                  (Only in case of new tool)
                </span>
                <input
                  type="file"
                  name="icon"
                  placeholder="icon"
                  ref={inputFileRef}
                  className={`block mt-px ml-12 p-2 border`}
                />
              </div>
              <div className="flex flex-row">
                <span className="pt-2 pr-2">
                  Thumbnail: <span className="text-red-500">*</span>
                  (Only in case of new tool)
                </span>
                <input
                  type="file"
                  name="thumbnail"
                  placeholder="Thumbnail"
                  ref={inputFileRefThumbnail}
                  className={`block mt-px p-2 border`}
                />
              </div>
              <label>
                URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={formData.url}
                onChange={handleInputChange}
                className="max-w-52 block mb-4 p-2 border"
              />
              <label>
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="px-4 py-2 mb-4 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
              >
                {categories.map((category: { id: number; name: string }) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label>
                Pricing <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.pricing}
                onChange={handlePricingChange}
                className="px-4 py-2 border rounded-md text-gray-700 dark:text-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
              >
                <option value={"Free"}>Free</option>
                <option value={"Fremium"}>Freemium</option>
                <option value={"Paid"}>Paid</option>
              </select>
              <label className="mt-4">Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="Tags separated by `,`"
                value={formData.tags}
                onChange={handleInputChange}
                className="max-w-52 block mb-4 p-2 border"
              />
              <button
                type="submit"
                className="max-w-32 mt-4 bg-green-500 text-white px-4 py-2"
              >
                {editMode ? "Update Tool" : "Add Tool"}
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

export default Tools;
