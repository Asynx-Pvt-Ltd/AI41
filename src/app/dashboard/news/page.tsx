"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import Image from "next/image";
import { PutBlobResult } from "@vercel/blob";
import { toast } from "react-toastify";
import AdvancedEditor from "@/app/components/AdvancedEditor";

interface NewsItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  description: string;
}

interface KeywordItem {
  id: string;
  keyword: string;
  keywordUrl: string;
}

interface FormData {
  title: string;
  url: string;
  description: string;
  icon?: string;
}

const initialFormData: FormData = {
  title: "",
  url: "",
  description: "",
};

const initialKeywordData = {
  keyword: "",
  keywordUrl: "",
};

export const dynamic = "force-dynamic";

function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [expandedNews, setExpandedNews] = useState<{ [key: string]: boolean }>(
    {}
  );
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [keywordData, setKeywordData] = useState({
    keyword: "",
    keywordUrl: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingKeyword, setEditingKeyword] = useState<KeywordItem | null>(
    null
  );
  const [keywords, setKeywords] = useState<KeywordItem[]>([]);

  const fetchKeywords = useCallback(async () => {
    try {
      const response = await fetch("/api/getNewsKeyword");
      const data = await response.json();
      setKeywords(data);
    } catch (error) {
      toast.error("Failed to fetch keywords");
      console.error("Error fetching keywords:", error);
    }
  }, []);

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywordData.keyword || !keywordData.keywordUrl) {
      return toast.error("Add Necessary Data");
    }

    try {
      const url = editingKeyword
        ? `/api/getNewsKeyword/${editingKeyword.id}`
        : "/api/getNewsKeyword";
      const method = editingKeyword ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: keywordData.keyword,
          keywordUrl: keywordData.keywordUrl,
        }),
      });

      if (response.status === 200) {
        toast.success(
          editingKeyword
            ? "Keyword Updated Successfully"
            : "Keyword Added Successfully"
        );
        setKeywordData(initialKeywordData);
        setEditingKeyword(null);
        fetchKeywords();
      } else {
        toast.error(
          editingKeyword ? "Error updating keyword" : "Error adding keyword"
        );
      }
    } catch (error) {
      toast.error("Error processing keyword");
      console.error("Error processing keyword:", error);
    }
  };

  const handleEditKeyword = (keyword: KeywordItem) => {
    setEditingKeyword(keyword);
    setKeywordData({
      keyword: keyword.keyword,
      keywordUrl: keyword.keywordUrl,
    });
  };

  const handleDeleteKeyword = async (id: string) => {
    try {
      const response = await fetch(`/api/getNewsKeyword/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        toast.success("Keyword deleted successfully");
        fetchKeywords();
      } else {
        toast.error("Error deleting keyword");
      }
    } catch (error) {
      toast.error("Error deleting keyword");
      console.error("Error deleting keyword:", error);
    }
  };

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/news");
      const data = await response.json();
      setNews(data);
    } catch (error) {
      toast.error("Failed to fetch news");
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const toggleDescription = useCallback((newsId: string) => {
    setExpandedNews((prev) => ({
      ...prev,
      [newsId]: !prev[newsId],
    }));
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.title || !formData.url) {
        toast.error("Add required data");
        return;
      }

      if (!inputFileRef.current?.files?.length && !editMode) {
        toast.error("Add thumbnail");
        return;
      }

      try {
        setSubmitting(true);
        let data: FormData = { ...formData };

        if (inputFileRef.current?.files?.length) {
          const file = inputFileRef.current.files[0];
          const response = await fetch(
            `/api/image/upload?filename=${file.name}`,
            {
              method: "POST",
              body: file,
            }
          );
          const result = (await response.json()) as PutBlobResult;
          data.icon = result.url;
        }

        const url = editMode ? `/api/news/${editingNews?.id}` : "/api/news";
        const method = editMode ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to save news");

        setFormData(initialFormData);
        setEditMode(false);
        if (inputFileRef.current) inputFileRef.current.value = "";

        toast.success(
          editMode ? "News updated successfully" : "News added successfully"
        );
        fetchNews();
      } catch (error) {
        toast.error("Error saving news");
        console.error("Error saving news:", error);
      } finally {
        setSubmitting(false);
      }
    },
    [formData, editMode, editingNews, fetchNews]
  );

  const handleEdit = useCallback((newsItem: NewsItem) => {
    setEditMode(true);
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      url: newsItem.url,
      description: newsItem.description || "",
    });
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setNews(data);
      toast.success("News deleted successfully");
    } catch (error) {
      toast.error("Error deleting news");
      console.error("Error deleting news:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white" />
    </div>
  );

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">AI News</h1>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4">Icon</th>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">URL</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {news.map((n) => (
                <tr key={n.id}>
                  <td className="border px-4 py-2">
                    <Image
                      src={n.icon}
                      alt={n.title}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                      loading="lazy"
                    />
                  </td>
                  <td className="border px-4 py-2">{n.title}</td>
                  <td className="border px-4 py-2">
                    {n.description ? (
                      <>
                        {expandedNews[n.id]
                          ? n.description
                          : `${n.description.slice(0, 100)}${
                              n.description.length > 100 ? "..." : ""
                            }`}
                        {n.description.length > 100 && (
                          <button
                            onClick={() => toggleDescription(n.id)}
                            className="ml-2 text-blue-500 hover:underline"
                          >
                            {expandedNews[n.id] ? "See Less" : "See More"}
                          </button>
                        )}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <a href={n.url} target="_blank" rel="noopener noreferrer">
                      {n.url}
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-row">
                      <button
                        className="bg-blue-500 text-white px-4 py-3 mr-2"
                        onClick={() => handleEdit(n)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2"
                        onClick={() => handleDelete(n.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2 className="text-xl font-bold mt-4">Add News</h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col mt-8">
          {submitting ? (
            <LoadingSpinner />
          ) : (
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
                className="max-w-52 block mb-4 p-2 border"
              />
              <label>Description</label>

              <AdvancedEditor
                value={formData.description}
                onChange={(html) =>
                  setFormData({ ...formData, description: html })
                }
              />
              <div className="flex flex-row">
                <span className="pt-2 pr-2">
                  Thumbnail: <span className="text-red-500">*</span>
                  {!editMode && " (Required for new items)"}
                </span>
                <input
                  type="file"
                  name="icon"
                  accept="image/*"
                  ref={inputFileRef}
                  className="block mb-4 p-2 border"
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

              <button
                type="submit"
                className="max-w-32 mt-4 bg-green-500 text-white px-4 py-2"
              >
                {editMode ? "Update News" : "Add News"}
              </button>
            </>
          )}
        </form>
        <h2 className="mt-10 text-xl font-bold">Keyword & URL</h2>
        <div className="mt-8">
          <table className="min-w-full bg-white mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4">Keyword</th>
                <th className="py-2 px-4">URL</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.keyword}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={item.keywordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.keywordUrl}
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-row">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 mr-2"
                        onClick={() => handleEditKeyword(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2"
                        onClick={() => handleDeleteKeyword(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form onSubmit={handleAddKeyword}>
          <label>Keyword</label>
          <input
            type="text"
            name="keyword"
            placeholder="Keyword"
            value={keywordData.keyword}
            onChange={(e) =>
              setKeywordData({ ...keywordData, keyword: e.target.value })
            }
            className="max-w-52 block mb-4 p-2 border"
          />
          <label>URL</label>
          <input
            type="text"
            name="url"
            placeholder="URL"
            value={keywordData.keywordUrl}
            onChange={(e) =>
              setKeywordData({ ...keywordData, keywordUrl: e.target.value })
            }
            className="max-w-52 block mb-4 p-2 border"
          />
          <button
            type="submit"
            className="max-w-44 mt-4 bg-green-500 text-white px-4 py-2"
          >
            {editingKeyword ? "Update Keyword" : "Add Keyword"}
          </button>
          {editingKeyword && (
            <button
              type="button"
              className="max-w-44 mt-4 ml-2 bg-gray-500 text-white px-4 py-2"
              onClick={() => {
                setEditingKeyword(null);
                setKeywordData(initialKeywordData);
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}

export default News;
