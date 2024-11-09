import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        taskName: action.payload.task,
        description: action.payload.description,
        completed: false,
        id: nanoid(),
      };
      state.tasks.push(task);
      localStorage.setItem('taskList', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, updatedTask, updatedDescription } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.taskName = updatedTask;
        task.description = updatedDescription;
      }
      localStorage.setItem('taskList', JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('taskList', JSON.stringify(state.tasks));
    },
    toggleComp: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) {
          task.completedAt = new Date().toISOString(); // Store completion time
        } else {
          task.completedAt = null;
        }
      }
      localStorage.setItem('taskList', JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, removeTask, toggleComp, editTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
