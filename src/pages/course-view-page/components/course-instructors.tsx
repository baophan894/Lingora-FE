import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Star, MapPin, Users, MessageCircle, Award } from "lucide-react";

interface Instructor {
  id: number;
  name: string;
  avatar: string;
  title: string;
  nationality: string;
  experience: number;
  rating: number;
  totalStudents: number;
  specializations: string[];
  bio: string;
  education: string[];
  certifications: string[];
}

interface CourseInstructorsProps {
  courseId: number;
}

export default function CourseInstructors({ courseId }: CourseInstructorsProps) {
  // Mock data - trong thực tế sẽ fetch từ API
  const instructors: Instructor[] = [
    {
      id: 1,
      name: "Tanaka Sensei",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "Giáo viên chính",
      nationality: "Nhật Bản",
      experience: 8,
      rating: 4.9,
      totalStudents: 1200,
      specializations: ["JLPT N5-N1", "Giao tiếp cơ bản", "Ngữ pháp tiếng Nhật"],
      bio: "Tôi là Tanaka, một giáo viên tiếng Nhật với 8 năm kinh nghiệm giảng dạy. Tôi đam mê việc giúp học viên Việt Nam chinh phục tiếng Nhật một cách hiệu quả và thú vị.",
      education: [
        "Thạc sĩ Ngôn ngữ học - Đại học Tokyo",
        "Cử nhân Văn học Nhật Bản - Đại học Waseda"
      ],
      certifications: [
        "Chứng chỉ giảng dạy tiếng Nhật (JLTCT)",
        "Chứng chỉ JLPT N1",
        "Chứng chỉ giảng dạy trực tuyến"
      ]
    },
    {
      id: 2,
      name: "Yamada Sensei",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "Giáo viên phụ trách",
      nationality: "Nhật Bản",
      experience: 5,
      rating: 4.8,
      totalStudents: 800,
      specializations: ["Luyện thi JLPT", "Kỹ năng nghe", "Phát âm"],
      bio: "Yamada sensei có phương pháp giảng dạy sáng tạo, đặc biệt giỏi trong việc giúp học viên cải thiện kỹ năng nghe và phát âm tiếng Nhật.",
      education: [
        "Cử nhân Sư phạm - Đại học Kyoto",
        "Chứng chỉ giảng dạy tiếng Nhật quốc tế"
      ],
      certifications: [
        "Chứng chỉ giảng dạy tiếng Nhật (JLTCT)",
        "Chứng chỉ JLPT N1",
        "Chứng chỉ giảng dạy trực tuyến"
      ]
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Đội ngũ giảng viên</h3>
        <p className="text-gray-600">
          Được giảng dạy bởi những giáo viên giàu kinh nghiệm và có chuyên môn cao
        </p>
      </div>

      <div className="space-y-6">
        {instructors.map((instructor) => (
          <Card key={instructor.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Thông tin cơ bản */}
                <div className="flex items-start gap-4">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-xl font-semibold">{instructor.name}</h4>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {instructor.title}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{instructor.nationality}</span>
                        </div>
                        <div>
                          {instructor.experience} năm kinh nghiệm
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {renderStars(instructor.rating)}
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{instructor.totalStudents} học viên</span>
                        </div>
                      </div>
                    </div>

                    {/* Chuyên môn */}
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Chuyên môn:</h5>
                      <div className="flex flex-wrap gap-2">
                        {instructor.specializations.map((spec, index) => (
                          <Badge key={index} variant="secondary">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Liên hệ giáo viên
                    </Button>
                  </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="lg:w-1/2 space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Giới thiệu:</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {instructor.bio}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Học vấn:
                    </h5>
                    <ul className="space-y-1">
                      {instructor.education.map((edu, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Chứng chỉ:
                    </h5>
                    <ul className="space-y-1">
                      {instructor.certifications.map((cert, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
