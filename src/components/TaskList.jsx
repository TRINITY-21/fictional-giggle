import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskBox from './TaskItem';
import Button from './ui/Button';

function TaskList() {
  const [filter, setFilter] = useState('all');
  const [noTask, setNoTask] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    setNoTask(tasks.length === 0);
  }, [tasks]);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const filteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    if (filter === 'active') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  };

  return (
    <>
      <h2 className='text-black text-center p-5 mt-10 dark:text-white font-roboto font-semibold text-4xl'>TaskList</h2>

      <div className='text-center lg:m-10  p-8 border-t-2 border-gray-900 dark:border-gray-700 rounded-3xl'>
        {noTask && (
          <div className='m-16 border-spacing-3 flex flex-col gap-5 items-center justify-center'>
            <img
              src='https://img.icons8.com/ios/50/clipboard.png'
              alt='empty icon'
              className='filter dark:invert '
            />
            <h3 className='text-black dark:text-white font-roboto font-semibold text-2xl'>
              You currently have no task
            </h3>
          </div>
        )}
        {!noTask && (
          <div>
            <div className='flex gap-2 justify-center items-center'>
              <Button
                onClick={() => handleFilterChange('all')}
                className={filter === 'all' ? 'bg-indigo-800 text-white' : 'bg-white text-black'}
              >
                All
              </Button>
              <Button
                onClick={() => handleFilterChange('completed')}
                className={filter === 'completed' ? 'bg-indigo-800 text-white' : 'bg-white text-black'}
              >
                Completed
              </Button>
              <Button
                onClick={() => handleFilterChange('active')}
                className={filter === 'active' ? 'bg-indigo-800 text-white' : 'bg-white text-black'}
              >
                Active
              </Button>
            </div>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredTasks()
                .slice()
                .reverse() 
                .map((task, index) => (
                  <TaskBox 
                    key={task.id} 
                    task={task} 
                    isFirst={index === 0} // Highlight the first item
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TaskList;
