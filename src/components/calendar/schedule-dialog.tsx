  // Dữ liệu mẫu cho lịch học
  export const schedule = [
    {
      id: 1,
      course: "JLPT N3",
      date: "20/05/2024",
      time: "18:00 - 20:00",
      teacher: "Yamada Kenji",
      room: "P.301",
    },
    {
      id: 2,
      course: "JLPT N3",
      date: "22/05/2024",
      time: "18:00 - 20:00",
      teacher: "Yamada Kenji",
      room: "P.301",
    },
    {
      id: 3,
      course: "JLPT N3",
      date: "24/05/2024",
      time: "18:00 - 20:00",
      teacher: "Yamada Kenji",
      room: "P.301",
    },
  ]

  interface ScheduleItem {
  id: number
  course: string
  date: string
  time: string
  teacher: string
  room: string
}


  export function ScheduleDialog({ scheduleData }: { scheduleData: ScheduleItem[] }) {
    const events = scheduleData.map(item => ({
      id: item.id.toString(),
      title: `${item.course} - ${item.teacher}`,
      start: parseDateTime(item.date, item.time.split(" - ")[0]),
      end: parseDateTime(item.date, item.time.split(" - ")[1]),
      extendedProps: {
        room: item.room,
        teacher: item.teacher
      }
    }))}

   export function parseDateTime(date: string, time: string) {
      const [day, month, year] = date.split("/")
      const [hour, minute] = time.trim().split(":")
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`
    }