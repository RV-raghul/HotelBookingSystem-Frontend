import React,{useEffect, useState} from 'react'
import hotelService from  '../../service/hotel.service'
import ReviewCard from './ReviewCard';
import  { ThreeCircles } from 'react-loader-spinner'

function Review() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchReviews = async() => {
        try {
        const res = await hotelService.getAllReviews();
        setLoading(true);
        setReviews(res.data);
        }
        catch(error){
            console.error("Failed to fetch reviews:", error);
        } finally {
          setLoading(false);
        }
    }
    

    useEffect(() => {
      setTimeout(() =>{
        fetchReviews()
      },1500)
      
     },[])


     const deleteReview = async (id) => {
        try {
          await hotelService.deleteReviewById(id);
          fetchReviews(); // Refresh reviews
        } catch (err) {
          console.log(err.message)
        }
      };
    
  return (
    <div className="p-4">
        {loading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#000000"
            ariaLabel="three-circles-loading"
          />
        </div>
      ) : reviews.length > 0 ? (
        <div className="p-4 flex flex-wrap gap-4 justify-center">
       { reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} onDelete={deleteReview} />
        ))
      }
      </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-8">
          No reviews available.
        </div>
      )}
    </div>
  
  )
}

export default Review
