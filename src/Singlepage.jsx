import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Commentmodal from './Commentmodal';

function Singlepage() {
  const location = useLocation();
  const blog = location.state.blog;
  const blogId = blog.id;
  const baseurl = 'http://127.0.0.1:8000';
  const axiosInstance = axios.create({
    baseURL: baseurl,
  });
  const [blogDetails, setBlogDetails] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const getBlogDetails = async () => {
    try {
      const res = await axiosInstance.get(`api/apiblog/${blogId}`);
      if (res.status === 200) {
        setBlogDetails(res.data);
      }
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, []);

  const handleCommentClick = () => {
    setShowCommentModal(true); // Open the comment modal
  };

  return (
    <div className="container">
      {blogDetails && (
        <div>
          <h2>{blogDetails.title}</h2>
          <img src='src/images/car2-fotor-202312132058.jpg' className="blog-image" />
          <p>{blogDetails.content}</p>
          <p>Author: {blogDetails.author.user.username}</p>
          <p>Category: {blogDetails.category.name}</p>
          <p>Tags: {blogDetails.tags.map(tag => tag.name).join(', ')}</p>
          <button onClick={handleCommentClick} className="comment-button">
            <FontAwesomeIcon icon={faComment} className="comment-icon" />
            Comments
          </button>
        </div>
      )}
      {showCommentModal && (
        <Commentmodal onClose={() => setShowCommentModal(false)} blogId={blogId} />
      )}
    </div>
  );
}

export default Singlepage;
