"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Clock, Calendar, Search, Eye } from "lucide-react"

export function ClassManagement() {
  const [selectedClass, setSelectedClass] = useState(null)

  const classes = [
    {
      id: 1,
      name: "JLPT N3 - Advanced Communication",
      schedule: "Mon, Wed, Fri 09:00-10:30",
      students: 18,
      level: "Intermediate",
      room: "Room A-101",
      status: "Active",
    },
    {
      id: 2,
      name: "Business English",
      schedule: "Tue, Thu 14:00-15:30",
      students: 22,
      level: "Advanced",
      room: "Room B-205",
      status: "Active",
    },
    {
      id: 3,
      name: "Korean Beginner",
      schedule: "Mon, Wed 16:00-17:30",
      students: 15,
      level: "Beginner",
      room: "Room C-301",
      status: "Active",
    },
    {
      id: 4,
      name: "Spanish Conversation",
      schedule: "Sat 10:00-12:00",
      students: 12,
      level: "Intermediate",
      room: "Room A-102",
      status: "Completed",
    },
  ]

  const students = [
    { id: 1, name: "Nguyen Van A", email: "nguyenvana@email.com", progress: 85, attendance: "95%" },
    { id: 2, name: "Tran Thi B", email: "tranthib@email.com", progress: 78, attendance: "88%" },
    { id: 3, name: "Le Van C", email: "levanc@email.com", progress: 92, attendance: "100%" },
    { id: 4, name: "Pham Thi D", email: "phamthid@email.com", progress: 67, attendance: "82%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Class Management</h2>
          <p className="text-muted-foreground">Manage your classes and view student information</p>
        </div>
        <Button>Add New Class</Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search classes..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((class_) => (
          <Card key={class_.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{class_.name}</CardTitle>
                <Badge variant={class_.status === "Active" ? "default" : "secondary"}>{class_.status}</Badge>
              </div>
              <CardDescription>{class_.level}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  {class_.schedule}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  {class_.students} students
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {class_.room}
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View Students
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Students in {class_.name}</DialogTitle>
                      <DialogDescription>View and manage students enrolled in this class</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Attendance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">{student.name}</TableCell>
                              <TableCell>{student.email}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-primary h-2 rounded-full"
                                      style={{ width: `${student.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm">{student.progress}%</span>
                                </div>
                              </TableCell>
                              <TableCell>{student.attendance}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="sm" className="flex-1">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
