
import { useMutation, useQuery } from 'react-query';
import { BASE_URL } from '../../config/api';
import { useState } from 'react';


const useSaveMutation = ({ onSuccess, onError }) => {
    const [processId, setProcessId] = useState(null);
    const [stop, setStop] = useState({});
    const handleError = (error) => {
        console.log("Error occured", error);
        onError && onError();

        setStop(true);
        setProcessId(null);
    }

    const handleDone = () => {
        setStop(true);
        // Clean up processId
        setProcessId(null);
        onSuccess && onSuccess();
    }
    const { mutate, isLoading: isLoadingOnSave } = useMutation((csvData) => {
        setStop(false);
        return fetch(`${BASE_URL}/save`, {
            method: 'POST',
            body: JSON.stringify({ data: csvData }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    },
        {
            onError: (error) => {
                setStop(true);
                handleError(error);
            },
            onSuccess: async response => {
                if (response.status >= 200 && response.status < 300) {
                    const data = await response.json();
                    if (data.status === 'DONE') {
                        handleDone();
                    } else if (data.status === 'IN_PROGRESS') {
                        setProcessId(data.id);
                        console.log(`Data save in progress. ID: ${data.id}`);
                    }
                }
                else {
                    handleError(response);
                }
            },
        }
    );

    const { response, isLoading: isLoadingOnGet } = useQuery(
        [`${BASE_URL}/get-status?id=${processId}`, processId],

        () => {
            console.log(`Getting status... ${processId}`);
            return fetch(`${BASE_URL}/get-status?id=${processId}`, {
                method: 'GET'
            })
        },
        {
            onSuccess: async response => {
                if (response.status >= 200 && response.status < 300) {
                    try {
                        let data = await response.json();

                        if (data.status === 'DONE') {
                            handleDone();
                        }
                        if (data.status === 'IN_PROGRESS') {
                            console.log(`Data save in progress. ID: ${processId}`);
                        }
                    }
                    catch (error) {
                        handleError(error);
                    }
                }
                else {
                    handleError(response);
                }
            },
            onError: error => {
                handleError(error);
            },
            refetchInterval: stop ? false : 5000,
            enabled: processId != null,
            refetchIntervalInBackground: true,
            refetchOnWindowFocus: false,
        }
    );

    const isLoading = isLoadingOnSave | isLoadingOnGet;
    // if (getStatusQuery.data?.status === 'DONE')
    //     console.log("Data saved successfully");

    // if (getStatusQuery.data?.status === 'IN_PROGRESS')
    //     console.log(`Data save in progress. ID: ${processId}`);

    // if (getStatusQuery.isError)
    //     console.log("Error getting status");

    return { mutate, response, isLoading };
};

export default useSaveMutation;