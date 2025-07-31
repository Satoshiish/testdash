"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle } from "lucide-react"

export default function TakeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false)

  const quiz = {
    title: "Introduction to Biology",
    questions: [
      {
        id: 1,
        question: "What is the basic unit of life?",
        options: ["Atom", "Cell", "Molecule", "Tissue"],
        correct: 1,
      },
      {
        id: 2,
        question: "Which organelle is known as the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
        correct: 2,
      },
      {
        id: 3,
        question: "What process do plants use to make their own food?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
        correct: 1,
      },
    ],
  }

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setIsCompleted(true)
    // Calculate score
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quiz.questions[index].correct ? 1 : 0)
    }, 0)
    console.log(`Quiz completed! Score: ${score}/${quiz.questions.length}`)
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  if (isCompleted) {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quiz.questions[index].correct ? 1 : 0)
    }, 0)
    const percentage = Math.round((score / quiz.questions.length) * 100)

    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="bg-gray-800 border-gray-700 w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Quiz Completed!</h1>
            <div className="text-6xl font-bold text-orange-500 mb-4">{percentage}%</div>
            <p className="text-xl text-gray-300 mb-6">
              You scored {score} out of {quiz.questions.length} questions correctly
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-orange-500 hover:bg-orange-600">View Results</Button>
              <Button variant="outline" className="border-gray-600 bg-transparent">
                Take Another Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-orange-500">
              <Clock className="h-5 w-5 mr-2" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-white">{quiz.questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-orange-500 bg-orange-500/10 text-orange-500"
                      : "border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 bg-transparent"
          >
            Previous
          </Button>
          <div className="flex space-x-2">
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-orange-500 hover:bg-orange-600"
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
