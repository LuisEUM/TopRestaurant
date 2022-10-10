import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Section } from "../../components";
import {
  commentRestaurant,
  getRestaurant,
  likeRestaurant,
} from "../../services/top-restaurant-service";

function DetailScreen() {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getRestaurant(id).then((restaurant) => setRestaurant(restaurant));
  }, [id]);

  const handleLike = () => {
    likeRestaurant(id).then((data) => {
      setRestaurant({
        ...restaurant,
        likes: data.likes ? restaurant.likes + 1 : restaurant.likes - 1,
      });
    });
  };

  const handleNewComment = (e) => {
    e.preventDefault();
    const form = e.target;

    commentRestaurant(id, form.text.value).then((comment) => {
      setRestaurant({
        ...restaurant,
        comments: [...restaurant.comments, comment],
      });
    });
  };

  if (!restaurant) {
    return <></>;
  }

  return (
    <Section title="Detail" icon="wpexplorer">
      <div className="row">
        <div className="col-4">
          <img src={restaurant.thumbnail} alt="thumbnail" className="w-100" />
        </div>
        <div className="col-8">
          <h5>{restaurant.title}</h5>
          <p>{restaurant.description}</p>
          <p>
            <a href={restaurant.url} target="_blank" rel="noreferrer">
              {restaurant.url}
            </a>
          </p>
          <p>Category: {restaurant.category}</p>
          <p>Views: {restaurant.views}</p>
          <button className="btn btn-danger" onClick={handleLike}>
            <i className="fa fa-heart me-2"></i>
            {restaurant.likes}
          </button>
        </div>
      </div>

      <hr />

      <h5>Comments</h5>

      <form onSubmit={handleNewComment} className="mb-3">
        <textarea
          name="text"
          className="form-control mb-2"
          placeholder="Add Comment..."
        />
        <button type="submit" className="btn btn-sm btn-primary">
          Comment
        </button>
      </form>

      {restaurant.comments.map((comment) => (
        <div className="mb-4 border-bottom py-2">
          <p>{comment.text}</p>
          <small>Por {comment.user.name}</small>
        </div>
      ))}
    </Section>
  );
}

export default DetailScreen;
