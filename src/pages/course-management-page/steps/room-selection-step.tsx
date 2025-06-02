import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { MapPin, Monitor, Users, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Room {
  id: string;
  name: string;
  type: 'offline' | 'online';
  capacity?: number;
  location?: string;
  meetLink?: string;
  isActive: boolean;
}

interface RoomBooking {
  id: string;
  roomId: string;
  courseName: string;
  teacherName: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  startDate: Date;
  endDate: Date;
}

interface RoomSelectionData {
  roomId: string;
  roomType: 'offline' | 'online';
  schedule: Array<{
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }>;
}

interface RoomSelectionStepProps {
  data: RoomSelectionData;
  onUpdate: (data: Partial<RoomSelectionData>) => void;
}

// Mock data - trong thực tế sẽ fetch từ API
const mockRooms: Room[] = [
  {
    id: "room-001",
    name: "Phòng A101",
    type: "offline",
    capacity: 25,
    location: "Tầng 1, Tòa nhà A",
    isActive: true,
  },
  {
    id: "room-002",
    name: "Phòng B205",
    type: "offline",
    capacity: 30,
    location: "Tầng 2, Tòa nhà B",
    isActive: true,
  },
  {
    id: "room-003",
    name: "Zoom Room 1",
    type: "online",
    meetLink: "https://zoom.us/j/123456789",
    isActive: true,
  },
  {
    id: "room-004",
    name: "Phòng C301",
    type: "offline",
    capacity: 20,
    location: "Tầng 3, Tòa nhà C",
    isActive: true,
  },
  {
    id: "room-005",
    name: "Google Meet Room",
    type: "online",
    meetLink: "https://meet.google.com/abc-defg-hij",
    isActive: true,
  },
];

const mockBookings: RoomBooking[] = [
  {
    id: "booking-001",
    roomId: "room-001",
    courseName: "Tiếng Anh Cơ Bản A1",
    teacherName: "Ms. Sarah",
    dayOfWeek: "monday",
    startTime: "09:00",
    endTime: "11:00",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-03-31"),
  },
  {
    id: "booking-002",
    roomId: "room-001",
    courseName: "Tiếng Nhật N5",
    teacherName: "Tanaka-sensei",
    dayOfWeek: "wednesday",
    startTime: "14:00",
    endTime: "16:00",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-04-30"),
  },
  {
    id: "booking-003",
    roomId: "room-002",
    courseName: "Tiếng Hàn Trung Cấp",
    teacherName: "Kim Min Joo",
    dayOfWeek: "tuesday",
    startTime: "19:00",
    endTime: "21:00",
    startDate: new Date("2025-01-15"),
    endDate: new Date("2025-05-15"),
  },
];

const weekdays = [
  { value: "monday", label: "Thứ 2", index: 1 },
  { value: "tuesday", label: "Thứ 3", index: 2 },
  { value: "wednesday", label: "Thứ 4", index: 3 },
  { value: "thursday", label: "Thứ 5", index: 4 },
  { value: "friday", label: "Thứ 6", index: 5 },
  { value: "saturday", label: "Thứ 7", index: 6 },
  { value: "sunday", label: "Chủ nhật", index: 0 },
];

export default function RoomSelectionStep({ data, onUpdate }: RoomSelectionStepProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomFilter, setRoomFilter] = useState<'all' | 'offline' | 'online'>('all');
  const [conflicts, setConflicts] = useState<RoomBooking[]>([]);

  useEffect(() => {
    if (data.roomId) {
      const room = mockRooms.find(r => r.id === data.roomId);
      setSelectedRoom(room || null);
    }
  }, [data.roomId]);

  useEffect(() => {
    checkConflicts();
  }, [data.roomId, data.schedule]);

  const checkConflicts = () => {
    if (!data.roomId || !data.schedule.length) {
      setConflicts([]);
      return;
    }

    const roomBookings = mockBookings.filter(booking => booking.roomId === data.roomId);
    const conflictingBookings: RoomBooking[] = [];

    data.schedule.forEach(newSchedule => {
      roomBookings.forEach(booking => {
        if (booking.dayOfWeek === newSchedule.dayOfWeek) {
          // Kiểm tra xung đột thời gian
          const newStart = timeToMinutes(newSchedule.startTime);
          const newEnd = timeToMinutes(newSchedule.endTime);
          const existingStart = timeToMinutes(booking.startTime);
          const existingEnd = timeToMinutes(booking.endTime);

          if (
            (newStart >= existingStart && newStart < existingEnd) ||
            (newEnd > existingStart && newEnd <= existingEnd) ||
            (newStart <= existingStart && newEnd >= existingEnd)
          ) {
            if (!conflictingBookings.find(c => c.id === booking.id)) {
              conflictingBookings.push(booking);
            }
          }
        }
      });
    });

    setConflicts(conflictingBookings);
  };

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const filteredRooms = mockRooms.filter(room => {
    if (roomFilter === 'all') return room.isActive;
    return room.isActive && room.type === roomFilter;
  });

  const generateCalendarEvents = () => {
    if (!data.roomId) return [];

    const roomBookings = mockBookings.filter(booking => booking.roomId === data.roomId);
    const events: any[] = [];

    // Existing bookings
    roomBookings.forEach(booking => {
      const weekday = weekdays.find(w => w.value === booking.dayOfWeek);
      if (weekday) {
        events.push({
          id: `existing-${booking.id}`,
          title: `${booking.courseName} (${booking.teacherName})`,
          daysOfWeek: [weekday.index],
          startTime: booking.startTime,
          endTime: booking.endTime,
          backgroundColor: '#EF4444',
          borderColor: '#DC2626',
          textColor: '#FFFFFF',
        });
      }
    });

    // New schedule (if any)
    data.schedule.forEach((schedule, index) => {
      const weekday = weekdays.find(w => w.value === schedule.dayOfWeek);
      if (weekday) {
        const isConflict = conflicts.some(conflict => 
          conflict.dayOfWeek === schedule.dayOfWeek &&
          ((timeToMinutes(schedule.startTime) >= timeToMinutes(conflict.startTime) && 
            timeToMinutes(schedule.startTime) < timeToMinutes(conflict.endTime)) ||
           (timeToMinutes(schedule.endTime) > timeToMinutes(conflict.startTime) && 
            timeToMinutes(schedule.endTime) <= timeToMinutes(conflict.endTime)))
        );

        events.push({
          id: `new-${index}`,
          title: `Khóa học mới`,
          daysOfWeek: [weekday.index],
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          backgroundColor: isConflict ? '#F59E0B' : '#10B981',
          borderColor: isConflict ? '#D97706' : '#059669',
          textColor: '#FFFFFF',
        });
      }
    });

    return events;
  };

  const selectRoom = (room: Room) => {
    setSelectedRoom(room);
    onUpdate({ 
      roomId: room.id, 
      roomType: room.type 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Chọn phòng học
        </h2>
        <p className="text-gray-600">
          Chọn phòng học phù hợp và kiểm tra lịch sử dụng phòng
        </p>
      </div>

      {/* Room Filter */}
      <div className="space-y-2">
        <Label>Loại phòng học</Label>
        <Select 
          value={roomFilter} 
          onValueChange={(value: 'all' | 'offline' | 'online') => setRoomFilter(value)}
        >
          <SelectTrigger className="bg-white w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">Tất cả phòng</SelectItem>
            <SelectItem value="offline">Phòng học trực tiếp</SelectItem>
            <SelectItem value="online">Phòng học trực tuyến</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Room List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <Card 
            key={room.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedRoom?.id === room.id 
                ? 'ring-2 ring-blue-500 border-blue-500' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => selectRoom(room)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                {room.type === 'offline' ? (
                  <MapPin className="w-5 h-5 text-blue-500" />
                ) : (
                  <Monitor className="w-5 h-5 text-green-500" />
                )}
                {room.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge 
                variant={room.type === 'offline' ? 'default' : 'secondary'}
                className="w-fit"
              >
                {room.type === 'offline' ? 'Trực tiếp' : 'Trực tuyến'}
              </Badge>
              
              {room.capacity && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Sức chứa: {room.capacity} người</span>
                </div>
              )}
              
              {room.location && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{room.location}</span>
                </div>
              )}
              
              {room.meetLink && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Link:</span> {room.meetLink}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Room Schedule Calendar */}
      {selectedRoom && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Lịch sử dụng phòng: {selectedRoom.name}
            </h3>
            {conflicts.length > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {conflicts.length} xung đột
              </Badge>
            )}
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Đã được đặt</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Lịch mới (không xung đột)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Lịch mới (có xung đột)</span>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-white">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              events={generateCalendarEvents()}
              height={500}
              slotMinTime="06:00:00"
              slotMaxTime="22:00:00"
              slotDuration="00:30:00"
              locale="vi"
              weekends={true}
              allDaySlot={false}
              editable={false}
              selectable={false}
            />
          </div>
        </div>
      )}

      {/* Conflicts Warning */}
      {conflicts.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h4 className="font-medium text-red-900">Cảnh báo xung đột lịch</h4>
          </div>
          <p className="text-red-800 mb-3">
            Lịch học mới bị xung đột với các khóa học đã có:
          </p>
          <div className="space-y-2">
            {conflicts.map((conflict) => (
              <div key={conflict.id} className="bg-white p-3 rounded border border-red-200">
                <div className="font-medium text-red-900">{conflict.courseName}</div>
                <div className="text-sm text-red-700">
                  {weekdays.find(w => w.value === conflict.dayOfWeek)?.label}: {conflict.startTime} - {conflict.endTime}
                </div>
                <div className="text-sm text-red-600">Giáo viên: {conflict.teacherName}</div>
              </div>
            ))}
          </div>
          <p className="text-red-800 mt-3 text-sm">
            Vui lòng chọn phòng khác hoặc thay đổi thời gian học.
          </p>
        </div>
      )}

      {/* Success message */}
      {selectedRoom && conflicts.length === 0 && data.schedule.length > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h4 className="font-medium text-green-900">Phòng học phù hợp</h4>
          </div>
          <p className="text-green-800 mt-1">
            Phòng {selectedRoom.name} có thể sử dụng cho lịch học đã chọn.
          </p>
        </div>
      )}

      {/* Room Selection Summary */}
      {selectedRoom && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Phòng học đã chọn</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Tên phòng:</strong> {selectedRoom.name}</p>
            <p><strong>Loại:</strong> {selectedRoom.type === 'offline' ? 'Trực tiếp' : 'Trực tuyến'}</p>
            {selectedRoom.capacity && (
              <p><strong>Sức chứa:</strong> {selectedRoom.capacity} người</p>
            )}
            {selectedRoom.location && (
              <p><strong>Vị trí:</strong> {selectedRoom.location}</p>
            )}
            {selectedRoom.meetLink && (
              <p><strong>Link học:</strong> {selectedRoom.meetLink}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
