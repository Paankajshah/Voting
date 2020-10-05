import React, { useState, useEffect } from "react";
import axios from "axios";

function Voter() {
  const [state, setState] = useState({
    name: "",
    email: "",
    citizenship: "",
  });
  const example = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();

    console.log(state);
    const data = {
      name: state.name,
      email: state.email,
      citizenship: state.citizenship,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/voting/voter/", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <form onSubmit={submit} style={{ margin: "50px 50px 50px 50px" }}>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            name="name"
            value={state.name}
            onChange={example}
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            value={state.email}
            onChange={example}
          />
        </div>
        <div class="form-group">
          <label for="citizenship">Citizenship</label>
          <input
            type="text"
            class="form-control"
            name="citizenship"
            value={state.citizenship}
            onChange={example}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Voter;
