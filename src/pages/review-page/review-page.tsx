import { Link } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Star, Search } from "lucide-react"
import { useAppSelector } from '../../store/hooks'
import type { RootState } from '../../store/store'

export default function ReviewsPage() {

  const auth = useAppSelector((state: RootState) => state.auth);

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

  return (    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 w-full mt-5">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            <div className="text-center w-full max-w-3xl">
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
    </div>
  )
}
