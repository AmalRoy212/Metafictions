import React from 'react';
import { useNavigate } from "react-router-dom";

export default function FollowTable({data}) {

  const navigate = useNavigate();

  console.log(data);

  return (
    <table className='table table-borderless table-dark m-2' style={{maxWidth:"100%"}}>
      <thead>
        <tr>
          <th scope="col">Users</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((user,index) => (
          <tr style={{cursor:"pointer"}} onClick={() => navigate(`/friends/profile/${user.id}`)} key={index}>
            <td>
              <img src={user?.imgSrc} style={{width:"30px",height:"30px",objectFit:"cover",borderRadius:"50%",marginRight:"1rem"}} alt="dp" />
              {user?.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}