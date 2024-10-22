import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

function App() {
  const [tabledata, settabledata] = useState([]);

  const getdata = () => {
    let formdata = new FormData();
    formdata.append('action', 'getdata');

    axios.post('http://sk.com/New%20folder/react_crud/api.php', formdata)
      .then(res => {
        console.log(res.data.data);
        settabledata(res.data.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Data</h2>
      <div className="text-end mb-3">
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
 add user
</button>
      </div>
      {tabledata.length > 0 ? (
        <table className='table table-hover'>
          <thead className='table-dark'>
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
                <td>{item.name||'NA'}</td>
                <td>{item.phonenumber||'NA'}</td>
                <td>{item.email||'NA'}</td>
                <td>{item.state||'NA'}</td>
                <td>{item.city||"NA"}</td>
                <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
 edit user
</button>
{'\u00A0' }   {'\u00A0'}
<button className='btn btn-danger'>delete</button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className ="alert alert-warning text-center" role="alert">
          No user data available.
        </div>
      )}
    </div>
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">add user</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}

export default App;
