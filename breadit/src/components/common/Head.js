import React from 'react';
import Helmet from "react-helmet";

const Head = ({title}) => {
    return (
        <Helmet title={title} htmlAttributes={{ lang: "en" }} />
    );
};

export default Head;
