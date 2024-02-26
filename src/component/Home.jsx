import { useState, useRef } from "react";
import { useGetEmployeeQuery } from "../Features/apiSlice";
import { useEffect } from "react";
import exportFromJSON from "export-from-json";
import Swal from "sweetalert2";
import { useRemoveEmployeeMutation } from "../Features/apiSlice";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
// import Pagination from "react-js-pagination";

const Home = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [countPageArr, setCountPageArr] = useState([]);
  const { data, isFetching } = useGetEmployeeQuery({ page, size });
  const employee = data?.[0]?.Data;
  const count = data?.[0].Total[0].count;

  const [removeEmployee, { data: data2 }] = useRemoveEmployeeMutation();

  useEffect(() => {
    isFetching;
  }, [page, size]);

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this employee data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        removeEmployee(id);
        Swal.fire("Deleted!", "The employee has been deleted.", "success");
      }
    });
  };

  const handleExportClick = () => {
    if (employee) {
      exportFromJSON({
        data: employee,
        fileName: "employee_data",
        exportType: "xls",
      });
    }
  };
  const handleExportClick2 = () => {
    if (employee) {
      exportFromJSON({
        data: employee,
        fileName: "employee_data",
        exportType: "csv",
      });
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState(employee);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredData = query
      ? employee.filter((item) =>
          Object.keys(item).some((key) =>
            item[key].toString().toLowerCase().includes(query.toLowerCase())
          )
        )
      : employee;

    setFilteredEmployee(filteredData);
  };

  useEffect(() => {
    if (employee) {
      setFilteredEmployee(employee);
    }
  }, [employee]);

  let countPage = Math.ceil(count / size);
  console.log(countPage);
  useEffect(() => {
    const temArr = [];
    for (let i = 1; i <= countPage; i++) {
      temArr.push(i);
      setCountPageArr(temArr);
    }
  }, [data]);
  const componentRef = useRef(null);

  return (
    <div>
      <ReactToPrint
        trigger={() => {
          return <button>Print</button>;
        }}
        content={() => componentRef.current}
        documentTitle="Employee List"
      />
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="mb-2 row">
                      <div className="col-sm-5">
                        <Link to="/addemployee">
                          <button className="btn btn-danger mb-2">
                            <i className="mdi mdi-plus-circle me-2" /> Add
                            Employee
                          </button>
                        </Link>
                      </div>
                      <div className="col-sm-7">
                        <div className="text-sm-end">
                          <button
                            type="button"
                            className="mb-2 me-1 btn btn-success"
                          >
                            <i className="mdi mdi-cog-outline" />
                          </button>
                          <button
                            type="button"
                            className="mb-2 me-1 btn btn-light"
                            onClick={handleExportClick}
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              role="img"
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title />
                              <path d="M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z" />
                            </svg>{" "}
                            Export
                          </button>
                          <button
                            type="button"
                            className="mb-2 btn btn-light"
                            onClick={handleExportClick2}
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="none"
                                stroke="#000"
                                strokeWidth={2}
                                d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L4,23 M18,1 L18,6 L23,6 M7,13 C7,13 6.00000004,13 5,13 C3.99999996,13 3,13.5 3,14.5 L3,16 C3,16 3.00000001,16.5 3,17.5 C2.99999999,18.5 4,19 5,19 L7,19 M13.25,13 C13.25,13 12.25,13 10.75,13 C9.25,13 8.75,13.5 8.75,14.5 C8.75,15.5 9.25,16 10.75,16 C12.25,16 12.75,16.5 12.75,17.5 C12.75,18.5 12.25,19 10.75,19 C9.25,19 8.25,19 8.25,19 M20.5,12 C20.5,12 20.5,12 20.5,12.5 C20.5,13 18,19 18,19 L17.5,19 C17.5,19 15,13 15,12.5 L15,12"
                              />
                            </svg>{" "}
                            Export
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="mb-2">
                          <span className="d-flex align-items-center">
                            Search :{" "}
                            <input
                              placeholder="Search..."
                              className="form-control w-auto ms-1"
                              value={searchQuery}
                              onChange={handleSearchChange}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="table-responsive">
                          <p />
                          <p />
                          <p />
                          <p />
                          <p />
                          <table className="table-centered react-table table">
                            <thead
                              className="table-light"
                              style={{ backgroundColor: "rgb(238, 242, 247)" }}
                            >
                              <tr>
                                <th>Employee</th>
                                <th>Employee Mobile</th>
                                <th>Employee Address</th>
                                <th>Employee Roles</th>
                                <th>Created On</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            {filteredEmployee?.map((item, index) => (
                              <tbody key={index}>
                                <tr>
                                  <td>
                                    <div className="d-flex px-2 py-1">
                                      <div>
                                        <img
                                          src={item.Image}
                                          className="avatar avatar-sm me-3"
                                          alt="user1"
                                          style={{
                                            width: "20px",
                                            height: "20px",
                                          }}
                                        />
                                      </div>

                                      <div className="d-flex flex-column justify-content-center">
                                        <h6 className="mb-0 text-sm">
                                          {item.FirstName + " " + item.LastName}
                                          <br></br>
                                          {item.Email}
                                        </h6>

                                        <p className="text-xs text-secondary mb-0" />
                                      </div>
                                    </div>
                                  </td>

                                  <td>{item.Phone}</td>
                                  <td>{item.Address}</td>
                                  <td>{item.Roles}</td>
                                  <td>
                                    <time
                                      dateTime={1694925001651}
                                      title="2023-09-17T10:30:01+06:00"
                                    >
                                      {item.updatedAt}
                                    </time>{" "}
                                  </td>
                                  <td>
                                    <Link
                                      className="btn btn-warning action-icon me-2"
                                      to={`/update/${item._id}`}
                                    >
                                      Edit
                                    </Link>

                                    <button
                                      className="btn btn-danger action-icon mr-2"
                                      onClick={() =>
                                        handleDeleteClick(item._id)
                                      }
                                    >
                                      delete
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <div className="d-lg-flex align-items-center text-center pb-1">
                    <div className="d-inline-block me-3">
                      <label className="me-1">Display :</label>
                      <select
                        onChange={({ target: { value } }) => setSize(value)}
                        className="form-select d-inline-block w-auto"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={count}>All</option>
                      </select>
                    </div>
                    <span className="me-3">
                      Page
                      <strong>
                        {page} of {countPage}
                      </strong>
                    </span>
                    <span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
                      <label>Go to page : </label>
                      <input
                        type="number"
                        min={1}
                        max={countPage}
                        className="form-control w-25 ms-1 d-inline-block"
                        defaultValue={1}
                        onChange={({ target: { value } }) => setPage(value)}
                      />
                    </span>
                    <ul
                      className="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0"
                      role="navigation"
                      aria-label="Pagination"
                    >
                      <li
                        className={`page-item ${page == 1 && "disabled"}`}
                        onClick={() => page > 1 && setPage((pre) => pre - 1)}
                      >
                        <a
                          className="page-link "
                          tabIndex={-1}
                          role="button"
                          aria-disabled="true"
                          aria-label="Previous page"
                          rel="prev"
                        >
                          &lt;
                        </a>
                      </li>
                      {count &&
                        countPageArr?.map((item, index) => (
                          <li
                            key={index}
                            className={`page-item d-none d-xl-inline-block ${
                              item === page && "active"
                            }`}
                            onClick={() => setPage(item)}
                          >
                            <a
                              rel="canonical"
                              role="button"
                              className="page-link"
                              tabIndex={-1}
                              aria-label="Page 1 is your current page"
                              aria-current="page"
                            >
                              {item}
                            </a>
                          </li>
                        ))}

                      <li
                        className={`page-item ${
                          page == countPage && "disabled"
                        }`}
                        onClick={() =>
                          page < countPage && setPage((pre) => pre + 1)
                        }
                      >
                        <a
                          className="page-link"
                          tabIndex={0}
                          role="button"
                          aria-disabled="false"
                          aria-label="Next page"
                          rel="next"
                        >
                          &gt;
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
