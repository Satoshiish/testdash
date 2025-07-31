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
  Users,
  Plus,
  Search,
  MoreVertical,
  BookOpen,
  Calendar,
  Clock,
  UserPlus,
  Mail,
  GraduationCap,
  Award,
  TrendingUp,
  Settings,
  LogOut,
  User,
  Bell,
  Shield,
  Palette,
} from "lucide-react"

export default function ProfessorClasses() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [newClass, setNewClass] = useState({
    name: "",
    description: "",
    subject: "",
    semester: "",
    capacity: "",
    schedule: "",
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

  const classes = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS201",
      semester: "Fall 2024",
      students: 45,
      capacity: 50,
      schedule: "MWF 9:00-10:00 AM",
      room: "Science Building 201",
      status: "Active",
      avgGrade: 87,
      assignments: 12,
      quizzes: 8,
    },
    {
      id: 2,
      name: "Algorithms",
      code: "CS301",
      semester: "Fall 2024",
      students: 32,
      capacity: 35,
      schedule: "TTh 2:00-3:30 PM",
      room: "Computer Lab 105",
      status: "Active",
      avgGrade: 92,
      assignments: 8,
      quizzes: 6,
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS250",
      semester: "Fall 2024",
      students: 28,
      capacity: 30,
      schedule: "MWF 11:00-12:00 PM",
      room: "Computer Lab 102",
      status: "Active",
      avgGrade: 85,
      assignments: 10,
      quizzes: 7,
    },
    {
      id: 4,
      name: "Web Development",
      code: "CS180",
      semester: "Fall 2024",
      students: 35,
      capacity: 40,
      schedule: "TTh 10:00-11:30 AM",
      room: "Computer Lab 103",
      status: "Active",
      avgGrade: 89,
      assignments: 15,
      quizzes: 10,
    },
  ]

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      studentId: "STU001",
      classId: 1,
      grade: 92,
      attendance: 95,
      assignments: 11,
      quizzes: 7,
      status: "Excellent",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@university.edu",
      studentId: "STU002",
      classId: 1,
      grade: 78,
      attendance: 88,
      assignments: 9,
      quizzes: 6,
      status: "Good",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@university.edu",
      studentId: "STU003",
      classId: 1,
      grade: 85,
      attendance: 92,
      assignments: 10,
      quizzes: 7,
      status: "Good",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@university.edu",
      studentId: "STU004",
      classId: 2,
      grade: 94,
      attendance: 98,
      assignments: 8,
      quizzes: 6,
      status: "Excellent",
    },
  ]

  const filteredStudents = students.filter(
    (student) =>
      (selectedClass === "all" || student.classId === Number.parseInt(selectedClass)) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleCreateClass = () => {
    console.log("Creating class:", newClass)
    setIsCreateClassOpen(false)
    setNewClass({
      name: "",
      description: "",
      subject: "",
      semester: "",
      capacity: "",
      schedule: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-red-500">EduPlatform</div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/professor/home" className="hover:text-red-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/professor/classes" className="text-red-400">
              Classes
            </Link>
            <Link href="/professor/library" className="hover:text-red-400 transition-colors">
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
            <h1 className="text-3xl font-bold mb-2">My Classes</h1>
            <p className="text-gray-400">Manage your classes and students</p>
          </div>
          <Dialog open={isCreateClassOpen} onOpenChange={setIsCreateClassOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Class
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Create New Class</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Class Name</Label>
                    <Input
                      placeholder="Data Structures"
                      value={newClass.name}
                      onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select onValueChange={(value) => setNewClass({ ...newClass, subject: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Class description..."
                    value={newClass.description}
                    onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Semester</Label>
                    <Select onValueChange={(value) => setNewClass({ ...newClass, semester: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fall2024">Fall 2024</SelectItem>
                        <SelectItem value="spring2025">Spring 2025</SelectItem>
                        <SelectItem value="summer2025">Summer 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input
                      type="number"
                      placeholder="50"
                      value={newClass.capacity}
                      onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Schedule</Label>
                    <Input
                      placeholder="MWF 9:00-10:00"
                      value={newClass.schedule}
                      onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                <Button onClick={handleCreateClass} className="w-full bg-orange-500 hover:bg-orange-600">
                  Create Class
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500">
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-orange-500">
              Students
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Class Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <Card key={classItem.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{classItem.name}</CardTitle>
                        <p className="text-gray-400 text-sm">{classItem.code}</p>
                      </div>
                      <Badge className="bg-green-500">{classItem.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        {classItem.students}/{classItem.capacity}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        {classItem.semester}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        {classItem.schedule}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {classItem.room}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Avg Grade:</span>
                        <span className="text-green-400 font-semibold">{classItem.avgGrade}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Assignments:</span>
                        <span className="text-white">{classItem.assignments}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Quizzes:</span>
                        <span className="text-white">{classItem.quizzes}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id.toString()}>
                      {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>

            {/* Students Table */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Students ({filteredStudents.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Student</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Grade</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Attendance</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-700 hover:bg-gray-750">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-white">{student.name}</div>
                              <div className="text-sm text-gray-400">{student.email}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{student.studentId}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`font-semibold ${
                                student.grade >= 90
                                  ? "text-green-400"
                                  : student.grade >= 80
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }`}
                            >
                              {student.grade}%
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`font-semibold ${
                                student.attendance >= 95
                                  ? "text-green-400"
                                  : student.attendance >= 85
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }`}
                            >
                              {student.attendance}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-300">
                            {student.assignments}/{student.assignments + 1} assignments
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              className={
                                student.status === "Excellent"
                                  ? "bg-green-500"
                                  : student.status === "Good"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }
                            >
                              {student.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                                <MoreVertical className="h-4 w-4" />
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Students</p>
                      <p className="text-2xl font-bold text-white">140</p>
                      <p className="text-green-400 text-sm">+12% from last semester</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Average Grade</p>
                      <p className="text-2xl font-bold text-white">88%</p>
                      <p className="text-green-400 text-sm">+3% improvement</p>
                    </div>
                    <Award className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Attendance Rate</p>
                      <p className="text-2xl font-bold text-white">93%</p>
                      <p className="text-yellow-400 text-sm">-1% from last month</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Completion Rate</p>
                      <p className="text-2xl font-bold text-white">95%</p>
                      <p className="text-green-400 text-sm">+4% improvement</p>
                    </div>
                    <GraduationCap className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart Placeholder */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Class Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Performance charts would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
