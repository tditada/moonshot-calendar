
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Status } from './types';

const StatusForm = ({ statusList, handleSelect }: { statusList: Array<Status>, handleSelect: Function }) => {
    
    const onChange = (e: any) => {
        e.preventDefault();
        console.log(e.target.value);
        handleSelect(e.target.value);
    }

    return (
        <React.Fragment>
            <FormControl fullWidth>
                <InputLabel id="status-simple-select-label">Status</InputLabel>
                <Select
                    labelId="status-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    value={0}
                    onChange={onChange}
                >
                    {statusList.map((status) => {
                        return (<MenuItem key={status.id} value={status.id}>{status.abbrev}</MenuItem>)
                    })}

                </Select>
            </FormControl>
        </React.Fragment>

    );
};

export default StatusForm;