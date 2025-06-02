import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Plus, Calendar } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Danh sách ngôn ngữ ngoại ngữ có sẵn
const availableLanguages = [
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

interface AddClassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClass: (classData: any) => void;
}

export default function AddClassModal({ open, onOpenChange, onAddClass }: AddClassModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    teacher: "",
    maxStudents: "",
    schedule: "",
  });
  
  const [useCustomLanguage, setUseCustomLanguage] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!formData.name || !formData.subject || !formData.teacher || !formData.maxStudents) {
      return;
    }

    const newClass = {
      id: `LOP${String(Date.now()).slice(-3)}`,
      name: formData.name,
      subject: formData.subject,
      teacher: formData.teacher,
      studentCount: 0,
      maxStudents: parseInt(formData.maxStudents),
      progress: 0,
      status: "active",
      schedule: selectedTimeSlots.length > 0 ? selectedTimeSlots.join(", ") : formData.schedule || "Chưa xếp lịch",
    };

    onAddClass(newClass);
    setFormData({
      name: "",
      subject: "",
      teacher: "",
      maxStudents: "",
      schedule: "",
    });
    setSelectedTimeSlots([]);
    setShowCalendar(false);
    onOpenChange(false);
  };
  const handleSelectSlot = (selectInfo: any) => {
    // Định dạng thời gian theo format "Thứ 2 16:00 - 18:30"
    const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    
    const startDay = weekdays[selectInfo.start.getDay()];
    const startTime = selectInfo.start.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const endTime = selectInfo.end.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const timeSlot = `${startDay} ${startTime} - ${endTime}`;
    
    if (!selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots(prev => [...prev, timeSlot]);
    }
  };

  const removeTimeSlot = (index: number) => {
    setSelectedTimeSlots(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm lớp học ngoại ngữ mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin để tạo lớp học ngoại ngữ mới
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="className">Tên lớp</Label>
            <Input
              id="className"
              placeholder="VD: Tiếng Anh Cơ Bản A1"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="subject">Ngôn ngữ</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="custom-toggle" className="text-sm">Nhập thủ công</Label>
                <Switch
                  id="custom-toggle"
                  checked={useCustomLanguage}
                  onCheckedChange={setUseCustomLanguage}
                  className="bg-gray-200 hover:bg-gray-300  transition-colors duration-200 text-black"
                />
              </div>
            </div>

            {useCustomLanguage ? (
              <Input
                placeholder="Nhập ngôn ngữ tùy chỉnh"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              />
            ) : (
              <Select 
                value={formData.subject} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Chọn ngôn ngữ" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {availableLanguages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher">Giáo viên</Label>
            <Input
              id="teacher"
              placeholder="VD: Nguyễn Văn A"
              value={formData.teacher}
              onChange={(e) => setFormData(prev => ({ ...prev, teacher: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxStudents">Số học viên tối đa</Label>
            <Input
              id="maxStudents"
              type="number"
              placeholder="VD: 20"
              value={formData.maxStudents}
              onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Lịch học</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <Calendar className="w-4 h-4 mr-1" />
                {showCalendar ? "Ẩn lịch" : "Chọn lịch"}
              </Button>
            </div>

            {showCalendar ? (
              <div className="border rounded-lg p-2 bg-gray-50">                
              <div className="mb-4">
                  <Label className="text-sm text-primary-700">
                    <strong>Hướng dẫn:</strong>Bạn có thể chọn nhiều khung giờ khác nhau.
                  </Label>
                  <div className="text-xs text-gray-500 mt-1">
                    • Click và kéo để chọn thời gian liên tục<br/>
                    • Có thể chọn từ 15 phút đến nhiều giờ<br/>
                    • Thời gian từ 6:00 sáng đến 22:00 tối
                  </div>
                </div>
                  <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  selectable={true}
                  selectMirror={true}
                  select={handleSelectSlot}
                  height={400}
                  slotMinTime="06:00:00"
                  slotMaxTime="22:00:00"
                  slotDuration="00:15:00"
                  snapDuration="00:15:00"
                  selectMinDistance={0}
                  longPressDelay={100}
                  eventMinHeight={20}
                  locale="vi"
                  weekends={true}
                  allDaySlot={false}
                  selectConstraint={{
                    start: '06:00',
                    end: '22:00'
                  }}
                />                {selectedTimeSlots.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Lịch học đã chọn ({selectedTimeSlots.length}):</Label>
                    <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                      {selectedTimeSlots.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-200 shadow-sm">
                          <span className="text-sm font-medium text-green-800">{slot}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTimeSlot(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Input
                placeholder="VD: Thứ 2, 4, 6 - 19:00-21:00"
                value={formData.schedule}
                onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
              />
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-1" />
            Thêm lớp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
