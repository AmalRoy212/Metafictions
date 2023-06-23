import axios from "../configs/axios";


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
  console.log(token);
  axios.put('/users/comment',{
    postId,
    content
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

//delete comment
export const deleteComment = ({ _id, token }) => {
  axios.delete(`users.comment/delete?_id=${_id}`,{
    headers:{
      Authorization : `Bearer ${token}`
    }
  }).then((res) => {
    console.log(res.data);
  })
}