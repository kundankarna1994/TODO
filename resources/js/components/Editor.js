import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";



const TinyEditor = ({className,value,handleChange}) => {
    const editorRef = useRef(null);
    return (
        <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={(value,editor) => handleChange(value)}
            value={value}
            className={className}
            init={{
                height: 200,
                menubar: false,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
        />
    );
}

export default TinyEditor;
