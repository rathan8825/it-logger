import React,{ useState, useEffect } from 'react';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
const Logs = () => {
    //set logs state
    const [logs,setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLogs();
        //es-lint-disable-nextline
    },[]);

    const getLogs = async () => {
        setLoading(true);
        const res = await fetch('/logs');
        const data = await res.json();

        setLogs(data);
        setLoading(false);
    }

    if(loading){
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

export default Logs
