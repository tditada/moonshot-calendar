import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StatusForm from './StatusForm';
import { Launch, LaunchesGetParams } from './types';

const LAUNCHES_API = 'https://lldev.thespacedevs.com/2.2.0/launch/';
const LIMIT_API = 500; //TODO: Set pagination

const UPCOMING_TEXT = 'Upcoming launches next 3 months';
const NAME = 'Name';
const LAUNCH = 'Launch';
const MAP_IMAGE = 'Map Image';
const COUNTRY = "Country Code";
const STATUS = 'Status';
const ERROR_MESSAGE = "Error getting launches"; // Outside dev enviroment we shouldn't show the full error we get from the API (security reasons)

const StyledLaunchItem = styled.div`
  margin: 0.5em;
  padding: 1em;
  border: solid 1px black;
`;

const StyledMap = styled.img`
    width: 400px;
    height: auto;
`;

const StyledCircularProgress = styled(CircularProgress)`
    padding: 1em;
`

const StyledTitle = styled.div`
    padding: 1em;
`

const STATUS_LIST = [{ id: 0, abbrev: 'All' }, { id: 1, abbrev: "Go" }, { id: 2, abbrev: "TBD" }]; //Getting this dynamically would be much better

const Launches = () => {
    const [launchesList, setLaunchesList] = useState<Array<Launch>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState<number>(0);
    const [status, setStatus] = useState<number>(0);

    const now = moment.utc().format();
    const three_months = moment.utc().add(3, 'months').format(); // Moment 'months': from 11/7 to 11/10 there's 3 month.

    const getData = async () => {
        try {
            setLoading(true);

            const params: LaunchesGetParams = {
                limit: LIMIT_API,
                net__gt: now,
                net__lt: three_months,
            };

            //Filtering the ALL state manually
            if (status > 0) {
                params.status = status
            };

            const response = await axios.get(
                LAUNCHES_API,
                {
                    params
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

    const handleStatusSelect = (id: number) => {
        setStatus(id);
    }

    useEffect(() => {
        getData();
    }, [status]);

    return (
        <div>
            {error ? <Alert severity="error">{ERROR_MESSAGE}: {error} </Alert> : ''}
            <React.Fragment>
                <StyledTitle>{UPCOMING_TEXT}</StyledTitle>
                <StatusForm statusList={STATUS_LIST} handleSelect={handleStatusSelect} />
            </React.Fragment>
            <React.Fragment>
                {loading ? <StyledCircularProgress /> : launchesList.map((launch) => {
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
                })}
            </React.Fragment>
        </div>
    );
};

export default Launches;