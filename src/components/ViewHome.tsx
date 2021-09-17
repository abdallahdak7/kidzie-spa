import { Form } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { CustomButton } from "../customs/CustomButton";
import { CustomInput } from "../customs/CustomInput";
import { signIn } from "../services/auth";
import { getProductsById } from "../services/products";

interface IProps {
  setSignedIn: (value: any) => void;
  setProducts: (value: any) => void;
}

const ViewHome = ({ setSignedIn, setProducts }: IProps) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState("");

  const onSubmit = async () => {
    const [error, data] = await signIn({ email, password, userType });
    if (error) {
      setWrongCredentials("Invalid Credentials");
      error[0].error === "Incorrect Email!" &&
        setWrongCredentials(error[0].error);
      error[0].error === "Incorrect Password!" &&
        setWrongCredentials(error[0].error);
    } else {
      setSignedIn(data);
      if (data.partner_id) {
        const [error, products] = await getProductsById(data.partner_id);
        if (error) {
          console.log(error);
        } else {
          setProducts(products);
        }
      }
      history.push("/Profile");
    }
  };
  return (
    <div className="center">
      <div className="center-content">
        <span style={{ color: "#ba9541" }}>Don't Have an account yet? </span>
        <Link to="/SignUp">Sign Up</Link>
        <Form onFinish={onSubmit}>
          <select
            defaultValue=""
            onChange={e => setUserType(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 0",
              margin: "8px 0",
              border: "2px solid #ba9541",
              boxSizing: "border-box",
            }}
            required
            name="userType"
          >
            <option value="" disabled>
              Select Your Account Type
            </option>
            <option value="admin">Admin</option>
            <option value="partner">Partner</option>
          </select>
          <br />
          <br />
          <CustomInput
            name="email"
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            required={true}
          />
          <CustomInput
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            type="password"
            required={true}
          />
          <CustomButton type="submit" value="Sign In" />

          {wrongCredentials && <span>{wrongCredentials}</span>}
        </Form>
      </div>
    </div>
  );
};

export default ViewHome;
