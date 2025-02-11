"use client"
import { useState, useEffect } from "react";
import { Star, MessageCircle } from 'lucide-react';
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface Review {
  _id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const ReviewsSection: React.FC<{ productId: string }> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 0,
    comment: ''
  });

  useEffect(() => {
    async function fetchReviews() {
      try {
        const fetchedReviews: Review[] = await client.fetch(
          groq`*[_type == "review" && productId == $productId] {
            _id, userName, rating, comment, createdAt
          }`,
          { productId }
        );
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchReviews();
  }, [productId]);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const review = {
        _type: 'review',
        productId: productId,
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date().toISOString()
      };

      const submittedReview = await client.create(review);
      
      setReviews([...reviews, submittedReview]);
      setNewReview({ userName: '', rating: 0, comment: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`inline-block ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`} 
        size={20} 
      />
    ));
  };

  return (
    <div className="mt-4">
      <div 
        onClick={() => setIsModalOpen(true)} 
        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
      >
        <div className="flex">
          {renderStars(Math.round(averageRating))}
        </div>
        <span className="text-gray-600">
          ({reviews.length} reviews)
        </span>
        <MessageCircle className="text-gray-500" size={20} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Product Reviews</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Existing Reviews */}
            <div className="space-y-4 mb-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{review.userName}</h4>
                    <div>{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Review Submission Form */}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name"
                value={newReview.userName}
                onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                className="w-full border rounded p-2" 
                required 
              />
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({...newReview, rating: star})}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`${
                        star <= newReview.rating 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-300'
                      }`} 
                      size={24} 
                    />
                  </button>
                ))}
              </div>
              <textarea 
                placeholder="Write your review"
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                className="w-full border rounded p-2" 
                rows={4} 
                required 
              />
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;