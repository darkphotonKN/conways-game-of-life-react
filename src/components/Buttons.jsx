import React, { Component } from 'react';

const Buttons = (props) => {
    return (
        <div> 
            <button
                onClick={() => props.onPlay()}
                className="btn-main">
                Begin
            </button>
            <button
                onClick={() => props.onClearGrid()}
                className="btn-main">
                Stop
            </button>
        </div>
    );
}
 
export default Buttons;