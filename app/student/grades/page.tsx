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
import {
  Settings,
  LogOut,
  User,
  Bell,
  Shield,
  Palette,
  TrendingUp,
  TrendingDown,
  Minus,
  BookOpen,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Download,
} from "lucide-react"

export default function StudentGrades() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState("fall2024")
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

  const courses = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS 201",
      instructor: "Dr. Smith",
      credits: 3,
      currentGrade: "A-",
      gradePoints: 3.7,
      assignments: [
        { name: "Binary Tree Implementation", grade: "A-", points: 72, maxPoints: 80, weight: 15 },
        { name: "Stack & Queue Quiz", grade: "A", points: 95, maxPoints: 100, weight: 10 },
        { name: "Midterm Exam", grade: "B+", points: 87, maxPoints: 100, weight: 25 },
        { name: "Final Project", grade: "Pending", points: 0, maxPoints: 150, weight: 30 },
      ],
      trend: "up",
      progress: 78,
    },
    {
      id: 2,
      name: "Algorithms",
      code: "CS 301",
      instructor: "Prof. Johnson",
      credits: 4,
      currentGrade: "B+",
      gradePoints: 3.3,
      assignments: [
        { name: "Sorting Algorithms Lab", grade: "A", points: 48, maxPoints: 50, weight: 12 },
        { name: "Dynamic Programming Quiz", grade: "B", points: 82, maxPoints: 100, weight: 15 },
        { name: "Graph Algorithms Project", grade: "B+", points: 105, maxPoints: 120, weight: 25 },
        { name: "Algorithm Analysis Essay", grade: "Pending", points: 0, maxPoints: 100, weight: 20 },
      ],
      trend: "up",
      progress: 65,
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS 250",
      instructor: "Dr. Williams",
      credits: 3,
      currentGrade: "A",
      gradePoints: 4.0,
      assignments: [
        { name: "SQL Fundamentals Quiz", grade: "A+", points: 98, maxPoints: 100, weight: 10 },
        { name: "Database Design Project", grade: "A", points: 142, maxPoints: 150, weight: 30 },
        { name: "Normalization Assignment", grade: "A-", points: 88, maxPoints: 100, weight: 15 },
        { name: "Final Exam", grade: "Pending", points: 0, maxPoints: 200, weight: 35 },
      ],
      trend: "stable",
      progress: 82,
    },
    {
      id: 4,
      name: "Web Development",
      code: "CS 180",
      instructor: "Ms. Davis",
      credits: 3,
      currentGrade: "A+",
      gradePoints: 4.0,
      assignments: [
        { name: "HTML/CSS Portfolio", grade: "A+", points: 98, maxPoints: 100, weight: 20 },
        { name: "JavaScript Interactive App", grade: "A", points: 92, maxPoints: 100, weight: 25 },
        { name: "React Components Lab", grade: "A+", points: 75, maxPoints: 75, weight: 15 },
        { name: "Final Portfolio Project", grade: "Pending", points: 0, maxPoints: 120, weight: 30 },
      ],
      trend: "up",
      progress: 91,
    },
  ]

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-400"
    if (grade.startsWith("B")) return "text-blue-400"
    if (grade.startsWith("C")) return "text-yellow-400"
    if (grade.startsWith("D")) return "text-orange-400"
    if (grade.startsWith("F")) return "text-red-400"
    return "text-gray-400"
  }

  const getGradeBadgeColor = (grade) => {
    if (grade.startsWith("A")) return "bg-green-500/20 text-green-400 border-green-500/30"
    if (grade.startsWith("B")) return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    if (grade.startsWith("C")) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    if (grade.startsWith("D")) return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    if (grade.startsWith("F")) return "bg-red-500/20 text-red-400 border-red-500/30"
    return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const calculateGPA = () => {
    const totalPoints = courses.reduce((sum, course) => sum + course.gradePoints * course.credits, 0)
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
    return (totalPoints / totalCredits).toFixed(2)
  }

  const calculateTotalCredits = () => {
    return courses.reduce((sum, course) => sum + course.credits, 0)
  }

  const getCompletedAssignments = () => {
    return courses.reduce((sum, course) => {
      return sum + course.assignments.filter((a) => a.grade !== "Pending").length
    }, 0)
  }

  const getTotalAssignments = () => {
    return courses.reduce((sum, course) => sum + course.assignments.length, 0)
  }

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
            <Link href="/student/assignments" className="hover:text-red-400 transition-colors">
              Assignments
            </Link>
            <Link href="/student/grades" className="text-red-400">
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Grades</h1>
            <p className="text-gray-400">Track your academic performance and progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fall2024">Fall 2024</SelectItem>
                <SelectItem value="spring2024">Spring 2024</SelectItem>
                <SelectItem value="fall2023">Fall 2023</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Grade Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Current GPA</p>
                  <p className="text-3xl font-bold text-green-400">{calculateGPA()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Credits</p>
                  <p className="text-2xl font-bold text-white">{calculateTotalCredits()}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">
                    {getCompletedAssignments()}/{getTotalAssignments()}
                  </p>
                </div>
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Progress</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%
                  </p>
                </div>
                <PieChart className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Grades */}
        <div className="space-y-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl mb-1">{course.name}</CardTitle>
                    <p className="text-gray-400 text-sm">
                      {course.code} • {course.instructor} • {course.credits} Credits
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getTrendIcon(course.trend)}
                    <Badge className={getGradeBadgeColor(course.currentGrade)}>{course.currentGrade}</Badge>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getGradeColor(course.currentGrade)}`}>{course.gradePoints}</p>
                      <p className="text-gray-400 text-xs">GPA Points</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Course Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Course Progress</span>
                    <span className="text-white font-semibold">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                {/* Assignments Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Assignment Breakdown</h4>
                  <div className="space-y-2">
                    {course.assignments.map((assignment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{assignment.name}</p>
                          <p className="text-gray-400 text-xs">Weight: {assignment.weight}%</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-white font-medium">
                              {assignment.points}/{assignment.maxPoints}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {assignment.maxPoints > 0
                                ? `${Math.round((assignment.points / assignment.maxPoints) * 100)}%`
                                : "N/A"}
                            </p>
                          </div>
                          <Badge
                            className={
                              assignment.grade === "Pending"
                                ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                : getGradeBadgeColor(assignment.grade)
                            }
                          >
                            {assignment.grade}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grade Distribution */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Completed Assignments</p>
                    <p className="text-white font-semibold">
                      {course.assignments.filter((a) => a.grade !== "Pending").length} / {course.assignments.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Current Average</p>
                    <p className={`font-semibold ${getGradeColor(course.currentGrade)}`}>
                      {course.currentGrade} ({course.gradePoints})
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
