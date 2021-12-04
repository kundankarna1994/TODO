import Axios from 'axios';
import React,{useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom';
import { PusherContext } from "../context/PusherContext";
import { UserContext } from "../context/UserContext";

const Notifications = () => {
    const [results,setResults] = useState([]);
    const channel = useContext(PusherContext);
    const user = useContext(UserContext);
    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        if (channel) {
            channel.bind(`Notification.User.${user.id}`, function (data) {
                fetchNotifications();
            });
        }

        return () => {
            if (channel) {
                channel.unbind(`Notification.User.${user.id}`);
            }
        };
    }, [channel]);
    const fetchNotifications = async() => {
        const response = await Axios.get('/api/user/notifications');
        setResults(response.data.data);
    }
    return (
        <div>
            {results && results.map((result) => {
                return (
                    <div
                        key={result.id}
                        className="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header"
                    >
                        <div className="font-weight-bold mr-3">
                            <Link to={result.data.url}>
                                <div className="small">
                                    {result.data.message}
                                </div>
                            </Link>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="text-right text-muted pt-1">
                                {result.created_at}
                            </div>
                        </span>
                    </div>
                );
            }) }
        </div>
    );
}

export default Notifications
