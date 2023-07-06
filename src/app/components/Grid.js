import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Record from './Record';

const queryClient = new QueryClient(); // Create an instance of QueryClient

export const Grid = ({ rows, cols }) => (
    <QueryClientProvider client={queryClient}> {/* Wrap your component tree with QueryClientProvider */}
        <div className="Grid" style={{ gridTemplateColumns: `75px repeat(${cols}, 120px)` }}>
            <div className="flex space-x-0 mt-4 mb-2.5">
                <button className="bg-primary w-200 h-8 text-xs font-bold py-1 px-4 rounded-l">
                    A
                </button>
                <button className="bg-primary w-200 h-8 text-xs font-bold py-1 px-4">
                    B
                </button>
                <button className="bg-primary w-200 h-8 text-xs font-bold py-1 px-4 rounded-r">
                    C
                </button>
            </div>
            <div className={`grid grid-rows-[${rows}]   gap-x-0 gap-y-2`}>
                {Array(rows).fill(null).map((_, row) =>
                    <Record row={row} cols={cols} key={`Row-${row}`} ></Record>
                )}
            </div >
        </div>
    </QueryClientProvider>
);

export default Grid;
