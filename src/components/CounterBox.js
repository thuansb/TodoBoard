import React from 'react';

function CounterBox({ count }) {
    return (
        <div className="counter-box">
            {count}
            <div className="counter-box__text">TASKS</div>
        </div>
    )
}

export default CounterBox;