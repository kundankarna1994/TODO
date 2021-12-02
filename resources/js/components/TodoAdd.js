import Axios from "axios";
import React,{useState,useEffect} from "react";
import Asignee from "./Asignee";
import CustomDate from "./Date";
import TinyEditor from "./Editor";

const TodoAdd = ({handleEdit,edit,id}) => {
    const intitalState = {
        title: "",
        description: "",
        asignee: "",
        due_date: "",
    };
    const [data,setData] = useState(intitalState);
    const [errors,setErrors] = useState({});
    
    useEffect(() => {
        console.log(edit);
        if(edit){
            fetchData();
        }
    }, [edit]);

    const fetchData = async() => {
         const response = await Axios.get("/api/todo/" + id);
         setData({
             title: response.data.data.title,
             description: response.data.data.description,
             asignee: response.data.data.asignee,
             due_date: response.data.data.formated_due_date,
         });
    }
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
        if(edit){
            editTodo();
        }else{
            createTodo();
        }
    }

    const createTodo = async () => {
        setErrors({});
        try {
            const response = await Axios.post("/api/todo", data);
            setErrors({});
            setData(intitalState);
            $("#exampleModalCenter").modal("hide");
        } catch (err) {
            if (err.response.status === 422) {
                setErrors(err.response.data.errors);
                handleEdit(false, null);
            } else {
                setErrors({});
                setData(intitalState);
                $("#exampleModalCenter").modal("hide");
                handleEdit(false, null);
            }
        }
    }

    const editTodo = async () => {
         setErrors({});
         try {
             const response = await Axios.put("/api/todo/" + id, data);
             setErrors({});
             setData(intitalState);
             $("#exampleModalCenter").modal("hide");
             handleEdit(false,null);
         } catch (err) {
             if (err.response.status === 422) {
                 setErrors(err.response.data.errors);
             } else {
                 setErrors({});
                 setData(intitalState);
                 $("#exampleModalCenter").modal("hide");
                 handleEdit(false, null);
             }
         }
    }
    return (
        <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-lg"
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                            Add Todo
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
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
                                <strong>
                                    {errors.title ? errors.title[0] : ""}
                                </strong>
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
                                    {errors.description
                                        ? errors.description[0]
                                        : ""}
                                </strong>
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="asignee">Asignee</label>
                            <Asignee
                                handleChange={selectChange}
                                value={data.asignee}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="due_date">Due</label>
                            <CustomDate
                                handleChange={selectChange}
                                value={data.due_date}
                                handleChange={handleDateChange}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoAdd;
