import React, {useState} from 'react'
import {FaStar} from 'react-icons/fa'

export default function Ratings() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null)

    const starRating = (
        <div>
            {
                [...Array(5)].map((star, i) => {
                    const ratingValue = i + 1

                    return (
                            <label key={ratingValue}>
                                <input 
                                    type='radio' 
                                    value={ratingValue} 
                                    onClick={() => setRating(ratingValue)}
                                    className='star-radio' 
                                />
                                <FaStar 
                                    className='rating-star' 
                                    color={ratingValue <= (hover || rating) ? 'yellow' : "grey"} 
                                    size={80} 
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label> 
                    )
                })
            }
        </div>
    )
    return (
        <div>
            {starRating}
        </div>
    )
}
