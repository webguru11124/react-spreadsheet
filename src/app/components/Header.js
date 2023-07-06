import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { updateFilter } from '../store/actions';
import LoadingSpinner from '../common/LoadingSpinner';
const Header = (props) => (
    <>
        <div className='flex justify-between'>
            <h4 className="text-xl font-bold">Your Personal Staking Calculator </h4>
            {props.saving ? <LoadingSpinner /> : <div></div>}
        </div>
        <div className="w-full my-1 relative">
            <input type="text" className="w-full h-7 text-xs  bg-primary placeholder-opacity-30 focus:bg-white focus:border-none focus:outline-none rounded-md pl-10 py-2"
                placeholder="Type a search query to filter" onChange={(e) => props.updateFilter(e.target.value)} />
            <FontAwesomeIcon icon={faSearch} className="absolute text-sm opacity-30 top-1/2 left-3 transform -translate-y-1/2" />

        </div>
    </>
);

export default connect(({ saving }) => ({ saving }), { updateFilter })(Header);
