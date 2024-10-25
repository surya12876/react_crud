import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import "./App.css";

function App() {
  const [alert, setAlertMessage] = useState("");
  const [tabledata, settabledata] = useState([]);
  const [isedit, setedit] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    phonenumber: 0,
    email: "",
    state: "",
    city: "",
  });
  function exportTableToExcel(tableID, filename = "") {
    var downloadLink;
    var dataType = "application/vnd.ms-excel";
    var tableSelect = document.getElementById(tableID);

    var tableClone = tableSelect.cloneNode(true);

    var tableHTML = tableClone.outerHTML
      .replace(/ /g, "%20")
      .replace(/#/g, "%23")
      .replace(/,/g, "%2C");

    filename = filename ? filename + ".xls" : "excel_data.xls";

    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(["\ufeff", tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = "data:" + dataType + ", " + tableHTML;

      downloadLink.download = filename;

      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  const edituser = (id) => {
    console.log(isedit);
    setedit(true);
    console.log(isedit);
    let formdata = new FormData();
    formdata.append("action", "editdata");
    formdata.append("id", id);
    axios
      .post("https://reactcrudbackend.vercel.app/api", formdata)
      .then((res) => {
        let d = res.data.data[0];
        setFormData(d);
        console.log(formData);
      });
  };
  const delete_data = (id) => {
    let formdata = new FormData();
    formdata.append("action", "delete_data");
    formdata.append("id", id);
    axios
      .post("https://reactcrudbackend.vercel.app/api", formdata)
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data.success);
          setAlertMessage(
            <div className="alert alert-success" role="alert">
              Deleted successfully
            </div>
          );
          setTimeout(() => {
            setAlertMessage("");
          }, 300);
          getdata();
          console.log("Success");
        } else {
          setAlertMessage(
            <div className="alert alert-danger" role="alert">
              Something went wrong, please try again.
            </div>
          );
          setTimeout(() => {
            setAlertMessage("");
          }, 3000);
        }
      });
  };
  const update_add = (id) => {
    if (isedit) {
      let formsdata = new FormData();
      formsdata.append("action", "update_data");
      formsdata.append("id", id);
      formsdata.append("name", formData.name);
      formsdata.append("phonenumber", formData.phonenumber);
      formsdata.append("email", formData.email);
      formsdata.append("state", formData.state);
      formsdata.append("city", formData.city);

      axios
        .post("https://reactcrudbackend.vercel.app/api", formsdata)
        .then((res) => {
          if (res.data.status === "success") {
            console.log(res.data.success);
            setAlertMessage(
              <div className="alert alert-success" role="alert">
                updated successfully
              </div>
            );
            setTimeout(() => {
              setAlertMessage("");
            }, 3000);
            getdata();
            console.log("Success");
          } else {
            setAlertMessage(
              <div className="alert alert-danger" role="alert">
                Something went wrong, please try again.
              </div>
            );
            setTimeout(() => {
              setAlertMessage("");
            }, 3000);
          }
        });
    } else {
      let formdata = new FormData();
      formdata.append("action", "add_data");
      formdata.append("name", formData.name);
      formdata.append("phonenumber", formData.phonenumber);
      formdata.append("email", formData.email);
      formdata.append("state", formData.state);
      formdata.append("city", formData.city);

      axios
        .post("https://reactcrudbackend.vercel.app/api", formdata)
        .then((res) => {
          if (res.data.status === "success") {
            console.log(res.data.success);
            setAlertMessage(
              <div className="alert alert-success" role="alert">
                added successfully
              </div>
            );
            setTimeout(() => {
              setAlertMessage("");
            }, 3000);
            getdata();
          } else {
            setAlertMessage(
              <div className="alert alert-danger" role="alert">
                Something went wrong, please try again.
              </div>
            );
            setTimeout(() => {
              setAlertMessage("");
            }, 3000);
          }
        });
    }
  };
  const handleInputChange = (e, field) => {
    console.log(e.target.value);
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const getdata = () => {
    let formdata = new FormData();
    formdata.append("action", "getdata");

    axios
      .post("https://reactcrudbackend.vercel.app/api", formdata)
      .then((res) => {
        console.log(res.data.data);
        settabledata(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const changedit = () => {
    setedit(false);
    getdata();
    setFormData(() => ({
      id: null,
      name: "",
      phonenumber: 0,
      email: "",
      state: "",
      city: "",
    }));
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {alert}
      <div className="container mt-5">
        <h2 className="text-center mb-4">User Data</h2>
        <div className="text-end mb-3">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            add user
          </button>
        </div>
        <button onClick={() => exportTableToExcel("tableid", "members-data")}>
          Export Table Data To Excel File
        </button>
        {tabledata.length > 0 ? (
          <table className="table table-hover" id="tableid">
            <thead className="table-dark">
              <tr>
                <th>SNo</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>State</th>
                <th>City</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {tabledata.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name || "NA"}</td>
                  <td>{item.phonenumber || "NA"}</td>
                  <td>{item.email || "NA"}</td>
                  <td>{item.state || "NA"}</td>
                  <td>{item.city || "NA"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => edituser(item.id)}
                    >
                      edit user
                    </button>
                    {"\u00A0"} {"\u00A0"}
                    <button
                      className="btn btn-danger"
                      onClick={() => delete_data(item.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-warning text-center" role="alert">
            No user data available.
          </div>
        )}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {isedit ? "edit user" : "Add user"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={changedit}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container mt-4">
                <h3 className="text-center mb-4">User Information Form</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="names"
                      value={formData.name}
                      onChange={(e) => handleInputChange(e, "name")}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={(e) => handleInputChange(e, "phonenumber")}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange(e, "state")}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange(e, "city")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={changedit}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => update_add(formData.id)}
                data-bs-dismiss="modal"
              >
                {isedit ? "update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
