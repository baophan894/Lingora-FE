import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";

interface Review {
  id: number;
  studentName: string;
  studentAvatar: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  className: string;
  verified: boolean;
}

interface CourseReviewsProps {
  courseId: number;
}

export default function CourseReviews({ courseId }: CourseReviewsProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('newest');

  // Mock data - trong thực tế sẽ fetch từ API
  const reviews: Review[] = [
    {
      id: 1,
      studentName: "Nguyễn Văn A",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-15",
      content: "Khóa học rất tuyệt vời! Giáo viên nhiệt tình, tài liệu đầy đủ. Sau 3 tháng học tôi đã có thể giao tiếp cơ bản bằng tiếng Nhật. Đặc biệt cách giải thích ngữ pháp rất dễ hiểu.",
      helpful: 12,
      className: "JLPT N5 - Lớp A",
      verified: true
    },
    {
      id: 2,
      studentName: "Trần Thị B",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2024-01-10",
      content: "Nội dung bài học được sắp xếp khoa học, từ dễ đến khó. Tuy nhiên tôi mong muốn có thêm nhiều bài tập thực hành hơn nữa.",
      helpful: 8,
      className: "JLPT N5 - Lớp B",
      verified: true
    },
    {
      id: 3,
      studentName: "Lê Minh C",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-05",
      content: "Mình đã học nhiều khóa tiếng Nhật khác nhưng khóa này là tốt nhất. Sensei rất tận tâm, luôn sẵn sàng giải đáp thắc mắc. Recommend cho mọi người!",
      helpful: 15,
      className: "JLPT N5 - Lớp A",
      verified: true
    },
    {
      id: 4,
      studentName: "Phạm Thị D",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2023-12-28",
      content: "Khóa học có chất lượng tốt, phù hợp với người mới bắt đầu. Thời gian học hợp lý, không quá nặng.",
      helpful: 6,
      className: "JLPT N5 - Lớp C",
      verified: true
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tổng quan đánh giá */}
      <Card>
        <CardHeader>
          <CardTitle>Đánh giá tổng quan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-navy-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating))}
              <div className="text-gray-600 mt-2">
                Dựa trên {reviews.length} đánh giá
              </div>
            </div>
            
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bộ lọc đánh giá */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Đánh giá từ học viên</h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'newest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('newest')}
          >
            Mới nhất
          </Button>
          <Button
            variant={sortBy === 'helpful' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('helpful')}
          >
            Hữu ích nhất
          </Button>
          <Button
            variant={sortBy === 'rating' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('rating')}
          >
            Đánh giá cao
          </Button>
        </div>
      </div>

      {/* Danh sách đánh giá */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={review.studentAvatar}
                  alt={review.studentName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{review.studentName}</h4>
                        {review.verified && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                            Đã xác thực
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{review.className}</div>
                    </div>
                    <div className="text-right">
                      {renderStars(review.rating, 'sm')}
                      <div className="text-sm text-gray-500 mt-1">
                        {new Date(review.date).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {review.content}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                      <ThumbsUp className="h-4 w-4" />
                      Hữu ích ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                      <MessageCircle className="h-4 w-4" />
                      Trả lời
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nút xem thêm */}
      <div className="text-center">
        <Button variant="outline">
          Xem thêm đánh giá
        </Button>
      </div>
    </div>
  );
}
