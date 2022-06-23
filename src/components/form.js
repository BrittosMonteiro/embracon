import React from "react";
import UserDataService from "../service/user-data-service";
import { Alert, Button, FormGroup, FormControl } from "react-bootstrap";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      message: null,
      name: null,
      status: null,
      zipcode: null,
      btnStatus: true,
    };
  }

  send(e) {
    e.preventDefault();
    const hasEmail = this.checkEmail(this.state.email);
    if (hasEmail) {
      let data = {
        email: this.state.email,
        name: this.state.name,
        zipcode: this.state.zipcode,
      };
      const userDataService = new UserDataService();
      userDataService.setUserData(data);
      this.clearForm();
    }
  }

  checkZipcode(zipcode) {
    if (zipcode.length === 8) {
      const userDataService = new UserDataService();
      userDataService
        .checkZipCode(zipcode)
        .then((res) => res.json())
        .then((res) => {
          if (res?.erro) {
            this.setState({
              message: "CEP inválido",
              zipcode: null,
              status: 2,
            });
          } else {
            this.setState({
              message: "CEP válido",
              zipcode: zipcode,
              status: 1,
            });
          }
          this.clearMessage();
        })
        .catch(() => {
          this.setState({
            message: "CEP inválido",
            zipcode: null,
            status: null,
          });
          this.clearMessage();
        });
    }
  }

  checkEmail(email) {
    if(!email) return
    if (!email.includes("@")) {
      this.setState({ emailMessage: "E-mail incorreto!" });
      return false;
    }
    if (!email.split("@")[1].includes(".")) {
      this.setState({ emailMessage: "E-mail incorreto!" });
      return false;
    }
    this.setState({ emailMessage: null, btnStatus: false, email: email });
    return true;
  }

  clearMessage() {
    setTimeout(() => {
      this.setState({ message: null });
    }, 5000);
  }

  clearForm() {
    this.setState({ email: null, message: null, name: null, zipcode: null });
    document.getElementById("email").value = null;
    document.getElementById("name").value = null;
    document.getElementById("zipcode").value = null;
  }

  render() {
    return (
      <FormGroup>
        <FormControl
          type="text"
          id="name"
          name="name"
          placeholder="Nome"
          defaultValue={this.state.name}
          className="mb-2 shadow-none"
          onChange={(e) => this.setState({ name: e.target.value })}
        ></FormControl>

        <FormControl
          type="text"
          maxLength="8"
          id="zipcode"
          name="zipcode"
          placeholder="CEP"
          className="mb-2 shadow-none"
          defaultValue={this.state.zipcode}
          onChange={(e) => this.checkZipcode(e.target.value)}
        ></FormControl>

        {this.state.message != null ? (
          <Alert
            className={
              "mb-2 p-2" +
              (this.state.status === 1 ? "bg-success" : "bg-danger")
            }
          >
            {this.state.message}
          </Alert>
        ) : (
          ""
        )}

        <FormControl
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          className="mb-2 shadow-none"
          defaultValue={this.state.email}
          onChange={(e) => this.checkEmail(e.target.value)}
        ></FormControl>
        <Button
          type="submit"
          variant="danger"
          className="shadow-none"
          disabled={this.state.btnStatus}
          onClick={(e) => this.send(e)}
        >
          Enviar
        </Button>
      </FormGroup>
    );
  }
}
