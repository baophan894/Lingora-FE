type PageType = "list" | "detail" | "edit" | "create" | "student-courses" | "student-detail"
type UserType = "manager" | "student"

type Props = {
    userType: UserType
    currentPage: PageType
    switchUserType: (type: UserType) => void
}

const CenterManagerHeader = ({ userType, currentPage, switchUserType }: Props) => {
    // Remove internal useState – use props instead

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#BF0008] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">L</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-[#BF0008]">Internal Management</h1>
                                <p className="text-sm text-gray-600">Language Center</p>
                            </div>
                        </div>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-600 font-medium">
                            {userType === "manager" ? "Course Management System" : "Student Portal"}
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => switchUserType("manager")}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${userType === "manager"
                                    ? "bg-[#BF0008] text-white"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Manager
                            </button>
                            <button
                                onClick={() => switchUserType("student")}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${userType === "student"
                                    ? "bg-[#BF0008] text-white"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Student
                            </button>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-700">
                                Welcome, {userType === "manager" ? "Admin" : "Student"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {userType === "manager" ? "Course Manager" : "Language Learner"}
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-[#BF0008] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                                {userType === "manager" ? "A" : "S"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default CenterManagerHeader
