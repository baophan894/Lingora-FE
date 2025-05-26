
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react"
import { BASE_URL } from "../../utils/constant-value/constant"

interface PasswordFormData {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

export function ChangePasswordForm() {
    const [formData, setFormData] = useState<PasswordFormData>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.oldPassword) {
            newErrors.oldPassword = "Current password is required";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "New password is required";
        } else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
            if (!passwordRegex.test(formData.newPassword)) {
                newErrors.newPassword = "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character";
            }
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your new password";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (formData.oldPassword === formData.newPassword) {
            newErrors.newPassword = "New password must be different from current password";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof PasswordFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
    }

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, label: "" }
        if (password.length < 6) return { strength: 1, label: "Weak" }
        if (password.length < 8) return { strength: 2, label: "Fair" }
        if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return { strength: 4, label: "Strong" }
        }
        return { strength: 3, label: "Good" }
    }

    const passwordStrength = getPasswordStrength(formData.newPassword)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Validation Error", {
                description: "Please fix the errors before submitting",
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/users/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    old_password: formData.oldPassword,
                    new_password: formData.newPassword,
                    confirm_password: formData.confirmPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Password update failed');
            }

            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            toast.success("Password Updated", {
                description: "Your password has been successfully changed",
            });
        } catch (error) {
            toast.error("Update Failed", {
                description: error.message || "There was an error updating your password",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            {/* Current Password */}
            <div className="space-y-2">
                <Label htmlFor="oldPassword">Current Password *</Label>
                <div className="relative">
                    <Input
                        id="oldPassword"
                        type={showPasswords.old ? "text" : "password"}
                        value={formData.oldPassword}
                        onChange={(e) => handleInputChange("oldPassword", e.target.value)}
                        className={errors.oldPassword ? "border-red-500 pr-10" : "pr-10"}
                        placeholder="Enter your current password"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("old")}
                    >
                        {showPasswords.old ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                </div>
                {errors.oldPassword && <p className="text-sm text-red-500">{errors.oldPassword}</p>}
            </div>

            {/* New Password */}
            <div className="space-y-2">
                <Label htmlFor="newPassword">New Password *</Label>
                <div className="relative">
                    <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange("newPassword", e.target.value)}
                        className={errors.newPassword ? "border-red-500 pr-10" : "pr-10"}
                        placeholder="Enter your new password"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("new")}
                    >
                        {showPasswords.new ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                </div>

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                    <div className="space-y-2">
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={`h-2 flex-1 rounded-full ${level <= passwordStrength.strength
                                        ? level <= 2
                                            ? "bg-red-500"
                                            : level === 3
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                        : "bg-gray-200"
                                        }`}
                                />
                            ))}
                        </div>
                        <p
                            className={`text-sm ${passwordStrength.strength <= 2
                                ? "text-red-500"
                                : passwordStrength.strength === 3
                                    ? "text-yellow-600"
                                    : "text-green-600"
                                }`}
                        >
                            Password strength: {passwordStrength.label}
                        </p>
                    </div>
                )}

                {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                        placeholder="Confirm your new password"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("confirm")}
                    >
                        {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* Password Requirements */}
            <div className="bg-[#F6F6F8] p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${formData.newPassword.length >= 6 ? "bg-green-500" : "bg-gray-300"}`} />
                        At least 6 characters
                    </li>
                    <li className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(formData.newPassword) ? "bg-green-500" : "bg-gray-300"}`} />
                        At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${/[a-z]/.test(formData.newPassword) ? "bg-green-500" : "bg-gray-300"}`} />
                        At least one lowercase letter
                    </li>
                    <li className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${/\d/.test(formData.newPassword) ? "bg-green-500" : "bg-gray-300"}`} />
                        At least one number
                    </li>
                    <li className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${/[!@#$%^&*]/.test(formData.newPassword) ? "bg-green-500" : "bg-gray-300"}`} />
                        At least one special character
                    </li>
                    <li className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${formData.newPassword !== formData.oldPassword ? "bg-green-500" : "bg-gray-300"}`} />
                        Different from current password
                    </li>
                </ul>
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
                            <Lock className="w-4 h-4 mr-2" />
                            Update Password
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
