import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';


//{log} comes from mapStateToProps below that has entire state
const Logs = ({log : {logs, loading}, getLogs}) => {

    useEffect(() => {
        getLogs();
        //es-lint-disable-nextline
    },[]);

    if(loading || logs === null){
        return <Preloader />
    }
    return (
        <ul className='collection with-header'>
            <li className='collection-header'>
                <h4 className='center'>System Logs</h4>
            </li>
            {/* check the loading and logs length map through logs */}
            {/* {condition ? (true_case : false_case)} */}
            {!loading && logs.length === 0 ? (<p className='center'>No Logs to show...</p>) : (
                // map through the logs
                logs.map(log => <LogItem log ={log} key={log.id}/>)
            )}
        </ul>
    )
}

Logs.prototype = {
    log:PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    //get state.log from reducers/index.js
    log:state.log,
});

export default connect(mapStateToProps,{getLogs})(Logs);
