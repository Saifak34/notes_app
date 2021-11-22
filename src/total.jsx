import React from 'react';

const Total = (props) => {
    return (
        <div>
            <p>
            Number of Exercises :  {props.course.parts.reduce(((x,y) => x + y.exercises),0)}
            </p>
        </div>
    );
};

export default Total;