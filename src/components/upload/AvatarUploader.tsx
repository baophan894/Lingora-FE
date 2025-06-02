import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { useAppSelector } from "../../store/hooks"
import type { RootState } from "../../store/store"

interface AvatarUploaderProps {
    className?: string
    size?: "sm" | "md" | "lg" | "xl"
    onFileSelect?: (file: File) => void
}

export interface AvatarUploaderRef {
    hasNewAvatar: () => boolean
    getSelectedFile: () => File | null
    clearSelection: () => void
}

const AvatarUploader = forwardRef<AvatarUploaderRef, AvatarUploaderProps>(({ 
    className, 
    size = "md", 
    onFileSelect 
}, ref) => {
    const auth = useAppSelector((state: RootState) => state.auth)
    const currentUser = auth.user;

    // Display avatar URL with timestamp for cache busting
    const [avatarUrl, setAvatarUrl] = useState<string>("")
    const [newAvatar, setNewAvatar] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>("")

    // Update local state when auth.user changes
    useEffect(() => {
        console.log("AvatarUploader: Auth user changed", auth.user?.avatarUrl)
        if (auth.user?.avatarUrl) {
            // Add timestamp to avoid cache and force refresh
            const timestamp = Date.now()
            const urlWithTimestamp = `${auth.user.avatarUrl}?v=${timestamp}`
            console.log("AvatarUploader: Setting new avatar URL", urlWithTimestamp)
            setAvatarUrl(urlWithTimestamp)
            
            // Clear preview when we get a new URL from server
            // This ensures we show the server URL, not the preview
            if (previewUrl) {
                console.log("AvatarUploader: Clearing preview to show server URL")
                setPreviewUrl("")
            }
        }
    }, [auth.user?.avatarUrl])

    // Initial load effect
    useEffect(() => {
        if (currentUser?.avatarUrl && !avatarUrl) {
            const timestamp = Date.now()
            const urlWithTimestamp = `${currentUser.avatarUrl}?v=${timestamp}`
            console.log("AvatarUploader: Initial load, setting avatar URL", urlWithTimestamp)
            setAvatarUrl(urlWithTimestamp)
        }
    }, [currentUser?.avatarUrl, avatarUrl])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            console.log("AvatarUploader: File selected:", {
                name: file.name,
                type: file.type,
                size: file.size,
            })
            
            setNewAvatar(file)
            
            // Create preview URL for immediate display
            const reader = new FileReader()
            reader.onloadend = () => {
                const previewImageUrl = reader.result as string
                console.log("AvatarUploader: Setting preview URL")
                setPreviewUrl(previewImageUrl)
            }
            reader.readAsDataURL(file)

            // Notify parent component about file selection
            if (onFileSelect) {
                onFileSelect(file)
            }
        }
    }

    const clearSelection = () => {
        console.log("AvatarUploader: Clearing selection")
        setNewAvatar(null)
        setPreviewUrl("")
        
        // Reset file input
        const fileInput = document.getElementById('avatar-upload') as HTMLInputElement
        if (fileInput) {
            fileInput.value = ""
        }

        // Force refresh the current avatar URL to show updated version
        if (auth.user?.avatarUrl) {
            const timestamp = Date.now()
            const refreshedUrl = `${auth.user.avatarUrl}?v=${timestamp}`
            console.log("AvatarUploader: Refreshing avatar URL after clear", refreshedUrl)
            setAvatarUrl(refreshedUrl)
        }
    }

    // Expose methods through ref
    useImperativeHandle(ref, () => ({
        hasNewAvatar: () => newAvatar !== null,
        getSelectedFile: () => newAvatar,
        clearSelection: clearSelection
    }))

    // Define size classes
    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-24 h-24", 
        lg: "w-32 h-32",
        xl: "w-40 h-40"
    }

    const avatarClasses = `rounded-full ${sizeClasses[size]} object-cover mx-auto cursor-pointer ${className || ""}`

    // Use preview URL if available, otherwise use current avatar URL
    const displayUrl = previewUrl || avatarUrl
    console.log("AvatarUploader: Display URL", { previewUrl, avatarUrl, displayUrl })

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className={avatarClasses}>
                    <AvatarImage
                        src={displayUrl}
                        key={displayUrl} // Force re-render when URL changes
                        className="object-cover w-full h-full"
                        onLoad={() => console.log("AvatarUploader: Image loaded successfully", displayUrl)}
                        onError={() => console.log("AvatarUploader: Image failed to load", displayUrl)}
                    />
                    <AvatarFallback className="text-lg">
                        {currentUser?.fullName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "U"}
                    </AvatarFallback>
                </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-72 bg-white">
                <Card className="p-4 space-y-4">
                    <p className="text-sm font-medium text-center">Chọn ảnh đại diện</p>
                    <Input 
                        id="avatar-upload"
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                    {newAvatar && (
                        <div className="space-y-2">
                            <p className="text-sm text-green-600 text-center">
                                ✓ Đã chọn: {newAvatar.name.length > 20 
                                    ? `${newAvatar.name.substring(0, 20)}...` 
                                    : newAvatar.name}
                            </p>
                            <p className="text-xs text-gray-500 text-center">
                                Bấm "Save Changes" trong form để cập nhật ảnh đại diện.
                            </p>
                            <button
                                type="button"
                                onClick={clearSelection}
                                className="w-full text-sm text-red-600 hover:text-red-800"
                            >
                                Hủy chọn
                            </button>
                        </div>
                    )}
                    {!newAvatar && (
                        <p className="text-xs text-gray-500 text-center">
                            Chọn ảnh để thay đổi ảnh đại diện của bạn.
                        </p>
                    )}
                </Card>
            </PopoverContent>
        </Popover>
    )
})

AvatarUploader.displayName = "AvatarUploader"

export default AvatarUploader