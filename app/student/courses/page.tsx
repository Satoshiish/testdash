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
  Star,
  Award,
  Target,
  Zap,
  Crown,
  Medal,
  Users,
  GraduationCap,
  ChevronRight,
} from "lucide-react"

export default function StudentCourses() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
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
      progress: 78,
      instructor: "Dr. Smith",
      credits: 3,
      semester: "Fall 2024",
      schedule: "MWF 10:00-11:00 AM",
      location: "Science Building 201",
      description: "Fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs.",
      achievements: [
        {
          name: "Quick Learner",
          icon: Zap,
          color: "text-yellow-400",
          description: "Completed assignments ahead of schedule",
        },
        { name: "Perfect Attendance", icon: Star, color: "text-blue-400", description: "100% attendance record" },
      ],
      nextAssignment: "Binary Tree Implementation",
      nextAssignmentDue: "2024-02-15",
      grade: "A-",
    },
    {
      id: 2,
      name: "Algorithms",
      code: "CS 301",
      progress: 65,
      instructor: "Prof. Johnson",
      credits: 4,
      semester: "Fall 2024",
      schedule: "TTh 2:00-3:30 PM",
      location: "Engineering Hall 305",
      description: "Analysis and design of computer algorithms including sorting, searching, and graph algorithms.",
      achievements: [
        {
          name: "Problem Solver",
          icon: Target,
          color: "text-green-400",
          description: "Solved complex algorithmic challenges",
        },
        { name: "Top Performer", icon: Crown, color: "text-purple-400", description: "Top 10% in class performance" },
      ],
      nextAssignment: "Dynamic Programming Project",
      nextAssignmentDue: "2024-02-18",
      grade: "B+",
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS 250",
      progress: 82,
      instructor: "Dr. Williams",
      credits: 3,
      semester: "Fall 2024",
      schedule: "MWF 1:00-2:00 PM",
      location: "Computer Lab 150",
      description: "Database design, implementation, and management including SQL, normalization, and transactions.",
      achievements: [
        {
          name: "Data Master",
          icon: Award,
          color: "text-orange-400",
          description: "Mastered database design principles",
        },
        { name: "Excellence Award", icon: Medal, color: "text-red-400", description: "Outstanding project submission" },
      ],
      nextAssignment: "Database Optimization Lab",
      nextAssignmentDue: "2024-02-12",
      grade: "A",
    },
    {
      id: 4,
      name: "Web Development",
      code: "CS 180",
      progress: 91,
      instructor: "Ms. Davis",
      credits: 3,
      semester: "Fall 2024",
      schedule: "TTh 11:00-12:30 PM",
      location: "Media Lab 220",
      description: "Modern web development including HTML, CSS, JavaScript, and popular frameworks.",
      achievements: [
        { name: "Creative Coder", icon: Star, color: "text-pink-400", description: "Innovative web design solutions" },
        {
          name: "Innovation Award",
          icon: Trophy,
          color: "text-yellow-400",
          description: "Most creative final project",
        },
      ],
      nextAssignment: "React Portfolio Project",
      nextAssignmentDue: "2024-02-20",
      grade: "A+",
    },
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-red-500">TestDash</div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/student/dashboard" className="hover:text-red-400 transition-colors">
                Dashboard
              </Link>
              <Link href="/student/courses" className="text-red-400">
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
            <h1 className="text-3xl font-bold mb-2">My Courses</h1>
            <p className="text-gray-400">Track your progress and manage your enrolled courses</p>
          </div>

          {/* Course Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Enrolled Courses</p>
                    <p className="text-2xl font-bold text-white">{courses.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Credits</p>
                    <p className="text-2xl font-bold text-white">
                      {courses.reduce((sum, course) => sum + course.credits, 0)}
                    </p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Average Progress</p>
                    <p className="text-2xl font-bold text-white">
                      {Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Achievements</p>
                    <p className="text-2xl font-bold text-white">
                      {courses.reduce((sum, course) => sum + course.achievements.length, 0)}
                    </p>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-xl mb-1">{course.name}</CardTitle>
                      <p className="text-gray-400 text-sm">
                        {course.code} • {course.instructor} • {course.credits} Credits
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {course.schedule} • {course.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          course.grade.startsWith("A")
                            ? "bg-green-500/20 text-green-400"
                            : course.grade.startsWith("B")
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {course.grade}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">{course.description}</p>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Course Progress</span>
                      <span className="text-white font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Achievements</span>
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
                    <div className="flex flex-wrap gap-1">
                      {course.achievements.map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-600 text-gray-200">
                          {achievement.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Next Assignment */}
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm font-medium">Next Assignment</p>
                        <p className="text-gray-400 text-xs">{course.nextAssignment}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-400 text-sm font-medium">Due {course.nextAssignmentDue}</p>
                        <Button size="sm" className="mt-1 bg-orange-500 hover:bg-orange-600">
                          View Details
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Course Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Classmates
                    </Button>
                    <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 bg-transparent">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Materials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
