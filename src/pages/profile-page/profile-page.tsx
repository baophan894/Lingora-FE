import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"
import { BookOpen, Calendar as CalendarIcon, Clock, GraduationCap, User, Settings, LogOut, Bell, MapPin, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"
import type { RootState } from "../../store/store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"


export default function ProfilePage() {

  const auth = useAppSelector((state: RootState) => state.auth);

  const currentUser = auth.user;
  console.log("Thông tin người dùng từ ProfilePage:", JSON.stringify(currentUser, null, 2));

  // Dữ liệu mẫu cho hồ sơ người dùng
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    level: "JLPT N4",
    progress: 68,
    joinDate: "10/05/2023",
    completedCourses: 2,
    activeCourses: 1,
  }

  // Dữ liệu mẫu cho khóa học đang học
  const activeCourses = [
    {
      id: 1,
      title: "JLPT N3 - Nâng cao kỹ năng giao tiếp",
      image: "/placeholder.svg?height=150&width=250",
      progress: 45,
      nextLesson: "Ngữ pháp: Mẫu câu điều kiện",
      nextLessonDate: "20/05/2024",
      teacher: "Yamada Kenji",
    },
  ]

  // Dữ liệu mẫu cho khóa học đã hoàn thành
  const completedCourses = [
    {
      id: 1,
      title: "JLPT N5 - Khóa học cho người mới bắt đầu",
      image: "/placeholder.svg?height=150&width=250",
      completionDate: "15/12/2023",
      certificate: true,
      grade: "A",
    },
    {
      id: 2,
      title: "JLPT N4 - Nâng cao từ vựng và ngữ pháp",
      image: "/placeholder.svg?height=150&width=250",
      completionDate: "10/04/2024",
      certificate: true,
      grade: "B+",
    },
  ]

  // Dữ liệu mẫu cho lịch học
  const schedule = [
    {
      id: 1,
      course: "JLPT N3",
      date: "20/05/2024",
      time: "18:00 - 20:00",
      teacher: "Yamada Kenji",
      room: "P.301",
    },
    {
      id: 2,
      course: "JLPT N3",
      date: "22/05/2024",
      time: "18:00 - 20:00",
      teacher: "Yamada Kenji",
      room: "P.301",
    },
    {
      id: 3,
      course: "JLPT N3",
      date: "24/05/2024",
      time: "18:00 - 20:00",
      teacher: "Yamada Kenji",
      room: "P.301",
    },
  ]

  function ScheduleDialog({ scheduleData }: { scheduleData: typeof schedule }) {
    const events = scheduleData.map(item => ({
      id: item.id.toString(),
      title: `${item.course} - ${item.teacher}`,
      start: parseDateTime(item.date, item.time.split(" - ")[0]),
      end: parseDateTime(item.date, item.time.split(" - ")[1]),
      extendedProps: {
        room: item.room,
        teacher: item.teacher
      }
    }))

    function parseDateTime(date: string, time: string) {
      const [day, month, year] = date.split("/")
      const [hour, minute] = time.trim().split(":")
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Xem lịch đầy đủ
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[85vh] rounded-2xl bg-white  p-5">
          <DialogHeader>
            <DialogTitle>Lịch học của bạn</DialogTitle>
            <DialogDescription>
              Lịch học được cập nhật theo thời gian thực
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 mb-4" style={{ height: "auto" }}>            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale="vi"
            events={events}
            eventContent={renderEventContent}
            slotMinTime="07:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            height="auto"
            buttonText={{
              today: 'Hôm nay',
              month: 'Tháng',
              week: 'Tuần',
              day: 'Ngày'
            }}
            eventClassNames="hover:brightness-95 cursor-pointer"
          />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  function renderEventContent(eventInfo: any) {
    return (
      <div className="p-1 bg-navy-100/90 rounded-sm h-full flex flex-col justify-center overflow-hidden">
        <div className="font-semibold text-xs text-navy-900 mb-0.5 truncate">
          {eventInfo.event.title}
        </div>
        <div className="text-[11px] flex items-center gap-1 text-navy-700">
          <MapPin className="h-3 w-3" />
          <span>{eventInfo.event.extendedProps.room}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-[1400px] px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Sidebar - Thông tin người dùng */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 relative">
                    <img
                      src={"https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqGyM6y-5i8VF5StASNK9eb-grLCrsf4284GyWELLRDTMA6gZgByzN0UpjRuA2VBhBVkTZX0Zk3ocVZNIVTjtfPyUESE7DhB5rrGlCuOawuT245WXyCnTm1LCt5C6K35YSbMFvxh7KjDr1SYT3ZQ1AVWwfKkg8HvFJ-ZYqbsV0m2VCQD3N-QnNsS0Rjr4UjFiMJuc_X2gcZQkHV0Eaft-_-fbNTtamIJ4nHZ4_fozqpd86IIH4Xk91Wb0EF1JUqe16Jy7DdtK5jlMwYfpteFacXHO1RgH2h4_A7_H18--YFag7gNUPoGMDbK8ik0kFQzUksbZjX2DV-MnmpPqV1Qiw5qgso256ggAzleULU7hdj5Dzn_RnciB6Nt03oKi6F_WqqmxikRY2FihheNI1bTbWBh-QutASNkKwOfh49p-QZsLtGzhFB8PHF6fwvowUxf8EZCTl3oKsZ30FwoQ7r4OarlgkpjeuWU21Y2m6hdlkwEdz/premium_photo-1671656349218-5218444643d8?errorImage=false"}
                      alt={user.name}
                      className="rounded-full w-24 h-24 object-cover mx-auto"
                    />
                    <div className="absolute bottom-0 right-1/8 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                  </div>
                  <CardTitle>{currentUser?.fullName}</CardTitle>
                  <CardDescription>{currentUser?.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Cấp độ hiện tại</span>
                        <Badge variant="outline" className="bg-navy-900 text-white">
                          {user.level}
                        </Badge>
                      </div>
                      <Progress value={user.progress} className="h-2" />
                      <div className="text-xs text-gray-500 text-right">{user.progress}% hoàn thành</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-navy-900">{user.completedCourses}</div>
                        <div className="text-xs text-gray-500">Khóa học đã hoàn thành</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-navy-900">{user.activeCourses}</div>
                        <div className="text-xs text-gray-500">Khóa học đang học</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>Tham gia: {user.joinDate}</span>
                  </div>
                  <Link to="/student/profile-edit">
                    <Button variant="ghost" size="sm">
                      Chỉnh sửa
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lịch học sắp tới</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {schedule.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="bg-navy-100 text-navy-900 rounded-md p-2 h-fit text-center min-w-[60px]">
                        <div className="text-xs">
                          {item.date.split("/")[1]}/{item.date.split("/")[0]}
                        </div>
                        <div className="font-bold">{item.date.split("/")[0]}</div>
                      </div>
                      <div>
                        <div className="font-medium">{item.course}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" /> {item.time}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" /> {item.teacher}
                        </div>
                        <div className="text-sm text-gray-500">Phòng: {item.room}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <ScheduleDialog scheduleData={schedule} />
                </CardFooter>
              </Card>
            </div>

            {/* Main content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Khóa học đang học</TabsTrigger>
                  <TabsTrigger value="completed">Khóa học đã hoàn thành</TabsTrigger>
                  <TabsTrigger value="recommended">Khóa học đề xuất</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="mt-6">
                  <div className="grid gap-6">
                    {activeCourses.map((course) => (
                      <Card key={course.id}>
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <img
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              className="h-full w-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            />
                          </div>
                          <div className="p-6 md:w-2/3">
                            <h3 className="text-xl font-bold">{course.title}</h3>
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                              <GraduationCap className="h-4 w-4" />
                              <span>Giảng viên: {course.teacher}</span>
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Tiến độ</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>

                            <div className="mt-4 p-3 bg-navy-50 rounded-md">
                              <div className="text-sm font-medium">Bài học tiếp theo:</div>
                              <div className="text-navy-900 font-medium mt-1">{course.nextLesson}</div>
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>{course.nextLessonDate}</span>
                              </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                              <Link to={`/courses/${course.id}/learn`} className="flex-1">
                                <Button className="w-full bg-navy-900 hover:bg-navy-800">Tiếp tục học</Button>
                              </Link>
                              <Link to={`/courses/${course.id}`} className="flex-1">
                                <Button variant="outline" className="w-full">
                                  Chi tiết khóa học
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="completed" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {completedCourses.map((course) => (
                      <Card key={course.id}>
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            {course.certificate && <Badge className="bg-green-600">Đã nhận chứng chỉ</Badge>}
                            <Badge variant="outline">{course.grade}</Badge>
                          </div>
                          <CardTitle className="mt-2">{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>Hoàn thành: {course.completionDate}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          {course.certificate && (
                            <Link to={`/certificates/${course.id}`} className="flex-1">
                              <Button variant="outline" className="w-full">
                                Xem chứng chỉ
                              </Button>
                            </Link>
                          )}
                          <Link to={`/courses/${course.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              Chi tiết khóa học
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="recommended" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        id: 1,
                        title: "JLPT N2 - Nâng cao trình độ",
                        image: "/placeholder.svg?height=150&width=250",
                        level: "Trung cấp nâng cao",
                        duration: "6 tháng",
                        description: "Khóa học giúp bạn nâng cao trình độ và chuẩn bị cho kỳ thi JLPT N2.",
                      },
                      {
                        id: 2,
                        title: "Tiếng Nhật thương mại",
                        image: "/placeholder.svg?height=150&width=250",
                        level: "Trung cấp",
                        duration: "3 tháng",
                        description: "Khóa học chuyên sâu về tiếng Nhật trong môi trường kinh doanh và công sở.",
                      },
                    ].map((course) => (
                      <Card key={course.id}>
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <Badge variant="outline" className="bg-navy-900 text-white hover:bg-navy-800">
                              {course.level}
                            </Badge>
                          </div>
                          <CardTitle className="mt-2">{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <BookOpen className="h-4 w-4" />
                            <span>Thời gian: {course.duration}</span>
                          </div>
                          <p className="text-sm text-gray-600">{course.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Link to={`/courses/${course.id}`} className="w-full">
                            <Button className="w-full bg-navy-900 hover:bg-navy-800">Xem chi tiết</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
