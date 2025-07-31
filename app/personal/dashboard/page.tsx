"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, BookOpen, Trophy, Target, Play, CheckCircle, Settings, LogOut, Clock, Bell, Star } from "lucide-react"

export default function PersonalDashboard() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    sessionStorage.clear()
    sessionStorage.setItem("justLoggedOut", "true")
    window.location.href = "/"
  }

  const personalCourses = [
    {
      id: 1,
      title: "Mindfulness & Meditation",
      category: "Wellness",
      progress: 65,
      totalLessons: 20,
      completedLessons: 13,
      nextLesson: "Body Scan Meditation",
    },
    {
      id: 2,
      title: "Photography Basics",
      category: "Creative",
      progress: 40,
      totalLessons: 15,
      completedLessons: 6,
      nextLesson: "Understanding Aperture",
    },
    {
      id: 3,
      title: "Spanish for Beginners",
      category: "Language",
      progress: 80,
      totalLessons: 25,
      completedLessons: 20,
      nextLesson: "Past Tense Verbs",
    },
  ]

  const goals = [
    { title: "Complete 3 courses this month", progress: 67, current: 2, target: 3 },
    { title: "Study 10 hours per week", progress: 85, current: 8.5, target: 10 },
    { title: "Earn 5 certificates", progress: 40, current: 2, target: 5 },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Personal Learning</h1>
              <p className="text-gray-400 text-sm">Your journey to self-improvement</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Courses</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <BookOpen className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Hours This Week</p>
                  <p className="text-2xl font-bold text-white">8.5</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">39</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Certificates</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Courses */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                My Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {personalCourses.map((course) => (
                <div key={course.id} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{course.title}</h3>
                      <Badge variant="secondary" className="bg-red-400/20 text-red-400 text-xs mt-1">
                        {course.category}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="bg-orange-400/20 text-orange-400">
                      {course.progress}%
                    </Badge>
                  </div>
                  <Progress value={course.progress} className="mb-3" />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-300">Next: {course.nextLesson}</p>
                      <p className="text-xs text-gray-400">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </p>
                    </div>
                    <Button size="sm" className="bg-red-400 hover:bg-red-500">
                      <Play className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Personal Goals */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Personal Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white text-sm">{goal.title}</h3>
                    <Badge
                      variant="secondary"
                      className={`${goal.progress >= 100 ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                    >
                      {goal.progress}%
                    </Badge>
                  </div>
                  <Progress value={goal.progress} className="mb-2" />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                      {goal.current} / {goal.target}
                    </p>
                    {goal.progress >= 100 && <Star className="h-4 w-4 text-yellow-400" />}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <LogOut className="h-5 w-5 mr-2 text-red-400" />
                Confirm Logout
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-300">Are you sure you want to log out?</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowLogoutDialog(false)}
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
      )}
    </div>
  )
}
