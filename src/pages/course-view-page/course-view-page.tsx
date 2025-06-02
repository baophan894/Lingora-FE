import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import CourseReviews from "./components/course-reviews";
import CourseInstructors from "./components/course-instructors";
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  Calendar,
  MapPin,
  Download,
  FileText,
  Video,
  Image,
  PlayCircle,
  UserCheck,
  GraduationCap,
  Target,
  CheckCircle
} from "lucide-react";

// Interfaces cho dữ liệu
interface LearningMaterial {
  id: number;
  title: string;
  type: 'document' | 'video' | 'image' | 'audio';
  size: string;
  downloadUrl?: string;
  description: string;
  lesson: number;
}

interface ClassSchedule {
  id: number;
  className: string;
  teacher: string;
  teacherAvatar: string;
  startDate: string;
  endDate: string;
  schedule: string;
  room: string;
  roomType: 'offline' | 'online';
  currentStudents: number;
  maxStudents: number;
  status: 'active' | 'completed' | 'upcoming';
  progress: number;
}

interface CourseDetails {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  level: string;
  category: string;
  duration: string;
  totalLessons: number;
  totalStudents: number;
  rating: number;
  price: number;
  originalPrice?: number;
  language: string;
  prerequisites: string[];
  learningOutcomes: string[];
  features: string[];
  syllabus: Array<{
    week: number;
    title: string;
    topics: string[];
  }>;
}

export default function CourseViewPage() {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - trong thực tế sẽ fetch từ API dựa trên courseId
  const courseData: CourseDetails = {
    id: parseInt(courseId || '1'),
    title: "JLPT N5 - Khóa học cho người mới bắt đầu",
    description: "Khóa học dành cho người mới bắt đầu học tiếng Nhật, giúp bạn nắm vững kiến thức cơ bản và chuẩn bị cho kỳ thi JLPT N5.",
    fullDescription: "Khóa học JLPT N5 được thiết kế đặc biệt cho những người mới bắt đầu học tiếng Nhật. Với phương pháp giảng dạy hiện đại và tương tác, khóa học sẽ giúp bạn xây dựng nền tảng vững chắc về ngữ pháp, từ vựng và kỹ năng giao tiếp cơ bản. Đội ngũ giáo viên giàu kinh nghiệm sẽ hướng dẫn bạn từng bước để đạt được mục tiêu của mình.",
    image: "/placeholder.svg?height=400&width=600",
    level: "Sơ cấp",
    category: "JLPT",
    duration: "3 tháng",
    totalLessons: 36,
    totalStudents: 1240,
    rating: 4.8,
    price: 2500000,
    originalPrice: 3000000,
    language: "Tiếng Nhật",
    prerequisites: [
      "Không yêu cầu kiến thức trước",
      "Có động lực học tập",
      "Thiết bị có kết nối internet"
    ],
    learningOutcomes: [
      "Nắm vững 800 từ vựng cơ bản",
      "Hiểu và sử dụng ngữ pháp N5",
      "Đọc hiểu các đoạn văn đơn giản",
      "Giao tiếp trong các tình huống cơ bản",
      "Sẵn sàng cho kỳ thi JLPT N5"
    ],
    features: [
      "Giáo viên bản ngữ Nhật Bản",
      "Lớp học nhỏ (tối đa 15 học viên)",
      "Tài liệu học tập đầy đủ",
      "Hỗ trợ học tập 24/7",
      "Thi thử định kỳ",
      "Chứng chỉ hoàn thành"
    ],
    syllabus: [
      {
        week: 1,
        title: "Làm quen với tiếng Nhật",
        topics: ["Bảng chữ cái Hiragana", "Cách chào hỏi cơ bản", "Số đếm 1-10"]
      },
      {
        week: 2,
        title: "Bảng chữ cái Katakana",
        topics: ["Katakana cơ bản", "Từ vựng về gia đình", "Ngữ pháp です/である"]
      },
      {
        week: 3,
        title: "Thời gian và ngày tháng",
        topics: ["Cách nói giờ", "Ngày trong tuần", "Tháng trong năm"]
      },
      {
        week: 4,
        title: "Mua sắm và ăn uống",
        topics: ["Từ vựng về thức ăn", "Đi mua sắm", "Hỏi giá cả"]
      }
    ]
  };

  const learningMaterials: LearningMaterial[] = [
    {
      id: 1,
      title: "Bài giảng tuần 1 - Hiragana cơ bản",
      type: "document",
      size: "2.5 MB",
      downloadUrl: "/materials/week1-hiragana.pdf",
      description: "Tài liệu hướng dẫn chi tiết về bảng chữ cái Hiragana",
      lesson: 1
    },
    {
      id: 2,
      title: "Video bài học - Cách phát âm Hiragana",
      type: "video",
      size: "120 MB",
      description: "Video hướng dẫn phát âm chính xác các ký tự Hiragana",
      lesson: 1
    },
    {
      id: 3,
      title: "Bài tập thực hành Hiragana",
      type: "document",
      size: "1.8 MB",
      downloadUrl: "/materials/hiragana-exercises.pdf",
      description: "Bài tập viết và nhận biết ký tự Hiragana",
      lesson: 1
    },
    {
      id: 4,
      title: "Audio nghe phát âm từ vựng tuần 2",
      type: "audio",
      size: "45 MB",
      description: "File audio phát âm từ vựng về gia đình",
      lesson: 2
    },
    {
      id: 5,
      title: "Slide bài giảng - Katakana",
      type: "document",
      size: "3.2 MB",
      downloadUrl: "/materials/week2-katakana.pdf",
      description: "Slide bài giảng về bảng chữ cái Katakana",
      lesson: 2
    }
  ];

  const activeClasses: ClassSchedule[] = [
    {
      id: 1,
      className: "JLPT N5 - Lớp A",
      teacher: "Tanaka Sensei",
      teacherAvatar: "/placeholder.svg?height=40&width=40",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      schedule: "Thứ 2, 4, 6 - 19:00-21:00",
      room: "Phòng 101",
      roomType: "offline",
      currentStudents: 12,
      maxStudents: 15,
      status: "active",
      progress: 65
    },
    {
      id: 2,
      className: "JLPT N5 - Lớp B (Online)",
      teacher: "Yamada Sensei",
      teacherAvatar: "/placeholder.svg?height=40&width=40",
      startDate: "2024-01-20",
      endDate: "2024-04-20",
      schedule: "Thứ 3, 5, 7 - 20:00-22:00",
      room: "Zoom Meeting",
      roomType: "online",
      currentStudents: 18,
      maxStudents: 20,
      status: "active",
      progress: 58
    },
    {
      id: 3,
      className: "JLPT N5 - Lớp C",
      teacher: "Suzuki Sensei",
      teacherAvatar: "/placeholder.svg?height=40&width=40",
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      schedule: "Thứ 2, 4 - 18:00-20:30",
      room: "Phòng 203",
      roomType: "offline",
      currentStudents: 8,
      maxStudents: 15,
      status: "upcoming",
      progress: 0
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-600" />;
      case 'audio':
        return <PlayCircle className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Đang học</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Đã hoàn thành</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Sắp khai giảng</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb và nút quay lại */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/courses-list">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Quay lại danh sách khóa học
              </Button>
            </Link>
            <div className="text-sm text-gray-500">
              <span>Khóa học</span> / <span className="text-gray-900">{courseData.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header khóa học */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-navy-900 text-white">
                  {courseData.level}
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {courseData.category}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{courseData.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{courseData.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{courseData.rating}</span>
                  <span>({courseData.totalStudents} học viên)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{courseData.totalLessons} bài học</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <img
                    src={courseData.image}
                    alt={courseData.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-navy-900">
                        {courseData.price.toLocaleString('vi-VN')}đ
                      </div>
                      {courseData.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {courseData.originalPrice.toLocaleString('vi-VN')}đ
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      Giảm {Math.round(((courseData.originalPrice! - courseData.price) / courseData.originalPrice!) * 100)}%
                    </Badge>
                  </div>
                  
                  <Button className="w-full bg-navy-900 hover:bg-navy-800" size="lg">
                    Đăng ký ngay
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500">
                    Hoặc <Link to="/contact" className="text-blue-600 hover:underline">liên hệ tư vấn</Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>        {/* Tabs nội dung */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="materials">Tài liệu học tập</TabsTrigger>
            <TabsTrigger value="classes">Lớp học</TabsTrigger>
            <TabsTrigger value="instructors">Giáo viên</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          </TabsList>

          {/* Tab Tổng quan */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Mô tả khóa học
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{courseData.fullDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Mục tiêu học tập
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {courseData.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Yêu cầu tham gia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {courseData.prerequisites.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Đặc điểm nổi bật</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {courseData.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Giáo trình */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Giáo trình chi tiết</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseData.syllabus.map((week) => (
                    <div key={week.week} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">
                        Tuần {week.week}: {week.title}
                      </h4>
                      <ul className="space-y-1">
                        {week.topics.map((topic, index) => (
                          <li key={index} className="text-gray-600 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Tài liệu học tập */}
          <TabsContent value="materials" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Tài liệu học tập
                </CardTitle>
                <p className="text-gray-600">Tải xuống các tài liệu học tập để học ngoại tuyến</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningMaterials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        {getFileIcon(material.type)}
                        <div>
                          <h4 className="font-medium">{material.title}</h4>
                          <p className="text-sm text-gray-600">{material.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>Bài {material.lesson}</span>
                            <span>{material.size}</span>
                          </div>
                        </div>
                      </div>
                      {material.downloadUrl && (
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Tải xuống
                        </Button>
                      )}
                      {material.type === 'video' && (
                        <Button variant="outline" size="sm" className="gap-2">
                          <PlayCircle className="h-4 w-4" />
                          Xem
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Lớp học */}
          <TabsContent value="classes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Lớp học đang hoạt động
                </CardTitle>
                <p className="text-gray-600">Danh sách các lớp học hiện có cho khóa học này</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeClasses.map((classItem) => (
                    <div key={classItem.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{classItem.className}</h3>
                            {getStatusBadge(classItem.status)}
                          </div>
                          <div className="flex items-center gap-3">
                            <img
                              src={classItem.teacherAvatar}
                              alt={classItem.teacher}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-gray-600">{classItem.teacher}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-1">Sĩ số</div>
                          <div className="font-medium">
                            {classItem.currentStudents}/{classItem.maxStudents} học viên
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>
                              {new Date(classItem.startDate).toLocaleDateString('vi-VN')} - {new Date(classItem.endDate).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{classItem.schedule}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{classItem.room}</span>
                            <Badge variant="outline" className={classItem.roomType === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                              {classItem.roomType === 'online' ? 'Online' : 'Offline'}
                            </Badge>
                          </div>
                          {classItem.status === 'active' && (
                            <div className="flex items-center gap-2 text-sm">
                              <UserCheck className="h-4 w-4 text-gray-500" />
                              <span>Tiến độ: {classItem.progress}%</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {classItem.status === 'active' && (
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${classItem.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {classItem.status === 'upcoming' && classItem.currentStudents < classItem.maxStudents && (
                          <Button className="bg-navy-900 hover:bg-navy-800">
                            Đăng ký lớp này
                          </Button>
                        )}
                        {classItem.status === 'active' && (
                          <Button variant="outline">
                            Xem chi tiết lớp học
                          </Button>
                        )}
                        <Button variant="outline">
                          Liên hệ giáo viên
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>          {/* Tab Đánh giá */}
          <TabsContent value="reviews" className="mt-6">
            <CourseReviews courseId={courseData.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
