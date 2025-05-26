import { Link } from "react-router-dom";
import {
  Search,
  ChevronRight,
  Star,
  BookOpen,
  Users,
  GraduationCap,
  Divide,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import LottieComponent from "../../components/lottie/lottie-component";

import { 
  FadeIn, 
  ScrollReveal, 
  FadeInStagger, 
  FadeInStaggerItem, 
  SlideIn,
  AnimatedCounter,
  AnimatedButton,
  HoverScale,
  ScaleIn,
} from "../../components/animation/motion.config";

export default function LandingPage() {
  // Dữ liệu mẫu cho giáo viên
  const featuredTeachers = [
    {
      id: 1,
      name: "Tanaka Yuki",
      image:
        "https://th.bing.com/th/id/OIP.2VTLRE3iJ-7rVTNe03duqwHaJ4?rs=1&pid=ImgDetMain",
      role: "Giảng viên JLPT N1-N2",
      experience: "8 năm kinh nghiệm",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Phạm Trọng Hùng",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/028/678/217/small_2x/female-teacher-asia-generate-ai-photo.jpg",
      role: "Giảng viên Giao tiếp N2",
      experience: "2 năm kinh nghiệm",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Sato Haruka",
      image:
        "https://i.pinimg.com/736x/fe/15/ba/fe15bafe7006c14f7f879e28a5abbf54.jpg",
      role: "Giảng viên Văn hóa & Kinh doanh",
      experience: "7 năm kinh nghiệm",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Sato Haruka",
      image:
        "https://i.pinimg.com/736x/fe/15/ba/fe15bafe7006c14f7f879e28a5abbf54.jpg",
      role: "Giảng viên Văn hóa & Kinh doanh",
      experience: "7 năm kinh nghiệm",
      rating: 4.7,
    },
  ];

  // Dữ liệu mẫu cho khóa học
  const featuredCourses = [
    {
      id: 1,
      title: "JLPT N5 - Khóa học cho người mới bắt đầu",
      image: "https://koishi.edu.vn/image/posts/pc/20210614-0822133.jpg",
      level: "Sơ cấp",
      duration: "3 tháng",
      students: 1240,
      rating: 4.8,
    },
    {
      id: 2,
      title: "JLPT N3 - Nâng cao kỹ năng giao tiếp",
      image: "https://koishi.edu.vn/image/posts/pc/20210507-1137360.jpg",
      level: "Trung cấp",
      duration: "4 tháng",
      students: 890,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Tiếng Nhật thương mại - Doanh nghiệp",
      image:
        "https://w.ladicdn.com/62553ac7763474001464a62a/screenshot-20221227063401-pg0dr.png",
      level: "Cao cấp",
      duration: "2 tháng",
      students: 560,
      rating: 4.7,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 w-full">
        {" "}
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-800 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center justify-between">              <SlideIn direction="left" className="space-y-4">
                <h1 className="text-start text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Khám phá ngoại ngữ cùng Lingora
                </h1>
                <p className="text-start max-w-[600px] text-gray-300 md:text-xl">
                  Trung tâm ngoại ngữ hàng đầu với đội ngũ giáo viên chất lượng
                  cao và phương pháp giảng dạy hiện đại.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/courses">
                    <AnimatedButton>
                      <Button className="bg-white text-primary-900 hover:bg-black hover:text-white">
                      Khám phá khóa học
                    </Button>
                    </AnimatedButton>
                  </Link>
                  <Link to="/contact">
                    <AnimatedButton>
                      <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Liên hệ tư vấn
                    </Button>
                    </AnimatedButton>
                  </Link>
                </div>
              </SlideIn>
              <div className="w-80 h-70 ml-50">
                <LottieComponent/>
              </div>
            </div>
          </div>
        </section>
        {/* Thống kê */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">            <FadeInStagger>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <FadeInStaggerItem className="space-y-2">
                  <h3 className="text-3xl font-bold text-navy-900">
                    <AnimatedCounter value={10} />+
                  </h3>
                  <p className="text-gray-500">Năm kinh nghiệm</p>
                </FadeInStaggerItem>
                <FadeInStaggerItem className="space-y-2">
                  <h3 className="text-3xl font-bold text-navy-900">
                    <AnimatedCounter value={50} />+
                  </h3>
                  <p className="text-gray-500">Giáo viên chuyên môn cao</p>
                </FadeInStaggerItem>
                <FadeInStaggerItem className="space-y-2">
                  <h3 className="text-3xl font-bold text-navy-900">
                    <AnimatedCounter value={100} />+
                  </h3>
                  <p className="text-gray-500">Khóa học đa dạng</p>
                </FadeInStaggerItem>
                <FadeInStaggerItem className="space-y-2">
                  <h3 className="text-3xl font-bold text-navy-900">
                    <AnimatedCounter value={10000} />+
                  </h3>
                  <p className="text-gray-500">Học viên thành công</p>
                </FadeInStaggerItem>
              </div>
            </FadeInStagger>
          </div>
        </section>
        {/* Giáo viên nổi bật */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary-800 text-start">
                  Giáo viên hàng đầu
                </h2>
                <p className="text-gray-500 mt-2">
                  Đội ngũ giáo viên giàu kinh nghiệm và chuyên môn cao trong
                  giảng dạy tiếng Nhật
                </p>
              </div>
              <Link to="/teachers">
                <AnimatedButton>
                  <Button variant="outline" className="flex items-center gap-1">
                  Xem tất cả <ChevronRight className="h-4 w-4" />
                </Button>
                </AnimatedButton>
              </Link>
            </div>{" "}
            <FadeIn>
              <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4 bg-white">
                {featuredTeachers.map((teacher) => (
                  <CarouselItem
                    key={teacher.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 m-3">
                      <div className="aspect-[4/5] w-full overflow-hidden">
                        <img
                          src={teacher.image || "/placeholder.svg"}
                          alt={teacher.name}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-start">
                          {teacher.name}
                        </CardTitle>
                        <CardDescription className="text-start">
                          {teacher.role}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <GraduationCap className="h-4 w-4" />
                          <span>{teacher.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(teacher.rating)
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            {teacher.rating}/5
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/teachers/${teacher.id}`} className="w-full">
                          <Button
                            variant="outline"
                            className="w-full bg-primary-800 text-white hover:bg-primary-700"
                          >
                            Xem chi tiết
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
            </FadeIn>
          </div>
        </section>
        {/* Khóa học nổi bật */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-primary-800 text-start text-3xl font-bold tracking-tight text-navy-900">
                  Khóa học phổ biến
                </h2>
                <p className="text-gray-500 mt-2">
                  Các khóa học tiếng Nhật được yêu thích và đánh giá cao từ học
                  viên
                </p>
              </div>
              <Link to="/courses">
                <AnimatedButton>
                  <Button variant="outline" className="flex items-center gap-1">
                  Xem tất cả <ChevronRight className="h-4 w-4" />
                </Button>
                </AnimatedButton>
              </Link>
            </div>              <ScrollReveal>
              <FadeInStaggerItem>
                <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">                {featuredCourses.map((course) => (
                    <CarouselItem
                      key={course.id}
                      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                    <Card className="overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 m-3">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          {" "}
                          <Badge
                            variant="outline"
                            className="text-start bg-primary text-white hover:bg-primary/90"
                          >
                            {course.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-start text-sm font-medium">
                              {course.rating}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="text-start mt-2">
                          {course.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center gap-4 text-sm text-gray-500">
                          <div className="flex justify-between items-center gap-1">
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
                        {" "}
                        <Link to={`/courses/${course.id}`} className="w-full">
                          <Button
                            variant="outline"
                            className="w-full bg-primary-800 text-white hover:bg-primary-700"
                          >
                            Xem chi tiết
                          </Button>
                        </Link>{" "}
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
              </FadeInStaggerItem>
            </ScrollReveal>
          </div>
        </section>
        {/* Đánh giá từ học viên */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-primary-800 text-3xl font-bold tracking-tight text-navy-900">
                Học viên nói gì về Lingora?
              </h2>
              <p className="text-gray-500 mt-2">
                Hàng ngàn học viên đã thành công trong việc học tiếng Nhật cùng
                với Lingora
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Nguyễn Văn A",
                  avatar: "/placeholder.svg?height=100&width=100",
                  content:
                    "Tôi đã học tại Lingora được 6 tháng và đã đạt được chứng chỉ JLPT N4. Giáo viên rất nhiệt tình và phương pháp giảng dạy dễ hiểu.",
                  course: "JLPT N5-N4",
                },
                {
                  name: "Trần Thị B",
                  avatar: "/placeholder.svg?height=100&width=100",
                  content:
                    "Môi trường học tập tại Lingora rất thoải mái và chuyên nghiệp. Tôi đặc biệt thích các hoạt động giao lưu văn hóa Nhật Bản tại trung tâm.",
                  course: "Giao tiếp tiếng Nhật",
                },
                {
                  name: "Lê Văn C",
                  avatar: "/placeholder.svg?height=100&width=100",
                  content:
                    "Sau 1 năm học tại Lingora, tôi đã có thể giao tiếp tiếng Nhật tự tin và tìm được công việc tại công ty Nhật. Cảm ơn Lingora rất nhiều!",
                  course: "JLPT N3",
                },
              ].map((review, index) => (
                <SlideIn>
                  <Card
                  key={index}
                  className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.name}
                        className="rounded-full w-12 h-12 object-cover"
                      />
                      <div>
                        <CardTitle className="text-base">
                          {review.name}
                        </CardTitle>
                        <CardDescription>{review.course}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">"{review.content}"</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                  </CardFooter>
                </Card>
                </SlideIn>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/reviews">
                <AnimatedButton>
                  <Button
                  variant="outline"
                  className="flex items-center gap-1 mx-auto"
                >
                  Xem tất cả đánh giá <ChevronRight className="h-4 w-4" />
                </Button>
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </section>{" "}
        {/* CTA */}
        <section className="w-full py-12 md:py-16 lg:py-20 bg-primary-800 text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-start text-3xl font-bold tracking-tight">
                  Bắt đầu hành trình học tiếng Nhật ngay hôm nay
                </h2>
                <p className="text-gray-300 text-start">
                  Đăng ký buổi học thử miễn phí và trải nghiệm phương pháp giảng
                  dạy hiệu quả tại Lingora
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <Link to="/register">
                  <Button className="bg-white text-primary-800 hover:bg-gray-100">
                    Đăng ký học thử
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Xem khóa học
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
