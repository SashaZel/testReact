import React, { useReducer, useState } from 'react';

const initialTodoState = [
    {
        id: 'a',
        text: 'Learn React',
        isDone: false,
    },
    {
        id: 'b',
        text: 'Learn JS properly',
        isDone: false,
    }
];

const todosReducer = (state, action) => {
    switch (action.type) {
        case 'TODO_DONE':
            return state.map((e) => {
                if (e.id === action.id) {
                    return { ...e, isDone: true };
                }
                return e;
            });
        case 'TODO_UNDONE':
            return state.map((e) => {
                if (e.id === action.id) {
                    return { ...e, isDone: false };
                }
                return e;
            });
        case 'TODO_ADD':
            return [...state, { id: action.payload.id, text: action.payload.text, isDone: false }];
        case 'TODO_DELETE':
            return state.filter((e) => e.id !== action.id);
        default:
            return state;
    }
};

export const Todo = () => {

    const [todos, dispatch] = useReducer(todosReducer, initialTodoState);
    // should I hide this useState in useReducer too ?...
    const [textInput, setTextInput] = useState('');

    const handleTodo = (e) => {
        dispatch({ type: e.isDone ? 'TODO_UNDONE' : 'TODO_DONE', id: e.id });
    };

    const addItemTodo = (e) => {
        e.preventDefault();
        if (!e.target[0].value) return;
        dispatch({ type: 'TODO_ADD', payload: { id: new Date().toISOString(), text: e.target[0].value } });
        //console.log(e.target[0].value);
        setTextInput('');
    };

    return (
        <>
            <h2>Hello todo!</h2>
            <form onSubmit={(e) => addItemTodo(e)}>
                <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)}></input>
                <button>Add at TODO list</button>
            </form>
            <ul>
                {todos.map((e) => {
                    return (<li key={e.id}>
                        <label>
                            <input type="checkbox" onChange={() => handleTodo(e)} checked={e.isDone}></input>
                            <button onClick={() => dispatch({ type: 'TODO_DELETE', id: e.id })}>Del </button> {e.text}
                        </label>
                    </li>);
                })}
            </ul>
        </>
    );
}