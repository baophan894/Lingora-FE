import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { Calendar, Clock, Plus, X } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface ScheduleData {
  schedule: Array<{
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }>;
  startDate: Date | null;
  endDate: Date | null;
}

interface ScheduleStepProps {
  data: ScheduleData;
  onUpdate: (data: Partial<ScheduleData>) => void;
}

const weekdays = [
  { value: "monday", label: "Thứ 2" },
  { value: "tuesday", label: "Thứ 3" },
  { value: "wednesday", label: "Thứ 4" },
  { value: "thursday", label: "Thứ 5" },
  { value: "friday", label: "Thứ 6" },
  { value: "saturday", label: "Thứ 7" },
  { value: "sunday", label: "Chủ nhật" },
];

export default function ScheduleStep({ data, onUpdate }: ScheduleStepProps) {
  const [newSchedule, setNewSchedule] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const addSchedule = () => {
    if (newSchedule.dayOfWeek && newSchedule.startTime && newSchedule.endTime) {
      // Kiểm tra trùng lặp
      const isDuplicate = data.schedule.some(
        schedule => schedule.dayOfWeek === newSchedule.dayOfWeek &&
                   schedule.startTime === newSchedule.startTime
      );

      if (!isDuplicate) {
        onUpdate({
          schedule: [...data.schedule, { ...newSchedule }]
        });
        setNewSchedule({ dayOfWeek: "", startTime: "", endTime: "" });
      } else {
        alert("Lịch học này đã tồn tại!");
      }
    }
  };

  const removeSchedule = (index: number) => {
    const updatedSchedule = data.schedule.filter((_, i) => i !== index);
    onUpdate({ schedule: updatedSchedule });
  };

  const handleCalendarSelect = (selectInfo: any) => {
    const selectedDate = selectInfo.start;
    const dayOfWeek = selectedDate.getDay();
    const weekdayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
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

    setNewSchedule({
      dayOfWeek: weekdayNames[dayOfWeek],
      startTime,
      endTime,
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString('vi-VN');
  };

  const generateCalendarEvents = () => {
    return data.schedule.map((schedule, index) => ({
      id: index.toString(),
      title: `${weekdays.find(w => w.value === schedule.dayOfWeek)?.label} ${schedule.startTime}-${schedule.endTime}`,
      daysOfWeek: [weekdays.findIndex(w => w.value === schedule.dayOfWeek)],
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      backgroundColor: '#3B82F6',
      borderColor: '#2563EB',
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Lịch học
        </h2>
        <p className="text-gray-600">
          Thiết lập thời gian học hàng tuần và thời gian bắt đầu/kết thúc khóa học
        </p>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startDate">Ngày bắt đầu khóa học *</Label>
          <Input
            id="startDate"
            type="date"
            value={data.startDate ? data.startDate.toISOString().split('T')[0] : ""}
            onChange={(e) => onUpdate({ 
              startDate: e.target.value ? new Date(e.target.value) : null 
            })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Ngày kết thúc khóa học *</Label>
          <Input
            id="endDate"
            type="date"
            value={data.endDate ? data.endDate.toISOString().split('T')[0] : ""}
            min={data.startDate ? data.startDate.toISOString().split('T')[0] : ""}
            onChange={(e) => onUpdate({ 
              endDate: e.target.value ? new Date(e.target.value) : null 
            })}
          />
        </div>
      </div>

      {/* Add Schedule Form */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Thêm lịch học hàng tuần</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <Calendar className="w-4 h-4 mr-1" />
            {showCalendar ? "Ẩn lịch" : "Chọn từ lịch"}
          </Button>
        </div>

        {showCalendar && (
          <div className="mb-6 border rounded-lg p-4 bg-white">
            <div className="mb-4">
              <Label className="text-sm text-gray-600">
                Kéo chọn khung giờ trên lịch để thêm thời gian học
              </Label>
            </div>
            
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              selectable={true}
              selectMirror={true}
              select={handleCalendarSelect}
              events={generateCalendarEvents()}
              height={400}
              slotMinTime="06:00:00"
              slotMaxTime="22:00:00"
              slotDuration="00:30:00"
              locale="vi"
              weekends={true}
              allDaySlot={false}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Thứ trong tuần</Label>
            <Select 
              value={newSchedule.dayOfWeek} 
              onValueChange={(value) => setNewSchedule(prev => ({ ...prev, dayOfWeek: value }))}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Chọn thứ" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {weekdays.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Giờ bắt đầu</Label>
            <Input
              type="time"
              value={newSchedule.startTime}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, startTime: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Giờ kết thúc</Label>
            <Input
              type="time"
              value={newSchedule.endTime}
              min={newSchedule.startTime}
              onChange={(e) => setNewSchedule(prev => ({ ...prev, endTime: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>&nbsp;</Label>
            <Button
              type="button"
              onClick={addSchedule}
              disabled={!newSchedule.dayOfWeek || !newSchedule.startTime || !newSchedule.endTime}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-1" />
              Thêm
            </Button>
          </div>
        </div>
      </div>

      {/* Schedule List */}
      {data.schedule.length > 0 && (
        <div className="space-y-2">
          <Label className="text-base font-medium">Lịch học đã thiết lập</Label>
          <div className="space-y-2">
            {data.schedule.map((schedule, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-200 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">
                    {weekdays.find(w => w.value === schedule.dayOfWeek)?.label}
                  </span>
                  <Badge variant="outline" className="text-blue-600">
                    {schedule.startTime} - {schedule.endTime}
                  </Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSchedule(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {(data.startDate || data.endDate || data.schedule.length > 0) && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Tóm tắt lịch học</h3>
          <div className="text-sm text-blue-800 space-y-1">
            {data.startDate && (
              <p><strong>Ngày bắt đầu:</strong> {formatDate(data.startDate)}</p>
            )}
            {data.endDate && (
              <p><strong>Ngày kết thúc:</strong> {formatDate(data.endDate)}</p>
            )}
            {data.schedule.length > 0 && (
              <div>
                <strong>Lịch học hàng tuần:</strong>
                <ul className="mt-1 space-y-1">
                  {data.schedule.map((schedule, index) => (
                    <li key={index} className="ml-4">
                      • {weekdays.find(w => w.value === schedule.dayOfWeek)?.label}: {schedule.startTime} - {schedule.endTime}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
