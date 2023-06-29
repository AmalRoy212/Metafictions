import React, { useState, useEffect } from "react";
import "./SecondFeed.css";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaSteamSymbol, FaCommentDots, FaHeart, FaRegThumbsUp, FaSafari, FaPrescriptionBottleAlt } from "react-icons/fa";
import CommentBox from "../commentBox/CommentBox";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../functionalities/userApiFunctionalities";
import { incrementFollowCount, setLiked, setPopUp, setPostId } from "../../redux-toolkit/actionManagerSlice";
import PopUp from "../popUp/PopUp";

const THROTTLE_TIME = 1500;

function CommentsSection(props) {
  if (props["show-comments"] === false) {
    return null;
  }

  return (
    <section className="post-comments">
      <CommentBox data={props.data} postId={props.postId}/>
    </section>
  );
}

function ReactFace(props) {
  const { type, currentId } = props;

  let faceClassName = `react-face ${type}`;

  return (
    <div
      style={{ width: "50px", height: "50px" }}
      onClick={() => props.likeHandler(currentId)}
      className={faceClassName}
    ></div>
  );
}

function SecondFeed({ posts }) {
  const [isShowComments, setIsShowComments] = useState(false);
  const [isShowReactPopup, setIsShowReactPopup] = useState(false);
  const [isReactHiding, setIsReactHiding] = useState(false);
  const [currentId , setCurrentId ] = useState('');

  const popUp = useSelector((state) => state.post.popUp);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    dispatch(setPopUp());
    dispatch(setPostId(id));
  };

  const likeHandler = async function (id) {
    dispatch(setLiked());
    const amILiked = await likePost({ id, token });
    setIsReactHiding(true)
    dispatch(incrementFollowCount());
  };

  let reactPopup = null;

  // console.log(posts, data);

  if (isShowReactPopup === true) {
    let reactPopupClassName = "post-react-popup";

    if (isReactHiding === true) {
      reactPopupClassName += " hiding";
    }

    reactPopup = (
      <div
        style={{ width: "20%" }}
        className={reactPopupClassName}
        onMouseOver={() => {
          setIsShowReactPopup(true);
          setIsReactHiding(false);
        }}
        onMouseLeave={() => {
          setIsReactHiding(true);
        }}
        onAnimationEnd={(evt) => {
          if (evt.animationName === "hide") {
            setIsShowReactPopup(false);
          }
        }}
      >
        <ReactFace likeHandler={likeHandler} currentId={currentId} setIsReactHiding={setIsReactHiding} type="love" />
        {/* <ReactFace type="smile" />
        <ReactFace type="happy" />
        <ReactFace type="sad" />
        <ReactFace type="angry" /> */}
      </div>
    );
  }

  return (
    <>
      {popUp && <PopUp message={"Are sure about the deletion ..!"} />}
      {posts?.map((post, index) => (
        <article key={index} className="post" style={{ marginTop: "1rem" }}>
          <header className="post-header">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mr-2">
                    <img
                      className="rounded-circle"
                      width="50px"
                      height="50px"
                      src={post?.userDp}
                      alt="dp"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="ml-2">
                    <div className="h5 m-0 text-black m-1">{post?.userName}</div>
                  </div>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="transperent" id="dropdown-basic">
                    <FaSteamSymbol />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => deleteHandler(post._id)} ><FaPrescriptionBottleAlt /> Delete </Dropdown.Item>
                    {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/* <h2 style={{color:"black"}}>{post.userName}</h2> */}
          </header>
          <section className="post-top">
            {/* <PersonDisplay data={{}} show-icon={true} /> */}
          </section>
          <section className="post-content">
            <div className="card-body">
              <div className="h7 text-black mb-2">
                {" "}
                <FaSafari /> <span style={{ fontSize: "small" }}> {post?.date}</span>
              </div>

              <p className="card-text text-black">
                {post?.discription}
              </p>
            </div>
            {post?.content && (
              <>
                <div className="container p-3">
                  <div className="row">
                    <div className="col-md-12">
                      <img src={post?.content} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                    </div>
                  </div>
                </div>
              </>
            )}
            <p>{/* Content */}</p>
            <p className="content-reactions">
              <i className="far fa-thumbs-up"></i>
              <span className="margin-left-quarter" style={{ color: "black" }}>
                <a style={{ textDecoration: "none", color: "black" }} className="card-link">
                  <FaHeart color="red" /> {post?.likes.length}
                </a>
              </span>
              <span className="margin-left-quarter text-dark">reactions</span>
              <a style={{ textDecoration: "none", color: "black", marginLeft: "1rem" }} className="card-link">
                <FaCommentDots color="green" /> {post?.comment.length} Comment
              </a>
            </p>
            {reactPopup}
          </section>
          <section className="post-commands" style={{ width: "100%", display: 'flex', flexDirection: "row" }}>
            <button
              className="post-button"
              onMouseOver={() => {
                setIsShowReactPopup(true);
                setIsReactHiding(false);
                setCurrentId(post._id);
              }}
              onMouseLeave={() => {
                setIsReactHiding(true);
                // setCurrentId('');
              }}
              style={{ width: "40%" }}
            >
              <i className="far fa-thumbs-up"></i>
              <span style={{ color: "black" }}>Reaction</span>
            </button>
            <button
              className="post-button"
              onClick={(evt) => {
                setIsShowComments(true);
              }}
              style={{ width: "40%" }}
            >
              <i className="far fa-comment"></i>
              <span>Comment</span>
            </button>
          </section>
          <CommentsSection show-comments={isShowComments} data={post.comment} postId={post._id} />
        </article>
      ))}

    </>
  );
}

export default SecondFeed;
