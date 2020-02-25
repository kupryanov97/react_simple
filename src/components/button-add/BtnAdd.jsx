import React from 'react';

const BtnAdd= (props) => {
    return(
        
        <button type="button" className="btn" onClick={ ()=> {props.newNote('Новая заметка','') }}>+Заметка</button>)
}

export default BtnAdd;