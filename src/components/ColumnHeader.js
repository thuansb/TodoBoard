import React from 'react';
import CounterBox from './CounterBox';

function ColumnHeader({ title, count }) {
    return (
        <div className="column__header">
            <div className="column__header__title">
                {title}
            </div>
            <div className="column__header__counter">
                <CounterBox count={count} />
            </div>
        </div>
    )
}

export default ColumnHeader;