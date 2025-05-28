"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Eye, CheckCircle, XCircle, Clock } from "lucide-react"

export function FeedbackCommunication() {
  const [selectedTab, setSelectedTab] = useState("feedback")

  const feedbacks = [
    {
      id: 1,
      student: "Nguyen Van A",
      class: "JLPT N3",
      subject: "Grammar Exercise Feedback",
      message: "I found the past tense exercises very helpful, but I'm still confused about irregular verbs.",
      rating: 4,
      date: "2024-01-15",
      status: "New",
    },
    {
      id: 2,
      student: "Tran Thi B",
      class: "Business English",
      subject: "Presentation Feedback",
      message: "The presentation guidelines were clear, but I need more practice with pronunciation.",
      rating: 5,
      date: "2024-01-14",
      status: "Responded",
    },
    {
      id: 3,
      student: "Le Van C",
      class: "Korean Beginner",
      subject: "Vocabulary Quiz",
      message: "The quiz was challenging but fair. Could we have more audio examples?",
      rating: 4,
      date: "2024-01-13",
      status: "New",
    },
  ]

  const absentRequests = [
    {
      id: 1,
      student: "Pham Thi D",
      class: "JLPT N3",
      date: "2024-01-16",
      reason: "Medical appointment",
      submitted: "2024-01-15",
      status: "Pending",
      documents: ["medical_certificate.pdf"],
    },
    {
      id: 2,
      student: "Hoang Van E",
      class: "Business English",
      date: "2024-01-17",
      reason: "Family emergency",
      submitted: "2024-01-15",
      status: "Approved",
      documents: [],
    },
    {
      id: 3,
      student: "Vu Thi F",
      class: "Korean Beginner",
      date: "2024-01-18",
      reason: "Work conference",
      submitted: "2024-01-14",
      status: "Rejected",
      documents: ["conference_invitation.pdf"],
    },
  ]

  const messages = [
    {
      id: 1,
      student: "Nguyen Van A",
      subject: "Question about homework",
      preview: "Hi teacher, I have a question about the grammar exercise...",
      date: "2024-01-15",
      unread: true,
    },
    {
      id: 2,
      student: "Tran Thi B",
      subject: "Schedule change request",
      preview: "Could we possibly reschedule next week's presentation...",
      date: "2024-01-14",
      unread: false,
    },
    {
      id: 3,
      student: "Le Van C",
      subject: "Thank you for the feedback",
      preview: "Thank you for the detailed feedback on my essay...",
      date: "2024-01-13",
      unread: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Responded":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return null
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Feedback & Communication</h2>
          <p className="text-muted-foreground">Manage student feedback and communication</p>
        </div>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feedback">Student Feedback</TabsTrigger>
          <TabsTrigger value="absent">Absent Requests</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Feedback</CardTitle>
              <CardDescription>View and respond to student feedback</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbacks.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell className="font-medium">{feedback.student}</TableCell>
                      <TableCell>{feedback.class}</TableCell>
                      <TableCell>{feedback.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">{renderStars(feedback.rating)}</div>
                      </TableCell>
                      <TableCell>{feedback.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(feedback.status)}>{feedback.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Feedback from {feedback.student}</DialogTitle>
                              <DialogDescription>
                                {feedback.class} • {feedback.date}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Subject</Label>
                                <p className="text-sm text-muted-foreground">{feedback.subject}</p>
                              </div>
                              <div>
                                <Label>Rating</Label>
                                <div className="flex items-center space-x-1">{renderStars(feedback.rating)}</div>
                              </div>
                              <div>
                                <Label>Message</Label>
                                <p className="text-sm text-muted-foreground">{feedback.message}</p>
                              </div>
                              <div>
                                <Label htmlFor="response">Your Response</Label>
                                <Textarea id="response" placeholder="Type your response here..." />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline">Close</Button>
                              <Button>Send Response</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="absent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Absent Requests</CardTitle>
              <CardDescription>Review and manage student absence requests</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Absent Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {absentRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.student}</TableCell>
                      <TableCell>{request.class}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.submitted}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(request.status)}
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {request.status === "Pending" && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
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

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communicate with your students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`border rounded-lg p-4 ${message.unread ? "bg-blue-50 border-blue-200" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>
                            {message.student
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{message.student}</h4>
                            {message.unread && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900">{message.subject}</p>
                          <p className="text-sm text-muted-foreground">{message.preview}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{message.date}</p>
                        <Button variant="ghost" size="sm" className="mt-2">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
