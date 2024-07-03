import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Reorder, motion } from 'framer-motion'; // Assuming you are using framer-motion for animations
import '../design.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../asset/searchicon.svg';
import deleteIcon from '../asset/icons8-delete.svg';
import editIcon from '../asset/icons8-edit.svg';
import Navbar from './Navbar';

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
    setList(response.data);
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

  const handleSort = () => {
    // duplicate items
    let listItems = [...List]

    //remove and save
    const draggedItemContext = listItems.splice(draggedItem.current, 1)[0]

    //switch the position
    listItems.splice(draggedOverItem.current, 0, draggedItemContext)

    draggedItem.current = null
    draggedOverItem.current = null

    setList(listItems)
  }


  return (
    <div className='container mt-4' id='policyDetailContainer'>
      <Navbar/>
      <div className='ms-5 mt-lg-5 mt-xxl-5 me-5 main-div'>
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
              {/* <Reorder.Group as='tbody' values={List} onReorder={setList}> */}
              {List.map((data, index) => (
                data && (
                  // <Reorder.Item value={data} key={index}> 
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
                      <img
                        src={editIcon}
                        className='icon-img'
                        alt='edit'
                        onClick={() => handleEdit(data.id, data.duedate)}
                      />
                    </td>
                    <td>
                      <img
                        src={deleteIcon}
                        className='icon-img'
                        alt='delete'
                        onClick={() => handleDelete(data.id)}
                      />
                    </td>
                  </tr>
                  // </Reorder.Item>
                )
              ))}
            </tbody>
            {/* </Reorder.Group> */}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
