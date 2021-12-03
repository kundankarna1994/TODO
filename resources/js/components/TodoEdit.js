import Axios from "axios";
import React, { useState, useEffect } from "react";
import Asignee from "./Asignee";
import Comments from "./Comments";
import CustomDate from "./Date";
import TinyEditor from "./Editor";
import { useParams, useNavigate } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const TodoEdit = ({}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const intitalState = {
        title: "",
        description: "",
        asignee: "",
        due_date: "",
    };
    const [data, setData] = useState(intitalState);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(false);
    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        const response = await Axios.get("/api/todo/" + id);
        setData({
            title: response.data.data.title,
            description: response.data.data.description,
            asignee: response.data.data.asignee,
            due_date: response.data.data.formated_due_date,
        });
    };

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const editorChange = (value) => {
        setData((prevState) => ({
            ...prevState,
            description: value,
        }));
    };
    const selectChange = (e) => {
        const { value } = e;
        setData((prevState) => ({
            ...prevState,
            asignee: value,
        }));
    };
    const handleDateChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            due_date: e,
        }));
    };

    const onSubmit = async () => {
        setErrors({});
        try {
            await Axios.put("/api/todo/" + id, data);
            setErrors({});
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                navigate("/");
            }, 1000);
        } catch (err) {
            if (err.response.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({});
                setData(intitalState);
            }
        }
    };

    return (
        <div>
            {alert && (
                <SweetAlert
                    success
                    title="Success!"
                    onConfirm={() => setAlert(false)}
                >
                    Todo Updated Successfully
                </SweetAlert>
            )}

            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    value={data.title}
                    className={
                        errors.title
                            ? "is-invalid form-control"
                            : "form-control"
                    }
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    onChange={handleChange}
                />
                <span className="invalid-feedback" role="alert">
                    <strong>{errors.title ? errors.title[0] : ""}</strong>
                </span>
            </div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <TinyEditor
                    value={data.description}
                    handleChange={editorChange}
                />
                <span className="textarea-feedback" role="alert">
                    <strong>
                        {errors.description ? errors.description[0] : ""}
                    </strong>
                </span>
            </div>
            <div className="form-group">
                <label htmlFor="asignee">Asignee</label>
                <Asignee handleChange={selectChange} value={data.asignee} />
            </div>
            <div className="form-group">
                <label htmlFor="due_date">Due</label>
                <CustomDate
                    handleChange={selectChange}
                    value={data.due_date}
                    handleChange={handleDateChange}
                />
            </div>
            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-primary"
            >
                Submit
            </button>

            <Comments id={id} />
        </div>
    );
};

export default TodoEdit;
