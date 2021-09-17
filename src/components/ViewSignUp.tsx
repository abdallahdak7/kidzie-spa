import { Col, Form, message, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { CustomButton } from "../customs/CustomButton";
import { CustomInput } from "../customs/CustomInput";
import { COUNTRIES } from "../data/countries";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { signUpAsAnAdmin, signUpAsAPartner } from "../services/auth";

interface IProps {
  setSignedIn: (value: any) => void;
}

const ViewSignUp = ({ setSignedIn }: IProps) => {
  const [form] = useForm();
  const history = useHistory();
  const [password, setPassword] = useState({
    password: "",
    secondPassword: "",
  });
  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] =
    usePasswordValidation({
      firstPassword: password.password,
      secondPassword: password.secondPassword,
    });

  const setFirst = event => {
    setPassword({ ...password, password: event.target.value });
  };

  const setSecond = event => {
    setPassword({ ...password, secondPassword: event.target.value });
  };
  const onFinish = async (data: any) => {
    if (
      !validLength ||
      !hasNumber ||
      !upperCase ||
      !lowerCase ||
      !match ||
      !specialChar
    ) {
      message.error("Passwords Missmatch !");
      return;
    }

    if (form.getFieldValue("username").length < 8) {
      message.error("Username should be 8 or more characters !");
      return;
    }
    if (data.userType === "admin") {
      delete data.userType;
      delete data.secondPassword;
      const [error, admin] = await signUpAsAnAdmin(data);
      if (error) {
        if (error[0].error === "Email already exists") {
          message.error("Email already exists !");
        } else if (error[0].error === "Username already exists") {
          message.error("Username already exists !");
        } else if (error[0].error === "Phone number already exists") {
          message.error("Phone already exists !");
        } else {
          message.error("Internal server error !");
        }
      } else {
        setSignedIn(admin);
        message.success("Your admin account has been successfully created !");
        history.push("/Profile");
      }
    }
    if (data.userType === "partner") {
      delete data.userType;
      delete data.secondPassword;
      const [error, partner] = await signUpAsAPartner(data);
      if (error) {
        if (error[0].error === "Email already exists") {
          message.error("Email already exists !");
        } else if (error[0].error === "Username already exists") {
          message.error("Username already exists !");
        } else if (error[0].error === "Phone number already exists") {
          message.error("Phone already exists !");
        } else {
          message.error("Internal server error !");
        }
      } else {
        setSignedIn(partner);
        message.success("Your partner account has been successfully created !");
        history.push("/Sales");
      }
    }
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="form-header">Sign Up</div>
        </Col>
      </Row>
      <Form form={form} onFinish={onFinish}>
        <Row
          style={{
            margin: "10px",
            padding: "10px",
            backgroundColor: "#faf6e6",
          }}
        >
          <Col span={24}>
            <Row>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={12}
              >
                <div
                  style={{
                    fontWeight: "bolder",
                    padding: "15px 8px",
                    marginLeft: "15px",
                  }}
                >
                  Account *
                </div>
                <Form.Item name="userType">
                  <select
                    style={{
                      width: "200px",
                      padding: "8px 0",
                      margin: "8px 0",
                      border: "2px solid #ba9541",
                      boxSizing: "border-box",
                    }}
                    required
                    name="userType"
                  >
                    <option placeholder="Select Account" value=""></option>
                    <option value="admin">Admin</option>
                    <option value="partner">Partner</option>
                  </select>
                </Form.Item>{" "}
              </Col>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={12}
              >
                <div style={{ fontWeight: "bolder", padding: "10px 8px" }}>
                  Username *
                </div>
                <CustomInput name="username" required={true} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <hr style={{ backgroundColor: "#ba9541" }} />
              </Col>
            </Row>
            <br />
            <Row>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={12}
              >
                <div style={{ fontWeight: "bolder", padding: "8px" }}>
                  First Name *
                </div>

                <CustomInput name="firstName" required={true} />
              </Col>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={12}
              >
                <div style={{ fontWeight: "bolder", padding: "8px" }}>
                  Last Name *
                </div>
                <CustomInput name="lastName" required={true} />
              </Col>
            </Row>
            <Row>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={12}
              >
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <div style={{ fontWeight: "bolder", padding: "8px" }}>
                  Email *
                </div>
                <CustomInput type="email" name="email" required={true} />
              </Col>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={12}
              >
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div style={{ fontWeight: "bolder", padding: "8px" }}>
                  Phone *
                </div>
                <CustomInput name="phoneNumber" required={true} />
              </Col>
            </Row>
            <Row>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={12}
              >
                &nbsp; &nbsp; &nbsp;
                <div style={{ fontWeight: "bolder", padding: "15px 8px" }}>
                  Country *
                </div>
                <Form.Item name="country">
                  <select
                    style={{
                      width: "200px",
                      padding: "8px 0",
                      margin: "8px 0",
                      border: "2px solid #ba9541",
                      boxSizing: "border-box",
                    }}
                    required
                    name="country"
                  >
                    <option value=""></option>

                    {COUNTRIES.map((country, index) => {
                      return (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      );
                    })}
                  </select>
                </Form.Item>
              </Col>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={12}
              >
                &nbsp; &nbsp; &nbsp;
                <div style={{ fontWeight: "bolder", padding: "15px 8px" }}>
                  Gender *
                </div>
                <Form.Item name="gender">
                  <select
                    style={{
                      width: "200px",
                      padding: "8px 0",
                      margin: "8px 0",
                      border: "2px solid #ba9541",
                      boxSizing: "border-box",
                    }}
                    required
                    name="gender"
                  >
                    <option value=""></option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={11}
              >
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <div
                  style={{
                    fontWeight: "bolder",
                    padding: "8px",

                    marginLeft: "40px",
                  }}
                >
                  Password *
                </div>
                <CustomInput
                  onChange={setFirst}
                  type="password"
                  name="password"
                  required={true}
                />
              </Col>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                span={13}
              >
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div
                  style={{
                    fontWeight: "bolder",
                    padding: "8px",
                    marginLeft: "50px",
                  }}
                >
                  Confirm *
                </div>
                <CustomInput
                  onChange={setSecond}
                  type="password"
                  name="secondPassword"
                  required={true}
                />
              </Col>
            </Row>
            {password.password && (
              <div>
                <ul>
                  {!validLength && (
                    <li>
                      <span>Invalid Length</span>
                    </li>
                  )}
                  {!hasNumber && (
                    <li>
                      <span>Please include a number</span>
                    </li>
                  )}
                  {!upperCase && (
                    <li>
                      <span>Please include an uppercase</span>
                    </li>
                  )}
                  {!lowerCase && (
                    <li>
                      <span>Please include a lowercase</span>
                    </li>
                  )}
                  {!match && (
                    <li>
                      <span>Please make sure the passwords matches</span>
                    </li>
                  )}
                  {!specialChar && (
                    <li>
                      <span>Please include a special character</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
            <Row>
              <Col
                style={{ display: "flex", justifyContent: "center" }}
                span={24}
              >
                <div style={{ width: "250px" }}>
                  <CustomButton type="submit" value="Sign Up" />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ViewSignUp;
