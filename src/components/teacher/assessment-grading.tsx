"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/"
import { Upload, Download, Eye, Plus, FileText } from "lucide-react"

export function AssessmentGrading() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const assessments = [
    {
      id: 1,
      title: "JLPT N3 Mock Test",
      class: "JLPT N3 - Advanced Communication",
      type: "Exam",
      date: "2024-01-15",
      submissions: 18,
      graded: 15,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Business Presentation",
      class: "Business English",
      type: "Assignment",
      date: "2024-01-12",
      submissions: 22,
      graded: 22,
      status: "Completed",
    },
    {
      id: 3,
      title: "Korean Vocabulary Quiz",
      class: "Korean Beginner",
      type: "Quiz",
      date: "2024-01-10",
      submissions: 15,
      graded: 15,
      status: "Completed",
    },
  ]

  const scoreboards = [
    {
      id: 1,
      student: "Nguyen Van A",
      midterm: 85,
      final: 88,
      assignments: 92,
      participation: 90,
      total: 88.75,
      grade: "A",
    },
    {
      id: 2,
      student: "Tran Thi B",
      midterm: 78,
      final: 82,
      assignments: 85,
      participation: 88,
      total: 83.25,
      grade: "B+",
    },
    {
      id: 3,
      student: "Le Van C",
      midterm: 92,
      final: 95,
      assignments: 88,
      participation: 95,
      total: 92.5,
      grade: "A+",
    },
    {
      id: 4,
      student: "Pham Thi D",
      midterm: 72,
      final: 75,
      assignments: 78,
      participation: 82,
      total: 76.75,
      grade: "B",
    },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "bg-green-100 text-green-800"
      case "B+":
      case "B":
        return "bg-blue-100 text-blue-800"
      case "C+":
      case "C":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assessment & Grading</h2>
          <p className="text-muted-foreground">Manage assessments and student scoreboards</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Grades
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>Manage and grade student assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{assessment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assessment.class}</p>
                    </div>
                    <Badge variant={assessment.status === "Completed" ? "default" : "secondary"}>
                      {assessment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                    <span>
                      {assessment.type} • {assessment.date}
                    </span>
                    <span>
                      {assessment.graded}/{assessment.submissions} graded
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm">Grade</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Scoreboard</CardTitle>
            <CardDescription>Upload and manage student scoreboards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your scoreboard file here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">{selectedFile.name}</span>
                  <Button size="sm">Upload</Button>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Recent Uploads</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">JLPT_N3_Final_Grades.xlsx</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Business_English_Midterm.xlsx</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Scoreboards</CardTitle>
          <CardDescription>View and manage student grades</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Midterm</TableHead>
                <TableHead>Final</TableHead>
                <TableHead>Assignments</TableHead>
                <TableHead>Participation</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreboards.map((score) => (
                <TableRow key={score.id}>
                  <TableCell className="font-medium">{score.student}</TableCell>
                  <TableCell>{score.midterm}%</TableCell>
                  <TableCell>{score.final}%</TableCell>
                  <TableCell>{score.assignments}%</TableCell>
                  <TableCell>{score.participation}%</TableCell>
                  <TableCell className="font-medium">{score.total}%</TableCell>
                  <TableCell>
                    <Badge className={getGradeColor(score.grade)}>{score.grade}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
