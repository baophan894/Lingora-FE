import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { Plus, X } from "lucide-react";

interface CourseData {
  code: string;
  name: string;
  description: string;
  language: string;
  level: string;
  durationWeeks: number;
  totalSlots: number;
  feeFull: number;
  feeInstallment: number;
  topics: string[];
}

interface BasicInfoStepProps {
  data: CourseData;
  onUpdate: (data: Partial<CourseData>) => void;
}

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

const levelOptions = [
  { value: "beginner", label: "Sơ cấp (A1-A2)" },
  { value: "intermediate", label: "Trung cấp (B1-B2)" },
  { value: "advanced", label: "Cao cấp (C1-C2)" },
  { value: "business", label: "Giao tiếp thương mại" },
  { value: "academic", label: "Học thuật" },
];

export default function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const [newTopic, setNewTopic] = useState("");

  const generateCourseCode = () => {
    const languageCode = data.language.substring(0, 2).toUpperCase();
    const levelCode = data.level.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    const code = `${languageCode}${levelCode}${timestamp}`;
    onUpdate({ code });
  };

  const addTopic = () => {
    if (newTopic.trim() && !data.topics.includes(newTopic.trim())) {
      onUpdate({ 
        topics: [...data.topics, newTopic.trim()] 
      });
      setNewTopic("");
    }
  };

  const removeTopic = (index: number) => {
    const updatedTopics = data.topics.filter((_, i) => i !== index);
    onUpdate({ topics: updatedTopics });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTopic();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Thông tin cơ bản
        </h2>
        <p className="text-gray-600">
          Nhập thông tin chi tiết về khóa học ngoại ngữ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Code */}
        <div className="space-y-2">
          <Label htmlFor="code">Mã khóa học</Label>
          <div className="flex gap-2">
            <Input
              id="code"
              placeholder="VD: ENGA101"
              value={data.code}
              onChange={(e) => onUpdate({ code: e.target.value })}
            />
            <Button
              type="button"
              variant="outline"
              onClick={generateCourseCode}
              disabled={!data.language || !data.level}
            >
              Tự động
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Hoặc click "Tự động" để tạo mã dựa trên ngôn ngữ và trình độ
          </p>
        </div>

        {/* Course Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Tên khóa học *</Label>
          <Input
            id="name"
            placeholder="VD: Tiếng Anh Giao Tiếp Cơ Bản"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label>Ngôn ngữ *</Label>
          <Select 
            value={data.language} 
            onValueChange={(value) => onUpdate({ language: value })}
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
        </div>

        {/* Level */}
        <div className="space-y-2">
          <Label>Trình độ *</Label>
          <Select 
            value={data.level} 
            onValueChange={(value) => onUpdate({ level: value })}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Chọn trình độ" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {levelOptions.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label htmlFor="duration">Thời lượng (tuần) *</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            max="52"
            placeholder="VD: 12"
            value={data.durationWeeks || ""}
            onChange={(e) => onUpdate({ durationWeeks: parseInt(e.target.value) || 0 })}
          />
        </div>

        {/* Total Slots */}
        <div className="space-y-2">
          <Label htmlFor="slots">Tổng số buổi học *</Label>
          <Input
            id="slots"
            type="number"
            min="1"
            placeholder="VD: 36"
            value={data.totalSlots || ""}
            onChange={(e) => onUpdate({ totalSlots: parseInt(e.target.value) || 0 })}
          />
        </div>

        {/* Full Fee */}
        <div className="space-y-2">
          <Label htmlFor="feeFull">Học phí (thanh toán đầy đủ) *</Label>
          <Input
            id="feeFull"
            type="number"
            min="0"
            placeholder="VD: 5000000"
            value={data.feeFull || ""}
            onChange={(e) => onUpdate({ feeFull: parseInt(e.target.value) || 0 })}
          />
          <p className="text-xs text-gray-500">Đơn vị: VNĐ</p>
        </div>

        {/* Installment Fee */}
        <div className="space-y-2">
          <Label htmlFor="feeInstallment">Học phí (thanh toán theo tháng) *</Label>
          <Input
            id="feeInstallment"
            type="number"
            min="0"
            placeholder="VD: 500000"
            value={data.feeInstallment || ""}
            onChange={(e) => onUpdate({ feeInstallment: parseInt(e.target.value) || 0 })}
          />
          <p className="text-xs text-gray-500">Đơn vị: VNĐ/tháng</p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Mô tả khóa học *</Label>
        <Textarea
          id="description"
          placeholder="Nhập mô tả chi tiết về khóa học, mục tiêu học tập, đối tượng phù hợp..."
          rows={4}
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
        />
      </div>

      {/* Topics */}
      <div className="space-y-2">
        <Label>Chủ đề học tập</Label>
        <div className="flex gap-2">
          <Input
            placeholder="VD: Ngữ pháp cơ bản, Giao tiếp hằng ngày..."
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addTopic}
            disabled={!newTopic.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {data.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.topics.map((topic, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {topic}
                <button
                  type="button"
                  onClick={() => removeTopic(index)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500">
          Thêm các chủ đề chính sẽ được học trong khóa học
        </p>
      </div>

      {/* Summary */}
      {data.name && data.language && data.level && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-900 mb-2">Tóm tắt khóa học</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Tên:</strong> {data.name}</p>
            <p><strong>Ngôn ngữ:</strong> {data.language}</p>
            <p><strong>Trình độ:</strong> {levelOptions.find(l => l.value === data.level)?.label}</p>
            {data.durationWeeks > 0 && <p><strong>Thời lượng:</strong> {data.durationWeeks} tuần</p>}
            {data.totalSlots > 0 && <p><strong>Số buổi học:</strong> {data.totalSlots} buổi</p>}
            {data.feeFull > 0 && (
              <p><strong>Học phí:</strong> {data.feeFull.toLocaleString('vi-VN')} VNĐ</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
