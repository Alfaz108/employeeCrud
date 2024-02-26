import { useState } from "react";
import { useAddEmployeeMutation } from "../Features/apiSlice";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

const AddEmployee = () => {
  const [addEmployee] = useAddEmployeeMutation();
  const navigation = useNavigate();

  const [Image, setSelectedImage] = useState({});
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Gender, setGender] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [DepartmentId, setDepartmentId] = useState("");
  const [Roles, setRoles] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [Address, setAddress] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        setSelectedImage(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(DepartmentId);
  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee({
      Address,
      DateOfBirth,
      DepartmentId,
      Email,
      FirstName,
      Gender,
      Image,
      LastName,
      Password,
      Phone,
      Roles,
    });
    navigation("/");
  };

  return (
    <div>
      <div className="container-fluid">
        <form method="POST" onSubmit={handleSubmit}>
          <div>
            {Image && (
              <div>
                <img
                  src={Image}
                  alt="Selected"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <br></br>
            <br></br>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="departmentId">Department Id</label>
                <select
                  className="form-control"
                  id="departmentId"
                  name="departmentId"
                  value={DepartmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="64ca889161f954b4eefe36ac">HRM</option>
                  <option value="65069bbc41d35960594f90fe">Nimesh</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
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
                value={Phone}
                onChange={(value) => setPhone(value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                id="role"
                name="role"
                value={Roles}
                onChange={(e) => setRoles(e.target.value)}
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
                value={DateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
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

export default AddEmployee;
