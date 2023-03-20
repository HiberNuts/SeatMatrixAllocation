import { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "reactstrap";
const FormFour = () => {
    const [files, setFiles] = useState([]);

    const handleDropChange = (acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    };

    return (
        <Dropzone acceptedFiles={[".pdf"]} onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                        <input {...getInputProps()} />
                        {files.length === 0 && (
                            <div className="dz-message">
                                <span className="dz-message-text">Drag and drop file</span>
                                <span className="dz-message-or">or</span>
                                <Button color="primary">SELECT</Button>
                            </div>
                        )}
                        {files.map((file) => (
                            <div
                                key={file.name}
                                className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                            >
                                <div className="dz-image">
                                    <img src={file.preview} alt="preview" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </Dropzone >
    );
}
export default FormFour;