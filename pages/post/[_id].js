import React from 'react'
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import {toast} from "react-toastify";
import { RollbackOutlined } from '@ant-design/icons';
import Post2 from '../../components/cards/Post2';
import Link from "next/link"

const PostComments= () => {
    const [post,setPost]  = useState({});
    const router = useRouter();
    const _id = router.query._id;
    

useEffect(() => {
    if(_id)fetchPost();
}, [_id])

const fetchPost = async () => {
    try{
        const { data } = await axios.get(
          `https://mernsocialapp-udemy.herokuapp.com/user-post/${_id}`
        );
    setPost(data);
    }catch(err)
    {
        console.log(err);
    }
}

const removeComment = async (postId, comment) => {
    let answer = window.confirm ("Are you sure?");
    if(!answer)return;
    try{
        const { data } = await axios.put(
          "https://mernsocialapp-udemy.herokuapp.com/remove-comment",
          {
            postId,
            comment,
          }
        );
        fetchPost();
    } catch(err){
        console.log(err);
    }
}

    return (
      <div className="container">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>VANCE</h1>
          </div>
        </div>
        <div className="container col-md-8 offset-md-2 pt-5">
          <Post2
            post={post}
          commentsCount = {100}
          removeComment={removeComment}
          />
        </div>

<Link href = "/user/dashboard">
    <a className = "d-flex justify-content-center p-5"><RollbackOutlined/></a>
</Link>

      </div>
    );
}

export default PostComments
