import React from 'react';
import "./FollowTable.css";

export default function FollowTable({data}) {
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
          <tr key={index}>
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