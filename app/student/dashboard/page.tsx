"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BookOpen,
  Clock,
  Trophy,
  Settings,
  LogOut,
  User,
  Bell,
  Shield,
  Palette,
  Calendar,
  Star,
  Award,
  Target,
  Zap,
  Crown,
  Medal,
  Filter,
  SortAsc,
  Info,
} from "lucide-react"

export default function StudentDashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [sortBy, setSortBy] = useState("dueDate")
  const [filterBy, setFilterBy] = useState("all")
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

  // Sample data with enhanced assignment details
  const assignments = [
    {
      id: 1,
      title: "Data Structures Quiz",
      course: "CS 201 - Data Structures",
      dueDate: "2024-02-15",
      difficulty: "Medium",
      type: "Quiz",
      status: "pending",
      timeRemaining: "2 days",
      points: 50,
    },
    {
      id: 2,
      title: "Algorithm Analysis Essay",
      course: "CS 301 - Algorithms",
      dueDate: "2024-02-18",
      difficulty: "Hard",
      type: "Essay",
      status: "pending",
      timeRemaining: "5 days",
      points: 100,
    },
    {
      id: 3,
      title: "Database Design Project",
      course: "CS 250 - Database Systems",
      dueDate: "2024-02-12",
      difficulty: "Hard",
      type: "Project",
      status: "overdue",
      timeRemaining: "Overdue",
      points: 150,
    },
    {
      id: 4,
      title: "Web Development Lab",
      course: "CS 180 - Web Development",
      dueDate: "2024-02-20",
      difficulty: "Easy",
      type: "Lab",
      status: "pending",
      timeRemaining: "1 week",
      points: 75,
    },
  ]

  const courses = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS 201",
      progress: 78,
      instructor: "Dr. Smith",
      achievements: [
        {
          name: "Quick Learner",
          icon: Zap,
          color: "text-yellow-400",
          description: "Completed assignments ahead of schedule",
        },
        { name: "Perfect Attendance", icon: Star, color: "text-blue-400", description: "100% attendance record" },
      ],
    },
    {
      id: 2,
      name: "Algorithms",
      code: "CS 301",
      progress: 65,
      instructor: "Prof. Johnson",
      achievements: [
        {
          name: "Problem Solver",
          icon: Target,
          color: "text-green-400",
          description: "Solved complex algorithmic challenges",
        },
        { name: "Top Performer", icon: Crown, color: "text-purple-400", description: "Top 10% in class performance" },
      ],
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS 250",
      progress: 82,
      instructor: "Dr. Williams",
      achievements: [
        {
          name: "Data Master",
          icon: Award,
          color: "text-orange-400",
          description: "Mastered database design principles",
        },
        { name: "Excellence Award", icon: Medal, color: "text-red-400", description: "Outstanding project submission" },
      ],
    },
    {
      id: 4,
      name: "Web Development",
      code: "CS 180",
      progress: 91,
      instructor: "Ms. Davis",
      achievements: [
        { name: "Creative Coder", icon: Star, color: "text-pink-400", description: "Innovative web design solutions" },
        {
          name: "Innovation Award",
          icon: Trophy,
          color: "text-yellow-400",
          description: "Most creative final project",
        },
      ],
    },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
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

  const sortedAssignments = [...assignments].sort((a, b) => {
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
      default:
        return 0
    }
  })

  const filteredAssignments = sortedAssignments.filter((assignment) => {
    if (filterBy === "all") return true
    if (filterBy === "pending") return assignment.status === "pending"
    if (filterBy === "overdue") return assignment.status === "overdue"
    if (filterBy === assignment.difficulty.toLowerCase()) return true
    return false
  })

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-red-500">TestDash</div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/student/dashboard" className="text-red-400">
                Dashboard
              </Link>
              <Link href="/student/courses" className="hover:text-red-400 transition-colors">
                Courses
              </Link>
              <Link href="/student/assignments" className="hover:text-red-400 transition-colors">
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
                    <p className="text-gray-300">
                      Are you sure you want to log out? Any unsaved progress will be lost.
                    </p>
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
            <h1 className="text-3xl font-bold mb-2">Welcome back, {settings.firstName}!</h1>
            <p className="text-gray-400">Ready to continue your learning journey?</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-whitw text-sm">Active Courses</p>
                    <p className="text-2xl font-bold text-white">4</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm">Hours Studied</p>
                    <p className="text-2xl font-bold text-white">127</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm">Assignments Due</p>
                    <p className="text-2xl font-bold text-white">3</p>
                  </div>
                  <Calendar className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm">Achievements</p>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Enrolled Courses with Achievements */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Enrolled Courses
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 border-gray-600 text-white max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">Achievement Badges:</p>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-yellow-400">⚡ Quick Learner:</span> Completed assignments ahead of
                            schedule
                          </p>
                          <p>
                            <span className="text-blue-400">⭐ Perfect Attendance:</span> 100% attendance record
                          </p>
                          <p>
                            <span className="text-green-400">🎯 Problem Solver:</span> Solved complex challenges
                          </p>
                          <p>
                            <span className="text-purple-400">👑 Top Performer:</span> Top 10% in class performance
                          </p>
                          <p>
                            <span className="text-orange-400">🏆 Data Master:</span> Mastered core concepts
                          </p>
                          <p>
                            <span className="text-red-400">🏅 Excellence Award:</span> Outstanding submissions
                          </p>
                          <p>
                            <span className="text-pink-400">⭐ Creative Coder:</span> Innovative solutions
                          </p>
                          <p>
                            <span className="text-yellow-400">🏆 Innovation Award:</span> Most creative project
                          </p>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-orange-500">{course.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {course.code} • {course.instructor}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">{course.progress}%</span>
                        <div className="flex space-x-1">
                          {course.achievements.map((achievement, index) => {
                            const IconComponent = achievement.icon
                            return (
                              <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                  <div className={`p-1 rounded-full bg-gray-600 ${achievement.color} cursor-help`}>
                                    <IconComponent className="h-3 w-3" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-700 border-gray-600 text-white">
                                  <div className="text-center">
                                    <p className="font-semibold">{achievement.name}</p>
                                    <p className="text-sm text-gray-300">{achievement.description}</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex flex-wrap gap-1 mt-2">
                      {course.achievements.map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-600 text-gray-200">
                          {achievement.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Assignments */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Assignments
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-orange-500">
                        <SortAsc className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dueDate">Due Date</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
                        <SelectItem value="course">Course</SelectItem>
                        <SelectItem value="points">Points</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterBy} onValueChange={setFilterBy}>
                      <SelectTrigger className="w-28 bg-gray-700 border-gray-600">
                        <Filter className="h-4 w-4 mr-2 text-orange-500" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 bg-gray-700 rounded-lg border-l-4 border-orange-500">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-orange-500 mb-1">{assignment.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{assignment.course}</p>
                        <div className="flex items-center space-x-3 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300">Due: {assignment.dueDate}</span>
                          </div>
                          <Badge className={`${getDifficultyColor(assignment.difficulty)} text-white text-xs`}>
                            {assignment.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">
                            {assignment.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${getStatusColor(assignment.status)}`}>
                          {assignment.timeRemaining}
                        </div>
                        <div className="text-gray-400 text-sm">{assignment.points} pts</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          Start Assignment
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gray-800 border-gray-700 mt-8">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div>
                    <p className="text-white">Completed "Introduction to Algorithms" quiz</p>
                    <p className="text-gray-400 text-sm">CS 301 • 2 hours ago</p>
                  </div>
                  <div className="text-green-500 font-semibold">95%</div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div>
                    <p className="text-white">Earned "Quick Learner" achievement</p>
                    <p className="text-gray-400 text-sm">CS 201 • 1 day ago</p>
                  </div>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-white">Submitted "Database Design Project"</p>
                    <p className="text-gray-400 text-sm">CS 250 • 2 days ago</p>
                  </div>
                  <div className="text-blue-500">Submitted</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
