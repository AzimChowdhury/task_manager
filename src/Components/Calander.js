import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import schedule from '../images/schedule.jpg'

const Calender = () => {
    const [date, setDate] = useState(new Date())
    // console.log(format(date,"dd-MM-yyyy"))
    return (
        <div className='flex justify-evenly my-10'>
            <div>
            <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate} />
                <p>Selected Date :  {format(date,'dd-MM-yyyy')}</p>
            </div>
            <div>
                <img className='w-[550px]' src={schedule} alt=""/>
            </div>
        </div>
    );
}

export default Calender;