"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  LogOut,
  User,
  Bell,
  Shield,
  Palette,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Filter,
  SortAsc,
  Search,
  BookOpen,
  Target,
} from "lucide-react"

export default function StudentAssignments() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [sortBy, setSortBy] = useState("dueDate")
  const [filterBy, setFilterBy] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [settings, setSettings] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@student.edu",
    phone: "+1 (555) 987-6543",
    major: "Computer Science",
    year: "Junior",
    bio: "Passionate about technology and learning new programming languages.",
    notifications: {
      email: true,
      push: true,
      assignments: true,
      grades: true,
    },
    privacy: {
      profileVisible: true,
      gradesVisible: false,
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

  const assignments = [
    {
      id: 1,
      title: "Data Structures Quiz",
      course: "CS 201 - Data Structures",
      instructor: "Dr. Smith",
      dueDate: "2024-02-15",
      dueTime: "11:59 PM",
      difficulty: "Medium",
      type: "Quiz",
      status: "pending",
      timeRemaining: "2 days",
      points: 50,
      description: "Quiz covering arrays, linked lists, stacks, and queues implementation and analysis.",
      submissionType: "Online Quiz",
      attempts: "1 attempt allowed",
      estimatedTime: "45 minutes",
    },
    {
      id: 2,
      title: "Algorithm Analysis Essay",
      course: "CS 301 - Algorithms",
      instructor: "Prof. Johnson",
      dueDate: "2024-02-18",
      dueTime: "11:59 PM",
      difficulty: "Hard",
      type: "Essay",
      status: "pending",
      timeRemaining: "5 days",
      points: 100,
      description: "Analyze the time and space complexity of sorting algorithms and provide comparative analysis.",
      submissionType: "PDF Upload",
      attempts: "Unlimited",
      estimatedTime: "3-4 hours",
    },
    {
      id: 3,
      title: "Database Design Project",
      course: "CS 250 - Database Systems",
      instructor: "Dr. Williams",
      dueDate: "2024-02-12",
      dueTime: "11:59 PM",
      difficulty: "Hard",
      type: "Project",
      status: "overdue",
      timeRemaining: "Overdue",
      points: 150,
      description: "Design and implement a complete database system for a library management system.",
      submissionType: "File Upload + Demo",
      attempts: "1 attempt",
      estimatedTime: "8-10 hours",
    },
    {
      id: 4,
      title: "Web Development Lab",
      course: "CS 180 - Web Development",
      instructor: "Ms. Davis",
      dueDate: "2024-02-20",
      dueTime: "11:59 PM",
      difficulty: "Easy",
      type: "Lab",
      status: "pending",
      timeRemaining: "1 week",
      points: 75,
      description: "Create a responsive web page using HTML, CSS, and JavaScript with modern design principles.",
      submissionType: "GitHub Repository",
      attempts: "Unlimited",
      estimatedTime: "2-3 hours",
    },
    {
      id: 5,
      title: "Binary Tree Implementation",
      course: "CS 201 - Data Structures",
      instructor: "Dr. Smith",
      dueDate: "2024-02-10",
      dueTime: "11:59 PM",
      difficulty: "Medium",
      type: "Programming",
      status: "completed",
      timeRemaining: "Completed",
      points: 80,
      grade: "A-",
      description: "Implement a binary search tree with insertion, deletion, and traversal operations.",
      submissionType: "Code Upload",
      attempts: "3 attempts",
      estimatedTime: "4-5 hours",
    },
    {
      id: 6,
      title: "React Portfolio Project",
      course: "CS 180 - Web Development",
      instructor: "Ms. Davis",
      dueDate: "2024-02-25",
      dueTime: "11:59 PM",
      difficulty: "Medium",
      type: "Project",
      status: "pending",
      timeRemaining: "2 weeks",
      points: 120,
      description: "Build a personal portfolio website using React with at least 5 interactive components.",
      submissionType: "Live URL + Code",
      attempts: "2 attempts",
      estimatedTime: "6-8 hours",
    },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-400"
      case "overdue":
        return "text-red-400"
      case "completed":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredAndSortedAssignments = assignments
    .filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.type.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter =
        filterBy === "all" ||
        assignment.status === filterBy ||
        assignment.difficulty.toLowerCase() === filterBy ||
        assignment.type.toLowerCase() === filterBy

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate)
        case "difficulty":
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case "course":
          return a.course.localeCompare(b.course)
        case "points":
          return b.points - a.points
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const pendingAssignments = assignments.filter((a) => a.status === "pending").length
  const overdueAssignments = assignments.filter((a) => a.status === "overdue").length
  const completedAssignments = assignments.filter((a) => a.status === "completed").length
  const totalPoints = assignments.reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-red-500">TestDash</div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/student/dashboard" className="hover:text-red-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/student/courses" className="hover:text-red-400 transition-colors">
              Courses
            </Link>
            <Link href="/student/assignments" className="text-red-400">
              Assignments
            </Link>
            <Link href="/student/grades" className="hover:text-red-400 transition-colors">
              Grades
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
                        <Label>Major</Label>
                        <Select
                          value={settings.major}
                          onValueChange={(value) => setSettings({ ...settings, major: value })}
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
                      <Label>Academic Year</Label>
                      <Select
                        value={settings.year}
                        onValueChange={(value) => setSettings({ ...settings, year: value })}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Freshman">Freshman</SelectItem>
                          <SelectItem value="Sophomore">Sophomore</SelectItem>
                          <SelectItem value="Junior">Junior</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
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
                          <Label>Assignment Reminders</Label>
                          <p className="text-sm text-gray-400">Get reminded about upcoming assignments</p>
                        </div>
                        <Switch
                          checked={settings.notifications.assignments}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, assignments: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Grade Updates</Label>
                          <p className="text-sm text-gray-400">Notify when grades are posted</p>
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
                          <p className="text-sm text-gray-400">Make your profile visible to other students</p>
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
                          <Label>Grades Visibility</Label>
                          <p className="text-sm text-gray-400">Show your grades to classmates</p>
                        </div>
                        <Switch
                          checked={settings.privacy.gradesVisible}
                          onCheckedChange={(checked) =>
                            setSettings({
                              ...settings,
                              privacy: { ...settings.privacy, gradesVisible: checked },
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
                  <p className="text-gray-300">Are you sure you want to log out? Any unsaved progress will be lost.</p>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
          <p className="text-gray-400">Track and manage all your course assignments</p>
        </div>

        {/* Assignment Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">{pendingAssignments}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Overdue</p>
                  <p className="text-2xl font-bold text-red-400">{overdueAssignments}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-green-400">{completedAssignments}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Points</p>
                  <p className="text-2xl font-bold text-white">{totalPoints}</p>
                </div>
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                  <SelectItem value="points">Points</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                  <SelectItem value="lab">Lab</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAndSortedAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className={`bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors ${
                assignment.status === "overdue"
                  ? "border-l-4 border-l-red-500"
                  : assignment.status === "completed"
                    ? "border-l-4 border-l-green-500"
                    : "border-l-4 border-l-orange-500"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`flex items-center space-x-2 ${getStatusColor(assignment.status)}`}>
                        {getStatusIcon(assignment.status)}
                        <h3 className="text-xl font-semibold text-white">{assignment.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-1">
                      {assignment.course} • {assignment.instructor}
                    </p>
                    <p className="text-gray-300 text-sm mb-3">{assignment.description}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getDifficultyColor(assignment.difficulty)}>{assignment.difficulty}</Badge>
                      <Badge variant="outline" className="border-gray-500 text-gray-300">
                        {assignment.type}
                      </Badge>
                      <Badge variant="outline" className="border-gray-500 text-gray-300">
                        {assignment.submissionType}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Due Date</p>
                        <p className="text-white font-medium">{assignment.dueDate}</p>
                        <p className="text-gray-400 text-xs">{assignment.dueTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Points</p>
                        <p className="text-white font-medium">{assignment.points} pts</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Attempts</p>
                        <p className="text-white font-medium">{assignment.attempts}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Est. Time</p>
                        <p className="text-white font-medium">{assignment.estimatedTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-6">
                    <div className={`font-semibold text-lg ${getStatusColor(assignment.status)}`}>
                      {assignment.timeRemaining}
                    </div>
                    {assignment.grade && (
                      <div className="text-green-400 font-semibold mt-1">Grade: {assignment.grade}</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    {assignment.status === "pending" && (
                      <Button className="bg-orange-500 hover:bg-orange-600">Start Assignment</Button>
                    )}
                    {assignment.status === "completed" && (
                      <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                        View Submission
                      </Button>
                    )}
                    <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                      View Details
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{assignment.course.split(" - ")[0]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedAssignments.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">No assignments found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
