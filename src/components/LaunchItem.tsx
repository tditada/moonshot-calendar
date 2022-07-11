import React from 'react';
import styled from 'styled-components';
import { Launch } from './types';

const NAME = 'Name';
const LAUNCH = 'Launch';
const MAP_IMAGE = 'Map Image';
const COUNTRY = "Country Code";
const STATUS = 'Status';

const StyledLaunchItem = styled.div`
  margin: 0.5em;
  padding: 1em;
  border: solid 1px black;
`;

const StyledMap = styled.img`
    width: 400px;
    height: auto;
`;

const LaunchItem = ({ launch }: { launch: Launch }) => {
    return <StyledLaunchItem key={launch.id}>
        <div>{NAME}: {launch.name} </div>
        <div>{LAUNCH}: {launch.net}</div>
        <div>{COUNTRY}: {launch.pad.location.country_code} </div>
        <div>{STATUS} : {launch.status.abbrev}</div>
        <div>
            <div>{MAP_IMAGE}:</div>
            <StyledMap src={launch.pad.map_image} />
        </div>
    </StyledLaunchItem>
};

export default LaunchItem;

