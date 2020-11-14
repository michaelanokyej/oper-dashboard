import React, { Component } from "react";
import Swal from "sweetalert2";
import MainContext from "../../context/main-context";
import "./ErrorDetailsPage.css";
import config from "../../config";

class errorDetailsPage extends Component {
  state = {
    error: {},
    errors: []
  };
  static contextType = MainContext;

  componentWillMount = () => {
    this.fetchErrors();
  };

  fetchErrors = () => {
    fetch(`${config.API_ENDPOINT}/api/errors`, {
      method: "Get",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const error = res.filter(
          (error) => error.error_id === parseInt(this.props.match.params.id)
        )[0];
        this.setState({ error, errors: res });
      })
      .catch((err) => {
        Swal.fire(`error: ${err}`);
      });
  };

  updateErrorHandler = async () => {
    const errorToUpdate = {
      is_fixed: "true",
    };
    await fetch(`${config.API_ENDPOINT}/api/errors/${this.state.error.error_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorToUpdate),
    })
      .then((res) => {
        if (res.status === 204) {
          for(let error of this.context.errors) {
            if(error.error_id === this.state.error.error_id) {
              error.is_fixed = true
            }
          }
          this.setState((prevState) => {
            const updatedError = { ...prevState.error };
            updatedError.is_fixed = true;
            return { error: updatedError };
          });
          Swal.fire(`Error has been updated`);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: `Error: ${err}`,
        });
      });
  };

  render() {
    return (
      <div className="poller__details-page">
        <h1>Operation {" "} - {" "} {this.state.error.operation_name}</h1>
        <p className="error_desc"> {this.state.error.error_description}</p>
        <p className="posted">
          {new Date(this.state.error.posted).toUTCString()}{" "}
        </p>
        {this.state.error.is_fixed ? (
          <button disabled="disabled" className="disabled">Fixed</button>
        ) : (
          <button onClick={this.updateErrorHandler}>Update Error</button>
        )}
      </div>
    );
  }
}

export default errorDetailsPage;
