"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Calendar, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Classes",
      value: "8",
      description: "Active classes this semester",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Total Students",
      value: "156",
      description: "Enrolled across all classes",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Today's Classes",
      value: "3",
      description: "Scheduled for today",
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      title: "Average Progress",
      value: "78%",
      description: "Student completion rate",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const recentClasses = [
    { name: "JLPT N3 - Advanced Communication", time: "09:00 - 10:30", students: 18, status: "Completed" },
    { name: "Business English", time: "14:00 - 15:30", students: 22, status: "Upcoming" },
    { name: "Korean Beginner", time: "16:00 - 17:30", students: 15, status: "Upcoming" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Teacher!</h2>
        <p className="text-muted-foreground">Here's what's happening with your classes today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{class_.name}</h4>
                    <p className="text-sm text-muted-foreground">{class_.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{class_.students} students</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        class_.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {class_.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50">Take Attendance</button>
            <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50">Create New Quiz</button>
            <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50">Upload Materials</button>
            <button className="w-full p-3 text-left border rounded-lg hover:bg-gray-50">View Student Progress</button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
