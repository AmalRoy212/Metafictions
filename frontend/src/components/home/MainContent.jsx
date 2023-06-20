import React, { useContext, useState } from "react";
import Feed from "./Feeds";
import { Form } from 'react-bootstrap';
import { FaGlobeAmericas, FaUserFriends, FaUserLock } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { FirebaseContext } from "../../contexts/firebaseContexts"
import { userCreatePost } from "../../functionalities/userApiFunctionalities";


export default function Maincontent({ data, posts }) {

  const { firebase } = useContext(FirebaseContext);

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [discription, setDiscription] = useState('')
  const [media, setMedia] = useState('');

  const submitHandler = async function (e) {
    e.preventDefault();
    const userId = data.userId;

    await userCreatePost({
      media,
      firebase,
      discription,
      userId,
      token,
      dispatch,
      setDiscription,
      setMedia
    })
  }
  return (
    <>
      <div className="col-md-6 gedf-main" style={{marginBottom:"10px"}}>
        <div className="card gedf-card" style={{backgroundColor:'white',borderRadius:"20px"}}>
          <div className="card-header">
            <ul
              className="nav nav-tabs card-header-tabs"
              id="myTab"
              role="tablist"
              style={{ borderRadius: "20px" }}
            >
              <li className="nav-item">
                <a
                  className="nav-link active bg-secondary text-white rounded-pill m-1"
                  id="posts-tab"
                  data-toggle="tab"
                  href="#posts"
                  role="tab"
                  aria-controls="posts"
                  aria-selected="true"
                >
                  Post
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="posts"
                role="tabpanel"
                aria-labelledby="posts-tab"
              >
                <Form.Group className='my-2' controlId='name'>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {media && <img style={{ objectFit: 'cover', border: '2px solid black', borderRadius: '20px' }} className='m2' alt="Posts" width="500px" height="200px" src={media ? URL.createObjectURL(media) : ''}></img>}
                  </div>
                  <br />
                  <input style={{ width: '99%', border: '1px solid #ced4da', borderRadius: '5px' }} className='m-1 p-1' name='imgSrc' onChange={(e) => setMedia(e.target.files[0])} type="file" />
                  {/* <button type="file">add</button> */}
                </Form.Group>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    placeholder="What are you thinking?"
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="btn-toolbar justify-content-between">
              <div className="btn-group" style={{ marginTop: '.5rem' }}>
                <button type="submit" className="btn btn-primary" onClick={submitHandler}>
                  share
                </button>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <a className="dropdown-item" href="#">
                  <button
                    type="button"
                    className="btn btn-link"
                    style={{ textDecoration: 'none' }}
                  >
                    <FaGlobeAmericas /> <span style={{ marginTop: "5px" }}> Public</span>
                  </button>
                </a>
                <a className="dropdown-item" href="#">
                  <button
                    type="button"
                    className="btn btn-link"
                    style={{ textDecoration: 'none' }}
                  >
                    <FaUserFriends /> <span style={{ marginTop: "5px" }}> Friends</span>
                  </button>
                </a>
                <a className="dropdown-item" href="#">
                  <button
                    type="button"
                    className="btn btn-link"
                    style={{ textDecoration: 'none' }}
                  >
                    <FaUserLock /> <span style={{ marginTop: "5px" }}> Just me</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Feed posts={posts} />
      </div>
    </>
  );
}
