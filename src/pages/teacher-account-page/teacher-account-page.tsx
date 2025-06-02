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
import { Lock, Unlock, Eye, UserCheck, UserX, Plus } from "lucide-react";
import { CustomSuccessToast, CustomFailedToast, CustomToast } from "../../components/toast/notificiation-toast";

const teachersData = [
  {
    id: "GV001",
    name: "Nguyễn Văn Hùng",
    email: "hung.nguyen@school.edu.vn",
    phone: "0123456789",
    subject: "Toán học",
    status: "active",
    joinDate: "15/01/2023",
  },
  {
    id: "GV002",
    name: "Trần Thị Lan",
    email: "lan.tran@school.edu.vn",
    phone: "0987654321",
    subject: "Tiếng Anh",
    status: "active",
    joinDate: "10/03/2023",
  },
  {
    id: "GV003",
    name: "Lê Văn Minh",
    email: "minh.le@school.edu.vn",
    phone: "0456789123",
    subject: "Vật lý",
    status: "locked",
    joinDate: "05/06/2023",
  },
  {
    id: "GV004",
    name: "Phạm Thị Hoa",
    email: "hoa.pham@school.edu.vn",
    phone: "0789123456",
    subject: "Hóa học",
    status: "active",
    joinDate: "20/08/2023",
  },
];

export default function TeacherAccountPage() {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [teachers, setTeachers] = useState(teachersData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<{
    id: string;
    name: string;
    lock: boolean;
    teacher?: (typeof teachersData)[0];
  } | null>(null);

  const showConfirmationModal = (id: string, lock: boolean) => {
    const teacher = teachers.find((t) => t.id === id);
    if (teacher) {
      setSelectedTeacher({ id, name: teacher.name, lock, teacher });
      setShowConfirmModal(true);
    }
  };

  const showTeacherDetail = (id: string) => {
    const teacher = teachers.find((t) => t.id === id);
    if (teacher) {
      setSelectedTeacher({ id, name: teacher.name, lock: false, teacher });
      setShowDetailModal(true);
    }
  };

  const handleAccountStatus = (id: string, lock: boolean) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: lock ? "locked" : "active",
            }
          : t
      )
    );

    lock
      ? CustomSuccessToast("Đã khóa tài khoản giáo viên!")
      : CustomSuccessToast("Đã mở khóa tài khoản giáo viên!");
    setShowConfirmModal(false);
    setSelectedTeacher(null);
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      (t.name.toLowerCase().includes(filter.toLowerCase()) ||
        t.id.toLowerCase().includes(filter.toLowerCase()) ||
        t.email.toLowerCase().includes(filter.toLowerCase())) &&
      (statusFilter && statusFilter !== "all"
        ? t.status === statusFilter
        : true)
  );

  return (
    <div className="p-8 w-full">

      <CustomToast/>

      <h1 className="text-2xl font-bold mb-6 text-primary">
        Quản lý tài khoản giáo viên
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Tìm kiếm theo tên, mã GV hoặc email..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="md:w-1/2"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="locked">Đã khóa</SelectItem>
          </SelectContent>
        </Select>
        <Button className="text-white bg-primary-800 hover:bg-primary-500">
          <Plus className="text-white" />
          Thêm giáo viên mới
        </Button>
      </div>

      <div className="rounded-xl shadow bg-white overflow-x-auto p-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã GV</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Môn học</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Không có giáo viên nào phù hợp
                </TableCell>
              </TableRow>
            ) : (
              filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.id}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>
                    {teacher.status === "active" ? (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 border-green-300"
                      >
                        <UserCheck className="w-3 h-3 mr-1" />
                        Hoạt động
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="bg-red-100 text-red-800 border-red-300"
                      >
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
                      onClick={() => showTeacherDetail(teacher.id)}
                    >
                      Chi tiết
                    </Button>
                    {teacher.status === "active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-700 hover:bg-red-50"
                        onClick={() => showConfirmationModal(teacher.id, true)}
                      >
                        <Lock className="w-4 h-4 mr-1" /> Khóa
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-500 text-green-700 hover:bg-green-50"
                        onClick={() => showConfirmationModal(teacher.id, false)}
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
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {selectedTeacher?.lock
                ? "Xác nhận khóa tài khoản"
                : "Xác nhận mở khóa tài khoản"}
            </DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn{" "}
              <strong>{selectedTeacher?.lock ? "khóa" : "mở khóa"}</strong> tài
              khoản giáo viên <strong>{selectedTeacher?.name}</strong>?
              {selectedTeacher?.lock && (
                <div className="mt-2 text-sm text-red-600">
                  Giáo viên sẽ không thể đăng nhập sau khi bị khóa tài khoản.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={() =>
                selectedTeacher &&
                handleAccountStatus(selectedTeacher.id, selectedTeacher.lock)
              }
              className={
                selectedTeacher?.lock
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }
            >
              {selectedTeacher?.lock ? (
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

      {/* Modal chi tiết giáo viên */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl bg-amber-50">
          <DialogHeader>
            <DialogTitle>Thông tin chi tiết giáo viên</DialogTitle>
          </DialogHeader>
          {selectedTeacher?.teacher && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Mã giáo viên
                  </label>
                  <p className="text-base font-semibold">
                    {selectedTeacher.teacher.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Họ và tên
                  </label>
                  <p className="text-base font-semibold">
                    {selectedTeacher.teacher.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-base">{selectedTeacher.teacher.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Trạng thái
                  </label>
                  <div className="mt-1">
                    {selectedTeacher.teacher.status === "active" ? (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 border-green-300"
                      >
                        Hoạt động
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="bg-red-100 text-red-800 border-red-300"
                      >
                        Đã khóa
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Số điện thoại
                  </label>
                  <p className="text-base">{selectedTeacher.teacher.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Môn học giảng dạy
                  </label>
                  <p className="text-base font-semibold">
                    {selectedTeacher.teacher.subject}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Ngày gia nhập
                  </label>
                  <p className="text-base">
                    {selectedTeacher.teacher.joinDate}
                  </p>
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
