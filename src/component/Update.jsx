import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import { useEditLEmployeeMutation } from "../Features/apiSlice";
import { useGetEditEmployeeQuery } from "../Features/apiSlice";
import Home from "./Home";

const Update = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [editLEmployee] = useEditLEmployeeMutation();
  const { data } = useGetEditEmployeeQuery();
  const employee = data?.[0]?.Data;
  console.log(employee);
  const [updateData, setUpdateData] = useState({});
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (id) {
      const singleData = employee?.find((singleData) => singleData._id === id);
      setUpdateData(singleData);
      setPhone(singleData?.Phone || "");
    }
  }, [id, employee]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editLEmployee({ id: id, data: { ...updateData, Phone: phone } });
    navigation("/");
  };
  const homeComponentRef = useRef(null);

  return (
    <div>
      <Home componentRef={homeComponentRef} />

      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="departmentId">Department Id</label>
                <select
                  className="form-control"
                  id="departmentId"
                  name="departmentId"
                  defaultValue={updateData?.DepartmentId}
                  onChange={onChangeHandler}
                >
                  <option value="64ca889161f954b4eefe36ac">HRM</option>
                  <option value="65069bbc41d35960594f90fe">Nimesh</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="FirstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="FirstName"
                  name="FirstName"
                  defaultValue={updateData?.FirstName}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="LastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="LastName"
                name="LastName"
                defaultValue={updateData?.LastName}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="Gender">Gender</label>
              <select
                className="form-control"
                id="Gender"
                name="Gender"
                defaultValue={updateData?.Gender}
                onChange={onChangeHandler}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="phone">Phone</label>
              <PhoneInput
                // className="form-control"
                placeholder="Enter phone number"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                defaultValue={updateData?.Email}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                defaultValue={updateData?.Password}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                id="role"
                name="role"
                defaultValue={updateData?.Roles}
                onChange={onChangeHandler}
              >
                <option value="STAFF">STAFF</option>
                <option value="HOD">HOD</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                defaultValue={updateData?.DateOfBirth}
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                defaultValue={updateData?.Address}
                onChange={onChangeHandler}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
