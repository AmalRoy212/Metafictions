import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findMyFolloData } from '../../../functionalities/userApiFunctionalities';
import Table from './FollowTable';
import { Button } from 'react-bootstrap';
import { FaRegWindowClose } from "react-icons/fa";
import { clearFollowDetails } from '../../../redux-toolkit/actionManagerSlice';

function FollowersCounts() {
  const followCount = useSelector((state) => state.post.followCount);
  const { token } = useSelector((state) => state.auth);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowings] = useState([]);
  const [isDivActive, setIsDivActive] = useState(false);
  const [active, setActive] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    findMyFolloData({ token, setFollowers, setFollowings, dispatch });
  }, [followCount]);

  useEffect(() => {
    document.body.style.overflow = isDivActive ? 'hidden' : 'auto';
  }, [isDivActive]);

  return (
    <div>
      <div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(28, 28, 28, 0.32)',
            overflow: 'hidden',
            height: "100vh"
          }}
        >
          <div
            style={{
              border: '2px solid grey',
              borderRadius: '30px',
              boxShadow: '0px 0px 0px rgba(255, 255, 255, 0.526)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(10, 10, 10, 0.474)',
              backdropFilter: 'blur(10px)',
              padding: '1rem',
              maxHeight: '60vh',
            }}
            onMouseEnter={() => setIsDivActive(true)}
            onMouseLeave={() => setIsDivActive(false)}
          >

            <div className='bg-dark' style={{ maxWidth: '80vw', maxHeight: "50vh", overflowY: "auto",overflowX:"hidden", borderRadius: "20px" }}>
              <div className='bg-dark' style={{ width: "100%", display: "flex", justifyContent: "center", padding: "1rem" }}>
                <Button variant='dark' onClick={() => setActive(true)}>Followers</Button>
                <Button variant='dark' onClick={() => setActive(false)}>Followings</Button>
                <div className='d-flex justify-content-end' style={{width:"100%"}}>
                  <Button variant='dark' onClick={() => dispatch(clearFollowDetails())}><FaRegWindowClose size={25}/></Button>
                </div>
              </div>
              {active ? <Table data={followers} /> : <Table data={following} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowersCounts;
