import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { BookOpen, Users, Star, Search, Filter } from "lucide-react"
import { Link } from "react-router-dom"

export default function CoursesPage() {
  // Dữ liệu mẫu cho các khóa học
  const courses = [
    {
      id: 1,
      title: "JLPT N5 - Khóa học cho người mới bắt đầu",
      image: "/placeholder.svg?height=200&width=350",
      level: "Sơ cấp",
      category: "jlpt",
      duration: "3 tháng",
      lessons: 36,
      students: 1240,
      rating: 4.8,
      description:
        "Khóa học dành cho người mới bắt đầu học tiếng Nhật, giúp bạn nắm vững kiến thức cơ bản và chuẩn bị cho kỳ thi JLPT N5.",
    },
    {
      id: 2,
      title: "JLPT N4 - Nâng cao từ vựng và ngữ pháp",
      image: "/placeholder.svg?height=200&width=350",
      level: "Sơ cấp nâng cao",
      category: "jlpt",
      duration: "4 tháng",
      lessons: 48,
      students: 980,
      rating: 4.7,
      description:
        "Khóa học giúp bạn nâng cao vốn từ vựng và ngữ pháp tiếng Nhật, chuẩn bị cho kỳ thi JLPT N4 với phương pháp học hiệu quả.",
    },
    {
      id: 3,
      title: "JLPT N3 - Nâng cao kỹ năng giao tiếp",
      image: "/placeholder.svg?height=200&width=350",
      level: "Trung cấp",
      category: "jlpt",
      duration: "4 tháng",
      lessons: 48,
      students: 890,
      rating: 4.9,
      description:
        "Khóa học giúp bạn nâng cao kỹ năng giao tiếp tiếng Nhật và chuẩn bị cho kỳ thi JLPT N3 với nhiều bài tập thực hành.",
    },
    {
      id: 4,
      title: "Giao tiếp tiếng Nhật cơ bản",
      image: "/placeholder.svg?height=200&width=350",
      level: "Sơ cấp",
      category: "communication",
      duration: "2 tháng",
      lessons: 24,
      students: 750,
      rating: 4.6,
      description:
        "Khóa học tập trung vào kỹ năng giao tiếp tiếng Nhật cơ bản, giúp bạn tự tin trong các tình huống giao tiếp hàng ngày.",
    },
    {
      id: 5,
      title: "Tiếng Nhật thương mại - Dành cho doanh nghiệp",
      image: "/placeholder.svg?height=200&width=350",
      level: "Cao cấp",
      category: "business",
      duration: "2 tháng",
      lessons: 24,
      students: 560,
      rating: 4.7,
      description:
        "Khóa học chuyên sâu về tiếng Nhật trong môi trường kinh doanh, giúp bạn tự tin giao tiếp trong công việc với đối tác Nhật Bản.",
    },
    {
      id: 6,
      title: "Văn hóa Nhật Bản qua ngôn ngữ",
      image: "/placeholder.svg?height=200&width=350",
      level: "Trung cấp",
      category: "culture",
      duration: "2 tháng",
      lessons: 16,
      students: 420,
      rating: 4.8,
      description:
        "Khóa học giúp bạn hiểu sâu về văn hóa Nhật Bản thông qua ngôn ngữ, phong tục và các giá trị truyền thống.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-navy-900">Lingora</span>
              <span className="text-sm bg-navy-900 text-white px-2 py-1 rounded-md">日本語</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-navy-900 hover:text-navy-700">
              Trang chủ
            </Link>
            <Link to="/courses" className="text-sm font-medium text-navy-900 hover:text-navy-700">
              Khóa học
            </Link>
            <Link to="/teachers" className="text-sm font-medium text-navy-900 hover:text-navy-700">
              Giáo viên
            </Link>
            <Link to="/reviews" className="text-sm font-medium text-navy-900 hover:text-navy-700">
              Đánh giá
            </Link>
            <Link to="/about" className="text-sm font-medium text-navy-900 hover:text-navy-700">
              Về chúng tôi
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Tìm kiếm</span>
            </Button>
            <Link to="/profile">
              <Button variant="outline" className="hidden md:flex">
                Tài khoản
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-navy-900 hover:bg-navy-800">Đăng ký học thử</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-navy-900">Khóa học tiếng Nhật</h1>
              <p className="text-gray-500 mt-2">
                Khám phá các khóa học tiếng Nhật đa dạng từ sơ cấp đến cao cấp tại Lingora
              </p>
            </div>
          </div>

          {/* Tìm kiếm và lọc */}
          <div className="bg-white p-4 rounded-lg border mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Tìm kiếm khóa học..." className="pl-10" />
              </div>
              <div className="flex gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cấp độ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả cấp độ</SelectItem>
                    <SelectItem value="beginner">Sơ cấp</SelectItem>
                    <SelectItem value="intermediate">Trung cấp</SelectItem>
                    <SelectItem value="advanced">Cao cấp</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Thời lượng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả thời lượng</SelectItem>
                    <SelectItem value="short">Dưới 2 tháng</SelectItem>
                    <SelectItem value="medium">2-4 tháng</SelectItem>
                    <SelectItem value="long">Trên 4 tháng</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" /> Lọc
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs phân loại */}
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="w-full flex justify-start overflow-auto">
              <TabsTrigger value="all">Tất cả khóa học</TabsTrigger>
              <TabsTrigger value="jlpt">Luyện thi JLPT</TabsTrigger>
              <TabsTrigger value="communication">Giao tiếp</TabsTrigger>
              <TabsTrigger value="business">Tiếng Nhật thương mại</TabsTrigger>
              <TabsTrigger value="culture">Văn hóa Nhật Bản</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="bg-navy-900 text-white hover:bg-navy-800">
                          {course.level}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="mt-2 line-clamp-2">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.students} học viên</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link to={`/courses/${course.id}`} className="w-full">
                        <Button className="w-full bg-navy-900 hover:bg-navy-800">Xem chi tiết</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="jlpt" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((course) => course.category === "jlpt")
                  .map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="bg-navy-900 text-white hover:bg-navy-800">
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2 line-clamp-2">{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students} học viên</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Link to={`/courses/${course.id}`} className="w-full">
                          <Button className="w-full bg-navy-900 hover:bg-navy-800">Xem chi tiết</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Tương tự cho các tab khác */}
            <TabsContent value="communication" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((course) => course.category === "communication")
                  .map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      {/* Nội dung tương tự như trên */}
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="bg-navy-900 text-white hover:bg-navy-800">
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2 line-clamp-2">{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students} học viên</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Link to={`/courses/${course.id}`} className="w-full">
                          <Button className="w-full bg-navy-900 hover:bg-navy-800">Xem chi tiết</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="business" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((course) => course.category === "business")
                  .map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      {/* Nội dung tương tự như trên */}
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="bg-navy-900 text-white hover:bg-navy-800">
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2 line-clamp-2">{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students} học viên</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Link to={`/courses/${course.id}`} className="w-full">
                          <Button className="w-full bg-navy-900 hover:bg-navy-800">Xem chi tiết</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="culture" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter((course) => course.category === "culture")
                  .map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      {/* Nội dung tương tự như trên */}
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="bg-navy-900 text-white hover:bg-navy-800">
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2 line-clamp-2">{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students} học viên</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
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
      </main>

      <footer className="w-full py-6 bg-navy-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">Lingora</span>
                <span className="text-sm bg-white text-navy-900 px-2 py-1 rounded-md">日本語</span>
              </div>
              <p className="text-gray-300">
                Trung tâm ngoại ngữ tiếng Nhật hàng đầu với phương pháp giảng dạy hiện đại và hiệu quả.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Khóa học</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/courses/jlpt" className="text-gray-300 hover:text-white">
                    Luyện thi JLPT
                  </Link>
                </li>
                <li>
                  <Link to="/courses/communication" className="text-gray-300 hover:text-white">
                    Giao tiếp
                  </Link>
                </li>
                <li>
                  <Link to="/courses/business" className="text-gray-300 hover:text-white">
                    Tiếng Nhật thương mại
                  </Link>
                </li>
                <li>
                  <Link to="/courses/culture" className="text-gray-300 hover:text-white">
                    Văn hóa Nhật Bản
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Liên kết</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link to="/teachers" className="text-gray-300 hover:text-white">
                    Giáo viên
                  </Link>
                </li>
                <li>
                  <Link to="/reviews" className="text-gray-300 hover:text-white">
                    Đánh giá
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Liên hệ</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-gray-300">0123 456 789</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span className="text-gray-300">info@lingora.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-gray-300">123 Đường ABC, Quận 1, TP.HCM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
            <p>© {new Date().getFullYear()} Lingora. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
