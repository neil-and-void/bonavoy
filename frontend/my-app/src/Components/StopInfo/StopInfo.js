import React from 'react';

import './style.css';
import ActivitiesList from '../ActivitiesList/ActivitiesList';

class StopInfo extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='expanded'>
                <div>
                    Accomodation
                </div>
                <ActivitiesList/>
            </div>

        )
    }
}

export default StopInfo;
