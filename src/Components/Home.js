import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.init';
import Banner from './Banner';
import Calender from './Calander';
import Spinner from './Spinner';
import ToDo from './ToDo';

function Home() {
    const [user, isLoading] = useAuthState(auth)
    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div>
            <Banner></Banner>
            {user && <>
                <Calender></Calender>
                <ToDo></ToDo>
                
            </>}
        </div>
    )
}

export default Home;
