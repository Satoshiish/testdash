"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Plus,
  Search,
  Clock,
  Volume2,
  Eye,
  Brain,
  ShipWheelIcon as Wheelchair,
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react"

export default function AccommodationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const [newRequest, setNewRequest] = useState({
    studentName: "",
    studentId: "",
    accommodationType: "",
    description: "",
    documentation: false,
    urgency: "normal",
  })

  const accommodations = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentId: "STU001",
      type: "Extended Time",
      description: "Additional 50% time for quizzes and exams due to processing disorder",
      status: "Approved",
      dateRequested: "2024-01-15",
      dateApproved: "2024-01-18",
      documentation: true,
      icon: <Clock className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      id: 2,
      studentName: "Michael Chen",
      studentId: "STU002",
      type: "Audio Support",
      description: "Text-to-speech software and audio recordings of lectures",
      status: "Pending",
      dateRequested: "2024-01-20",
      dateApproved: null,
      documentation: true,
      icon: <Volume2 className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      id: 3,
      studentName: "Emma Davis",
      studentId: "STU003",
      type: "Visual Support",
      description: "Large print materials and high contrast display settings",
      status: "Approved",
      dateRequested: "2024-01-10",
      dateApproved: "2024-01-12",
      documentation: true,
      icon: <Eye className="h-5 w-5" />,
      color: "text-purple-500",
    },
    {
      id: 4,
      studentName: "David Wilson",
      studentId: "STU004",
      type: "Cognitive Support",
      description: "Simplified instructions and memory aids for complex tasks",
      status: "Under Review",
      dateRequested: "2024-01-22",
      dateApproved: null,
      documentation: false,
      icon: <Brain className="h-5 w-5" />,
      color: "text-orange-500",
    },
    {
      id: 5,
      studentName: "Lisa Rodriguez",
      studentId: "STU005",
      type: "Physical Support",
      description: "Wheelchair accessible seating and adjustable desk height",
      status: "Approved",
      dateRequested: "2024-01-08",
      dateApproved: "2024-01-09",
      documentation: true,
      icon: <Wheelchair className="h-5 w-5" />,
      color: "text-red-500",
    },
  ]

  const accommodationTypes = [
    { value: "all", label: "All Types", count: accommodations.length },
    {
      value: "Extended Time",
      label: "Extended Time",
      count: accommodations.filter((a) => a.type === "Extended Time").length,
    },
    {
      value: "Audio Support",
      label: "Audio Support",
      count: accommodations.filter((a) => a.type === "Audio Support").length,
    },
    {
      value: "Visual Support",
      label: "Visual Support",
      count: accommodations.filter((a) => a.type === "Visual Support").length,
    },
    {
      value: "Cognitive Support",
      label: "Cognitive Support",
      count: accommodations.filter((a) => a.type === "Cognitive Support").length,
    },
    {
      value: "Physical Support",
      label: "Physical Support",
      count: accommodations.filter((a) => a.type === "Physical Support").length,
    },
  ]

  const filteredAccommodations = accommodations.filter(
    (accommodation) =>
      (selectedType === "all" || accommodation.type === selectedType) &&
      (accommodation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accommodation.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accommodation.type.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "Under Review":
        return <Badge className="bg-blue-500">Under Review</Badge>
      case "Denied":
        return <Badge className="bg-red-500">Denied</Badge>
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Pending":
      case "Under Review":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "Denied":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const handleSubmitRequest = () => {
    console.log("Submitting accommodation request:", newRequest)
    setIsRequestOpen(false)
    setNewRequest({
      studentName: "",
      studentId: "",
      accommodationType: "",
      description: "",
      documentation: false,
      urgency: "normal",
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/professor/home" className="inline-flex items-center text-orange-500 hover:text-orange-400">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="text-2xl font-bold text-red-500">Accommodations</div>
          </div>
          <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submit Accommodation Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Student Name</Label>
                    <Input
                      placeholder="Enter student name"
                      value={newRequest.studentName}
                      onChange={(e) => setNewRequest({ ...newRequest, studentName: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Student ID</Label>
                    <Input
                      placeholder="STU001"
                      value={newRequest.studentId}
                      onChange={(e) => setNewRequest({ ...newRequest, studentId: e.target.value })}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Accommodation Type</Label>
                    <Select onValueChange={(value) => setNewRequest({ ...newRequest, accommodationType: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Extended Time">Extended Time</SelectItem>
                        <SelectItem value="Audio Support">Audio Support</SelectItem>
                        <SelectItem value="Visual Support">Visual Support</SelectItem>
                        <SelectItem value="Cognitive Support">Cognitive Support</SelectItem>
                        <SelectItem value="Physical Support">Physical Support</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Urgency</Label>
                    <Select
                      value={newRequest.urgency}
                      onValueChange={(value) => setNewRequest({ ...newRequest, urgency: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the accommodation needed..."
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                    className="bg-gray-700 border-gray-600"
                    rows={4}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="documentation"
                    checked={newRequest.documentation}
                    onCheckedChange={(checked) => setNewRequest({ ...newRequest, documentation: checked as boolean })}
                  />
                  <Label htmlFor="documentation" className="text-sm">
                    Documentation provided (medical records, IEP, 504 plan, etc.)
                  </Label>
                </div>
                <Button onClick={handleSubmitRequest} className="w-full bg-orange-500 hover:bg-orange-600">
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Accommodations</h1>
          <p className="text-gray-400">Manage accessibility accommodations for your students</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Requests</p>
                  <p className="text-2xl font-bold text-white">{accommodations.length}</p>
                  <p className="text-green-400 text-sm">+2 this month</p>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Approved</p>
                  <p className="text-2xl font-bold text-white">
                    {accommodations.filter((a) => a.status === "Approved").length}
                  </p>
                  <p className="text-green-400 text-sm">Active accommodations</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Review</p>
                  <p className="text-2xl font-bold text-white">
                    {accommodations.filter((a) => a.status === "Pending" || a.status === "Under Review").length}
                  </p>
                  <p className="text-yellow-400 text-sm">Awaiting approval</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Response Time</p>
                  <p className="text-2xl font-bold text-white">2.3</p>
                  <p className="text-blue-400 text-sm">Days average</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search accommodations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-64 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {accommodationTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label} ({type.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Accommodations List */}
        <div className="space-y-4">
          {filteredAccommodations.map((accommodation) => (
            <Card key={accommodation.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-700 ${accommodation.color}`}>{accommodation.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{accommodation.studentName}</h3>
                      <p className="text-gray-400 text-sm">ID: {accommodation.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(accommodation.status)}
                    {getStatusBadge(accommodation.status)}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {accommodation.type}
                    </Badge>
                    {accommodation.documentation && (
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        <FileText className="h-3 w-3 mr-1" />
                        Documented
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-300">{accommodation.description}</p>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <div className="flex space-x-4">
                    <span>Requested: {accommodation.dateRequested}</span>
                    {accommodation.dateApproved && <span>Approved: {accommodation.dateApproved}</span>}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                      View Details
                    </Button>
                    {accommodation.status === "Pending" && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                        >
                          Deny
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAccommodations.length === 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">No accommodations found</h3>
              <p className="text-gray-400">Try adjusting your search criteria or create a new accommodation request.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
