import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    //edit false means jo product rating ke star hai bo abhi select ni ho payge
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomoto",
    size: window.innerWidth < 600 ? "20" : "25",
    value: review.rating,
    isHalf: true,
  };
  // console.log("response: ", window.innerWidth, review);
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
