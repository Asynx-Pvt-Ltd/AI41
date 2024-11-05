"use client";

import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import Image from "next/image";
import { PutBlobResult } from "@vercel/blob";
import { toast } from "react-toastify";
import AdvancedEditor from "@/app/components/AdvancedEditor";

export const dynamic = "force-dynamic";

function FeatureTools() {
  const [tools, setTools] = useState<any>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    url: "",
  });
  const [iconError, setIconError] = useState<any>("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingTool, setEditingTool] = useState<any>(null);
  const fetchTools = async () => {
    setLoading(true);
    const data = await fetch("/api/feature-tools");
    const tools = await data.json();
    setTools(tools);
    setLoading(false);
  };
  // Fetch tools from the backend
  useEffect(() => {
    fetchTools();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update tool
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    var data: any = {
      title: formData.title,
      description: formData.description,
      url: formData.url,
    };
    if (data.title === "" || data.description === "" || data.url === "") {
      toast.error("Add required data");
      return;
    }
    if (!inputFileRef.current?.files?.length && !editMode) {
      toast.error("Add Thumbnail");
      return;
    } else {
      setSubmitting(true);
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
      if (editMode && editingTool?.id) {
        // Update tool
        await fetch(`/api/feature-tools/${editingTool?.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        })
          .then((res) => {
            setSubmitting(false);
            console.log("====================================");
            console.log("res -->", res);
            console.log("====================================");
          })
          .catch((err) => {
            console.log("====================================");
            console.log("err -->", err);
            console.log("====================================");
          });
      } else {
        console.log("====================================");
        console.log("creating new data");
        console.log("====================================");
        // Create new tool
        await fetch("/api/feature-tools", {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then((res) => {
            setSubmitting(false);
            console.log("====================================");
            console.log("res -->", res);
            console.log("====================================");
          })
          .catch((err) => {
            console.log("====================================");
            console.log("err -->", err);
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

  // Edit tool
  const handleEdit = (tool: {
    title: string;
    icon: string;
    description: string;
    link: string;
  }) => {
    setEditMode(true);
    setEditingTool(tool);
    setFormData({
      title: tool.title,
      description: tool.description,
      url: tool.link,
    });
  };

  // Delete tool
  const handleDelete = async (id: any) => {
    setLoading(true);
    fetch(`/api/feature-tools/${id}`, {
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

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Feature Tools</h1>
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
                {tools.length > 0
                  ? tools.map((tool: any) => (
                      <tr key={tool.id}>
                        <td className="border px-4 py-2">
                          <Image
                            src={tool.icon}
                            alt={tool.title}
                            width={32}
                            height={32}
                            className="w-8 h-8"
                          />
                        </td>
                        <td className="border px-4 py-2">{tool.title}</td>
                        <td
                          className="border px-4 py-2"
                          dangerouslySetInnerHTML={{
                            __html:
                              tool.description.length > 250
                                ? `${tool.description.slice(0, 250)}...`
                                : tool.description,
                          }}
                        ></td>
                        <td className="border px-4 py-2">
                          <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {tool.link}
                          </a>
                        </td>
                        <td className="h-auto align-middle border px-4 py-2">
                          <div className="flex flex-row">
                            <button
                              className="bg-blue-500 text-white px-4 py-2 mr-2"
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
                    ))
                  : null}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-row justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
            </div>
          )}
        </>
        <form onSubmit={handleFormSubmit} className="mt-8">
          {submitting === false ? (
            <>
              <label>
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
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
              <div className="flex flex-row">
                <span className="pt-2 pr-2">
                  Thumbnail: <span className="text-red-500">*</span>
                  (Only in case of new tool)
                </span>
                <input
                  type="file"
                  name="icon"
                  ref={inputFileRef}
                  placeholder="icon"
                  className={`block mb-4 p-2 border`}
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
                className="block mb-4 p-2 border"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2"
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

export default FeatureTools;
