import React, { useEffect, useState, useContext } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { UsersContext } from "../context/UsersContext";
import "./mention.css";
import Axios from "axios";
import Avatar from "react-avatar";
import { PusherContext } from "../context/PusherContext";

const Comments = ({ id }) => {
    const users = useContext(UsersContext);
    const channel = useContext(PusherContext);

    useEffect(() => {
        if (channel) {
            channel.bind(`CommentCreated.${id}`, function (data) {
                console.log('Comment Created');
                fetchComment();
            });
        }

        return () => {
            if (channel) {
                channel.unbind(`CommentCreated.${id}`);
            }
        };
    }, [channel]);
    const [comments, setComments] = useState([]);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        todo_id: id,
        message: "",
        mentions: {},
        formated_message: "",
    });
    const handleChange = (event, newValue, newPlainTextValue, mentions) => {
        setData({
            ...data,
            message: newValue,
            mentions: mentions,
            formated_message: newPlainTextValue,
        });
    };
    const userMentionData = users.map((user) => ({
        id: user.id,
        display: user.name,
    }));

    useEffect(() => {
        fetchComment();
    }, []);

    const fetchComment = async () => {
        const response = await Axios.get("/api/todo/" + id + "/comments");
        setComments(response.data.data);
    };

    const onSubmit = async () => {
        setErrors({});
        try {
            await Axios.post("/api/comments/store", data);
            setData({ ...data, message: "", mentions: {} });
            setErrors({});
        } catch (err) {
            if (err.response.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({});
                setData({ ...data, message: "", mentions: {} });
            }
        }
    };
    const onCancel = () => {
        setData({ ...data, message: "", mentions: {} });
        setErrors({});
    }
    return (
        <div className="d-flex justify-content-center row">
            <div className="col-md-12">
                <div className="d-flex flex-column comment-section">
                    <div className="bg-light p-2">
                        <div className="">
                            <MentionsInput
                                value={data.message}
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
                            <span className="textarea-feedback" role="alert">
                                <strong>
                                    {errors.message ? errors.message[0] : ""}
                                </strong>
                            </span>
                        </div>
                        <div className="mt-2 text-right">
                            <button
                                onClick={onSubmit}
                                className="btn btn-primary btn-sm shadow-none"
                                type="button"
                            >
                                Post comment
                            </button>
                            <button
                                onClick={onCancel}
                                className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    {comments &&
                        comments.map((comment) => {
                            return (
                                <div key={comment.id} className="bg-white p-2">
                                    <div className="d-flex flex-row user-info">
                                        <Avatar
                                            name={comment.user}
                                            round={true}
                                            size={40}
                                        />
                                        <div className="d-flex flex-column justify-content-start ml-2">
                                            <span className="d-block font-weight-bold name">
                                                {comment.user}
                                            </span>
                                            <span className="date text-black-50">
                                                {comment.created_at}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="comment-text">
                                            {comment.formated_message}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Comments;
