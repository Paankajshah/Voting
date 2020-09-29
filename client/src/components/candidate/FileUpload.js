import React, { Fragment, useState } from 'react';
import Message from './Message';
import ReactDOM from 'react-dom';
import Progress from './Progress';
import axios from 'axios';
const path =  "../../public/uploads"

const FileUpload = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadedPath, setUploadedPath] = useState("");
  const [message, setMessage] = useState('');
  const [display, setDisplay] = useState('none');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    document.getElementsByClassName(
      "hello"
    )[0].disabled = false;
  };

  const onSubmit = async e => {
    e.preventDefault();
    var fileD = new File([props.name], "foo.txt", {
      type: "text/plain",
    });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file', fileD);
    console.log(formData.getAll('file'))

    try {
      const res = await axios.post(
        "http://localhost:5000/voting/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent);
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          },
        }
      );

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setUploadedPath(filePath);
      console.log(filePath)
      console.log(fileName) 
      console.log("uploadedPath")

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
          onChange={onChange}
          required
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

      <Progress id="progress" percentage={uploadPercentage} style={display}/>

      <input
        id="button"
        type="button"
        
        onClick={onSubmit}
          value="Confirm Image"
          className="hello btn btn-primary btn-block mt-4"
        />
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
          </div>
        </div>
      ) : (
        <div>noimage</div>
      )}
    </Fragment>
  );
};

export default FileUpload;
