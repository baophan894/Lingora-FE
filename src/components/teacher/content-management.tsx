"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Upload, Download } from "lucide-react"

export function ContentManagement() {
  const [selectedTab, setSelectedTab] = useState("exercises")

  const exercises = [
    {
      id: 1,
      title: "Grammar Practice: Past Tense",
      type: "Grammar",
      difficulty: "Intermediate",
      questions: 15,
      class: "JLPT N3",
      created: "2024-01-15",
    },
    {
      id: 2,
      title: "Vocabulary Building: Business Terms",
      type: "Vocabulary",
      difficulty: "Advanced",
      questions: 20,
      class: "Business English",
      created: "2024-01-12",
    },
    {
      id: 3,
      title: "Reading Comprehension: News Articles",
      type: "Reading",
      difficulty: "Intermediate",
      questions: 10,
      class: "JLPT N3",
      created: "2024-01-10",
    },
  ]

  const quizzes = [
    {
      id: 1,
      title: "Weekly Vocabulary Quiz",
      questions: 25,
      timeLimit: 30,
      class: "Korean Beginner",
      attempts: 15,
      avgScore: 78,
      created: "2024-01-14",
    },
    {
      id: 2,
      title: "Grammar Assessment",
      questions: 20,
      timeLimit: 45,
      class: "JLPT N3",
      attempts: 18,
      avgScore: 82,
      created: "2024-01-11",
    },
    {
      id: 3,
      title: "Business Communication Quiz",
      questions: 15,
      timeLimit: 20,
      class: "Business English",
      attempts: 22,
      avgScore: 85,
      created: "2024-01-09",
    },
  ]

  const documents = [
    {
      id: 1,
      name: "JLPT N3 Grammar Guide.pdf",
      type: "PDF",
      size: "2.4 MB",
      class: "JLPT N3",
      downloads: 45,
      uploaded: "2024-01-15",
    },
    {
      id: 2,
      name: "Business Email Templates.docx",
      type: "Word",
      size: "1.2 MB",
      class: "Business English",
      downloads: 32,
      uploaded: "2024-01-12",
    },
    {
      id: 3,
      name: "Korean Pronunciation Audio.mp3",
      type: "Audio",
      size: "15.6 MB",
      class: "Korean Beginner",
      downloads: 28,
      uploaded: "2024-01-10",
    },
    {
      id: 4,
      name: "Spanish Conversation Practice.mp4",
      type: "Video",
      size: "45.2 MB",
      class: "Spanish Conversation",
      downloads: 19,
      uploaded: "2024-01-08",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return "📄"
      case "Word":
        return "📝"
      case "Audio":
        return "🎵"
      case "Video":
        return "🎥"
      default:
        return "📁"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
          <p className="text-muted-foreground">Create and manage exercises, quizzes, and study materials</p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Exercises</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Exercise
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Exercise</DialogTitle>
                  <DialogDescription>Create a new exercise for your students</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Input id="type" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Exercise</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exercises.map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell className="font-medium">{exercise.title}</TableCell>
                      <TableCell>{exercise.type}</TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                      </TableCell>
                      <TableCell>{exercise.questions}</TableCell>
                      <TableCell>{exercise.class}</TableCell>
                      <TableCell>{exercise.created}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Quizzes</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Quiz</DialogTitle>
                  <DialogDescription>Create a new quiz for your students</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quiz-title" className="text-right">
                      Title
                    </Label>
                    <Input id="quiz-title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time-limit" className="text-right">
                      Time Limit (min)
                    </Label>
                    <Input id="time-limit" type="number" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quiz-description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="quiz-description" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Quiz</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Time Limit</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.title}</TableCell>
                      <TableCell>{quiz.questions}</TableCell>
                      <TableCell>{quiz.timeLimit} min</TableCell>
                      <TableCell>{quiz.class}</TableCell>
                      <TableCell>{quiz.attempts}</TableCell>
                      <TableCell>{quiz.avgScore}%</TableCell>
                      <TableCell>{quiz.created}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Study Documents</h3>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getFileTypeIcon(doc.type)}</span>
                          <span>{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.class}</TableCell>
                      <TableCell>{doc.downloads}</TableCell>
                      <TableCell>{doc.uploaded}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
