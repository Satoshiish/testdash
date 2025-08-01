"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Settings, LogOut, User, Bell, Shield, Palette, Save, Eye } from "lucide-react"

export default function CreateQuiz() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    timeLimit: 30,
    attempts: 1,
    shuffleQuestions: false,
    showResults: true,
    course: "",
    // Accessibility Features
    voiceNarration: false,
    audioSupport: false,
    highContrast: false,
    fontSize: "medium",
    colorBlindSupport: false,
    extendedTime: false,
    keyboardNav: false,
    simplifiedLanguage: false,
    readingAssistance: false,
    screenReader: false,
    motorSupport: false,
    cognitiveSupport: false,
  })
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 1,
    explanation: "",
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

  const questionTypes = [
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "true-false", label: "True/False" },
    { value: "short-answer", label: "Short Answer" },
    { value: "essay", label: "Essay" },
    { value: "fill-blank", label: "Fill in the Blank" },
    { value: "matching", label: "Matching" },
  ]

  const addQuestion = () => {
    if (currentQuestion.question.trim()) {
      setQuestions([...questions, { ...currentQuestion, id: Date.now() }])
      setCurrentQuestion({
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        points: 1,
        explanation: "",
      })
    }
  }

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateCurrentQuestion = (field, value) => {
    setCurrentQuestion({ ...currentQuestion, [field]: value })
  }

  const updateOption = (index, value) => {
    const newOptions = [...currentQuestion.options]
    newOptions[index] = value
    setCurrentQuestion({ ...currentQuestion, options: newOptions })
  }

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, ""],
    })
  }

  const removeOption = (index) => {
    const newOptions = currentQuestion.options.filter((_, i) => i !== index)
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
      correctAnswer: currentQuestion.correctAnswer >= newOptions.length ? 0 : currentQuestion.correctAnswer,
    })
  }

  const renderQuestionEditor = () => {
    switch (currentQuestion.type) {
      case "multiple-choice":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Question</Label>
              <Textarea
                placeholder="Enter your question..."
                value={currentQuestion.question}
                onChange={(e) => updateCurrentQuestion("question", e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Options</Label>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="bg-gray-700 border-gray-600"
                  />
                  <Button
                    type="button"
                    variant={currentQuestion.correctAnswer === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateCurrentQuestion("correctAnswer", index)}
                    className={currentQuestion.correctAnswer === index ? "bg-green-500" : "border-gray-600"}
                  >
                    Correct
                  </Button>
                  {currentQuestion.options.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                className="border-gray-600 bg-transparent text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
          </div>
        )

      case "true-false":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Question</Label>
              <Textarea
                placeholder="Enter your true/false question..."
                value={currentQuestion.question}
                onChange={(e) => updateCurrentQuestion("question", e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Correct Answer</Label>
              <Select
                value={currentQuestion.correctAnswer.toString()}
                onValueChange={(value) => updateCurrentQuestion("correctAnswer", Number.parseInt(value))}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">True</SelectItem>
                  <SelectItem value="1">False</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "short-answer":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Question</Label>
              <Textarea
                placeholder="Enter your question..."
                value={currentQuestion.question}
                onChange={(e) => updateCurrentQuestion("question", e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Sample Answer (for grading reference)</Label>
              <Textarea
                placeholder="Enter a sample correct answer..."
                value={currentQuestion.correctAnswer}
                onChange={(e) => updateCurrentQuestion("correctAnswer", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        )

      case "essay":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Question</Label>
              <Textarea
                placeholder="Enter your essay question..."
                value={currentQuestion.question}
                onChange={(e) => updateCurrentQuestion("question", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Grading Rubric (optional)</Label>
              <Textarea
                placeholder="Enter grading criteria..."
                value={currentQuestion.correctAnswer}
                onChange={(e) => updateCurrentQuestion("correctAnswer", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
          </div>
        )

      case "fill-blank":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Question (use _____ for blanks)</Label>
              <Textarea
                placeholder="The capital of France is _____."
                value={currentQuestion.question}
                onChange={(e) => updateCurrentQuestion("question", e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Correct Answers (comma separated)</Label>
              <Input
                placeholder="Paris, paris"
                value={currentQuestion.correctAnswer}
                onChange={(e) => updateCurrentQuestion("correctAnswer", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        )

      case "matching":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Question</Label>
              <Textarea
                placeholder="Match the following items..."
                value={currentQuestion.question}
                onChange={(e) => updateCurrentQuestion("question", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Left Column</Label>
                {currentQuestion.options
                  .slice(0, Math.ceil(currentQuestion.options.length / 2))
                  .map((option, index) => (
                    <Input
                      key={index}
                      placeholder={`Item ${index + 1}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  ))}
              </div>
              <div className="space-y-2">
                <Label className="text-white">Right Column</Label>
                {currentQuestion.options.slice(Math.ceil(currentQuestion.options.length / 2)).map((option, index) => {
                  const actualIndex = index + Math.ceil(currentQuestion.options.length / 2)
                  return (
                    <Input
                      key={actualIndex}
                      placeholder={`Match ${index + 1}`}
                      value={option}
                      onChange={(e) => updateOption(actualIndex, e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getQuestionTypeCounts = () => {
    const counts = {}
    questions.forEach((q) => {
      counts[q.type] = (counts[q.type] || 0) + 1
    })
    return counts
  }

  const getTotalPoints = () => {
    return questions.reduce((total, q) => total + q.points, 0)
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Quiz</h1>
          <p className="text-gray-400">Build engaging quizzes with multiple question types</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quiz Settings */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white">Quiz Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Quiz Title</Label>
                  <Input
                    placeholder="Enter quiz title..."
                    value={quiz.title}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Description</Label>
                  <Textarea
                    placeholder="Quiz description..."
                    value={quiz.description}
                    onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Course</Label>
                  <Select value={quiz.course} onValueChange={(value) => setQuiz({ ...quiz, course: value })}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs201">CS 201 - Data Structures</SelectItem>
                      <SelectItem value="cs301">CS 301 - Algorithms</SelectItem>
                      <SelectItem value="cs250">CS 250 - Database Systems</SelectItem>
                      <SelectItem value="cs180">CS 180 - Web Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Time Limit (minutes)</Label>
                    <Input
                      type="number"
                      value={quiz.timeLimit}
                      onChange={(e) => setQuiz({ ...quiz, timeLimit: Number.parseInt(e.target.value) })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Attempts Allowed</Label>
                    <Input
                      type="number"
                      value={quiz.attempts}
                      onChange={(e) => setQuiz({ ...quiz, attempts: Number.parseInt(e.target.value) })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Shuffle Questions</Label>
                    <Switch
                      checked={quiz.shuffleQuestions}
                      onCheckedChange={(checked) => setQuiz({ ...quiz, shuffleQuestions: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Show Results After Submission</Label>
                    <Switch
                      checked={quiz.showResults}
                      onCheckedChange={(checked) => setQuiz({ ...quiz, showResults: checked })}
                    />
                  </div>
                </div>

                {/* Accessibility Features */}
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="font-semibold text-white mb-3">Accessibility & Inclusion Features</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Voice Narration</Label>
                        <p className="text-sm text-gray-400">Enable text-to-speech for questions</p>
                      </div>
                      <Switch
                        checked={quiz.voiceNarration}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, voiceNarration: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Audio Support</Label>
                        <p className="text-sm text-gray-400">Allow audio questions and instructions</p>
                      </div>
                      <Switch
                        checked={quiz.audioSupport}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, audioSupport: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">High Contrast Mode</Label>
                        <p className="text-sm text-gray-400">Enable high contrast for better visibility</p>
                      </div>
                      <Switch
                        checked={quiz.highContrast}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, highContrast: checked })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Font Size Options</Label>
                      <Select value={quiz.fontSize} onValueChange={(value) => setQuiz({ ...quiz, fontSize: value })}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium (Default)</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="extra-large">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Color Blind Support</Label>
                        <p className="text-sm text-gray-400">Adjust colors for color blindness accessibility</p>
                      </div>
                      <Switch
                        checked={quiz.colorBlindSupport}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, colorBlindSupport: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Extended Time Limit</Label>
                        <p className="text-sm text-gray-400">Provide 1.5x time for students who need it</p>
                      </div>
                      <Switch
                        checked={quiz.extendedTime}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, extendedTime: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Keyboard Navigation</Label>
                        <p className="text-sm text-gray-400">Enable full keyboard navigation support</p>
                      </div>
                      <Switch
                        checked={quiz.keyboardNav}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, keyboardNav: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Simplified Language</Label>
                        <p className="text-sm text-gray-400">Use clearer, simpler language in questions</p>
                      </div>
                      <Switch
                        checked={quiz.simplifiedLanguage}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, simplifiedLanguage: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Reading Assistance</Label>
                        <p className="text-sm text-gray-400">Provide reading assistance and highlighting tools</p>
                      </div>
                      <Switch
                        checked={quiz.readingAssistance}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, readingAssistance: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Screen Reader Compatibility</Label>
                        <p className="text-sm text-gray-400">Ensure full compatibility with screen readers</p>
                      </div>
                      <Switch
                        checked={quiz.screenReader}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, screenReader: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Motor Impairment Support</Label>
                        <p className="text-sm text-gray-400">Larger click targets and reduced precision requirements</p>
                      </div>
                      <Switch
                        checked={quiz.motorSupport}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, motorSupport: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Cognitive Load Reduction</Label>
                        <p className="text-sm text-gray-400">Minimize distractions and cognitive overload</p>
                      </div>
                      <Switch
                        checked={quiz.cognitiveSupport}
                        onCheckedChange={(checked) => setQuiz({ ...quiz, cognitiveSupport: checked })}
                      />
                    </div>
                  </div>
                </div>

                {/* Quiz Summary */}
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="font-semibold text-white mb-3">Quiz Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Questions:</span>
                      <span className="text-white">{questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Points:</span>
                      <span className="text-white">{getTotalPoints()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Time:</span>
                      <span className="text-white">{Math.ceil(questions.length * 1.5)} min</span>
                    </div>
                  </div>
                  {Object.keys(getQuestionTypeCounts()).length > 0 && (
                    <div className="mt-3">
                      <p className="text-gray-400 text-sm mb-2">Question Types:</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(getQuestionTypeCounts()).map(([type, count]) => (
                          <Badge key={type} variant="secondary" className="text-xs bg-gray-600">
                            {type.replace("-", " ")}: {count}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button className="flex-1 bg-green-500 hover:bg-green-600">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Question Form */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Add Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Question Type</Label>
                    <Select
                      value={currentQuestion.type}
                      onValueChange={(value) => updateCurrentQuestion("type", value)}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {questionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Points</Label>
                    <Input
                      type="number"
                      min="1"
                      value={currentQuestion.points}
                      onChange={(e) => updateCurrentQuestion("points", Number.parseInt(e.target.value))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                {renderQuestionEditor()}

                <div className="space-y-2">
                  <Label className="text-white">Explanation (optional)</Label>
                  <Textarea
                    placeholder="Provide an explanation for the correct answer..."
                    value={currentQuestion.explanation}
                    onChange={(e) => updateCurrentQuestion("explanation", e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    rows={2}
                  />
                </div>

                <Button onClick={addQuestion} className="w-full bg-orange-500 hover:bg-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </CardContent>
            </Card>

            {/* Questions List */}
            {questions.length > 0 && (
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Questions ({questions.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {question.type.replace("-", " ")}
                            </Badge>
                            <Badge className="bg-orange-500">{question.points} pts</Badge>
                          </div>
                          <h4 className="text-white font-medium mb-2">
                            {index + 1}. {question.question}
                          </h4>
                          {question.type === "multiple-choice" && (
                            <div className="space-y-1">
                              {question.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`text-sm ${
                                    optIndex === question.correctAnswer ? "text-green-400 font-medium" : "text-gray-400"
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                  {optIndex === question.correctAnswer && " ✓"}
                                </div>
                              ))}
                            </div>
                          )}
                          {question.explanation && (
                            <p className="text-white text-sm mt-2 italic">Explanation: {question.explanation}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button> 
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
