import Axios from "axios";
import React, { useState, useEffect } from "react";
import Asignee from "./Asignee";
import Comments from "./Comments";
import CustomDate from "./Date";
import { useParams, useNavigate } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const TodoEdit = ({}) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const intitalState = {
        id:"",
        title: "",
        description: "",
        asignee: "",
        due_date: "",
        asignee_name:""
    };
    const [data, setData] = useState(intitalState);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(false);
    useEffect(() => {
        fetchData();
    }, [slug]);

    const fetchData = async () => {
        const response = await Axios.get("/api/todo/" + slug);
        setData({
            id:response.data.data.id,
            title: response.data.data.title,
            description: response.data.data.description,
            asignee: response.data.data.asignee,
            asignee_name: response.data.data.asignee_name,
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
            await Axios.put("/api/todo/" + slug, data);
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
                <label htmlFor="description">Description</label>
                <textarea
                    value={data.description}
                    onChange={handleChange}
                    name="description"
                    className={
                        errors.title
                            ? "is-invalid form-control"
                            : "form-control"
                    }
                ></textarea>
                <span className="invalid-feedback" role="alert">
                    <strong>
                        {errors.description ? errors.description[0] : ""}
                    </strong>
                </span>
            </div>
            <div className="form-group">
                <label htmlFor="asignee">Asignee</label>
                {data.asignee && data.asignee_name && (
                    <Asignee
                        handleChange={selectChange}
                        value={data.asignee}
                        label={data.asignee_name}
                    />
                )}
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

            {data.id && <Comments id={data.id} />}
        </div>
    );
};

export default TodoEdit;
