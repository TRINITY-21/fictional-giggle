import Lottie from 'lottie-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import darkIcon from '../../assets/dark.png';
import headerIcon from '../../assets/header.json';
import lightIcon from '../../assets/light.png';
import { addTask } from '../../store/reducer';
import DarkButton from './DarkButton';
import LightButton from './LightButton';


function Header() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(true);
  const taskRef = useRef('');
  const descriptionRef = useRef(''); 

  const handleClick = () => {
    if (taskRef.current.value === '' || descriptionRef.current.value === '') {
      return; 
    }

    // Dispatch both task and description as an object
    dispatch(addTask({
      task: taskRef.current.value,
      description: descriptionRef.current.value
    }));

    // Clear input fields after dispatch
    taskRef.current.value = '';
    descriptionRef.current.value = '';
  };

  useEffect(() => {
    document.querySelector('html').className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <>
      <div className='relative z-10 text-center bg-[#95DBC4] dark:bg-black font-roboto w-full h-64 flex items-center justify-center px-4'>
        <div className='flex items-center justify-center w-full mb-6'>
          <Lottie
            className='w-72 h-72 mb-5'
            animationData={headerIcon}
            loop={true}
            autoplay={true}
          />
        </div>

        <img
          onClick={() => setDarkMode(!darkMode)}
          className='cursor-pointer absolute lg:mr-20 right-2 top-1/2 transform -translate-y-1/2 w-12 h-12'
          src={darkMode ? darkIcon : lightIcon}
          alt="moon icon"
        />
      </div>

      {/* Inputs for task and description */}
      <div className='m-10 relative z-20 flex flex-col sm:flex-row gap-4 justify-center items-center -mt-10'>
        <input
          type="text"
          ref={taskRef}
          placeholder='Add a new task 📝'
          className='text-gray-500 dark:bg-Header font-roboto shadow-2xl rounded-lg dark:text-white font-semibold p-3 h-16 max-w-3xl w-full'
        />

        <input
          type="text"
          ref={descriptionRef}
          placeholder='Add a description 📄'
          className='text-gray-500 dark:bg-Header font-roboto shadow-2xl rounded-lg dark:text-white font-semibold p-3 h-16 max-w-3xl w-full'
        />

        <div className='flex-shrink-0'>
          {darkMode ? <DarkButton onClick={handleClick} /> : <LightButton onClick={handleClick} />}
        </div>
      </div>
    </>
  );
}

export default Header;
