import { createSlice } from '@reduxjs/toolkit'

const exampleSlice = createSlice({
  name: 'todos',
  initialState: {
    todos:[],
    initialName:'Rafay'
  },
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      })
    },
    todoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload)
      todo.completed = !todo.completed
    },
  },
})

export const { todoAdded, todoToggled } = exampleSlice.actions
export default exampleSlice.reducer