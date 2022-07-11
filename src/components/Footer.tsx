import React from 'react';
import styled from 'styled-components';

const FOOTER_TEXT = 'Done by T.C. di Tada (@tditada)';

const StyledFooter = styled.footer`
    margin-top: 3em;
    text-align: center;
`;

const Footer = () => {
    return (
        <StyledFooter>_
            <p>{FOOTER_TEXT}</p>
        </StyledFooter>
    );
};

export default Footer;