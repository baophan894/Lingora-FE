import { Link } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Star, Search } from "lucide-react"

export default function ReviewsPage() {
  // Dữ liệu mẫu cho đánh giá
  const reviews = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "15/04/2024",
      course: "JLPT N5",
      content:
        "Tôi đã học tại Lingora được 6 tháng và đã đạt được chứng chỉ JLPT N4. Giáo viên rất nhiệt tình và phương pháp giảng dạy dễ hiểu. Tôi đặc biệt thích cách giáo viên Tanaka giải thích ngữ pháp, giúp tôi hiểu sâu hơn về cấu trúc câu tiếng Nhật.",
      recommend: true,
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "20/03/2024",
      course: "Giao tiếp tiếng Nhật",
      content:
        "Môi trường học tập tại Lingora rất thoải mái và chuyên nghiệp. Tôi đặc biệt thích các hoạt động giao lưu văn hóa Nhật Bản tại trung tâm. Sau khóa học, kỹ năng giao tiếp của tôi đã cải thiện đáng kể và tôi có thể tự tin nói chuyện với người Nhật.",
      recommend: true,
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "10/02/2024",
      course: "JLPT N3",
      content:
        "Sau 1 năm học tại Lingora, tôi đã có thể giao tiếp tiếng Nhật tự tin và tìm được công việc tại công ty Nhật. Cảm ơn Lingora rất nhiều! Đặc biệt là giáo viên Yamada đã hỗ trợ tôi rất nhiều trong quá trình học và chuẩn bị phỏng vấn.",
      recommend: true,
    },
    {
      id: 4,
      name: "Phạm Thị D",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      date: "05/01/2024",
      course: "Tiếng Nhật thương mại",
      content:
        "Khóa học Tiếng Nhật thương mại rất hữu ích cho công việc của tôi. Tôi học được nhiều từ vựng và cách giao tiếp trong môi trường kinh doanh. Tuy nhiên, tôi nghĩ khóa học có thể bổ sung thêm các tình huống thực tế hơn.",
      recommend: true,
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "20/12/2023",
      course: "JLPT N4",
      content:
        "Tôi đã thi đỗ JLPT N4 với số điểm cao nhờ khóa học tại Lingora. Giáo viên rất tận tâm và tài liệu học tập được chuẩn bị kỹ lưỡng. Tôi đặc biệt thích cách trung tâm tổ chức các kỳ thi thử để học viên làm quen với format của kỳ thi thật.",
      recommend: true,
    },
    {
      id: 6,
      name: "Trương Thị F",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4,
      date: "15/11/2023",
      course: "Văn hóa Nhật Bản",
      content:
        "Khóa học Văn hóa Nhật Bản rất thú vị và bổ ích. Tôi đã học được nhiều điều về lịch sử, phong tục và văn hóa Nhật Bản. Giáo viên Sato có nhiều kinh nghiệm và kiến thức sâu rộng về văn hóa Nhật Bản.",
      recommend: true,
    },
    {
      id: 7,
      name: "Ngô Văn G",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 3,
      date: "10/10/2023",
      course: "JLPT N2",
      content:
        "Khóa học JLPT N2 khá tốt, nhưng tôi nghĩ cần có thêm thời gian thực hành. Giáo viên nhiệt tình nhưng đôi khi tiến độ hơi nhanh đối với tôi. Tuy nhiên, tài liệu học tập rất đầy đủ và hữu ích.",
      recommend: true,
    },
    {
      id: 8,
      name: "Lý Thị H",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 5,
      date: "05/09/2023",
      course: "Giao tiếp tiếng Nhật",
      content:
        "Tôi rất hài lòng với khóa học Giao tiếp tiếng Nhật. Sau khóa học, tôi có thể tự tin giao tiếp với đồng nghiệp người Nhật. Giáo viên Tanaka rất nhiệt tình và luôn tạo không khí học tập vui vẻ.",
      recommend: true,
    },
  ]

  // Tính toán số lượng đánh giá theo số sao
  const ratingCounts = {
    5: reviews.filter((review) => review.rating === 5).length,
    4: reviews.filter((review) => review.rating === 4).length,
    3: reviews.filter((review) => review.rating === 3).length,
    2: reviews.filter((review) => review.rating === 2).length,
    1: reviews.filter((review) => review.rating === 1).length,
  }

  // Tính điểm đánh giá trung bình
  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">            <Link to="/" className="flex items-center gap-2">
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
            </Button>            <Link to="/profile">
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
              <h1 className="text-3xl font-bold tracking-tight text-navy-900">Đánh giá từ học viên</h1>
              <p className="text-gray-500 mt-2">
                Khám phá những trải nghiệm và đánh giá từ học viên đã và đang học tại Lingora
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Tổng quan đánh giá */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Tổng quan đánh giá</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-navy-900">{averageRating.toFixed(1)}</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(averageRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Dựa trên {reviews.length} đánh giá</div>
                  </div>

                  <div className="space-y-2">
                    {/* {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center min-w-[60px]">
                          <span>{rating}</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 ml-1" />
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-yellow-500 h-2.5 rounded-full"
                            style={{
                              width: `${(ratingCounts[rating] / reviews.length) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-500 min-w-[40px]">{ratingCounts[rating]}</div>
                      </div>
                    ))} */}
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Đánh giá theo khóa học</h3>
                    <div className="space-y-2">
                      {[
                        { name: "JLPT N5", count: 2 },
                        { name: "JLPT N4", count: 1 },
                        { name: "JLPT N3", count: 1 },
                        { name: "JLPT N2", count: 1 },
                        { name: "Giao tiếp tiếng Nhật", count: 2 },
                        { name: "Tiếng Nhật thương mại", count: 1 },
                      ].map((course) => (
                        <div key={course.name} className="flex justify-between items-center">
                          <span className="text-sm">{course.name}</span>
                          <Badge variant="outline">{course.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full bg-navy-900 hover:bg-navy-800">Viết đánh giá</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Danh sách đánh giá */}
            <div className="md:col-span-2">
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">Tất cả đánh giá</TabsTrigger>
                  <TabsTrigger value="5">5 sao</TabsTrigger>
                  <TabsTrigger value="4">4 sao</TabsTrigger>
                  <TabsTrigger value="3">3 sao</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <img
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              className="rounded-full w-12 h-12 object-cover"
                            />
                            <div>
                              <CardTitle className="text-base">{review.name}</CardTitle>
                              <CardDescription>
                                {review.course} • {review.date}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{review.content}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <div className="text-sm text-gray-500">
                            {review.recommend ? "Đề xuất trung tâm này" : "Không đề xuất trung tâm này"}
                          </div>
                          <Button variant="ghost" size="sm">
                            Hữu ích
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="5" className="mt-6">
                  <div className="space-y-6">
                    {reviews
                      .filter((review) => review.rating === 5)
                      .map((review) => (
                        <Card key={review.id}>
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <img
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.name}
                                className="rounded-full w-12 h-12 object-cover"
                              />
                              <div>
                                <CardTitle className="text-base">{review.name}</CardTitle>
                                <CardDescription>
                                  {review.course} • {review.date}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600">{review.content}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-4">
                            <div className="text-sm text-gray-500">
                              {review.recommend ? "Đề xuất trung tâm này" : "Không đề xuất trung tâm này"}
                            </div>
                            <Button variant="ghost" size="sm">
                              Hữu ích
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="4" className="mt-6">
                  <div className="space-y-6">
                    {reviews
                      .filter((review) => review.rating === 4)
                      .map((review) => (
                        <Card key={review.id}>
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <img
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.name}
                                className="rounded-full w-12 h-12 object-cover"
                              />
                              <div>
                                <CardTitle className="text-base">{review.name}</CardTitle>
                                <CardDescription>
                                  {review.course} • {review.date}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600">{review.content}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-4">
                            <div className="text-sm text-gray-500">
                              {review.recommend ? "Đề xuất trung tâm này" : "Không đề xuất trung tâm này"}
                            </div>
                            <Button variant="ghost" size="sm">
                              Hữu ích
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="3" className="mt-6">
                  <div className="space-y-6">
                    {reviews
                      .filter((review) => review.rating === 3)
                      .map((review) => (
                        <Card key={review.id}>
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <img
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.name}
                                className="rounded-full w-12 h-12 object-cover"
                              />
                              <div>
                                <CardTitle className="text-base">{review.name}</CardTitle>
                                <CardDescription>
                                  {review.course} • {review.date}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600">{review.content}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t pt-4">
                            <div className="text-sm text-gray-500">
                              {review.recommend ? "Đề xuất trung tâm này" : "Không đề xuất trung tâm này"}
                            </div>
                            <Button variant="ghost" size="sm">
                              Hữu ích
                            </Button>
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
                <li>                  <Link to="/courses/jlpt" className="text-gray-300 hover:text-white">
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
                <li>                  <Link to="/about" className="text-gray-300 hover:text-white">
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
