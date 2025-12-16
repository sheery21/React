import { createSlice } from "@reduxjs/toolkit";



const counterSlice = createSlice({
     name : "couter",
     initialState : {
         counterVelue : 0,
     },
     reducers : {
        addTodo : (state , {payload}) =>{
            console.log("addTodo" , state.counterVelue , payload);
            
            state.counterVelue = ++state.counterVelue;
        },
        removeTodo : (state) =>{
            state.counterVelue = --state.counterVelue
        }
     }
})

const {reducer , actions} = counterSlice;

const counterReducer =  reducer

const { addTodo , removeTodo, payload } = actions;

export {counterReducer , addTodo , removeTodo , payload}