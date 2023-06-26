import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap';
import { updateUser } from '../../../functionalities/userApiFunctionalities';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseContext } from "../../../contexts/firebaseContexts";
import { clearLoading, setLoading } from '../../../redux-toolkit/loadingSlice';

function UpdateUser({ data, setEdit }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const { firebase } = useContext(FirebaseContext)


  const submitHandler = (e) => {
    e.preventDefault();
    if(image === '') setImage(data.imgSrc)
    updateUser({
      firebase,
      token,
      name,
      email,
      password,
      image,
      dispatch,
      setName,
      setEmail,
      setPassword,
      setConfirmPassword,
      setImage
    })
    setEdit(false)
  }

  return (
    <div>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(28, 28, 28, 0.32)",
        overflow: "hidden"
      }}>
        <div style={{
          width: "80%",
          border: "2px solid grey",
          borderRadius: "30px",
          boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.526)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(10, 10, 10, 0.474)",
          backdropFilter: "blur(10px)",
        }}>
          <Form style={{ color: "white" }}>
            <Form.Group className='my-2' controlId='name'>
              <br />
              <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                  image ? (
                    <img
                      style={{
                        objectFit: 'cover',
                        border: '2px solid black',
                        borderRadius: '50%'
                      }}
                      className='m2'
                      alt="Posts"
                      width="150px"
                      height="150px"
                      src={URL.createObjectURL(image)}
                    />
                  ) : (
                    <img
                      style={{
                        objectFit: 'cover',
                        border: '2px solid black',
                        borderRadius: '50%'
                      }}
                      className='m2'
                      alt="Placeholder"
                      width="150px"
                      height="150px"
                      src={data?.imgSrc}
                    />
                  )
                }
              </div>

              <input style={{ width: '99%', border: '1px solid #ced4da', borderRadius: '5px' }} className='m-1 p-1' name='imgSrc' onChange={(e) => setImage(e.target.files[0])} type="file" />
            </Form.Group>

            <Form.Group className='my-2' controlId='name'>
              <Form.Label style={{ float: 'left' }}>Name </Form.Label>
              <Form.Control
                type='text'
                placeholder={data?.name}
                value={name}
                onChange={(e) => setName(e.target.value)}>
              </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label style={{ float: 'left' }}>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder={data?.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
              </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
              <Form.Label style={{ float: 'left' }}>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Please enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='confirmPassword'>
              <Form.Label style={{ float: 'left' }}>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}>
              </Form.Control>
            </Form.Group>

            <Button variant='warning' className='mt-3 m-3' onClick={() => setEdit(false)}>Close</Button>
            <Button type='submit' onClick={(e) => submitHandler(e)} variant='primary' className='mt-3 m-3' style={{ marginLeft: '1rem' }}>Update</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser
