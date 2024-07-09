import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../design.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../asset/searchicon.svg';
import deleteIcon from '../asset/icons8-delete.svg';
import editIcon from '../asset/icons8-edit.svg';
import Navbar from './Navbar';
import Card from './Cards';
import DashBoard from './DashBoard';
import ReactSpeedometer from "react-d3-speedometer/slim"
import ProgressBar from './ProgessBar';
// and use it







function ViewPage() {
  const [List, setList] = useState([]);
  const [Title, setTitle] = useState('');
  const [Prioritylevel, setPrioritylevel] = useState('');
  const [Search, setSearch] = useState('');
  const draggedItem = useRef(null);
  const draggedOverItem = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5001/tasks');
    const sortedTasks = response.data.sort((a, b) => a.order - b.order);
    setList(sortedTasks);
  };

  const handleTitleChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setTitle(inputValue);
    filterTasks(inputValue, Prioritylevel, Search);
  };

  const handlePrioritylevelChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setPrioritylevel(inputValue);
    filterTasks(Title, inputValue, Search);
  };

  const handleSearchAndClick = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setSearch(inputValue);
    filterTasks(Title, Prioritylevel, inputValue);
  };

  const filterTasks = (title, priority, search) => {
    axios.get('http://localhost:5001/tasks').then((response) => {
      let tasks = response.data;
      tasks = tasks.filter((item) => item.Title.toLowerCase().includes(title));
      tasks = tasks.filter((item) => item.Prioritylevel.toLowerCase().includes(priority));
      tasks = tasks.filter((item) => item.description.toLowerCase().includes(search));
      setList(tasks);
    });
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      await axios.delete(`http://localhost:5001/tasks/${id}`);
      fetchTasks();
    }
  };

  const handleEdit = (id, duedate) => {
    navigate('/', { state: { id: id } });
    console.log(id);
    console.log(duedate + "===========duedate");
  };

  const renderTitles = () => {
    const uniqueTitles = [...new Set(List.map(item => item?.Title).filter(Boolean))];
    return uniqueTitles.map((item, index) => (
      <option className='text-center' key={index} value={item.toLowerCase()}>
        {item}
      </option>
    ));
  };

  const renderPriorityLevels = () => {
    const uniquePriorityLevels = [...new Set(List.map(item => item?.Prioritylevel).filter(Boolean))];
    return uniquePriorityLevels.map((item, index) => (
      <option className='text-center' key={index} value={item.toLowerCase()}>
        {item}
      </option>
    ));
  };

  const handleSort = async () => {
    // Duplicate items
    let listItems = [...List];

    // Remove and save the dragged item
    const draggedItemContext = listItems.splice(draggedItem.current, 1)[0];

    // Switch the position
    listItems.splice(draggedOverItem.current, 0, draggedItemContext);

    // Clear references
    draggedItem.current = null;
    draggedOverItem.current = null;

    // Update the order property
    listItems = listItems.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    // Update the state with the new order
    setList(listItems);

    // Save the new order to the backend
    try {
      // Update each task individually
      for (let i = 0; i < listItems.length; i++) {
        await axios.put(`http://localhost:5001/tasks/${listItems[i].id}`, listItems[i]);
      }
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };

  return (
    <div className='container-fluid' id='policyDetailContainer'>
      <DashBoard />
      <div style={{ background: "#CACACA", height: "100%", overflow: "auto" }} className="container-fluid" >
        <Navbar />
        <Card />
        <div style={{display:"flex"}}>
          <div className='ms-5 mt-lg-5 mt-xxl-5 mt-sm-5 mt-xxs-4 me-5 main-div'>

            <div className='d-flex mb-xxl-3 justify-content-between mt-5 ms-5 me-5'>
              <div className='d-flex ' style={{ gap: "20px" }}>
                <div className='dropdown show'>
                  <select
                    className='btn bg-col-netHos custom-dropdown-toggle'
                    required
                    onChange={handleTitleChange}
                    value={Title}
                  >
                    <option value=''>Select Title</option>
                    {renderTitles()}
                  </select>
                </div>
                <div className='dropdown show me-5'>
                  <select
                    className='btn bg-col-netHos custom-dropdown-toggle'
                    required
                    onChange={handlePrioritylevelChange}
                    value={Prioritylevel}
                  >
                    <option value=''>Select Priority Level</option>
                    {renderPriorityLevels()}
                  </select>
                </div>
              </div>
              <div
                className='search-data ms-5'
                style={{ width: '20%', borderRadius: '5px', border: '1px solid gray', height: '38px' }}
              >
                <input
                  className='search-bar'
                  style={{ width: '80%', height: '100%', border: 'none', outline: 'none' }}
                  type='text'
                  placeholder='Search Description'
                  name='search'
                  onChange={handleSearchAndClick}
                  value={Search}
                />
                <span>
                  <img src={searchIcon} alt='Search-icon' style={{ cursor: 'pointer' }} />
                </span>
              </div>
            </div>
            <div className='table-responsive ms-5 me-5'>
              <table className='table net-hos-table'>
                <thead>
                  <tr className='row-cols row-cols-6' style={{ borderBottom: '1px solid rgba(0, 0, 0, 1)' }}>
                    <th scope='col'>
                      Title
                    </th>
                    <th scope='col'>
                      Priority Level
                    </th>
                    <th scope='col'>
                      Description
                    </th>
                    <th scope='col'>
                      Due Date
                    </th>
                    <th scope='col'>
                      Edit
                    </th>
                    <th scope='col'>
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {List.map((data, index) => (
                    data && (
                      <tr
                        key={data.id}
                        draggable
                        onDragStart={(e) => { draggedItem.current = index }}
                        onDragEnter={(e) => { draggedOverItem.current = index }}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <td className='txt-color'>{data.Title}</td>
                        <td>{data.Prioritylevel}</td>
                        <td>{data.description}</td>
                        <td>{data.duedate}</td>
                        <td>
                          <button className='btn' onClick={() => handleEdit(data.id, data.duedate)}>
                            <img src={editIcon} alt='Edit-icon' />
                          </button>
                        </td>
                        <td>
                          <button className='btn' onClick={() => handleDelete(data.id)}>
                            <img src={deleteIcon} alt='Delete-icon' />
                          </button>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column",width:"35%",justifyContent:"center" }}>
            <ProgressBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
