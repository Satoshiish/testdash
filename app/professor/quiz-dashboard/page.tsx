"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Users,
  Clock,
  Award,
  Settings,
  LogOut,
  User,
  Bell,
  Shield,
  Palette,
} from "lucide-react"

export default function QuizDashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
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

  const quizzes = [
    {
      id: 1,
      title: "Data Structures Fundamentals",
      status: "Active",
      students: 45,
      avgScore: 87,
      timeLimit: 30,
      questions: 20,
      created: "2024-01-15",
    },
    {
      id: 2,
      title: "Algorithm Analysis",
      status: "Draft",
      students: 0,
      avgScore: 0,
      timeLimit: 45,
      questions: 25,
      created: "2024-01-20",
    },
    {
      id: 3,
      title: "Database Design Principles",
      status: "Completed",
      students: 38,
      avgScore: 92,
      timeLimit: 25,
      questions: 15,
      created: "2024-01-10",
    },
    {
      id: 4,
      title: "Web Development Basics",
      status: "Active",
      students: 35,
      avgScore: 89,
      timeLimit: 40,
      questions: 18,
      created: "2024-01-18",
    },
  ]

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
            <Link href="/professor/library" className="hover:text-red-400 transition-colors">
              Library
            </Link>
            <Link href="/professor/quiz-dashboard" className="text-red-400">
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
            <h1 className="text-3xl font-bold mb-2">Quiz Dashboard</h1>
            <p className="text-gray-400">Manage and monitor your quizzes</p>
          </div>
          <Link href="/professor/create-quiz">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Quizzes</p>
                  <p className="text-2xl font-bold text-white">{quizzes.length}</p>
                  <p className="text-green-400 text-sm">+2 this week</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Quizzes</p>
                  <p className="text-2xl font-bold text-white">{quizzes.filter((q) => q.status === "Active").length}</p>
                  <p className="text-blue-400 text-sm">Currently running</p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Participants</p>
                  <p className="text-2xl font-bold text-white">{quizzes.reduce((sum, q) => sum + q.students, 0)}</p>
                  <p className="text-green-400 text-sm">Across all quizzes</p>
                </div>
                <Users className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg. Score</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(
                      quizzes.filter((q) => q.avgScore > 0).reduce((sum, q) => sum + q.avgScore, 0) /
                        quizzes.filter((q) => q.avgScore > 0).length,
                    )}
                    %
                  </p>
                  <p className="text-yellow-400 text-sm">Overall performance</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completion Rate</p>
                  <p className="text-2xl font-bold text-white">94%</p>
                  <p className="text-green-400 text-sm">Students finishing</p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz List */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Your Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-white">{quiz.title}</h3>
                      <Badge
                        variant={
                          quiz.status === "Active" ? "default" : quiz.status === "Draft" ? "secondary" : "outline"
                        }
                        className={
                          quiz.status === "Active"
                            ? "bg-green-500"
                            : quiz.status === "Draft"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }
                      >
                        {quiz.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      {quiz.students} students
                    </div>
                    <div className="flex items-center text-gray-400">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      {quiz.avgScore}% avg score
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {quiz.timeLimit} min
                    </div>
                    <div className="text-gray-400">{quiz.questions} questions</div>
                    <div className="text-gray-400">Created {quiz.created}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quiz Analytics Section */}
        <Card className="bg-gray-800 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Quiz Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Top Performing Quizzes</h4>
                {quizzes
                  .filter((q) => q.avgScore > 0)
                  .sort((a, b) => b.avgScore - a.avgScore)
                  .slice(0, 3)
                  .map((quiz) => (
                    <div key={quiz.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-white text-sm font-medium">{quiz.title}</p>
                        <p className="text-gray-400 text-xs">{quiz.students} students</p>
                      </div>
                      <div className="text-green-400 font-semibold">{quiz.avgScore}%</div>
                    </div>
                  ))}
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-medium">Most Popular Quizzes</h4>
                {quizzes
                  .sort((a, b) => b.students - a.students)
                  .slice(0, 3)
                  .map((quiz) => (
                    <div key={quiz.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-white text-sm font-medium">{quiz.title}</p>
                        <p className="text-gray-400 text-xs">{quiz.avgScore}% avg score</p>
                      </div>
                      <div className="text-blue-400 font-semibold">{quiz.students} students</div>
                    </div>
                  ))}
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-medium">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <p className="text-white text-sm">Quiz completed: Data Structures Fundamentals</p>
                    <p className="text-gray-400 text-xs">2 hours ago • 23 students</p>
                  </div>
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <p className="text-white text-sm">New quiz created: Web Development Basics</p>
                    <p className="text-gray-400 text-xs">1 day ago</p>
                  </div>
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <p className="text-white text-sm">Quiz published: Algorithm Analysis</p>
                    <p className="text-gray-400 text-xs">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
