import React from 'react';
import Button from 'react-bootstrap/Button';

const Buttons = ({page, previousPage, nextPage}) => {

    return (
        <div className="buttons col-12 d-flex justify-content-between p-0">
            <Button onClick={previousPage} className="btn-custom">Previous</Button>
            <span className="align-self-center">{page}</span>
            <Button onClick={nextPage} className="btn-custom">Next</Button>
        </div>
    );
};

export default Buttons;
