import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { auth } from '../firebase.init';
import Spinner from './Spinner';

function Completed() {
    const [user,loading]=useAuthState(auth)
    const {data,isLoading}=useQuery('completed',()=>fetch(`http://localhost:5000/completed/${user.email}`).then(res=>res.json()))
    

    if(isLoading ||loading){
        return <Spinner></Spinner>
    }

    return (
        <div>
            <div className="overflow-x-auto w-full p-10">
                <h2 className='text-3xl font-semibold text-center p-4'>Completed Tasks</h2>
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Task Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, index) => {
                                return <tr className='' key={index}>
                                    <td>{d.date}</td>
                                    <td>{d.name.length > 20 ? <p>{d.name.slice(0, 20)} ... ...</p> : d.name}</td>
                                    <td>{d.description.length > 50 ? <p>{d.description.slice(0, 50)}  ... ...</p> : d.description}</td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Completed;
