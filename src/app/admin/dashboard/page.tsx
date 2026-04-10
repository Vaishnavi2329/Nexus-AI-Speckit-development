"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  Menu,
  Star,
  Mail,
  Calendar,
  Clock,
  Tag,
  User,
  TrendingUp,
  Zap,
  Globe,
  HelpCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [siteData, setSiteData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    loadSiteData();
    checkAuth();
  }, []);

  const loadSiteData = async () => {
    try {
      const response = await fetch('/site-data.json');
      const data = await response.json();
      setSiteData(data);
    } catch (error) {
      console.error('Error loading site data:', error);
    }
  };

  const checkAuth = () => {
    const auth = localStorage.getItem('adminAuth');
    if (auth) {
      setUser(JSON.parse(auth));
    } else {
      router.push('/admin/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const saveSiteData = async (updatedData: any) => {
    try {
      // Save to actual JSON file
      const response = await fetch('/api/site-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData, null, 2)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save site data');
      }
      
      // Also update local state for immediate UI updates
      setSiteData(updatedData);
      
      // Trigger refresh across all components that use the context
      setTimeout(() => {
        window.dispatchEvent(new Event('site-data-updated'));
      }, 100);
      
      console.log('Data saved:', updatedData);
    } catch (error) {
      console.error('Error saving site data:', error);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero Section', icon: Zap },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview siteData={siteData} />;
      case 'hero':
        return <HeroEditor siteData={siteData} onSave={saveSiteData} />;
      case 'features':
        return <FeaturesEditor siteData={siteData} onSave={saveSiteData} />;
      case 'testimonials':
        return <TestimonialsEditor siteData={siteData} onSave={saveSiteData} />;
      case 'blogs':
        return <BlogsEditor siteData={siteData} onSave={saveSiteData} />;
      case 'pricing':
        return <PricingEditor siteData={siteData} onSave={saveSiteData} />;
      case 'contact':
        return <ContactEditor siteData={siteData} onSave={saveSiteData} />;
      case 'settings':
        return <SettingsEditor siteData={siteData} onSave={saveSiteData} adminConfig={siteData?.admin} />;
      default:
        return <DashboardOverview siteData={siteData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nexus AI Admin
              </h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-sm text-slate-600">
                Welcome, <span className="font-medium text-slate-900">{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                    ${activeTab === item.id 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div className="text-sm text-slate-600">
              {user?.name}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

// Dashboard Overview Component
function DashboardOverview({ siteData }: { siteData: any }) {
  const stats = [
    {
      label: 'Total Testimonials',
      value: siteData?.site?.testimonials?.length || 0,
      change: '+12%',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      label: 'Published Blogs',
      value: siteData?.site?.blogs?.filter((blog: any) => blog.published)?.length || 0,
      change: '+8%',
      icon: FileText,
      color: 'green'
    },
    {
      label: 'Total Features',
      value: siteData?.site?.features?.length || 0,
      change: '+15%',
      icon: Star,
      color: 'purple'
    },
    {
      label: 'Pricing Plans',
      value: siteData?.site?.pricing?.length || 0,
      change: '+5%',
      icon: CreditCard,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
        <p className="text-slate-600">Manage your Nexus AI content and settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {siteData?.site?.testimonials?.slice(0, 3).map((testimonial: any, index: number) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {testimonial.avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-600">New testimonial added</p>
              </div>
              <div className="text-xs text-slate-500">
                {new Date(testimonial.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hero Editor Component
function HeroEditor({ siteData, onSave }: { siteData: any; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: siteData?.site?.hero?.title || "",
    tagline: siteData?.site?.hero?.tagline || "",
    description: siteData?.site?.hero?.description || ""
  });

  const handleSave = () => {
    const updatedData = {
      ...siteData,
      site: {
        ...siteData?.site,
        hero: formData
      }
    };
    onSave(updatedData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Hero Section</h2>
        <p className="text-slate-600 mb-6">Edit main hero section content</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Main Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter main title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
            <Input
              value={formData.tagline}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              placeholder="Enter tagline"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter description"
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Features Editor Component
function FeaturesEditor({ siteData, onSave }: { siteData: any; onSave: (data: any) => void }) {
  const [features, setFeatures] = useState(siteData?.site?.features || []);

  const handleAddFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      title: "",
      description: "",
      icon: "🚀"
    };
    setFeatures([...features, newFeature]);
  };

  const handleUpdateFeature = (id: string, field: string, value: string) => {
    setFeatures(features.map((f: any) => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  const handleDeleteFeature = (id: string) => {
    if (confirm("Are you sure you want to delete this feature?")) {
      const updatedFeatures = features.filter((f: any) => f.id !== id);
      const updatedData = {
        ...siteData,
        site: {
          ...siteData?.site,
          features: updatedFeatures
        }
      };
      onSave(updatedData);
    }
  };

  const handleSave = () => {
    const updatedData = {
      ...siteData,
      site: {
        ...siteData?.site,
        features: features
      }
    };
    onSave(updatedData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Features</h2>
          <p className="text-slate-600">Manage features displayed on landing page</p>
        </div>
        <Button onClick={handleAddFeature} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Feature
        </Button>
      </div>

      <div className="space-y-4">
        {features.map((feature: any, index: number) => (
          <div key={feature.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <Input
                    value={feature.title}
                    onChange={(e) => handleUpdateFeature(feature.id, 'title', e.target.value)}
                    placeholder="Feature title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Icon</label>
                  <Input
                    value={feature.icon}
                    onChange={(e) => handleUpdateFeature(feature.id, 'icon', e.target.value)}
                    placeholder="Feature icon (emoji)"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => handleUpdateFeature(feature.id, 'description', e.target.value)}
                  placeholder="Feature description"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save All Features
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDeleteFeature(feature.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Testimonials Editor Component
function TestimonialsEditor({ siteData, onSave }: { siteData: any; onSave: (data: any) => void }) {
  const [testimonials, setTestimonials] = useState(siteData?.site?.testimonials || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    featured: false,
    results: [] as string[]
  });

  const handleAddTestimonial = () => {
    setEditingId("new");
    setFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
      featured: false,
      results: []
    });
  };

  const handleEditTestimonial = (testimonial: any) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      featured: testimonial.featured,
      results: testimonial.results || []
    });
  };

  const handleSaveTestimonial = () => {
    if (!formData.name || !formData.role || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    let updatedTestimonials;
    if (editingId === "new") {
      const newTestimonial = {
        id: Date.now().toString(),
        ...formData,
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'NA',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      updatedTestimonials = [...testimonials, newTestimonial];
    } else {
      updatedTestimonials = testimonials.map((t: any) => 
        t.id === editingId ? { ...t, ...formData, updatedAt: new Date().toISOString() } : t
      );
    }

    const updatedData = {
      ...siteData,
      site: {
        ...siteData?.site,
        testimonials: updatedTestimonials
      }
    };
    onSave(updatedData);
    
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
      featured: false,
      results: []
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const updatedTestimonials = testimonials.filter((t: any) => t.id !== id);
      const updatedData = {
        ...siteData,
        site: {
          ...siteData?.site,
          testimonials: updatedTestimonials
        }
      };
      onSave(updatedData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Testimonials</h2>
          <p className="text-slate-600">Manage customer testimonials</p>
        </div>
        <Button onClick={handleAddTestimonial} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Editing Form */}
      {editingId && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {editingId === "new" ? "Add New Testimonial" : "Edit Testimonial"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Client name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role *</label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="Job title"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Company name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Testimonial *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Client testimonial..."
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= formData.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Featured testimonial</span>
            </label>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditingId(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTestimonial}>
              <Save className="w-4 h-4 mr-2" />
              {editingId === "new" ? "Add" : "Update"}
            </Button>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.map((testimonial: any) => (
          <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                  <span className="text-sm text-slate-600">{testimonial.role}</span>
                  {testimonial.company && (
                    <span className="text-sm text-slate-500">at {testimonial.company}</span>
                  )}
                  {testimonial.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-slate-700 mb-3">{testimonial.content}</p>
                
                {testimonial.results && testimonial.results.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {testimonial.results?.map((result: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditTestimonial(testimonial)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Blogs Editor Component
function BlogsEditor({ siteData, onSave }: { siteData: any; onSave: (data: any) => void }) {
  const [blogs, setBlogs] = useState(siteData?.site?.blogs || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    published: false,
    category: "",
    author: "",
    tags: [] as string[],
    readTime: 0
  });

  const handleAddBlog = () => {
    setEditingId("new");
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      published: false,
      category: "",
      author: "",
      tags: [],
      readTime: 0
    });
  };

  const handleEditBlog = (blog: any) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      published: blog.published,
      category: blog.category,
      author: blog.author,
      tags: blog.tags || [],
      readTime: blog.readTime
    });
  };

  const handleSaveBlog = () => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      alert("Please fill in all required fields");
      return;
    }

    let updatedBlogs;
    if (editingId === "new") {
      const newBlog = {
        id: Date.now().toString(),
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      updatedBlogs = [...blogs, newBlog];
    } else {
      updatedBlogs = blogs.map((b: any) => 
        b.id === editingId ? { ...b, ...formData, updatedAt: new Date().toISOString() } : b
      );
    }

    const updatedData = {
      ...siteData,
      site: {
        ...siteData?.site,
        blogs: updatedBlogs
      }
    };
    onSave(updatedData);
    
    setEditingId(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      published: false,
      category: "",
      author: "",
      tags: [],
      readTime: 0
    });
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      const updatedBlogs = blogs.filter((b: any) => b.id !== id);
      const updatedData = {
        ...siteData,
        site: {
          ...siteData?.site,
          blogs: updatedBlogs
        }
      };
      onSave(updatedData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Blogs</h2>
          <p className="text-slate-600">Manage blog posts</p>
        </div>
        <Button onClick={handleAddBlog} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {/* Editing Form */}
      {editingId && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {editingId === "new" ? "Add New Blog Post" : "Edit Blog Post"}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter blog title"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Technology, Productivity"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Author</label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Excerpt *</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of blog post"
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your blog content here..."
                rows={8}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-700">Publish immediately</span>
              </label>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveBlog}>
                <Save className="w-4 h-4 mr-2" />
                {editingId === "new" ? "Publish" : "Update"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Blogs List */}
      <div className="space-y-4">
        {blogs.map((blog: { id: string; title: string; excerpt: string; published: boolean; author: string; tags: string[]; readTime: number; createdAt: string }) => (
          <div key={blog.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-slate-900">{blog.title}</h4>
                  {blog.published ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Draft
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>{blog.tags.join(', ')}</span>
                  </div>
                </div>
                
                <p className="text-slate-700 mb-3">{blog.excerpt}</p>
                
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags?.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditBlog(blog)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pricing Editor Component
function PricingEditor({ siteData, onSave }: { siteData: any; onSave: (data: any) => void }) {
  const [pricing, setPricing] = useState(siteData?.site?.pricing || []);

  const handleAddPlan = () => {
    const newPlan = {
      id: Date.now().toString(),
      name: "",
      price: 0,
      period: "month",
      description: "",
      features: [],
      badge: null,
      featured: false,
      originalPrice: null,
      cta: "Get Started"
    };
    setPricing([...pricing, newPlan]);
  };

  const handleUpdatePlan = (id: string, field: string, value: any) => {
    setPricing(pricing.map((p: any) => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleDeletePlan = (id: string) => {
    if (confirm("Are you sure you want to delete this pricing plan?")) {
      const updatedPricing = pricing.filter((p: any) => p.id !== id);
      const updatedData = {
        ...siteData,
        site: {
          ...siteData?.site,
          pricing: updatedPricing
        }
      };
      onSave(updatedData);
    }
  };

  const handleSave = () => {
    const updatedData = {
      ...siteData,
      site: {
        ...siteData?.site,
        pricing: pricing
      }
    };
    onSave(updatedData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Pricing Plans</h2>
          <p className="text-slate-600">Manage pricing plans</p>
        </div>
        <Button onClick={handleAddPlan} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <div className="space-y-4">
        {pricing.map((plan: any) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Plan Name</label>
                  <Input
                    value={plan.name || ''}
                    onChange={(e) => handleUpdatePlan(plan.id, 'name', e.target.value)}
                    placeholder="Plan name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                  <Input
                    type="number"
                    value={plan.price || 0}
                    onChange={(e) => handleUpdatePlan(plan.id, 'price', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={plan.description || ''}
                  onChange={(e) => handleUpdatePlan(plan.id, 'description', e.target.value)}
                  placeholder="Plan description"
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Features (one per line)</label>
                <textarea
                  value={plan.features?.join('\n')}
                  onChange={(e) => handleUpdatePlan(plan.id, 'features', e.target.value.split('\n'))}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Call to Action</label>
                <Input
                  value={plan.cta}
                  onChange={(e) => handleUpdatePlan(plan.id, 'cta', e.target.value)}
                  placeholder="Get Started"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={plan.featured}
                      onChange={(e) => handleUpdatePlan(plan.id, 'featured', e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Featured</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={plan.badge}
                      onChange={(e) => handleUpdatePlan(plan.id, 'badge', e.target.value)}
                      placeholder="Most Popular"
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-sm font-medium text-slate-700">Badge</span>
                  </label>
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save All Plans
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeletePlan(plan.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Contact Editor Component
function ContactEditor({ siteData, onSave }: { siteData: any; onSave: (data: any) => void }) {
  const [contact, setContact] = useState({
    email: siteData?.site?.contact?.email || "",
    phone: siteData?.site?.contact?.phone || "",
    address: siteData?.site?.contact?.address || ""
  });

  const handleSave = () => {
    const updatedData = {
      ...siteData,
      site: {
        ...siteData?.site,
        contact: contact
      }
    };
    onSave(updatedData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Contact Information</h2>
        <p className="text-slate-600 mb-6">Manage contact information displayed on landing page</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <Input
              type="email"
              value={contact.email}
              onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
              placeholder="contact@nexusai.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <Input
              type="tel"
              value={contact.phone}
              onChange={(e) => setContact(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
            <textarea
              value={contact.address}
              onChange={(e) => setContact(prev => ({ ...prev, address: e.target.value }))}
              placeholder="123 AI Street, Tech City, TC 12345"
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Contact Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Editor Component
function SettingsEditor({ siteData, onSave, adminConfig }: { siteData: any; onSave: (data: any) => void; adminConfig: any }) {
  const [config, setConfig] = useState({
    email: adminConfig?.email || "",
    password: adminConfig?.password || "",
    name: adminConfig?.name || ""
  });

  const handleSave = () => {
    const updatedData = {
      ...siteData,
      admin: config
    };
    onSave(updatedData);
    alert("Admin credentials updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Admin Settings</h2>
        <p className="text-slate-600 mb-6">Update admin credentials and settings</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Admin Email</label>
            <Input
              type="email"
              value={config.email}
              onChange={(e) => setConfig(prev => ({ ...prev, email: e.target.value }))}
              placeholder="admin@nexusai.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Admin Password</label>
            <Input
              type="password"
              value={config.password}
              onChange={(e) => setConfig(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Admin Name</label>
            <Input
              value={config.name}
              onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Administrator"
            />
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Changing admin credentials will require you to log in again with the new credentials. Make sure to remember your new login details.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Update Admin Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
