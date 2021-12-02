import React,{useEffect,useState,useContext} from 'react'
import { MentionsInput, Mention } from "react-mentions";
import { UsersContext } from '../context/UsersContext';
import './mention.css';
const Comments = () => {
    const users = useContext(UsersContext);
    const [message, setMessage] = useState("");
    const [mentions, setMentions] = useState([]);
    const handleChange = (event, newValue, newPlainTextValue, mentions) => {
         setMessage(newValue);
         setMentions({ mentions });
     };
    const userMentionData = users.map((user) => ({
        id: user.id,
        display: user.name,
    }));
    return (
        <div className="d-flex justify-content-center row">
            <div className="col-md-12">
                <div className="d-flex flex-column comment-section">
                    <div className="bg-light p-2">
                        <div className="">
                            <MentionsInput
                                value={message}
                                onChange={handleChange}
                                placeholder="Type anything, use the @ symbol to tag other users."
                                className="mentions"
                            >
                                <Mention
                                    type="user"
                                    markup="@{{__id__||__display__}}"
                                    trigger="@"
                                    data={userMentionData}
                                    className="mentions__mention"
                                />
                            </MentionsInput>
                        </div>
                        <div className="mt-2 text-right">
                            <button
                                className="btn btn-primary btn-sm shadow-none"
                                type="button"
                            >
                                Post comment
                            </button>
                            <button
                                className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-2">
                        <div className="d-flex flex-row user-info">
                            <img
                                className="rounded-circle"
                                src="https://i.imgur.com/RpzrMR2.jpg"
                                width="40"
                            />
                            <div className="d-flex flex-column justify-content-start ml-2">
                                <span className="d-block font-weight-bold name">
                                    Marry Andrews
                                </span>
                                <span className="date text-black-50">
                                    Shared publicly - Jan 2020
                                </span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="comment-text">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments
