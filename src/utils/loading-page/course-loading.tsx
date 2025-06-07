import { BookOpen } from "lucide-react";

export default function CourseLoadingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="relative">
                {/* Animated Spinner */}
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-t-4 border-[#BF0008] border-opacity-30 animate-pulse"></div>
                    <div className="absolute inset-4 rounded-full border-t-4 border-[#BF0008] animate-spin"></div>
                    <div className="absolute inset-8 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-[#BF0008] animate-pulse" />
                    </div>
                </div>

                {/* Progress Text */}
                <div className="mt-8 text-center">
                    <p className="text-xl font-medium text-gray-700 mb-2">Loading Content</p>
                    <div className="h-1 w-48 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#BF0008] to-[#d4001a] animate-progress"
                            style={{ width: '70%' }}
                        ></div>
                    </div>
                    <p className="mt-4 text-gray-500">Preparing your learning experience...</p>
                </div>
            </div>
        </div>
    );
}