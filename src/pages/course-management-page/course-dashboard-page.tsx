import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Star,
  Calendar,
  FileText,
  Video,
  Download,
  Settings,
  BarChart3,
  TrendingUp,
  DollarSign,
  Clock
} from "lucide-react";

// Interfaces
interface Course {
  id: number;
  code: string;
  title: string;
  language: string;
  level: string;
  category: string;
  status: 'active' | 'inactive' | 'draft';
  price: number;
  duration: string;
  totalLessons: number;
  totalStudents: number;
  activeClasses: number;
  rating: number;
  createdDate: string;
  lastUpdated: string;
  image: string;
  description: string;
  instructor: string;
}

interface LearningMaterial {
  id: number;
  courseId: number;
  title: string;
  type: 'document' | 'video' | 'audio' | 'image';
  size: string;
  uploadDate: string;
  lesson: number;
}

interface ClassInfo {
  id: number;
  courseId: number;
  className: string;
  teacher: string;
  startDate: string;
  endDate: string;
  schedule: string;
  room: string;
  currentStudents: number;
  maxStudents: number;
  status: 'active' | 'completed' | 'upcoming';
  progress: number;
}

export default function CourseDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterLanguage, setFilterLanguage] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const courses: Course[] = [
    {
      id: 1,
      code: "JP-N5-001",
      title: "JLPT N5 - Khóa học cho người mới bắt đầu",
      language: "Tiếng Nhật",
      level: "Sơ cấp",
      category: "JLPT",
      status: "active",
      price: 2500000,
      duration: "3 tháng",
      totalLessons: 36,
      totalStudents: 1240,
      activeClasses: 3,
      rating: 4.8,
      createdDate: "2023-12-01",
      lastUpdated: "2024-01-15",
      image: "/placeholder.svg?height=100&width=150",
      description: "Khóa học dành cho người mới bắt đầu học tiếng Nhật",
      instructor: "Tanaka Sensei"
    },
    {
      id: 2,
      code: "JP-N4-002",
      title: "JLPT N4 - Nâng cao từ vựng và ngữ pháp",
      language: "Tiếng Nhật",
      level: "Sơ cấp nâng cao",
      category: "JLPT",
      status: "active",
      price: 3000000,
      duration: "4 tháng",
      totalLessons: 48,
      totalStudents: 980,
      activeClasses: 2,
      rating: 4.7,
      createdDate: "2023-11-15",
      lastUpdated: "2024-01-10",
      image: "/placeholder.svg?height=100&width=150",
      description: "Khóa học giúp nâng cao vốn từ vựng và ngữ pháp",
      instructor: "Yamada Sensei"
    },
    {
      id: 3,
      code: "EN-B1-003",
      title: "English Intermediate - Business Communication",
      language: "Tiếng Anh",
      level: "Trung cấp",
      category: "Business",
      status: "active",
      price: 2800000,
      duration: "3 tháng",
      totalLessons: 30,
      totalStudents: 650,
      activeClasses: 2,
      rating: 4.6,
      createdDate: "2023-10-20",
      lastUpdated: "2024-01-08",
      image: "/placeholder.svg?height=100&width=150",
      description: "Khóa học tiếng Anh giao tiếp thương mại",
      instructor: "John Smith"
    },
    {
      id: 4,
      code: "KR-A1-004",
      title: "Korean Beginner - Hangeul và giao tiếp cơ bản",
      language: "Tiếng Hàn",
      level: "Sơ cấp",
      category: "Basic",
      status: "draft",
      price: 2200000,
      duration: "2 tháng",
      totalLessons: 24,
      totalStudents: 0,
      activeClasses: 0,
      rating: 0,
      createdDate: "2024-01-10",
      lastUpdated: "2024-01-12",
      image: "/placeholder.svg?height=100&width=150",
      description: "Khóa học tiếng Hàn cơ bản cho người mới bắt đầu",
      instructor: "Park Min-jun"
    },
    {
      id: 5,
      code: "FR-A2-005",
      title: "French Elementary - Conversation Practice",
      language: "Tiếng Pháp",
      level: "Sơ cấp nâng cao",
      category: "Conversation",
      status: "inactive",
      price: 2600000,
      duration: "3 tháng",
      totalLessons: 32,
      totalStudents: 320,
      activeClasses: 0,
      rating: 4.4,
      createdDate: "2023-09-15",
      lastUpdated: "2023-12-20",
      image: "/placeholder.svg?height=100&width=150",
      description: "Khóa học tiếng Pháp với tập trung vào hội thoại",
      instructor: "Marie Dubois"
    }
  ];

  const learningMaterials: LearningMaterial[] = [
    { id: 1, courseId: 1, title: "Bài giảng tuần 1 - Hiragana", type: "document", size: "2.5 MB", uploadDate: "2023-12-05", lesson: 1 },
    { id: 2, courseId: 1, title: "Video phát âm Hiragana", type: "video", size: "120 MB", uploadDate: "2023-12-05", lesson: 1 },
    { id: 3, courseId: 1, title: "Bài tập thực hành", type: "document", size: "1.8 MB", uploadDate: "2023-12-10", lesson: 2 },
    { id: 4, courseId: 2, title: "Ngữ pháp N4 - Tập 1", type: "document", size: "3.2 MB", uploadDate: "2023-11-20", lesson: 1 },
    { id: 5, courseId: 2, title: "Audio từ vựng N4", type: "audio", size: "45 MB", uploadDate: "2023-11-25", lesson: 2 },
  ];

  const classInfo: ClassInfo[] = [
    {
      id: 1, courseId: 1, className: "JLPT N5 - Lớp A", teacher: "Tanaka Sensei",
      startDate: "2024-01-15", endDate: "2024-04-15", schedule: "Thứ 2,4,6 - 19:00-21:00",
      room: "Phòng 101", currentStudents: 12, maxStudents: 15, status: "active", progress: 65
    },
    {
      id: 2, courseId: 1, className: "JLPT N5 - Lớp B", teacher: "Yamada Sensei",
      startDate: "2024-01-20", endDate: "2024-04-20", schedule: "Thứ 3,5,7 - 20:00-22:00",
      room: "Online", currentStudents: 18, maxStudents: 20, status: "active", progress: 58
    },
    {
      id: 3, courseId: 1, className: "JLPT N5 - Lớp C", teacher: "Suzuki Sensei",
      startDate: "2024-02-01", endDate: "2024-05-01", schedule: "Thứ 2,4 - 18:00-20:30",
      room: "Phòng 203", currentStudents: 8, maxStudents: 15, status: "upcoming", progress: 0
    },
    {
      id: 4, courseId: 2, className: "JLPT N4 - Lớp A", teacher: "Yamada Sensei",
      startDate: "2024-01-10", endDate: "2024-05-10", schedule: "Thứ 2,4,6 - 19:30-21:30",
      room: "Phòng 102", currentStudents: 14, maxStudents: 15, status: "active", progress: 72
    },
    {
      id: 5, courseId: 3, className: "English Business - Lớp A", teacher: "John Smith",
      startDate: "2024-01-08", endDate: "2024-04-08", schedule: "Thứ 3,5 - 19:00-21:00",
      room: "Phòng 201", currentStudents: 10, maxStudents: 12, status: "active", progress: 45
    }
  ];

  // Filter functions
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    const matchesLanguage = filterLanguage === "all" || course.language === filterLanguage;
    
    return matchesSearch && matchesStatus && matchesLanguage;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Đang hoạt động</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Tạm dừng</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Bản nháp</Badge>;
      default:
        return null;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'video':
        return <Video className="h-4 w-4 text-red-600" />;
      case 'audio':
        return <FileText className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const CourseDetailDialog = ({ course }: { course: Course }) => {
    const courseMaterials = learningMaterials.filter(m => m.courseId === course.id);
    const courseClasses = classInfo.filter(c => c.courseId === course.id);

    return (
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Chi tiết khóa học: {course.title}
          </DialogTitle>
          <DialogDescription>
            Mã khóa học: {course.code}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="materials">Tài liệu ({courseMaterials.length})</TabsTrigger>
            <TabsTrigger value="classes">Lớp học ({courseClasses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="space-y-2">
                  <h3 className="font-semibold">Thông tin cơ bản</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Ngôn ngữ: <span className="font-medium">{course.language}</span></div>
                    <div>Cấp độ: <span className="font-medium">{course.level}</span></div>
                    <div>Danh mục: <span className="font-medium">{course.category}</span></div>
                    <div>Giá: <span className="font-medium">{course.price.toLocaleString('vi-VN')}đ</span></div>
                    <div>Thời lượng: <span className="font-medium">{course.duration}</span></div>
                    <div>Số bài học: <span className="font-medium">{course.totalLessons}</span></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Thống kê</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold">{course.totalStudents}</div>
                        <div className="text-sm text-gray-600">Tổng học viên</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <div className="text-2xl font-bold">{course.activeClasses}</div>
                        <div className="text-sm text-gray-600">Lớp đang học</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                        <div className="text-2xl font-bold">{course.rating}</div>
                        <div className="text-sm text-gray-600">Đánh giá</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <div className="text-2xl font-bold">{(course.totalStudents * course.price / 1000000).toFixed(1)}M</div>
                        <div className="text-sm text-gray-600">Doanh thu (VNĐ)</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Mô tả</h3>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Giáo viên phụ trách</h3>
                  <p className="text-gray-600 text-sm">{course.instructor}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Tài liệu học tập</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm tài liệu
                </Button>
              </div>
              
              <div className="space-y-3">
                {courseMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getFileIcon(material.type)}
                      <div>
                        <h4 className="font-medium">{material.title}</h4>
                        <div className="text-sm text-gray-600">
                          Bài {material.lesson} • {material.size} • {new Date(material.uploadDate).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="classes" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Lớp học đang hoạt động</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tạo lớp mới
                </Button>
              </div>
              
              <div className="space-y-3">
                {courseClasses.map((classItem) => (
                  <Card key={classItem.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{classItem.className}</h4>
                          <p className="text-sm text-gray-600">Giáo viên: {classItem.teacher}</p>
                        </div>
                        <Badge variant={classItem.status === 'active' ? 'default' : 'outline'}>
                          {classItem.status === 'active' ? 'Đang học' : 
                           classItem.status === 'upcoming' ? 'Sắp khai giảng' : 'Hoàn thành'}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>
                              {new Date(classItem.startDate).toLocaleDateString('vi-VN')} - {new Date(classItem.endDate).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{classItem.schedule}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div>Phòng học: {classItem.room}</div>
                          <div>Sĩ số: {classItem.currentStudents}/{classItem.maxStudents}</div>
                          {classItem.status === 'active' && (
                            <div>Tiến độ: {classItem.progress}%</div>
                          )}
                        </div>
                      </div>

                      {classItem.status === 'active' && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${classItem.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Quản lý khóa học</h1>
          <p className="text-gray-600">Quản lý tất cả khóa học trong trung tâm</p>
        </div>
        <Link to="/center/create-course">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Tạo khóa học mới
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng khóa học</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Đang hoạt động</p>
                <p className="text-2xl font-bold">{courses.filter(c => c.status === 'active').length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng học viên</p>
                <p className="text-2xl font-bold">{courses.reduce((sum, c) => sum + c.totalStudents, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Doanh thu (VNĐ)</p>
                <p className="text-2xl font-bold">
                  {(courses.reduce((sum, c) => sum + (c.totalStudents * c.price), 0) / 1000000000).toFixed(1)}B
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm khóa học, mã khóa học, giáo viên..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Tạm dừng</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Ngôn ngữ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Tiếng Nhật">Tiếng Nhật</SelectItem>
                  <SelectItem value="Tiếng Anh">Tiếng Anh</SelectItem>
                  <SelectItem value="Tiếng Hàn">Tiếng Hàn</SelectItem>
                  <SelectItem value="Tiếng Pháp">Tiếng Pháp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khóa học ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khóa học</TableHead>
                <TableHead>Ngôn ngữ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Học viên</TableHead>
                <TableHead>Lớp học</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Cập nhật</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-gray-600">{course.code}</div>
                        <div className="text-sm text-gray-500">{course.instructor}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.language}</Badge>
                    <div className="text-sm text-gray-600 mt-1">{course.level}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{course.totalStudents}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>{course.activeClasses}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{course.price.toLocaleString('vi-VN')}đ</TableCell>
                  <TableCell>{new Date(course.lastUpdated).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <CourseDetailDialog course={course} />
                        </Dialog>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Cài đặt
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Thống kê
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
