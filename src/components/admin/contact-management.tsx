"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "responded";
}

export default function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      subject: "Question about Enterprise Plan",
      message: "I'm interested in learning more about the Enterprise plan features and pricing. We have a team of 50+ developers and need custom AI models.",
      createdAt: "2024-01-15 10:30 AM",
      status: "new",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      subject: "Feature Request",
      message: "Would it be possible to add integration with Slack? Our team uses Slack extensively and this would be very valuable.",
      createdAt: "2024-01-14 2:15 PM",
      status: "read",
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@startup.io",
      subject: "Technical Support",
      message: "Having issues with the AI generation API. Getting timeout errors when processing large documents.",
      createdAt: "2024-01-13 9:45 AM",
      status: "responded",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "read" | "responded">("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, status: Contact["status"]) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status } : contact
    ));
  };

  const deleteContact = (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter(contact => contact.id !== id));
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    }
  };

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "read":
        return "bg-yellow-100 text-yellow-800";
      case "responded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Management</h2>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contacts List */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">
              Messages ({filteredContacts.length})
            </h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 ${
                  selectedContact?.id === contact.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-slate-900">{contact.name}</p>
                    <p className="text-sm text-slate-600">{contact.email}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-900 mb-1">{contact.subject}</p>
                <p className="text-sm text-slate-600 truncate">{contact.message}</p>
                <p className="text-xs text-slate-500 mt-2">{contact.createdAt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          {selectedContact ? (
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {selectedContact.subject}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-600">
                      <strong>From:</strong> {selectedContact.name} ({selectedContact.email})
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Date:</strong> {selectedContact.createdAt}
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Status:</strong> 
                      <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(selectedContact.status)}`}>
                        {selectedContact.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-2">Message:</h4>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedContact.status !== "read" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(selectedContact.id, "read")}
                  >
                    Mark as Read
                  </Button>
                )}
                {selectedContact.status !== "responded" && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(selectedContact.id, "responded")}
                  >
                    Mark as Responded
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteContact(selectedContact.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-slate-600">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
