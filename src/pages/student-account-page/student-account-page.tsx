import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Lock, Unlock, Eye, UserCheck, UserX } from "lucide-react";
import { CustomSuccessToast, CustomFailedToast, CustomToast } from "../../components/toast/notificiation-toast";

const studentsData = [
  { 
    id: "SV001", 
    name: "Nguyễn Văn An", 
    email: "an.nguyen@student.edu.vn",
    phone: "0123456789",
    class: "N3A",
    status: "active",
    enrollDate: "15/01/2024",
    studentCode: "2024001"
  },
  { 
    id: "SV002", 
    name: "Trần Thị Bình", 
    email: "binh.tran@student.edu.vn",
    phone: "0987654321",
    class: "N3A",
    status: "active",
    enrollDate: "10/03/2024",
    studentCode: "2024002"
  },
  { 
    id: "SV003", 
    name: "Lê Văn Cường", 
    email: "cuong.le@student.edu.vn",
    phone: "0456789123",
    class: "N3B",
    status: "locked",
    enrollDate: "05/06/2024",
    studentCode: "2024003"
  },
  { 
    id: "SV004", 
    name: "Phạm Thị Dung", 
    email: "dung.pham@student.edu.vn",
    phone: "0789123456",
    class: "N3B",
    status: "active",
    enrollDate: "20/08/2024",
    studentCode: "2024004"
  },
  { 
    id: "SV005", 
    name: "Hoàng Văn Em", 
    email: "em.hoang@student.edu.vn",
    phone: "0321654987",
    class: "N2A",
    status: "active",
    enrollDate: "12/09/2024",
    studentCode: "2024005"
  },
];

export default function StudentAccountPage() {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [students, setStudents] = useState(studentsData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{ 
    id: string; 
    name: string; 
    lock: boolean;
    student?: typeof studentsData[0];
  } | null>(null);

  const showConfirmationModal = (id: string, lock: boolean) => {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudent({ id, name: student.name, lock, student });
      setShowConfirmModal(true);
    }
  };

  const showStudentDetail = (id: string) => {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudent({ id, name: student.name, lock: false, student });
      setShowDetailModal(true);
    }
  };

  const handleAccountStatus = (id: string, lock: boolean) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: lock ? "locked" : "active",
            }
          : s
      )
    );
    
    lock
      ? CustomSuccessToast("Đã khóa tài khoản sinh viên!")
      : CustomSuccessToast("Đã mở khóa tài khoản sinh viên!");
    setShowConfirmModal(false);
    setSelectedStudent(null);
  };

  const filteredStudents = students.filter(
    (s) =>
      (s.name.toLowerCase().includes(filter.toLowerCase()) ||
        s.id.toLowerCase().includes(filter.toLowerCase()) ||
        s.email.toLowerCase().includes(filter.toLowerCase()) ||
        s.studentCode.toLowerCase().includes(filter.toLowerCase())) &&
      (statusFilter && statusFilter !== "all" ? s.status === statusFilter : true) &&
      (classFilter && classFilter !== "all" ? s.class === classFilter : true)
  );

  // Get unique classes for filter
  const uniqueClasses = [...new Set(studentsData.map(s => s.class))];

  return (
    <div className="p-8 w-full">

      <CustomToast/>

      <h1 className="text-2xl font-bold mb-6 text-primary-800">Quản lý tài khoản sinh viên</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Tìm kiếm theo tên, mã SV hoặc email..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="md:w-1/2"
        />
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="md:w-32">
            <SelectValue placeholder="Lọc lớp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả lớp</SelectItem>
            {uniqueClasses.map(className => (
              <SelectItem key={className} value={className}>{className}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Lọc trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="locked">Đã khóa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl shadow bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã SV</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Lớp</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Không có sinh viên nào phù hợp
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.studentCode}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {student.class}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {student.status === "active" ? (
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Hoạt động
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">
                        <UserX className="w-3 h-3 mr-1" />
                        Đã khóa
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500 text-blue-700 hover:bg-blue-50"
                      onClick={() => showStudentDetail(student.id)}
                    >
                       Chi tiết
                    </Button>
                    {student.status === "active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-700 hover:bg-red-50"
                        onClick={() => showConfirmationModal(student.id, true)}
                      >
                        <Lock className="w-4 h-4 mr-1" /> Khóa
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-500 text-green-700 hover:bg-green-50"
                        onClick={() => showConfirmationModal(student.id, false)}
                      >
                        <Unlock className="w-4 h-4 mr-1" /> Mở khóa
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal xác nhận khóa/mở khóa */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>
              {selectedStudent?.lock ? "Xác nhận khóa tài khoản" : "Xác nhận mở khóa tài khoản"}
            </DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn{" "}
              <strong>{selectedStudent?.lock ? "khóa" : "mở khóa"}</strong> tài khoản sinh viên{" "}
              <strong>{selectedStudent?.name}</strong>?
              {selectedStudent?.lock && (
                <div className="mt-2 text-sm text-red-600">
                  ⚠️ Sinh viên sẽ không thể đăng nhập và truy cập hệ thống sau khi bị khóa tài khoản.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => selectedStudent && handleAccountStatus(selectedStudent.id, selectedStudent.lock)}
              className={selectedStudent?.lock ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              {selectedStudent?.lock ? (
                <>
                  <Lock className="w-4 h-4 mr-1" /> Khóa tài khoản
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 mr-1" /> Mở khóa
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal chi tiết sinh viên */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Thông tin chi tiết sinh viên</DialogTitle>
          </DialogHeader>
          {selectedStudent?.student && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Mã sinh viên</label>
                  <p className="text-base font-semibold">{selectedStudent.student.studentCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Họ và tên</label>
                  <p className="text-base font-semibold">{selectedStudent.student.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-base">{selectedStudent.student.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Lớp học</label>
                  <div className="mt-1">
                    <Badge variant="outline" className="font-medium">
                      {selectedStudent.student.class}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                  <p className="text-base">{selectedStudent.student.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày ghi danh</label>
                  <p className="text-base">{selectedStudent.student.enrollDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">ID hệ thống</label>
                  <p className="text-base text-gray-600">{selectedStudent.student.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                  <div className="mt-1">
                    {selectedStudent.student.status === "active" ? (
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-300">
                        Hoạt động
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">
                        Đã khóa
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailModal(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
