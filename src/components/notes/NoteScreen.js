import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note} = useSelector(state => state.notes);
    // console.log(note);

    const activeId = useRef(note.id);

    const [formValues, handleInputChange, reset] = useForm(note);

    const {title, body} = formValues;

    //Cuando la nota activa cambia resetea los datos del journal y setea la nota activa
    useEffect(() => {

        if(note.id !== activeId.current) {
            reset(note)
            activeId.current = note.id
        }

    }, [note, reset]);

    useEffect(() => {
        
        dispatch(activeNote(note.id, {...formValues}))

    }, [formValues, dispatch, note.id]);
    
    const handleDelete = () => {
        dispatch(startDeleteNote(note.id))

    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    name='title'
                    placeholder="Escribe el título"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    name='body'
                    placeholder="¿Qué pasó hoy?"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    note.url && 
                    <div className="notes__image">
                        <img 
                            src={note.url}
                            alt={note.id}
                        />
                    </div>
                }


                <button
                className="btn buttons__btn-danger mt-5 pointer"
                onClick={handleDelete}
                >
                    Delete
                </button>


            </div>

        </div>
    )
}
