import React, { useEffect, useState } from "react";
import { COUNTRIES } from "../data/countries";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { editAdminProfile, editPartnerProfile } from "../services/profile";
interface IProps {
  signedIn?: any;
}

const ViewProfile = ({ signedIn }: IProps) => {
  console.log(signedIn);
  const [displayAccountButtons, setDisplayAccountButtons] = useState(false);
  const [displayGeneralButtons, setDisplayGeneralButtons] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [updateAccount, setUpdateAccount] = useState(false);
  const [updateGeneral, setUpdateGeneral] = useState(false);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
  });
  const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] =
    usePasswordValidation({
      firstPassword: password.firstPassword,
      secondPassword: password.secondPassword,
    });

  const setFirst = event => {
    setPassword({ ...password, firstPassword: event.target.value });
  };

  const setSecond = event => {
    setPassword({ ...password, secondPassword: event.target.value });
  };
  const onSubmitFirst = async (e: any) => {
    e.preventDefault();
    if (signedIn.admin_id) {
      const [error] = await editAdminProfile(signedIn.admin_id, {
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        country,
      });
      if (error) {
        setUpdateGeneral(true);
        setTimeout(() => {
          setUpdateGeneral(false);
        }, 3000);
      } else {
        setDisplayGeneralButtons(false);
      }
    }
    if (signedIn.partner_id) {
      const [error] = await editPartnerProfile(signedIn.partner_id, {
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        country,
      });
      if (error) {
        setUpdateGeneral(true);
        setTimeout(() => {
          setUpdateGeneral(false);
        }, 3000);
      } else {
        setDisplayGeneralButtons(false);
      }
    }
  };
  const onSubmitSecond = async (e: any) => {
    e.preventDefault();
    if (signedIn.admin_id) {
      const [error] = await editAdminProfile(signedIn.admin_id, {
        username,
        password: password.firstPassword,
      });
      if (error) {
        setUpdateAccount(true);
        setTimeout(() => {
          setUpdateAccount(false);
        }, 3000);
      } else {
        setDisplayAccountButtons(false);
      }
    }
    if (signedIn.partner_id) {
      const [error] = await editPartnerProfile(signedIn.partner_id, {
        username,
        password: password.firstPassword,
      });
      if (error) {
        setUpdateAccount(true);
        setTimeout(() => {
          setUpdateAccount(false);
        }, 3000);
      } else {
        setDisplayAccountButtons(false);
      }
    }
  };

  useEffect(() => {
    signedIn && setUsername(signedIn.username);
    signedIn && setFirstName(signedIn.first_name);
    signedIn && setLastName(signedIn.last_name);
    signedIn && setEmail(signedIn.email);
    signedIn && setPhoneNumber(signedIn.phone_number);
    signedIn && setGender(signedIn.gender);
    signedIn && setCountry(signedIn.country);
    signedIn &&
      setPassword({
        firstPassword: signedIn.password,
        secondPassword: signedIn.password,
      });

    return () => {};
  }, [signedIn]);
  return (
    <>
      <div className="form-header">General Information</div>
      <form
        style={{ backgroundColor: "#faf6e6", margin: "10px" }}
        onSubmit={onSubmitFirst}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <span>&nbsp;First Name *&nbsp;&nbsp;</span>
            <input
              defaultValue={signedIn.first_name}
              style={{
                width: "200px",
                padding: "11px 11px",
                margin: "8px 0",
                display: "inline-block",
                border: "2px solid #ba9541",
                boxSizing: "border-box",
              }}
              onChange={e => setFirstName(e.target.value)}
              type="text"
              required
              disabled={displayGeneralButtons ? false : true}
            />
          </div>
          <div>
            <span>Phone *&nbsp;&nbsp;</span>
            <input
              defaultValue={signedIn.phone_number}
              style={{
                width: "200px",
                padding: "11px 11px",
                margin: "8px 0",
                display: "inline-block",
                border: "2px solid #ba9541",
                boxSizing: "border-box",
              }}
              onChange={e => setPhoneNumber(e.target.value)}
              type="text"
              required
              disabled={displayGeneralButtons ? false : true}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <span>&nbsp;Last Name *&nbsp;&nbsp;</span>
            <input
              defaultValue={signedIn.last_name}
              style={{
                width: "200px",
                padding: "11px 11px",
                margin: "8px 0",
                display: "inline-block",
                border: "2px solid #ba9541",
                boxSizing: "border-box",
              }}
              onChange={e => setLastName(e.target.value)}
              type="text"
              required
              disabled={displayGeneralButtons ? false : true}
            />
          </div>
          <div>
            <span>Gender&nbsp;&nbsp;&nbsp;</span>
            <select
              defaultValue={signedIn.gender}
              onChange={(e: any) => setGender(e.target.value)}
              style={{
                width: "200px",
                padding: "11px 11px",
                margin: "8px 0",
                display: "inline-block",
                border: "2px solid #ba9541",
                boxSizing: "border-box",
              }}
              required
              disabled={displayGeneralButtons ? false : true}
              name="gender"
            >
              <option value=""></option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email
              *&nbsp;&nbsp;
            </span>
            <input
              defaultValue={signedIn.email}
              style={{
                width: "200px",
                padding: "11px 11px",
                margin: "8px 0",
                display: "inline-block",
                border: "2px solid #ba9541",
                boxSizing: "border-box",
              }}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
              disabled={displayGeneralButtons ? false : true}
            />
          </div>

          <div>
            <span>Country&nbsp;&nbsp;</span>

            <select
              defaultValue={signedIn.country}
              onChange={e => setCountry(e.target.value)}
              style={{
                width: "200px",
                padding: "11px 11px",
                margin: "8px 0",
                display: "inline-block",
                border: "2px solid #ba9541",
                boxSizing: "border-box",
              }}
              required
              disabled={displayGeneralButtons ? false : true}
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
          </div>
        </div>

        {!displayGeneralButtons && (
          <button
            style={{
              backgroundColor: "#ba9541",
              width: "170px",
              color: "white",
              padding: "14px 20px",
              margin: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setDisplayGeneralButtons(true)}
          >
            Edit
          </button>
        )}
        {displayGeneralButtons && (
          <button
            style={{
              backgroundColor: "#ba9541",
              width: "170px",
              color: "white",
              padding: "14px 20px",
              margin: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setDisplayGeneralButtons(false)}
          >
            Cancel
          </button>
        )}
        {displayGeneralButtons && (
          <input
            style={{
              backgroundColor: "#ba9541",
              width: "170px",
              color: "white",
              padding: "14px 20px",
              margin: "8px",
              border: "none",
              cursor: "pointer",
              float: "right",
            }}
            type="submit"
            value="Save"
          />
        )}
        {updateGeneral && (
          <span style={{ color: "red" }}>Failed to send request</span>
        )}
      </form>
      <div className="form-header">Account Information</div>
      <form
        style={{ backgroundColor: "#faf6e6", margin: "10px" }}
        onSubmit={onSubmitSecond}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Username * &nbsp;&nbsp;
            </span>
            <input
              defaultValue={signedIn.username}
              style={{
                width: "200px",
                padding: "11px 11px",
                margin: "8px 0",
                display: "inline-block",
                border: "2px solid #ba9541",
                boxSizing: "border-box",
              }}
              onChange={e => setUsername(e.target.value)}
              type="text"
              required
              disabled={displayAccountButtons ? false : true}
            />
            <br />
            {username && username.length <= 7 && (
              <span>Username should be 8 or more characters</span>
            )}
          </div>
          <div>
            <div>
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Password *&nbsp;&nbsp;&nbsp;
              </span>
              <input
                defaultValue={signedIn.password}
                style={{
                  width: "200px",
                  padding: "11px 11px",
                  margin: "8px 0",
                  display: "inline-block",
                  border: "2px solid #ba9541",
                  boxSizing: "border-box",
                }}
                onChange={setFirst}
                type="password"
                required
                disabled={displayAccountButtons ? false : true}
              />
            </div>
            <div>
              <span>Confirm Password *&nbsp; </span>{" "}
              <input
                defaultValue={signedIn.password}
                style={{
                  width: "200px",
                  padding: "11px 11px",
                  margin: "8px 0",
                  display: "inline-block",
                  border: "2px solid #ba9541",
                  boxSizing: "border-box",
                }}
                onChange={setSecond}
                type="password"
                required
                disabled={displayAccountButtons ? false : true}
              />
            </div>
            {password.firstPassword && (
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
          </div>
        </div>
        {!displayAccountButtons && (
          <button
            style={{
              backgroundColor: "#ba9541",
              width: "170px",
              color: "white",
              padding: "14px 20px",
              margin: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setDisplayAccountButtons(true)}
          >
            Edit
          </button>
        )}
        {displayAccountButtons && (
          <button
            style={{
              backgroundColor: "#ba9541",
              width: "170px",
              color: "white",
              padding: "14px 20px",
              margin: "8px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setDisplayAccountButtons(false)}
          >
            Cancel
          </button>
        )}
        {displayAccountButtons && (
          <input
            style={{
              backgroundColor: "#ba9541",
              width: "170px",
              color: "white",
              padding: "14px 20px",
              margin: "8px",
              border: "none",
              cursor: "pointer",
              float: "right",
            }}
            type="submit"
            value="Save"
            disabled={
              validLength &&
              hasNumber &&
              upperCase &&
              lowerCase &&
              match &&
              specialChar &&
              username.length >= 8
                ? false
                : true
            }
          />
        )}
        {updateAccount && <span>Unable to update</span>}
      </form>
    </>
  );
};

export default ViewProfile;
