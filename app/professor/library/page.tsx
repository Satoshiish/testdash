"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  FileText,
  Video,
  ImageIcon,
  File,
  Star,
  Share2,
  Folder,
  Grid,
  List,
  Settings,
  LogOut,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Users,
  Lock,
} from "lucide-react"

export default function ProfessorLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    visibility: "private",
  })
  const [settings, setSettings] = useState({
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    office: "Science Building 301",
    bio: "Professor of Computer Science with 15 years of experience in algorithms and data structures.",
    notifications: {
      email: true,
      push: true,
      quiz: true,
      grades: false,
    },
    privacy: {
      profileVisible: true,
      contactVisible: false,
    },
    theme: "dark",
    language: "en",
  })

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    sessionStorage.clear()
    sessionStorage.setItem("justLoggedOut", "true")
    window.location.href = "/"
  }

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings)
    setIsSettingsOpen(false)
  }

  const resources = [
    {
      id: 1,
      title: "Introduction to Data Structures",
      description: "Comprehensive guide covering arrays, linked lists, stacks, and queues",
      type: "pdf",
      category: "Lecture Notes",
      size: "2.4 MB",
      downloads: 156,
      rating: 4.8,
      tags: ["data-structures", "algorithms", "fundamentals"],
      dateAdded: "2024-01-15",
      visibility: "public",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Algorithm Analysis Video",
      description: "Step-by-step video explanation of Big O notation and complexity analysis",
      type: "video",
      category: "Video Lectures",
      size: "45.2 MB",
      downloads: 89,
      rating: 4.6,
      tags: ["algorithms", "complexity", "big-o"],
      dateAdded: "2024-01-20",
      visibility: "class-only",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Database Schema Diagram",
      description: "Visual representation of relational database design principles",
      type: "image",
      category: "Diagrams",
      size: "1.8 MB",
      downloads: 234,
      rating: 4.9,
      tags: ["database", "schema", "design"],
      dateAdded: "2024-01-10",
      visibility: "public",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Programming Best Practices",
      description: "Essential coding standards and practices for software development",
      type: "pdf",
      category: "Guidelines",
      size: "856 KB",
      downloads: 312,
      rating: 5.0,
      tags: ["programming", "best-practices", "coding"],
      dateAdded: "2024-01-05",
      visibility: "public",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Web Development Framework Models",
      description: "3D models and diagrams of popular web development frameworks",
      type: "file",
      category: "3D Models",
      size: "12.3 MB",
      downloads: 67,
      rating: 4.4,
      tags: ["web-development", "frameworks", "3d"],
      dateAdded: "2024-01-25",
      visibility: "private",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Quiz Template - CS Fundamentals",
      description: "Reusable quiz template covering fundamental computer science concepts",
      type: "file",
      category: "Templates",
      size: "245 KB",
      downloads: 123,
      rating: 4.7,
      tags: ["quiz", "template", "computer-science"],
      dateAdded: "2024-01-18",
      visibility: "class-only",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  const categories = [
    { value: "all", label: "All Resources", count: resources.length },
    {
      value: "Lecture Notes",
      label: "Lecture Notes",
      count: resources.filter((r) => r.category === "Lecture Notes").length,
    },
    {
      value: "Video Lectures",
      label: "Video Lectures",
      count: resources.filter((r) => r.category === "Video Lectures").length,
    },
    { value: "Diagrams", label: "Diagrams", count: resources.filter((r) => r.category === "Diagrams").length },
    { value: "Guidelines", label: "Guidelines", count: resources.filter((r) => r.category === "Guidelines").length },
    { value: "3D Models", label: "3D Models", count: resources.filter((r) => r.category === "3D Models").length },
    { value: "Templates", label: "Templates", count: resources.filter((r) => r.category === "Templates").length },
  ]

  const filteredResources = resources.filter(
    (resource) =>
      (selectedCategory === "all" || resource.category === selectedCategory) &&
      (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "video":
        return <Video className="h-6 w-6 text-blue-500" />
      case "image":
        return <ImageIcon className="h-6 w-6 text-green-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  const getVisibilityBadge = (visibility: string) => {
    switch (visibility) {
      case "public":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1">
            <Globe className="h-3 w-3" />
            Public
          </Badge>
        )
      case "class-only":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 flex items-center gap-1">
            <Users className="h-3 w-3" />
            Class Only
          </Badge>
        )
      case "private":
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Private
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Unknown
          </Badge>
        )
    }
  }

  const handleUpload = () => {
    console.log("Uploading resource:", newResource)
    setIsUploadOpen(false)
    setNewResource({
      title: "",
      description: "",
      category: "",
      tags: "",
      visibility: "private",
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-red-500">TestDash</div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/professor/home" className="hover:text-red-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/professor/classes" className="hover:text-red-400 transition-colors">
              Classes
            </Link>
            <Link href="/professor/library" className="text-red-400">
              Library
            </Link>
            <Link href="/professor/quiz-dashboard" className="hover:text-red-400 transition-colors">
              Quizzes
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-gray-800">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                    <TabsTrigger value="profile" className="data-[state=active]:bg-orange-500">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-500">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="data-[state=active]:bg-orange-500">
                      <Shield className="h-4 w-4 mr-2" />
                      Privacy
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="data-[state=active]:bg-orange-500">
                      <Palette className="h-4 w-4 mr-2" />
                      Appearance
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                          value={settings.firstName}
                          onChange={(e) => setSettings({ ...settings, firstName: e.target.value })}
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                          value={settings.lastName}
                          onChange={(e) => setSettings({ ...settings, lastName: e.target.value })}
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="bg-gray-700 border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Select
                          value={settings.department}
                          onValueChange={(value) => setSettings({ ...settings, department: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Office Location</Label>
                      <Input
                        value={settings.office}
                        onChange={(e) => setSettings({ ...settings, office: e.target.value })}
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea
                        value={settings.bio}
                        onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                        className="bg-gray-700 border-gray-600"
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-400">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={settings.notifications.email}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, email: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-gray-400">Receive browser push notifications</p>
                        </div>
                        <Switch
                          checked={settings.notifications.push}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, push: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Quiz Submissions</Label>
                          <p className="text-sm text-gray-400">Notify when students submit quizzes</p>
                        </div>
                        <Switch
                          checked={settings.notifications.quiz}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, quiz: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Grade Updates</Label>
                          <p className="text-sm text-gray-400">Notify about grade-related activities</p>
                        </div>
                        <Switch
                          checked={settings.notifications.grades}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, grades: checked },
                            })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="privacy" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Profile Visibility</Label>
                          <p className="text-sm text-gray-400">Make your profile visible to students</p>
                        </div>
                        <Switch
                          checked={settings.privacy.profileVisible}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              privacy: { ...settings.privacy, profileVisible: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Contact Information</Label>
                          <p className="text-sm text-gray-400">Show contact details to students</p>
                        </div>
                        <Switch
                          checked={settings.privacy.contactVisible}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              privacy: { ...settings.privacy, contactVisible: checked },
                            })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="appearance" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <Select
                          value={settings.theme}
                          onValueChange={(value) => setSettings({ ...settings, theme: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="auto">Auto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select
                          value={settings.language}
                          onValueChange={(value) => setSettings({ ...settings, language: value })}
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsSettingsOpen(false)}
                    className="border-gray-600 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600">
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-gray-800 text-red-400 hover:text-red-300">
                  <LogOut className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2 text-red-400" />
                    Confirm Logout
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-300">Are you sure you want to log out? Any unsaved changes will be lost.</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsLogoutOpen(false)}
                    className="border-gray-600 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                    Logout
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
            <p className="text-gray-400">Manage your teaching materials and resources</p>
          </div>
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Upload className="h-4 w-4 mr-2" />
                Upload Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload New Resource</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Resource Title</Label>
                  <Input
                    placeholder="Enter resource title..."
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe your resource..."
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select onValueChange={(value) => setNewResource({ ...newResource, category: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lecture Notes">Lecture Notes</SelectItem>
                        <SelectItem value="Video Lectures">Video Lectures</SelectItem>
                        <SelectItem value="Diagrams">Diagrams</SelectItem>
                        <SelectItem value="Guidelines">Guidelines</SelectItem>
                        <SelectItem value="3D Models">3D Models</SelectItem>
                        <SelectItem value="Templates">Templates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Visibility</Label>
                    <Select
                      value={newResource.visibility}
                      onValueChange={(value) => setNewResource({ ...newResource, visibility: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="class-only">Class Only</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Tags (comma separated)</Label>
                  <Input
                    placeholder="data-structures, algorithms, fundamentals"
                    value={newResource.tags}
                    onChange={(e) => setNewResource({ ...newResource, tags: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Drag and drop your file here, or click to browse</p>
                  <Button variant="outline" className="border-gray-600 bg-transparent">
                    Choose File
                  </Button>
                </div>
                <Button onClick={handleUpload} className="w-full bg-orange-500 hover:bg-orange-600">
                  Upload Resource
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="resources" className="data-[state=active]:bg-orange-500">
              All Resources
            </TabsTrigger>
            <TabsTrigger value="folders" className="data-[state=active]:bg-orange-500">
              Folders
            </TabsTrigger>
            <TabsTrigger value="shared" className="data-[state=active]:bg-orange-500">
              Shared with Me
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-orange-500">
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex border border-gray-700 rounded-lg bg-gray-800">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-orange-500" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-orange-500" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Resources Display */}
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredResources.map((resource) => (
                  <Card
                    key={resource.id}
                    className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors group"
                  >
                    <CardHeader className="pb-2">
                      <div className="aspect-video bg-gray-700 rounded-lg mb-3 overflow-hidden relative">
                        <img
                          src={resource.thumbnail || "/placeholder.svg"}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">{getVisibilityBadge(resource.visibility)}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getFileIcon(resource.type)}
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-white text-sm truncate">{resource.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-gray-400 text-xs line-clamp-2">{resource.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                            +{resource.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{resource.size}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          {resource.rating}
                        </div>
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost" className="flex-1 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          {resource.downloads}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          <Share2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Size</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Downloads</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Rating</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Visibility</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResources.map((resource) => (
                          <tr key={resource.id} className="border-b border-gray-700 hover:bg-gray-750">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                {getFileIcon(resource.type)}
                                <div>
                                  <div className="font-medium text-white">{resource.title}</div>
                                  <div className="text-sm text-gray-400 truncate max-w-xs">{resource.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-300">{resource.category}</td>
                            <td className="py-4 px-4 text-gray-300">{resource.size}</td>
                            <td className="py-4 px-4 text-gray-300">{resource.downloads}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-white">{resource.rating}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">{getVisibilityBadge(resource.visibility)}</td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="folders" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                "Computer Science Resources",
                "Algorithm Materials",
                "Database Protocols",
                "Student Templates",
                "Assessment Tools",
              ].map((folder, index) => (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <Folder className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-white font-medium mb-2">{folder}</h3>
                    <p className="text-gray-400 text-sm">{Math.floor(Math.random() * 20) + 5} items</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shared" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Share2 className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">No Shared Resources</h3>
                <p className="text-gray-400">Resources shared with you by other educators will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources
                .filter((r) => r.rating >= 4.8)
                .map((resource) => (
                  <Card
                    key={resource.id}
                    className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors group"
                  >
                    <CardHeader className="pb-2">
                      <div className="aspect-video bg-gray-700 rounded-lg mb-3 overflow-hidden relative">
                        <img
                          src={resource.thumbnail || "/placeholder.svg"}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">{getVisibilityBadge(resource.visibility)}</div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          {getFileIcon(resource.type)}
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-white text-sm truncate">{resource.title}</CardTitle>
                          </div>
                        </div>
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-gray-400 text-xs line-clamp-2">{resource.description}</p>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{resource.size}</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          {resource.rating}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
