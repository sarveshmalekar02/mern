import React, { useState } from 'react';
import axios from 'axios';
import nature from '../../images/nature.jpeg';
import nature1 from '../../images/nature1.jpeg';
import './post.css';

const Post = () => {

  
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const [posts, setPosts] = useState([
    {
      _id: 1,
      title: 'First Post',
      likes: 10,
      comments: [{ text: 'Great post!' }, { text: 'Looking forward to more!' }],
      imageUrl: nature1
    },
    {
      _id: 2,
      title: 'Second Post',
      likes: 5,
      comments: [{ text: 'Nice one!' }, { text: 'Keep it up!' }],
      imageUrl: nature
    }
  ]);

  const handleLike = async (postId) => {
    try {
      const updatedPosts = posts.map(post => {
        if (post._id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
      setPosts(updatedPosts);

      const response = await axios.post(`/api/posts/${postId}/like`);
      console.log(response.data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId) => {
    try {
      const updatedPosts = posts.map(post => {
        if (post._id === postId) {
          return { ...post, comments: [...post.comments, { text: comment }] };
        }
        return post;
      });
      setPosts(updatedPosts);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post._id !== postId);
    setPosts(updatedPosts);
  };

  const handleAddPost = () => {
    const newPost = {
      _id: posts.length + 1,
      title: `Post ${posts.length + 1}`,
      content: `This is the content of post ${posts.length + 1}`,
      likes: 0,
      comments: [],
      imageUrl: image ? URL.createObjectURL(image) : 'https://via.placeholder.com/150' // Display uploaded image or use placeholder
    };
    setPosts([...posts, newPost]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <h2>Posts</h2>
      <div>
        {posts.map((post) => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <img src={post.imageUrl} alt="Post" className="post-image" />
            <p>Likes: {post.likes}</p>
            <button onClick={() => handleLike(post._id)}>Like</button>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            <hr />
            <h4>Comments</h4>
            <ul className="comments">
              {post.comments.map((comment, index) => (
                <li key={index}>{comment.text}</li>
              ))}
            </ul>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={() => handleComment(post._id)}>Add Comment</button>
          </div>
        ))}
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default Post;
