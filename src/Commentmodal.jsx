import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentModal({ onClose, blogId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const[render,setREnder]=useState(false)

  const authid=7

  const baseurl = 'http://127.0.0.1:8000';
  const axiosInstance = axios.create({
    baseURL: baseurl,
  });

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`api/comments/${blogId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, render);

  const handleAddComment = async () => {
    try {
      const response = await axiosInstance.post('api/addcommenst/', {
        blog: blogId,
        author: authid, 
        content: newComment,
      });
      if(response.status===201){
        console.log('success')
        if (render==false){
            setREnder(true)
        }else{
            setREnder(false)
        }
      }
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Comments</h2>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className =' bg-black'onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default CommentModal;
