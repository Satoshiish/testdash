"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Building, Heart, BookOpen, Trophy, Star, ArrowRight, CheckCircle, X } from "lucide-react"

export default function LandingPage() {
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false)

  useEffect(() => {
    // Check if user just logged out
    const justLoggedOut = sessionStorage.getItem("justLoggedOut")
    if (justLoggedOut) {
      setShowLogoutSuccess(true)
      sessionStorage.removeItem("justLoggedOut")

      // Auto-hide after 5 seconds
      setTimeout(() => {
        setShowLogoutSuccess(false)
      }, 5000)
    }
  }, [])

  const loginOptions = [
    {
      title: "Student",
      description: "Access your courses and track your learning progress",
      icon: GraduationCap,
      href: "/login/student",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-400",
    },
    {
      title: "Professor",
      description: "Manage your classes, create content, and track student progress",
      icon: Users,
      href: "/login/professor",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
      textColor: "text-red-400",
    },
    {
      title: "Personal",
      description: "Individual learning journey and skill development",
      icon: Heart,
      href: "/login/personal",
      color: "from-red-400 to-orange-400",
      bgColor: "bg-red-400/10",
      textColor: "text-red-400",
    },
  ]

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engage with dynamic content and hands-on exercises",
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Earn badges and certificates as you progress",
    },
    {
      icon: Star,
      title: "Personalized Path",
      description: "AI-powered recommendations based on your goals",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Logout Success Message */}
      {showLogoutSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-center space-x-3 min-w-[300px]">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm font-medium">Successfully logged out!</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLogoutSuccess(false)}
              className="text-green-400 hover:bg-green-500/20 p-1 h-auto ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Learning
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                Experience
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of learners, educators, and organizations using our platform to achieve their educational
              goals through innovative technology and personalized learning paths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/accommodation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-orange-600 text-white bg-transparent hover:bg-orange-700 hover:border-orange-700 px-6 py-2 rounded-md transition duration-200 ease-in-out"
                >
                  Request Accommodation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover the features that make learning engaging, effective, and accessible for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-orange-500/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Login Options Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Learning Path</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Select the option that best fits your learning needs and goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loginOptions.map((option, index) => (
              <Link key={index} href={option.href}>
                <Card className="flex flex-col bg-gray-800 border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-full mx-auto mb-4 flex items-center justify-center`}
                    >
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1 flex flex-col">
                    <p className="text-gray-400 text-center text-sm mb-4">{option.description}</p>
                    <div className={`mt-auto ${option.bgColor} rounded-lg p-3 text-center`}>
                      <span className={`${option.textColor} font-medium text-sm`}>Sign In →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-400">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1,200+</div>
              <div className="text-gray-400">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TestDash</span>
            </div>
            <p className="text-gray-400 mb-6">Empowering learners worldwide with innovative educational technology.</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Help Center
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-500 text-sm">© 2024 TestDash. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
