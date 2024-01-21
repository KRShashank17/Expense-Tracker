import React, {useState , useEffect} from 'react'
import {Form, Input , message} from 'antd'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Register = () => {
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);

  // on submit
  const submitHandler = async(values)=>{
    try {
      setLoading(true);
      await axios.post('/users/register', values);
      message.success("Registration Successful");
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      message.error("Reg - Something Went Wrong");
    }
  }

  // prevent
  useEffect(() =>{
    if (localStorage.getItem('user'))
      navigate('/')
  },[navigate])

  return (
    <>
      <div className='register-style'>
        {loading && <Spinner/> }

        <Form layout='vertical'  onFinish={submitHandler}>
          <h1>Register</h1>
          <Form.Item label="Name" name="name">
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder='EMAIL' type='email'/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder='PASSWORD' type='password'/>
          </Form.Item>

          <div className='d-flex justify-content-between'>
            <Link to={"/login"}>Already registered ? LOGIN</Link>
            <button className='btn btn-primary'>Register</button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Register