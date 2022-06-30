import React from 'react';
import Photo from '../images/working.png';
import gIcon from '../images/gIcon.png';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.init';
import { Link } from 'react-router-dom';

function Banner() {
    const [user1]=useAuthState(auth)
    const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);




    return (
        <div className='bg-gray-200 flex justify-around pl-24 pr-36 py-28'>
            <div className='mt-12'>
                <h3 className='text-4xl font-semibold'>Manage your task smartly</h3>
                <p className='text-xl font-semibold mt-4'>Organize your life here</p>
                {error && <p className='text-red-600 mt-4'>{error.message}</p>}
                {
                    user1 ?
                        <Link to='/todo'><button  className='btn btn-primary mt-4'>
                        Get Started
                    </button></Link>
                        :
                        <button onClick={() => signInWithGoogle()} className='btn btn-primary mt-4'>
                            {
                                loading ? <p>Loading ... ...</p>
                                    :
                                    <p className='flex'>
                                        <img className='w-6 mr-2 bg-white rounded-full text-white' src={gIcon} alt="" /> <p className='pt-1'>Continue with Google</p>
                                    </p>
                            }
                        </button>
                }
            </div>
            <img className='w-[500px]' src={Photo} alt="working illustration" />
        </div>
    )
}

export default Banner;
