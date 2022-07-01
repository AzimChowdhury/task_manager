import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.init';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import Spinner from './Spinner';
import done from '../images/done.png';
import edit from '../images/edit.png';

function ToDo() {
    const [user] = useAuthState(auth);
    const [editingId, setEditingId] = useState('');
    const [editedTask, setEditedTask] = useState({});

    const { data, isLoading, refetch } = useQuery('tasks', () => fetch(`http://localhost:5000/myTasks/${user.email}`).then(res => res.json()))

    const handleAddTask = (event) => {
        event.preventDefault();
        const rawDate = event.target.date.value;
        const splitDate = rawDate.split('-')
        const date = (splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0])
        const name = event.target.name.value;
        const description = event.target.des.value;
        const task = { email: user.email, date, name, description }
        fetch('http://localhost:5000/addTask', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                data.acknowledged && toast.success('Task added successfully')
                refetch()
                event.target.reset();
            })
    }



    if (isLoading || !data) {
        return <Spinner></Spinner>
    }


    const handleCompletedTask = (task) => {
        fetch('http://localhost:5000/completed', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    fetch(`http://localhost:5000/deleteTask/${task._id}`, {
                        method: "DELETE",
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            data.acknowledged && toast.success('Task completed successfully')
                            refetch()
                        })
                }
            })
    }

    if (editingId) {
        fetch(`http://localhost:5000/task/${editingId}`)
            .then(res => res.json())
            .then(data => {
                data && setEditedTask(data); setEditingId('') 
                
            })
    }


    const editTask = (event) => {
        event.preventDefault()
        const name = event.target.name.value;
        const description = event.target.des.value;
        fetch(`http://localhost:5000/editTask/${editedTask._id}`,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({name,description})
        })
        .then(res=>res.json())
        .then(data=>{
            data.acknowledged && toast.success("Task edited successfully");
            refetch()
        })

        event.target.reset()
    }


    return (
        <div className='flex'>
            <div className="overflow-x-auto w-4/6 pl-4">
                <h2 className='text-3xl font-semibold text-center p-4'>Your Tasks</h2>
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Task Name</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, index) => {
                                return <tr className='' key={index}>
                                    <td>{d.date}</td>
                                    <td>{d.name.length > 20 ? <p>{d.name.slice(0, 20)} ... ...</p> : d.name}</td>
                                    <td>{d.description.length > 50 ? <p>{d.description.slice(0, 50)}  ... ...</p> : d.description}</td>
                                    <td><label htmlFor="my-modal-3" onClick={() => setEditingId(d._id)}><img className='w-8 hover:bg-primary rounded-full' src={edit} alt="" /></label></td>

                                    <td>
                                        <button onClick={() => handleCompletedTask(d)}>
                                            <img className='hover:bg-yellow-400 w-6 rounded-full' src={done} alt="" /></button>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>




            <div className='w-2/6 p-4'>
                <p className='text-2xl font-semibold text-center mb-4'>Add Task</p>
                <form onSubmit={handleAddTask}>
                    <input required className='input input-bordered w-3/4 h-16 mb-2' type="date" name="date"
                        placeholder="dd-mm-yyyy"
                        min="01-01-2021" max="31-12-2050"></input> <br />
                    <input required className="input input-bordered w-3/4 mb-2" type='text' name='name' placeholder="Task Name" /> <br />
                    <textarea placeholder='Task Description' required className='textarea textarea-bordered mb-2' name='des' rows="3" cols="41"></textarea> <br />
                    <button type='submit' className='btn btn-primary w-3/4 text-white'>Add task</button>
                </form>
            </div>





            {/* <!-- The button to open modal --> */}


            {/* <!-- Put this part before </body> tag-- > */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative  w-96">
                    <label htmlFor="my-modal-3" className="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold my-4">Edit your Task</h3>
                    <form onSubmit={editTask}>
                        <input required className="input input-bordered w-full mb-4" type='text' name='name' placeholder="Task Name" contentEditable='true' defaultValue={editedTask.name} /> <br />
                        <textarea contentEditable={true} placeholder='Task Description' required className='textarea textarea-bordered mb-2' name='des' rows="3" cols="41" defaultValue={editedTask.description}></textarea> <br />
                        <label for="my-modal-3"><input type='submit' className='btn btn-primary w-full text-white' value='Edit task'/></label>
                    </form>
                </div>
            </div>






        </div >
    )
}

export default ToDo;
