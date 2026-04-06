"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Blog {
  id: string;
  title: string;
  content: string;
  status: "published" | "draft";
  createdAt: string;
}

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Getting Started with AI",
      content: "Learn the basics of artificial intelligence and how it can transform your business...",
      status: "published",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "The Future of Automation",
      content: "Discover how automation is reshaping industries and creating new opportunities...",
      status: "draft",
      createdAt: "2024-01-10",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft" as "published" | "draft",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBlog) {
      setBlogs(blogs.map(blog => 
        blog.id === editingBlog.id 
          ? { ...blog, ...formData }
          : blog
      ));
    } else {
      const newBlog: Blog = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setBlogs([...blogs, newBlog]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", status: "draft" });
    setEditingBlog(null);
    setIsFormOpen(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      status: blog.status,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setBlogs(blogs.map(blog => 
      blog.id === id 
        ? { ...blog, status: blog.status === "published" ? "draft" : "published" }
        : blog
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Blog Management</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          Add New Blog
        </Button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingBlog ? "Edit Blog" : "Add New Blog"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full h-32 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "published" | "draft" })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBlog ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-medium text-slate-900">Title</th>
                <th className="text-left p-4 font-medium text-slate-900">Status</th>
                <th className="text-left p-4 font-medium text-slate-900">Created</th>
                <th className="text-left p-4 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-slate-100">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-slate-900">{blog.title}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        {blog.content.substring(0, 100)}...
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{blog.createdAt}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleStatus(blog.id)}
                      >
                        {blog.status === "published" ? "Unpublish" : "Publish"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
