"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Save, Users } from "lucide-react"

export function AttendanceTracking() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [attendance, setAttendance] = useState<Record<number, "present" | "absent" | "late">>({})

  const classes = [
    { id: 1, name: "JLPT N3 - Advanced Communication" },
    { id: 2, name: "Business English" },
    { id: 3, name: "Korean Beginner" },
    { id: 4, name: "Spanish Conversation" },
  ]

  const students = [
    { id: 1, name: "Nguyen Van A", studentId: "ST001" },
    { id: 2, name: "Tran Thi B", studentId: "ST002" },
    { id: 3, name: "Le Van C", studentId: "ST003" },
    { id: 4, name: "Pham Thi D", studentId: "ST004" },
    { id: 5, name: "Hoang Van E", studentId: "ST005" },
    { id: 6, name: "Vu Thi F", studentId: "ST006" },
  ]

  const attendanceHistory = [
    { date: "2024-01-15", present: 18, absent: 2, late: 1 },
    { date: "2024-01-12", present: 19, absent: 1, late: 1 },
    { date: "2024-01-10", present: 20, absent: 1, late: 0 },
    { date: "2024-01-08", present: 17, absent: 3, late: 1 },
  ]

  const handleAttendanceChange = (studentId: number, status: "present" | "absent" | "late") => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const getAttendanceStats = () => {
    const total = students.length
    const present = Object.values(attendance).filter((status) => status === "present").length
    const absent = Object.values(attendance).filter((status) => status === "absent").length
    const late = Object.values(attendance).filter((status) => status === "late").length

    return { total, present, absent, late }
  }

  const stats = getAttendanceStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance Tracking</h2>
          <p className="text-muted-foreground">Take attendance and view attendance history</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Attendance
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.late}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Take Attendance</CardTitle>
            <CardDescription>Mark student attendance for today's class</CardDescription>
            <div className="flex space-x-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((class_) => (
                    <SelectItem key={class_.id} value={class_.id.toString()}>
                      {class_.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </CardHeader>
          <CardContent>
            {selectedClass ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Absent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.studentId}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={attendance[student.id] === "present"}
                          onCheckedChange={() => handleAttendanceChange(student.id, "present")}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={attendance[student.id] === "late"}
                          onCheckedChange={() => handleAttendanceChange(student.id, "late")}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={attendance[student.id] === "absent"}
                          onCheckedChange={() => handleAttendanceChange(student.id, "absent")}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">Please select a class to take attendance</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Recent attendance records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceHistory.map((record, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{record.date}</span>
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Present:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {record.present}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Absent:</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        {record.absent}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Late:</span>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        {record.late}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
