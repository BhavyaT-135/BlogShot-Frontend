import axios from "axios";
import React from './singlePost.css'
import { useLocation } from 'react-router'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from '../../context/Context'
import scenery from "../../assets/scenery.jpg";

export default function SinglePost() {

    const PF = "http://localhost:5000/images/"
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path])

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {
                data: { username: user.username }});
            window.location.replace("/")
        } catch (error) {}
    }

    const handleUpdate = async () => {
        try {
            await axios.put("/posts/" + path, {
                username: user.username, title, desc
            });
            setUpdateMode(false)
        } catch (error) {}
    }

    return (
      <div className='singlePost'>
          <div className='singlePostWrapper'>
            {post.photo && (
                <img
                  src={(post.photo) ? PF + post.photo : scenery}
                  alt=''
                  className='singlePostImg'
                />
            )}{
                updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)}/> :
                (
                    <h1 className='singlePostTitle'>
                        {title} 
                        {post.username === user?.username && (
                            <div className='singlePostEdit'>
                                <i className='singlePostIcon far fa-edit' onClick={() => setUpdateMode(true)}></i>
                                <i className='singlePostIcon far fa-trash-alt' onClick={handleDelete}></i>
                            </div>
                        )}  
                    </h1>            
                )        
            }
              <div className='singlePostInfo'>
                    <span className='singlePostAuthor'>
                        Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                        </span>
                  <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
              </div>
                {
                    updateMode ? (
                        <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    ) : (
                        <p className='singlePostDesc'>
                            {desc}
                        </p>
                    )
                }
                {
                    updateMode && (
                        <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                    )
                }
          </div>
      </div>
  )
}