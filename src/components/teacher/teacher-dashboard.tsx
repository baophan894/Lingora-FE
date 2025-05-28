"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { DashboardOverview } from "./dashboard-overview"
import { ClassManagement } from "./class-management"
import { Calendar } from "./calendar-view"
import { AttendanceTracking } from "./attendance-tracking"
import { AssessmentGrading } from "./assessment-grading"
import { ContentManagement } from "./content-management"
import { QuestionBank } from "./question-bank"
import { FeedbackCommunication } from "./feedback-communication"

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "classes":
        return <ClassManagement />
      case "calendar":
        return <Calendar />
      case "attendance":
        return <AttendanceTracking />
      case "assessment":
        return <AssessmentGrading />
      case "content":
        return <ContentManagement />
      case "questions":
        return <QuestionBank />
      case "feedback":
        return <FeedbackCommunication />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
