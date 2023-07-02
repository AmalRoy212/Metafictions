import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { findingFriendsData, followUser, unfollowUsers } from '../../../functionalities/userApiFunctionalities';
import { useDispatch, useSelector } from 'react-redux';
import SecondFeeds from "../../home/SecondFeed";
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaEarlybirds, FaKeybase, FaTelegramPlane, FaWaze } from "react-icons/fa";

export default function OthersProfile() {

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [event , setEvent] = useState(false)
  const { userId } = useParams()

  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth);
  const { count } = useSelector((state) => state.post);

  useEffect(() => {
    findingFriendsData({token,userId,setPosts,setUser,dispatch,setEvent})
  },[event])

  const followBackHanlder = (_id) => {
    setEvent(true);
    followUser({_id,token,dispatch});
  }

  const unFollowHandler = (followId) => {
    setEvent(true);
    unfollowUsers({followId,token,dispatch})
  }

  return (
    <>
    <div className="col-md-9 gedf-main" style={{ marginBottom: "10px",borderRadius:"20px", backgroundColor:"#F1F1F1", marginTop:"1rem", maxHeight:"100vh", overflow:"auto"}}>
      <div className="gradient-custom-2" style={{borderRadius:"20px"}}>
        <MDBContainer className="w-100 h-100 px-0" style={{borderRadius:"20px"}}>
          <MDBRow className="justify-content-center align-items-center h-100" style={{borderRadius:"20px"}}>
            <MDBCol lg="9" xl="12" style={{borderRadius:"20px"}}>
              <MDBCard style={{borderRadius:"20px"}}>
                <div className="text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px', borderRadius:"20px 20px 0 0" }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px',height:"150px" }}>
                    <MDBCardImage src={user?.imgSrc}
                      alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1',height:'150px', objectFit:"cover" }} />
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <MDBTypography tag="h5">{user?.name}</MDBTypography>
                    <MDBCardText>{user?.email}</MDBCardText>
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                  <div style={{width:"80%",height:"50px"}} className="d-flex justify-content-start text-center py-1">
                    {user?.canFollow &&
                      <Button variant='primary'
                        onClick={() => followBackHanlder(user?._id)}
                      ><FaKeybase size={20}/> Follow</Button>
                    }
                    {user?.canFollowBack &&
                      <Button variant='success' style={{marginLeft:"5px"}}
                        onClick={() => followBackHanlder(user?._id)}
                      ><FaWaze size={20}/> Follow Back</Button>
                    }
                    {user?.canUnfollow && 
                      <Button variant='danger' style={{marginLeft:"5px"}}
                      onClick={() => unFollowHandler(user?._id)}
                      ><FaEarlybirds size={20}/> Unfollow</Button>
                    }
                    <Button variant='warning' style={{marginLeft:"5px"}}><FaTelegramPlane/> Message</Button>
                  </div>
                    <div>
                      <MDBCardText className="mb-1 h5">{user?.post?.length}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Posts</MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">{user?.followers?.length}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">{user?.following?.length}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                    </div>
                  </div>
                </div>
                
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{user?.email}</MDBCardText>
                      {/* <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                      <MDBCardText className="font-italic mb-0">Photographer</MDBCardText> */}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">Recent Posts</MDBCardText>
                    <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                  </div>
                  <MDBRow>
                    {/* <MDBCol className="mb-12">
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                        alt="image 1" className="w-100 rounded-3" />
                    </MDBCol>
                    <MDBCol className="mb-4">
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                        alt="image 1" className="w-100 rounded-3" />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="g-2">
                    <MDBCol className="mb-2">
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                        alt="image 1" className="w-100 rounded-3" />
                    </MDBCol>
                    <MDBCol className="mb-2">
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                        alt="image 1" className="w-100 rounded-3" />
                    </MDBCol> */}
                    <SecondFeeds posts={posts}  />
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
    </>
  );
}