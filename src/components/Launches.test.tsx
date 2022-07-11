import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import Launches from './Launches';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Launches Component', () => {
    const renderComponent = () => (render(<Launches />));

    beforeEach(() => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                results: [{
                    name: 'lala',
                    net: 'net',
                    pad: {
                        location: { country_code: 'US' },
                    },
                    status: { abbrev: 'status' }
                }]
            },
            status: 200,
            statusText: 'Ok',
            headers: {},
            config: {},
        });
    })

    test('renders the launches from the API', async () => {
        const { getByTestId } = renderComponent();

        await waitFor(() => {
            const list = getByTestId('launches-list'); //Getting by test-id should be the last option, role is much better for example
            expect(list).toBeInTheDocument();
            expect(list).toBeVisible();
            expect(list).toHaveTextContent('lala');
        });
    });


    test('renders the loading while waiting', async () => {
        //Here we should check as the loading appears and then goes away.
     });

    test('renders the error msg if there was an error', async () => {
        //Set axios mock to get an error example status:400 and see that the error appears
    });

    test('getData again when status changes', async () => {
        //We should check the hook: getData should be called again if status changes
     });


})