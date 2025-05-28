"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  GraduationCap,
  FileText,
  HelpCircle,
  MessageSquare,
  BookOpen,
} from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "classes", label: "Class Management", icon: Users },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "assessment", label: "Assessment", icon: GraduationCap },
  { id: "content", label: "Content Management", icon: FileText },
  { id: "questions", label: "Question Bank", icon: HelpCircle },
  { id: "feedback", label: "Feedback & Communication", icon: MessageSquare },
]

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-primary">LINGORA</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">Teacher Dashboard</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start px-6 py-3 text-left",
                activeTab === item.id ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
