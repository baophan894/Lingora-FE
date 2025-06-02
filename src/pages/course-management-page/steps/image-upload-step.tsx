import { useState, useRef } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent } from "../../../components/ui/card";
import { Upload, X, ImageIcon, AlertCircle } from "lucide-react";

interface CourseData {
  // Basic Info
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
  
  // Schedule
  schedule: Array<{
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }>;
  startDate: Date | null;
  endDate: Date | null;
  
  // Room
  roomId: string;
  roomType: 'offline' | 'online';
  
  // Image
  imageFile: File | null;
  imagePreview: string;
}

interface ImageUploadStepProps {
  data: CourseData;
  onUpdate: (data: Partial<CourseData>) => void;
}

export default function ImageUploadStep({ data, onUpdate }: ImageUploadStepProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return "Chỉ chấp nhận file ảnh (.jpg, .jpeg, .png, .webp)";
    }
    
    if (file.size > maxFileSize) {
      return "Kích thước file không được vượt quá 5MB";
    }
    
    return null;
  };

  const handleFileSelect = (file: File) => {
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }

    setUploadError("");
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const previewUrl = reader.result as string;
      onUpdate({
        imageFile: file,
        imagePreview: previewUrl
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    onUpdate({
      imageFile: null,
      imagePreview: ""
    });
    setUploadError("");
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Upload hình ảnh khóa học</h3>
        <p className="text-gray-600">
          Thêm hình ảnh đại diện cho khóa học của bạn để thu hút học viên
        </p>
      </div>

      {/* Upload Area */}
      <div className="space-y-4">
        <Label>Hình ảnh khóa học</Label>
        
        {!data.imageFile ? (
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${dragActive 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-300 hover:border-gray-400"
              }
              ${uploadError ? "border-red-300 bg-red-50" : ""}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 text-gray-400">
                <Upload className="w-full h-full" />
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  Kéo thả file ảnh vào đây
                </p>
                <p className="text-sm text-gray-500">
                  hoặc{" "}
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    chọn file
                  </button>
                </p>
              </div>
              
              <div className="text-xs text-gray-400">
                <p>Chấp nhận: JPG, JPEG, PNG, WEBP</p>
                <p>Kích thước tối đa: 5MB</p>
              </div>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                {/* Image Preview */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={data.imagePreview}
                      alt="Course preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {data.imageFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(data.imageFile.size)}
                      </p>
                      <div className="flex items-center space-x-1">
                        <ImageIcon className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-600">
                          Ảnh đã được chọn
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {uploadError && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Upload Another Image Button */}
        {data.imageFile && (
          <div className="text-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleBrowseClick}
              className="text-sm"
            >
              <Upload className="w-4 h-4 mr-2" />
              Chọn ảnh khác
            </Button>
          </div>
        )}
      </div>

      {/* Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">Gợi ý cho ảnh khóa học:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Sử dụng ảnh có độ phân giải cao (tối thiểu 800x600 px)</li>
            <li>• Chọn ảnh liên quan đến nội dung hoặc ngôn ngữ được dạy</li>
            <li>• Tránh sử dụng ảnh có quá nhiều text</li>
            <li>• Ảnh nên sáng, rõ nét và hấp dẫn</li>
            <li>• Tỷ lệ khung hình 16:9 hoặc 4:3 sẽ hiển thị tốt nhất</li>
          </ul>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Tóm tắt thông tin khóa học:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Mã khóa học:</span> {data.code}
            </div>
            <div>
              <span className="font-medium">Tên khóa học:</span> {data.name}
            </div>
            <div>
              <span className="font-medium">Ngôn ngữ:</span> {data.language}
            </div>
            <div>
              <span className="font-medium">Cấp độ:</span> {data.level}
            </div>
            <div>
              <span className="font-medium">Thời lượng:</span> {data.durationWeeks} tuần
            </div>
            <div>
              <span className="font-medium">Phòng học:</span> {
                data.roomType === 'offline' ? 'Trực tiếp' : 'Trực tuyến'
              }
            </div>
            <div>
              <span className="font-medium">Lịch học:</span> {
                data.schedule?.length > 0 
                  ? `${data.schedule.length} buổi/tuần`
                  : "Chưa thiết lập"
              }
            </div>
            <div>
              <span className="font-medium">Học phí:</span> {
                data.feeFull ? `${data.feeFull.toLocaleString('vi-VN')} VNĐ` : "Chưa thiết lập"
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
