"use client"

import type React from "react"

const StudentLogout: React.FC = () => {
  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("authToken")
    sessionStorage.clear()
    // Set logout flag for landing page message
    sessionStorage.setItem("justLoggedOut", "true")
    // Redirect to landing page
    window.location.href = "/"
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default StudentLogout
