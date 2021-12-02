import React from 'react';
import Button from 'react-bootstrap/Button';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const Buttons = ({page, previousPage, nextPage}) => {

    return (
        <div className="buttons col-12 d-flex justify-content-center p-0">
            <Button onClick={previousPage} className="btn-custom"><ArrowBackIosRoundedIcon/></Button>
            <span className="align-self-center px-2">{page}</span>
            <Button onClick={nextPage} className="btn-custom"><ArrowForwardIosRoundedIcon/></Button>
        </div>
    );
};

export default Buttons;
