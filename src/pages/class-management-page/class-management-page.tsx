import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { UserPlus, Search, GraduationCap, Users, BookOpen, Plus } from "lucide-react";
import { CustomSuccessToast, CustomFailedToast, CustomToast } from "../../components/toast/notificiation-toast";
import AddClassModal from "./add-class-modal";

// Dữ liệu mẫu cho lớp học ngoại ngữ
const classesData = [
  {
    id: "LOP001",
    name: "Tiếng Anh Cơ Bản A1",
    subject: "Tiếng Anh",
    teacher: "Ms. Sarah Johnson",
    studentCount: 18,
    maxStudents: 20,
    progress: 65,
    status: "active",
    schedule: "Thứ 2, 4, 6 - 19:00-21:00",
  },
  {
    id: "LOP002", 
    name: "Tiếng Nhật Sơ Cấp N5",
    subject: "Tiếng Nhật",
    teacher: "Tanaka Hiroshi",
    studentCount: 15,
    maxStudents: 18,
    progress: 45,
    status: "active",
    schedule: "Thứ 3, 5, 7 - 18:00-20:00",
  },
  {
    id: "LOP003",
    name: "Tiếng Hàn Trung Cấp", 
    subject: "Tiếng Hàn",
    teacher: "Kim Min Joo",
    studentCount: 12,
    maxStudents: 15,
    progress: 80,
    status: "active",
    schedule: "Thứ 2, 4 - 17:30-19:30",
  },
  {
    id: "LOP004",
    name: "Tiếng Trung HSK3",
    subject: "Tiếng Trung", 
    teacher: "Wang Li Hua",
    studentCount: 20,
    maxStudents: 25,
    progress: 30,
    status: "completed",
    schedule: "Thứ 3, 6 - 19:30-21:30",
  },
  {
    id: "LOP005",
    name: "Tiếng Pháp DELF A2",
    subject: "Tiếng Pháp",
    teacher: "Marie Dubois",
    studentCount: 10,
    maxStudents: 12,
    progress: 55,
    status: "active",
    schedule: "Thứ 5, 7 - 18:30-20:30",
  },
];

// Dữ liệu mẫu cho học sinh
const studentsData = [
  {
    id: "HS001",
    name: "Nguyễn Văn An",
    email: "an.nguyen@student.edu.vn",
    phone: "0123456789",
    grade: "10",
    status: "active",
  },
  {
    id: "HS002", 
    name: "Trần Thị Bình",
    email: "binh.tran@student.edu.vn",
    phone: "0987654321",
    grade: "11",
    status: "active",
  },
  {
    id: "HS003",
    name: "Lê Văn Cường",
    email: "cuong.le@student.edu.vn", 
    phone: "0456789123",
    grade: "12",
    status: "active",
  },
  {
    id: "HS004",
    name: "Phạm Thị Dung",
    email: "dung.pham@student.edu.vn",
    phone: "0789123456", 
    grade: "10",
    status: "active",
  },
  {
    id: "HS005",
    name: "Hoàng Văn Em",
    email: "em.hoang@student.edu.vn",
    phone: "0321654987",
    grade: "11", 
    status: "active",
  },
  {
    id: "HS006",
    name: "Võ Thị Phương",
    email: "phuong.vo@student.edu.vn",
    phone: "0654987321",
    grade: "12",
    status: "active",
  },
];

// Danh sách ngôn ngữ ngoại ngữ có sẵn  
const availableSubjects = [
  "Tiếng Anh",
  "Tiếng Nhật", 
  "Tiếng Hàn",
  "Tiếng Trung",
  "Tiếng Pháp",
  "Tiếng Đức",
  "Tiếng Tây Ban Nha",
  "Tiếng Nga",
  "Tiếng Ý",
  "Tiếng Thái",
  "Tiếng Ả Rập",
  "Tiếng Bồ Đào Nha"
];

export default function ClassManagementPage() {
  const [filter, setFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [showCustomSubject, setShowCustomSubject] = useState(false);
  const [classes, setClasses] = useState(classesData);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<(typeof classesData)[0] | null>(null);  const [studentFilter, setStudentFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  const showAddStudentDialog = (classItem: (typeof classesData)[0]) => {
    setSelectedClass(classItem);
    setSelectedStudents([]);
    setStudentFilter("");
    setGradeFilter("");
    setShowAddStudentModal(true);
  };

  const handleStudentSelection = (studentId: string, checked: boolean) => {
    setSelectedStudents(prev =>
      checked
        ? [...prev, studentId]
        : prev.filter(id => id !== studentId)
    );
  };

  const handleAddStudentsToClass = () => {
    if (selectedStudents.length === 0) {
      CustomFailedToast("Vui lòng chọn ít nhất một học sinh!");
      return;
    }

    // Cập nhật số lượng học sinh trong lớp
    if (selectedClass) {
      setClasses(prev =>
        prev.map(c =>
          c.id === selectedClass.id
            ? { ...c, studentCount: c.studentCount + selectedStudents.length }
            : c
        )
      );
    }

    CustomSuccessToast(`Đã thêm ${selectedStudents.length} học sinh vào lớp ${selectedClass?.name}!`);
    setShowAddStudentModal(false);
    setSelectedClass(null);    setSelectedStudents([]);
  };
  const handleAddClass = (newClass: typeof classesData[0]) => {
    setClasses(prev => [...prev, newClass]);
    CustomSuccessToast(`Đã tạo lớp ${newClass.name} thành công!`);
  };

  const handleSubjectChange = (value: string) => {
    if (value === "custom") {
      setShowCustomSubject(true);
      setSubjectFilter("");
    } else {
      setShowCustomSubject(false);
      setSubjectFilter(value);
      setCustomSubject("");
    }
  };
  const filteredClasses = classes.filter(
    (c) => {
      const matchesSearch = c.name.toLowerCase().includes(filter.toLowerCase()) ||
        c.id.toLowerCase().includes(filter.toLowerCase()) ||
        c.teacher.toLowerCase().includes(filter.toLowerCase());
      
      const currentSubjectFilter = showCustomSubject ? customSubject : subjectFilter;
      const matchesSubject = !currentSubjectFilter || currentSubjectFilter === "all" 
        ? true 
        : c.subject.toLowerCase().includes(currentSubjectFilter.toLowerCase());
      
      return matchesSearch && matchesSubject;
    }
  );

  const filteredStudents = studentsData.filter(
    (s) =>
      (s.name.toLowerCase().includes(studentFilter.toLowerCase()) ||
        s.id.toLowerCase().includes(studentFilter.toLowerCase()) ||
        s.email.toLowerCase().includes(studentFilter.toLowerCase())) &&
      (gradeFilter && gradeFilter !== "all"
        ? s.grade === gradeFilter
        : true) &&
      s.status === "active"
  );

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <GraduationCap className="w-3 h-3 mr-1" />
            Đang học
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <BookOpen className="w-3 h-3 mr-1" />
            Hoàn thành
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            Không xác định
          </Badge>
        );
    }
  };

  return (
    <div className="p-8 w-full">
      <CustomToast />

      <h1 className="text-2xl font-bold mb-6 text-primary-800">
        Quản lý lớp học
      </h1>     
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Tìm kiếm theo tên lớp, mã lớp hoặc giáo viên..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="md:w-1/2"
        />
        
        {/* Môn học - có thể chọn hoặc nhập */}
        <div className="md:w-48">
          {!showCustomSubject ? (
            <Select value={subjectFilter} onValueChange={handleSubjectChange}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Lọc theo môn học" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Tất cả môn học</SelectItem>
                {availableSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
                <SelectItem value="custom">
                  <span className="text-blue-600 font-medium">+ Nhập môn học khác</span>
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Nhập môn học..."
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="bg-white"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowCustomSubject(false);
                  setCustomSubject("");
                  setSubjectFilter("all");
                }}
                className="px-2"
              >
                ✕
              </Button>
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => setShowAddClassModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Thêm lớp học
        </Button>
      </div>

      {/* Bảng lớp học */}
      <div className="rounded-xl shadow bg-white overflow-x-auto p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã lớp</TableHead>
              <TableHead>Tên lớp</TableHead>
              <TableHead>Môn học</TableHead>
              <TableHead>Giáo viên</TableHead>
              <TableHead>Số học viên</TableHead>
              <TableHead>Tiến trình</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Lịch học</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-500">
                  Không có lớp học nào phù hợp
                </TableCell>
              </TableRow>
            ) : (
              filteredClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">{classItem.id}</TableCell>
                  <TableCell className="font-semibold">{classItem.name}</TableCell>
                  <TableCell>{classItem.subject}</TableCell>
                  <TableCell>{classItem.teacher}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className={classItem.studentCount > classItem.maxStudents ? "text-red-600 font-semibold" : ""}>
                        {classItem.studentCount}/{classItem.maxStudents}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(classItem.progress)}`}
                          style={{ width: `${classItem.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{classItem.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(classItem.status)}
                  </TableCell>
                  <TableCell className="text-sm">{classItem.schedule}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500 text-blue-700 hover:bg-blue-50"
                      onClick={() => showAddStudentDialog(classItem)}
                      disabled={classItem.status !== "active" || classItem.studentCount >= classItem.maxStudents}
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Thêm học viên
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal thêm học sinh vào lớp */}
      <Dialog open={showAddStudentModal} onOpenChange={setShowAddStudentModal}>
        <DialogContent className="max-w-4xl bg-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thêm học viên vào lớp {selectedClass?.name}</DialogTitle>
            <DialogDescription>
              Chọn học sinh để thêm vào lớp. Lớp hiện có {selectedClass?.studentCount}/{selectedClass?.maxStudents} học viên.
            </DialogDescription>
          </DialogHeader>

          {/* Bộ lọc học sinh */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm học sinh..."
                value={studentFilter}
                onChange={(e) => setStudentFilter(e.target.value)}
                className="pl-10"
              />
            </div>            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="md:w-40 bg-white">
                <SelectValue placeholder="Lọc theo lớp" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Tất cả lớp</SelectItem>
                <SelectItem value="10">Lớp 10</SelectItem>
                <SelectItem value="11">Lớp 11</SelectItem>
                <SelectItem value="12">Lớp 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Danh sách học sinh */}
          <div className="max-h-60 overflow-y-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Chọn</TableHead>
                  <TableHead>Mã HS</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500">
                      Không có học sinh nào phù hợp
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={(checked) =>
                            handleStudentSelection(student.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Lớp {student.grade}</Badge>
                      </TableCell>
                      <TableCell>{student.phone}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Thông tin đã chọn */}
          {selectedStudents.length > 0 && (
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-800">
                Đã chọn <strong>{selectedStudents.length}</strong> học sinh
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddStudentModal(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={handleAddStudentsToClass}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={selectedStudents.length === 0}
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Thêm {selectedStudents.length > 0 ? `${selectedStudents.length} ` : ""}học viên
            </Button>
          </DialogFooter>        </DialogContent>
      </Dialog>

      {/* Modal thêm lớp học mới */}
      <AddClassModal
        open={showAddClassModal}
        onOpenChange={setShowAddClassModal}
        onAddClass={handleAddClass}
      />
    </div>
  );
}
