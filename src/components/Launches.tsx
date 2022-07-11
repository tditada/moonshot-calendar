import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Launch } from './types';

const LAUNCHES_API = 'https://lldev.thespacedevs.com/2.2.0/launch/';
const LIMIT_API = 50;

const Launches = () => {
    const [launchesList, setLaunchesList] = useState<Array<Launch>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState<number>(0);

    const getData = async () => {
        try {
            const response = await axios.get(LAUNCHES_API, { params: { limit: LIMIT_API}});
            console.log(response.data);
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
            {launchesList.map((launch) => {
                return <div>{launch.name} | {launch.net}</div>
            })}
        </div>
    );
};

export default Launches;