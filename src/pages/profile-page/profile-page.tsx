import {
  AnimatedButton,
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
  ScaleIn,
} from "../../components/animation/motion.config";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  BookOpen,
  Clock,
  GraduationCap,
  User,
  Calendar,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import type { RootState } from "../../store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect } from "react";
import { syncFromLocalStorage } from "../../features/authentication/authSlice";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);

  const currentUser = auth.user;
  console.log(
    "Thông tin người dùng từ ProfilePage:",
    JSON.stringify(currentUser, null, 2)
  );

  // Check localStorage on component mount to ensure data consistency
  useEffect(() => {
    console.log("ProfilePage mounted, checking localStorage...");

    // Sync from localStorage when component mounts
    dispatch(syncFromLocalStorage());

    // Optional: Listen for storage changes (if user opens multiple tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === "token") {
        console.log("Storage changed, syncing...");
        dispatch(syncFromLocalStorage());
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  // Additional effect to handle page visibility change (when user comes back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Page became visible, syncing data...");
        dispatch(syncFromLocalStorage());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch]);

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
  };

  // Dữ liệu mẫu cho khóa học đang học
  const activeCourses = [
    {
      id: 1,
      title: "JLPT N3 - Nâng cao kỹ năng giao tiếp",
      image: "https://hoctiengnhat.hanu.vn/public/upload/Poster%20N3.jpg",
      progress: 45,
      nextLesson: "Ngữ pháp: Mẫu câu điều kiện",
      nextLessonDate: "20/05/2024",
      teacher: "Yamada Kenji",
    },
  ];

  // Dữ liệu mẫu cho khóa học đã hoàn thành
  const completedCourses = [
    {
      id: 1,
      title: "JLPT N5 - Khóa học cho người mới bắt đầu",
      image: "https://lh3.googleusercontent.com/proxy/mbt9usJyS_tgwLHyMbvSSkp08agHBXM2kZCHeo7Yp4Z_Y5UYLvvUzSbiCDL8dweWlPNNgfquz8iBWhTqwgOCopsFcxhXN4GeZWBF1qo1XlRVS42q6r5w242vK5K4OkQtJe_cUOJ-OrOVhwISUwDbU8m-vNoX6VuhqbWguMSHGg",
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
  ];

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
  ];

  function ScheduleDialog({ scheduleData }: { scheduleData: typeof schedule }) {
    // Chuyển đổi dữ liệu schedule thành events cho FullCalendar
    const events = scheduleData.map((item) => {
      // Chuyển "20/05/2024" => "2024-05-20"
      const [day, month, year] = item.date.split("/");
      const dateISO = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      const [startTime, endTime] = item.time.split(" - ");
      return {
        title: `${item.course} - ${item.teacher}`,
        start: `${dateISO}T${startTime}`,
        end: `${dateISO}T${endTime}`,
        extendedProps: { room: item.room },
      };
    });

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Xem lịch đầy đủ
          </Button>
        </DialogTrigger>
        <FadeIn>
          <DialogContent className="max-w-4xl max-h-[85vh] rounded-2xl bg-white p-5">
            <DialogHeader>
              <DialogTitle>Lịch học của bạn</DialogTitle>
              <DialogDescription>
                Lịch học được cập nhật theo thời gian thực
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 mb-4" style={{ height: "auto" }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                locale="vi"
                events={events}
                eventContent={renderEventContent}
                slotMinTime="07:00:00"
                slotMaxTime="22:00:00"
                allDaySlot={false}
                slotLabelFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }}
                eventTimeFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }}
                height="auto"
                buttonText={{
                  today: "Hôm nay",
                  month: "Tháng",
                  week: "Tuần",
                  day: "Ngày",
                }}
                eventClassNames="hover:brightness-95 cursor-pointer"
              />
            </div>
          </DialogContent>
        </FadeIn>
      </Dialog>
    );
  }

  // Temporarily commented out until FullCalendar packages are installed
  function renderEventContent(eventInfo: {
    event: { title: string; extendedProps: { room: string } };
  }) {
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
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-[1400px] px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Sidebar - Thông tin người dùng */}
            <FadeInStagger className="space-y-6">
              <FadeInStaggerItem>
                <Card className="bg-navy-50 shadow-lg border-1 border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <ScaleIn>
                      <div className="mx-auto mb-4 relative">
                        <Avatar className="w-24 h-24 mx-auto">
                          <AvatarImage
                            src={
                              currentUser?.avatarUrl
                                ? `${currentUser.avatarUrl}?t=${Date.now()}`
                                : "/placeholder.svg"
                            }
                            alt={currentUser?.fullName || "User avatar"}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-lg bg-navy-100 text-navy-900">
                            {currentUser?.fullName
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-2/5 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                      </div>
                      <CardTitle>{currentUser?.fullName}</CardTitle>
                      <CardDescription>{currentUser?.email}</CardDescription>
                    </ScaleIn>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-black font-medium">
                            Cấp độ hiện tại
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-navy-900 text-black hover:border-primary-800 hover:bg-primary-800 hover:text-white"
                          >
                            {user.level}
                          </Badge>
                        </div>
                        <Progress value={user.progress} className="h-2" />
                        <div className="text-xs text-black text-right">
                          {user.progress}% hoàn thành
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 ">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-navy-900">
                            {user.completedCourses}
                          </div>
                          <div className="text-xs text-black">
                            Khóa học đã hoàn thành
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-navy-900">
                            {user.activeCourses}
                          </div>
                          <div className="text-xs text-black">
                            Khóa học đang học
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4">
                    <div className="flex items-center gap-2 text-sm text-black">
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
              </FadeInStaggerItem>

              <FadeInStaggerItem>
                <Card className="bg-navy-50 shadow-lg border-1 border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">Lịch học sắp tới</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FadeInStagger>
                      {schedule.map((item) => (
                        <FadeInStaggerItem key={item.id}>
                          <div className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                            <div className="bg-navy-100 text-navy-900 rounded-md p-2 h-fit text-center min-w-[60px]">
                              <div className="text-xs">
                                {item.date.split("/")[1]}/
                                {item.date.split("/")[0]}
                              </div>
                              <div className="font-bold">
                                {item.date.split("/")[0]}
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">{item.course}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" /> {item.time}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <GraduationCap className="h-3 w-3" />{" "}
                                {item.teacher}
                              </div>
                              <div className="text-sm text-gray-500">
                                Phòng: {item.room}
                              </div>
                            </div>
                          </div>
                        </FadeInStaggerItem>
                      ))}
                    </FadeInStagger>
                  </CardContent>
                  <CardFooter>
                    <ScheduleDialog scheduleData={schedule} />
                  </CardFooter>
                </Card>
              </FadeInStaggerItem>
            </FadeInStagger>

            {/* Main content */}
            <div className="md:col-span-2">
              <FadeIn delay={0.2}>
                <Tabs defaultValue="active" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="active">Khóa học đang học</TabsTrigger>
                    <TabsTrigger value="completed">
                      Khóa học đã hoàn thành
                    </TabsTrigger>
                    <TabsTrigger value="recommended">
                      Khóa học đề xuất
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="active" className="mt-6">
                    <FadeInStagger>
                      <div className="grid gap-6">
                        {activeCourses.map((course) => (
                          <FadeInStaggerItem key={course.id}>
                            <Card className="bg-navy-50 shadow-lg border-1 border-gray-200 hover:shadow-xl transition-shadow duration-300">
                              <div className="md:flex">
                                <div className="md:w-1/3">
                                  <img
                                    src={course.image || "/placeholder.svg"}
                                    alt={course.title}
                                    className="h-full w-full object-cover rounded-t-md rounded-b-md ml-3"
                                  />
                                </div>
                                <div className="p-6 md:w-3/4 ml-3">
                                  <h3 className="text-xl font-bold">
                                    {course.title}
                                  </h3>
                                  <div className="text-start flex items-center gap-2 mt-2 text-sm text-gray-500">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>Giảng viên: {course.teacher}</span>
                                  </div>

                                  <div className="mt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Tiến độ</span>
                                      <span>{course.progress}%</span>
                                    </div>
                                    <Progress
                                      value={course.progress}
                                      className="h-2"
                                    />
                                  </div>

                                  <div className="mt-4 p-3 bg-navy-50 rounded-md">
                                    <div className="text-sm font-medium">
                                      Bài học tiếp theo:
                                    </div>
                                    <div className="text-navy-900 font-medium mt-1">
                                      {course.nextLesson}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                      <Calendar className="h-4 w-4" />
                                      <span>{course.nextLessonDate}</span>
                                    </div>
                                  </div>

                                  <div className="mt-4 flex gap-2">
                                    <Link
                                      to={`/courses/${course.id}/learn`}
                                      className="flex-1"
                                    >
                                        <Button className="w-full bg-primary-800 hover:bg-primary-600 hover:text-white text-gray-100">
                                        Tiếp tục học
                                      </Button>
                                    </Link>
                                    <Link
                                      to={`/courses/${course.id}`}
                                      className="flex-1"
                                    >
                                      <Button
                                        variant="outline"
                                        className="w-full"
                                      >
                                        Chi tiết khóa học
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </FadeInStaggerItem>
                        ))}
                      </div>
                    </FadeInStagger>
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
                              {course.certificate && (
                                <Badge className="bg-green-600">
                                  Đã nhận chứng chỉ
                                </Badge>
                              )}
                              <Badge variant="outline">{course.grade}</Badge>
                            </div>
                            <CardTitle className="mt-2">
                              {course.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span>Hoàn thành: {course.completionDate}</span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex gap-2">
                            {course.certificate && (
                              <Link
                                to={`/certificates/${course.id}`}
                                className="flex-1"
                              >
                                <Button variant="outline" className="w-full">
                                  Xem chứng chỉ
                                </Button>
                              </Link>
                            )}
                            <Link
                              to={`/courses/${course.id}`}
                              className="flex-1"
                            >
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
                          description:
                            "Khóa học giúp bạn nâng cao trình độ và chuẩn bị cho kỳ thi JLPT N2.",
                        },
                        {
                          id: 2,
                          title: "Tiếng Nhật thương mại",
                          image: "/placeholder.svg?height=150&width=250",
                          level: "Trung cấp",
                          duration: "3 tháng",
                          description:
                            "Khóa học chuyên sâu về tiếng Nhật trong môi trường kinh doanh và công sở.",
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
                              <Badge
                                variant="outline"
                                className="bg-navy-900 text-white hover:bg-navy-800"
                              >
                                {course.level}
                              </Badge>
                            </div>
                            <CardTitle className="mt-2">
                              {course.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <BookOpen className="h-4 w-4" />
                              <span>Thời gian: {course.duration}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {course.description}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Link
                              to={`/courses/${course.id}`}
                              className="w-full"
                            >
                              <Button className="w-full bg-navy-900 hover:bg-navy-800">
                                Xem chi tiết
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
