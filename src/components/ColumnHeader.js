import React from 'react';
import CounterBox from './CounterBox';

function ColumnHeader({ title, count }) {
    return (
        <div className="task-list__header">
            <div className="task-list__header__title">
                {title}
            </div>
            <div className="task-list__header__counter">
                <CounterBox count={count} />
            </div>
        </div>
    )
}

export default ColumnHeader;