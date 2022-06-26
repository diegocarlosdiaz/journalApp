import { types } from "../types";

//estado inicial que va a tener el listado de las notas
const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.noteAddNew:

            return {
                ...state,
                notes: [...state.notes, action.payload]
            };
        case types.noteActive:

            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesLoad:

            return {
                ...state,
                notes: [...action.payload]
            }
        case types.noteUpdate:

            return {
                ...state,
                notes: state.notes.map(note => note.id === action.payload.id ? action.payload.note : note)
            }
        case types.noteDelete:

            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        default:
            return state;
    }
}