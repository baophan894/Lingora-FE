import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import BasicInfoStep from "./steps/basic-info-step";
import ScheduleStep from "./steps/schedule-step";
import RoomSelectionStep from "./steps/room-selection-step";
import ImageUploadStep from "./steps/image-upload-step";

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

const steps = [
  { id: 1, title: "Thông tin cơ bản", description: "Nhập thông tin khóa học" },
  { id: 2, title: "Lịch học", description: "Chọn thời gian học" },
  { id: 3, title: "Phòng học", description: "Chọn phòng học" },
  { id: 4, title: "Hình ảnh", description: "Upload hình ảnh khóa học" },
];

export default function CreateCoursePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState<CourseData>({
    code: "",
    name: "",
    description: "",
    language: "",
    level: "",
    durationWeeks: 0,
    totalSlots: 0,
    feeFull: 0,
    feeInstallment: 0,
    topics: [],
    schedule: [],
    startDate: null,
    endDate: null,
    roomId: "",
    roomType: 'offline',
    imageFile: null,
    imagePreview: "",
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const updateCourseData = (data: Partial<CourseData>) => {
    setCourseData(prev => ({ ...prev, ...data }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(courseData.name && courseData.description && courseData.language && 
                 courseData.level && courseData.durationWeeks > 0 && courseData.totalSlots > 0);
      case 2:
        return courseData.schedule.length > 0 && courseData.startDate && courseData.endDate;
      case 3:
        return !!courseData.roomId;
      case 4:
        return !!courseData.imageFile;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    // Chỉ cho phép quay lại các bước đã hoàn thành hoặc bước hiện tại
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleSubmit = async () => {
    if (isStepValid(4)) {
      try {
        // TODO: Implement API call to create course
        console.log("Creating course with data:", courseData);
        alert("Khóa học đã được tạo thành công!");
      } catch (error) {
        console.error("Error creating course:", error);
        alert("Có lỗi xảy ra khi tạo khóa học!");
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep 
            data={courseData} 
            onUpdate={updateCourseData}
          />
        );
      case 2:
        return (
          <ScheduleStep 
            data={courseData} 
            onUpdate={updateCourseData}
          />
        );
      case 3:
        return (
          <RoomSelectionStep 
            data={courseData} 
            onUpdate={updateCourseData}
          />
        );
      case 4:
        return (
          <ImageUploadStep 
            data={courseData} 
            onUpdate={updateCourseData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Khóa học</span>
            <ChevronRight className="w-4 h-4" />
            <span>Tạo khóa học mới</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Tạo khóa học mới</h1>
          <p className="text-gray-600 mt-2">
            Tạo khóa học ngoại ngữ mới với đầy đủ thông tin và lịch học
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`flex items-center cursor-pointer ${
                      step.id <= currentStep || completedSteps.includes(step.id) 
                        ? 'cursor-pointer' 
                        : 'cursor-not-allowed opacity-50'
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold
                      ${completedSteps.includes(step.id) 
                        ? 'bg-green-500 text-white' 
                        : step.id === currentStep 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }
                    `}>
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="ml-3">
                      <div className={`font-medium ${
                        step.id === currentStep ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-sm text-gray-500">{step.description}</div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 rounded ${
                      completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay lại
          </Button>

          <div className="flex gap-3">
            {currentStep === steps.length ? (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep)}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Tạo khóa học
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2"
              >
                Tiếp theo
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
