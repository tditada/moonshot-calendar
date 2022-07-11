import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Launch } from './types';

const LAUNCHES_API = 'https://lldev.thespacedevs.com/2.2.0/launch/';
const LIMIT_API = 500; //TODO: Set pagination

const UPCOMING_TEXT = 'Upcoming launches next 3 months';
const NAME = 'Name';
const LAUNCH = 'Launch';
const MAP_IMAGE = 'Map Image';
const COUNTRY = "Country Code";

const StyledLaunchItem = styled.div`
  margin: 0.5em;
`;

const StyledMap = styled.img`
    width: 400px;
    height: auto;
`;

const Launches = () => {
    const [launchesList, setLaunchesList] = useState<Array<Launch>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState<number>(0);

    const now = moment.utc().format();
    const three_months = moment.utc().add(3, 'months').format(); // Moment 'months': from 11/7 to 11/10 there's 3 month.

    const getData = async () => {
        try {
            const response = await axios.get(
                LAUNCHES_API,
                {
                    params: {
                        limit: LIMIT_API,
                        net__gt: now,
                        net__lt: three_months
                    }
                }
            );
            setLaunchesList(response.data.results);
            setOffset(offset + LIMIT_API);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            setLaunchesList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div>{UPCOMING_TEXT}</div>
            {launchesList.map((launch) => {
                return <StyledLaunchItem key={launch.id}>
                    <div>{NAME}: {launch.name} </div>
                    <div>{LAUNCH}: {launch.net}</div>
                    <div>{COUNTRY}: {launch.pad.location.country_code} </div>
                    <div>{MAP_IMAGE}:
                        <StyledMap src={launch.pad.map_image} />
                    </div>
                </StyledLaunchItem>
            })}
        </div>
    );
};

export default Launches;