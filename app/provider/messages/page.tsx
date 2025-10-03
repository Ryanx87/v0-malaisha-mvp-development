"use client"

import type React from "react"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, DollarSign, Briefcase, User, Send } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/provider/dashboard", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Find Jobs", href: "/provider/jobs", icon: <Search className="w-5 h-5" /> },
  { name: "My Applications", href: "/provider/applications", icon: <Briefcase className="w-5 h-5" /> },
  { name: "Messages", href: "/provider/messages", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Earnings", href: "/provider/earnings", icon: <DollarSign className="w-5 h-5" /> },
]

const mockConversations = [
  {
    id: 1,
    name: "John Doe",
    role: "Client",
    lastMessage: "Yes, 9 AM tomorrow works perfectly. See you then!",
    timestamp: "2 min ago",
    unread: 1,
    jobTitle: "Plumbing Repair Needed",
  },
  {
    id: 2,
    name: "Emma Davis",
    role: "Client",
    lastMessage: "Could you provide a detailed quote for the cleaning service?",
    timestamp: "3 hours ago",
    unread: 0,
    jobTitle: "House Cleaning Service",
  },
  {
    id: 3,
    name: "Robert Wilson",
    role: "Client",
    lastMessage: "Great work! I've left you a 5-star review.",
    timestamp: "1 day ago",
    unread: 0,
    jobTitle: "Carpentry Work",
  },
]

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    senderName: "You",
    content: "Hi! Thank you for accepting my application. I'm excited to work on your plumbing repair.",
    timestamp: "10:30 AM",
    isOwn: true,
  },
  {
    id: 2,
    senderId: 2,
    senderName: "John Doe",
    content: "Great! When can you start?",
    timestamp: "10:35 AM",
    isOwn: false,
  },
  {
    id: 3,
    senderId: 1,
    senderName: "You",
    content: "I can start the plumbing work tomorrow morning. Does 9 AM work for you?",
    timestamp: "10:40 AM",
    isOwn: true,
  },
  {
    id: 4,
    senderId: 2,
    senderName: "John Doe",
    content: "Yes, 9 AM tomorrow works perfectly. See you then!",
    timestamp: "10:42 AM",
    isOwn: false,
  },
]

export default function ProviderMessages() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      senderId: 1,
      senderName: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AuthGuard allowedRoles={["provider"]}>
      <DashboardLayout role="provider" navigation={navigation}>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Messages</h2>
            <p className="text-gray-600">Communicate with clients</p>
          </div>

          {/* Messaging Interface */}
          <Card className="overflow-hidden">
            <div className="flex h-[600px]">
              {/* Conversations List */}
              <div className="w-80 border-r flex flex-col">
                {/* Search */}
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 border-b hover:bg-gray-50 transition-colors text-left ${
                        selectedConversation.id === conv.id ? "bg-emerald-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 truncate">{conv.name}</h4>
                            {conv.unread > 0 && (
                              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center flex-shrink-0">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{conv.jobTitle}</p>
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                          <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Thread */}
              <div className="flex-1 flex flex-col">
                {/* Thread Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-600">{selectedConversation.jobTitle}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] ${message.isOwn ? "order-2" : "order-1"}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.isOwn ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
