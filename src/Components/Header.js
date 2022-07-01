import React from 'react'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../firebase.init';

function Header() {
    const [user] = useAuthState(auth)
    const[signInWithGoogle,error]=useSignInWithGoogle(auth)
    const menu = <>
        <li><Link to='/calender' className='text-lg font-semibold hover:text-primary'>Calender</Link></li>
        <li><Link to='/todo' className='text-lg font-semibold hover:text-primary'>To Do</Link></li>
        <li><Link to='/completed' className='text-lg font-semibold hover:text-primary'>Completed</Link></li>
        <li>
            {user ?
                <p onClick={()=>signOut(auth)} className='text-lg font-semibold hover:text-primary'>Sign Out</p>
                :
                <p onClick={()=>signInWithGoogle()} className='text-lg font-semibold hover:text-primary'>Continue with Google <br/>{error&& error.message}</p>
            }
        </li>
    </>
    return (
        <div className="navbar bg-base-100 sticky top-0 h-20">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost font-bold  text-3xl ml-32 hover:text-primary">Task Manager</Link>
            </div>
            <div className="navbar-center hidden lg:flex pl-52">
                <ul className="menu menu-horizontal p-0">
                    {menu}
                </ul>
            </div>
        </div>
    )
}

export default Header;
