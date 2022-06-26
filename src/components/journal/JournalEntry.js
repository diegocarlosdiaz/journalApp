import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, title, body, date, url}) => {

    const dispatch = useDispatch();

    const noteDate = moment(date);
    // console.log(noteDate);

    const handleNoteActive = () => {
        dispatch(activeNote(id, {
            title,
            body,
            date,
            url
        }))
    }

    return (
        <div 
        className="journal__entry pointer"
        onClick={handleNoteActive}
        >
            
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage:`url(${url})`
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd').charAt(0).toUpperCase() + noteDate.format('dddd').slice(1)}</span>
                <h4>{noteDate.format('D')}</h4>
            </div>

        </div>
    )
}
