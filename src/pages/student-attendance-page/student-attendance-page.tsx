import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { BadgeCheck, XCircle } from "lucide-react";
// import { CustomSuccessToast, CustomFailedToast } from "../..//components/toast/notificiation-toast";

const studentsData = [
  { id: "SV001", name: "Nguyễn Văn A", class: "N3A", status: "Chưa điểm danh" },
  { id: "SV002", name: "Trần Thị B", class: "N3A", status: "Chưa điểm danh" },
  { id: "SV003", name: "Lê Văn C", class: "N3B", status: "Chưa điểm danh" },
  { id: "SV004", name: "Phạm Thị D", class: "N3B", status: "Chưa điểm danh" },
];

export default function StudentAttendancePage() {
  const [filter, setFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [students, setStudents] = useState(studentsData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string; present: boolean } | null>(null);
  const showConfirmationModal = (id: string, present: boolean) => {
    const student = students.find(s => s.id === id);
    if (student) {
      setSelectedStudent({ id, name: student.name, present });
      setShowConfirmModal(true);
    }
  };

  const handleAttendance = (id: string, present: boolean) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: present ? "Có mặt" : "Vắng",
            }
          : s
      )
    );    // present
    //   ? CustomSuccessToast("Điểm danh thành công!")
    //   : CustomFailedToast("Đã đánh dấu vắng!");
    setShowConfirmModal(false);
    setSelectedStudent(null);
  };
  const filteredStudents = students.filter(
    (s) =>
      (s.name.toLowerCase().includes(filter.toLowerCase()) ||
        s.id.toLowerCase().includes(filter.toLowerCase())) &&
      (classFilter && classFilter !== "all" ? s.class === classFilter : true)
  );  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-red-800">Điểm danh sinh viên</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Tìm kiếm theo tên hoặc mã sinh viên..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="md:w-1/2"
        />
        <Select value={classFilter} onValueChange={setClassFilter}>          
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Lọc theo lớp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả lớp</SelectItem>
            <SelectItem value="N3A">N3A</SelectItem>
            <SelectItem value="N3B">N3B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-xl shadow bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã SV</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Lớp</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  Không có sinh viên nào phù hợp
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    {student.status === "Có mặt" ? (
                      <span className="text-green-600 font-semibold">Có mặt</span>
                    ) : student.status === "Vắng" ? (
                      <span className="text-red-600 font-semibold">Vắng</span>
                    ) : (
                      <span className="text-gray-500">Chưa điểm danh</span>
                    )}
                  </TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-700 hover:bg-green-50"
                      disabled={student.status === "Có mặt"}
                      onClick={() => showConfirmationModal(student.id, true)}
                    >
                      <BadgeCheck className="w-4 h-4 mr-1" /> Có mặt
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-700 hover:bg-red-50"
                      disabled={student.status === "Vắng"}
                      onClick={() => showConfirmationModal(student.id, false)}
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Vắng                    
                      </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal xác nhận */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận điểm danh</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn đánh dấu sinh viên <strong>{selectedStudent?.name}</strong> là{" "}
              <strong>{selectedStudent?.present ? "Có mặt" : "Vắng"}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => selectedStudent && handleAttendance(selectedStudent.id, selectedStudent.present)}
              className={selectedStudent?.present ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}