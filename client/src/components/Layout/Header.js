import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import {message} from 'antd'
import "../../styles/HeaderStyles.css"

const Header = () => {
  const [loginUser , setLoginUser] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user)
      setLoginUser(user);
  },[])

  const navigate = useNavigate();
  const logoutHandler = ()=>{
    localStorage.removeItem('user');
    message.success('Logout Successful');
    navigate('/login');
  }
  
  return (
    <>
        {/* Responsive NavBar Bootstrap */}
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" >
              Expense Tracker
            </Link>
            
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {/* // login */}
              <li className="nav-item">
                  {"  "}
                  <p className='nav-link'> {loginUser && loginUser.name} </p>
                  {"  "}
              </li>

                  {/* // logout */}
              <li className="nav-item">
                <button  className="btn btn-primary" onClick = {logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Header