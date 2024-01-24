import React, { useState , useEffect} from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/LoginPage.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // on submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("Login Successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, passoword: "" })
      ); //! imp
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Login - User NOT Found");
    }
  };

  // prevent
  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/");
  }, [navigate]);

  return (
    <>
      <div className = "login-page">
        {loading && <Spinner />}

        <div className="login-form col-md-4 rounded">
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>LOGIN</h1>
            <Form.Item label="Email" name="email">
              <Input placeholder="EMAIL" type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="PASSWORD" type="password" />
            </Form.Item>

            <div className="gap-3 d-flex justify-content-between ">
              <Link to={"/register"}>Not a user? REGISTER</Link>
              <button className="btn btn-primary">LOGIN</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
