import React, {useState} from 'react'
import {FaStar} from 'react-icons/fa'

export default function Ratings(props) {
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
                                    onClick={() => {
                                        setRating(ratingValue)
                                        props.rating(ratingValue, props.type)
                                    }}
                                    className='star-radio' 
                                />
                                <FaStar 
                                    className='rating-star' 
                                    color={ratingValue <= (hover || rating) ? '#C13540' : "black"} 
                                    size={60} 
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
