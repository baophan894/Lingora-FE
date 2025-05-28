import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { toast } from "sonner"
import { Save, Loader2 } from "lucide-react"
import { useAppSelector } from "../../store/hooks"
import type { RootState } from "../../store/store"

interface StudentData {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    dateOfBirth: string
    gender: string
    avatar: string
    enrollmentDate: string
    level: string
    coursesCompleted: number
    totalHours: number

}

interface StudentInfoFormProps {
    studentData: StudentData
    onUpdate: (data: Partial<StudentData>) => Promise<boolean> | void
}

export function StudentInfoForm({ studentData, onUpdate }: StudentInfoFormProps) {
    const [formData, setFormData] = useState(studentData)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const auth = useAppSelector((state: RootState) => state.auth);

    const currentUser = auth.user;

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required"
        }

        if (!formData.gender) {
            newErrors.gender = "Please select your gender"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field: keyof StudentData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    // Avatar upload is now handled in the header section

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Validation Error", {
                description: "Please fix the errors before submitting",
            })
            return
        }

        setIsLoading(true)

        try {
            // Call onUpdate and check if it returns a promise
            const result = onUpdate(formData)
            
            // If onUpdate returns a promise, wait for it
            if (result instanceof Promise) {
                const success = await result
                if (!success) {
                    toast.error("Update Failed", {
                        description: "There was an error updating your profile. Please try again.",
                    })
                    return
                }
            }

            // Add a small delay for better UX
            await new Promise((resolve) => setTimeout(resolve, 500))

            toast(
                <div className="bg-green-500 text-white border-0 p-4 rounded-md">
                    <h3 className="font-bold">Profile Updated</h3>
                    <p className="text-sm">Your profile information has been successfully updated</p>
                </div>
            )
        } catch (error) {
            console.error("Error in handleSubmit:", error)
            toast.error("Update Failed", {
                description: "There was an error updating your profile. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar upload is handled in the header section */}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName">First Name *</Label>
                    <Input
                        id="fullName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.firstName ? "border-red-500" : ""}
                        placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fullName">Last Name *</Label>
                    <Input
                        id="fullName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.lastName ? "border-red-500" : ""}
                        placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        id="email"
                        type="email"
                        value={currentUser?.email}
                        disabled={true}
                        readOnly={true}
                        className={`${errors.email ? "border-red-500" : ""} bg-gray-50 text-gray-700 cursor-not-allowed`}
                        placeholder="Enter your email address"
                    />
                    <p className="text-xs text-gray-500">Email address cannot be changed</p>
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className={errors.dateOfBirth ? "border-red-500" : ""}
                    />
                    {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-50">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your full address"
                    rows={3}
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-red-800 text-white border-0 hover:opacity-90 px-8"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
