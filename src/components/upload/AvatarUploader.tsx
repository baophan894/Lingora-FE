import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import axiosPrivate from "../../utils/axios/axiosPrivate"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import type { RootState } from "../../store/store"
import { CustomSuccessToast, CustomFailedToast } from "../toast/notificiation-toast"
import { updateUser } from "../../features/authentication/authSlice"

export default function AvatarUploader() {
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state: RootState) => state.auth)
    const currentUser = auth.user;
    console.log("Current user in AvatarUploader:", currentUser)

    // Thêm timestamp để force refresh avatar
    const [avatarUrl, setAvatarUrl] = useState<string>(
        auth.user?.avatarUrl ? `${auth.user.avatarUrl}?t=${Date.now()}` : ""
    )
    const [newAvatar, setNewAvatar] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    // Update local state when auth.user changes
    useEffect(() => {
        if (auth.user?.avatarUrl) {
            // Thêm timestamp để tránh cache
            setAvatarUrl(`${auth.user.avatarUrl}?t=${Date.now()}`)
        }
    }, [auth.user?.avatarUrl])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            console.log("File được chọn:", {
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified
            })
            setNewAvatar(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpload = async () => {
        console.log("Bắt đầu upload...")
        if (!newAvatar || !(currentUser?._id)) {
            console.log("Không có file hoặc user ID:", { newAvatar, userId: currentUser?._id })
            return
        }
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("file", newAvatar)
            console.log("FormData trước khi gửi:", {
                file: newAvatar,
                fileName: newAvatar.name,
                fileType: newAvatar.type,
                fileSize: newAvatar.size
            })

            console.log("Đang gửi request đến:", `/Users/${currentUser?._id}/avatar`)
            const response = await axiosPrivate.post(`/Users/${currentUser?._id}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log("Response từ server:", response)
            if (response.status === 200) {
                const newAvatarUrl = response.data.url
                console.log("New avatar URL:", newAvatarUrl)

                // Tạo timestamp để force refresh
                const timestamp = Date.now()
                const avatarUrlWithTimestamp = `${newAvatarUrl}?t=${timestamp}`

                // Cập nhật thông tin user trong Redux store
                if (currentUser) {
                    const updatedUser = {
                        ...currentUser,
                        avatarUrl: newAvatarUrl // Lưu URL gốc vào store
                    }
                    console.log("Updating user in Redux store:", updatedUser)
                    dispatch(updateUser(updatedUser))

                    // Kiểm tra localStorage sau khi cập nhật
                    setTimeout(() => {
                        const storedUser = localStorage.getItem("user")
                        console.log("localStorage sau khi cập nhật:", storedUser)
                        if (storedUser) {
                            const parsedUser = JSON.parse(storedUser)
                            console.log("Avatar URL trong localStorage:", parsedUser.avatarUrl)
                        }
                    }, 100)
                }

                // Cập nhật local state với timestamp để force refresh
                setAvatarUrl(avatarUrlWithTimestamp)
                setNewAvatar(null)

                // Force refresh toàn bộ avatar images trên trang
                const avatarImages = document.querySelectorAll('img[src*="avatar"]')
                avatarImages.forEach((img: Element) => {
                    const imgElement = img as HTMLImageElement
                    const originalSrc = imgElement.src.split('?')[0] // Remove existing query params
                    imgElement.src = `${originalSrc}?t=${timestamp}`
                })

                CustomSuccessToast("Cập nhật ảnh đại diện thành công!")
            }
        } catch (error) {
            console.error("Error uploading avatar:", error)
            CustomFailedToast("Cập nhật ảnh đại diện thất bại!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className="rounded-full w-24 h-24 object-cover mx-auto cursor-pointer">
                    <AvatarImage
                        src={avatarUrl}
                        key={avatarUrl} // Force re-render when URL changes
                    />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-72 bg-white">
                <Card className="p-4 space-y-4">
                    <p className="text-sm font-medium text-center">Cập nhật ảnh đại diện</p>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    <Button
                        onClick={() => {
                            console.log("Button clicked")
                            handleUpload()
                        }}
                        disabled={!newAvatar || loading}
                    >
                        {loading ? "Đang tải..." : "Cập nhật"}
                    </Button>
                </Card>
            </PopoverContent>
        </Popover>
    )
}