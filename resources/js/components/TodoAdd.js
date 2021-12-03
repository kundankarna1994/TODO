import Axios from "axios";
import React,{useState} from "react";
import Asignee from "./Asignee";
import CustomDate from "./Date";
import TinyEditor from "./Editor";
import SweetAlert from "react-bootstrap-sweetalert";
import { useNavigate } from "react-router-dom";

const TodoAdd = ({}) => {
    const intitalState = {
        title: "",
        description: "",
        asignee: "",
        due_date: "",
    };
     const navigate = useNavigate();
    const [data,setData] = useState(intitalState);
    const [errors,setErrors] = useState({});
    const [alert, setAlert] = useState(false);

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
    }
    const selectChange = (e) => {
        const {value} = e;
        setData((prevState) => ({
            ...prevState,
            asignee: value,
        }));
    }
    const handleDateChange = (e) => {
        console.log(e);
        setData((prevState) => ({
            ...prevState,
            due_date: e,
        }));
    }

    const onSubmit = async() => {
        setErrors({});
        try {
            const response = await Axios.post("/api/todo", data);
            setErrors({});
            setData(intitalState);     
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
    }
    

    return (
        <div>
            {alert && (
                <SweetAlert
                    success
                    title="Success!"
                    onConfirm={() => setAlert(false)}
                >
                   Todo Added Successfully
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
            <button type="submit" onClick={onSubmit} className="btn btn-primary">
                Submit
            </button>
        </div>
    );
};

export default TodoAdd;
