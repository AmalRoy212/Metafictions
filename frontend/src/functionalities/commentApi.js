import axios from "../configs/axios";
import { toast } from "react-toastify";



//common call
export const findAllComments = ({token,setAllComments}) => {
 axios.get('/users/comment',{
  headers:{
    Authorization: `Bearer ${token}`
  }
 }).then((res) => {
  setAllComments(res.data);
 })
}

//creating comment
export const createComment = async function ({postId,content,token}) {
  axios.put('/users/comment',{
    postId,
    content
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    toast.success("Commented Succesfully");
  }).catch((err) => {
    toast.error("An error occured please try again later");
  })
}

//delete comment
export const deleteComment = ({ commentId, token, postId }) => {

  axios.patch('/users/delete/comment',{
    postId,
    commentId
  }, {
    headers:{
      Authorization : `Bearer ${token}`
    }
  }).then((res) => {
    toast.success("Comment deleted "+res.data.message);
  })
}