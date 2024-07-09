import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns"; // Ensure you have date-fns installed
import Navbar from "./Navbar";
import DashBoard from "./DashBoard";

const schema = yup.object().shape({
  Title: yup.string().required("Title is required"),
  Prioritylevel: yup.string().required("Priority Level is required"),
  description: yup.string().required("Description is required"),
  duedate: yup.date().nullable().required("Due Date is required"),
});

function AddUser() {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [id, setId] = useState(state?.id);

  // State for date
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch existing task data by id
      fetchTaskById(id);
    }
  }, [id]);

  const fetchTaskById = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:5001/tasks/${taskId}`);
      const task = response.data;

      // Populate form fields when editing task
      setValue("Title", task.Title);
      setValue("Prioritylevel", task.Prioritylevel);
      setValue("description", task.description);
      if (task.duedate) {
        const taskDate = new Date(task.duedate);
        setDueDate(taskDate); // Convert duedate string to Date object if available
        setValue("duedate", taskDate); // Set form value for duedate
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (dueDate) {
        data.duedate = format(dueDate, 'yyyy-MM-dd'); // Assign selected dueDate to form data in ISO format
      } else {
        delete data.duedate; // Remove duedate from data if not selected
      }

      console.log(typeof (id) + '===' + id);

      if (id) {
        // Edit existing task
        const response = await axios.put(`http://localhost:5001/tasks/${id}`, data);
        console.log("Task updated:", response.data);
        setId(null);
      } else {
        // Add new task
        const response = await axios.post("http://localhost:5001/tasks", data);
        console.log("Task added:", response.data);
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (date) => {
    setDueDate(date); // Update state with selected date
    setValue("duedate", date); // Update form value
  };

  return (

    <div className="container-fluid d-flex h-100"id='policyDetailContainer' >
      <DashBoard/>
      <div className="container-fluid"style={{height:"100vh",overflow:"auto"}}>
      <Navbar />
      <div className="add-user-container">
        <h2 className="mt-5">{id ? "Edit Task" : "Add Task"}</h2>
        <form className='form-container'onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="Title"
              {...register("Title")}
            />
            <p className="text-danger">{errors.Title?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="Prioritylevel" className="form-label">
              Priority Level
            </label>
            <select className="form-select" id="Prioritylevel" {...register("Prioritylevel")}>
              <option value="">Select Priority Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Higher">Higher</option>
            </select>
            <p className="text-danger">{errors.Prioritylevel?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="description" {...register("description")} />
            <p className="text-danger">{errors.description?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="duedate" className="form-label">
              Due Date
            </label>
            <br />
            <DatePicker
              id="duedate"
              selected={dueDate} // Use state variable
              onChange={handleDateChange} // Handle date change
              className="form-control"
              dateFormat="yyyy-MM-dd" // Format for displaying date
            />
            <p className="text-danger">{errors.duedate?.message}</p>
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default AddUser;
