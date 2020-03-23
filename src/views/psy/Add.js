

import dotenv from  'dotenv'
import React, { Component } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { connect } from 'react-redux'
import { ToastsContainer, ToastsStore } from 'react-toasts';
import axios from 'axios';
class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      nom: "",
      prenom: "",
      adresse: "",
      email: "",
      telephone: "",
      password:"",
      datenaissance:"",
      genre:"",


      nomERR: "",
      prenomERR:'',
      adresseERR:'',
      emailERR:'',
      telephoneERR:'',
      passwordERR:'' ,
      datenaissanceERR:'',


    };
    dotenv.config()
  }
  validate = () => {

    let isError = false;

    const errors = {
      nomERR: "",
      prenomERR:'',

      telephoneERR:'',
      passwordERR:'' ,
      emailERR:'',
      datenaissanceERR:'',
      adresseERR:'',
      genreERR:'',


    };

    const regex1=/^[a-zA-Z0-9._-]+$/;
    const regemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const  regpassword =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    const regtelephone =/^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{2}/
    const regdatenaissance = /^\d{2}[./-]\d{2}[./-]\d{4}$/

    if ((this.state.nom==="")||(this.state.nom.length > 15)||(this.state.nom.length <3)
    ||!regex1.test(this.state.nom)) {

        isError = true;
        errors.nomERR = "Please Enter the nom";
    }


    if ((this.state.prenom==="")||(this.state.prenom.length > 15)||(this.state.prenom.length <3)){

        isError = true;
        errors.prenomERR = "Please add the prenom ";
    }
    if ((this.state.telephone==="")||!regtelephone.test(this.state.telephone)) {

      isError = true;
      errors.telephoneERR = "Please add the telephone ";
    }
    if ((this.state.adresse==="")||(this.state.adresse.length > 15)) {

      isError = true;
      errors.adresseERR = "Please check your adresse ";
    }
    if ((this.state.password==="")||!regpassword.test(this.state.password)) {

      isError = true;
      errors.passwordERR = "password should contain at least 8 characters,where at least one number, one lower case and one upper case characters";
  }
  if ((this.state.email==="")||!regemail.test(this.state.email))  {

    isError = true;
    errors.emailERR = "email must be a valid adresse, e.g myname@mydomaine.com";
}
if ((this.state.datenaissance==="")||!regdatenaissance.test(this.state.datenaissance))  {

  isError = true;
  errors.datenaissanceERR = "Please check your datenaissance";
}






    if (isError) {
        this.setState({
            ...this.state,
            ...errors
        })
    }

    console.log("errrr ", isError);


    this.setState({
        erreur:isError
    });

    return isError;
};

  handleChange = (e) => {
    if (e.target.name === "nom") {
      this.setState({nom: e.target.value })
    }
    if (e.target.name === "prenom") {
      this.setState({ prenom: e.target.value })
    }
    if (e.target.name === "datenaissance") {
        this.setState({ datenaissance: e.target.value })
      }
    if (e.target.name === "adresse") {
      this.setState({ adresse: e.target.value })
    }
    if (e.target.name === "email") {
      this.setState({ email: e.target.value })
    }
    if (e.target.name === "telephone") {
      this.setState({ telephone: e.target.value })
    }
    if (e.target.name === "password") {
      this.setState({ password: e.target.value })
    }
    if (e.target.name === "genre") {
      this.setState({ genre: e.target.value })
    }
  }

//   handleSubmit = () => {
//     let token = localStorage.getItem("token");
//     if (!token) {
//         token = "";
//     }
//     Axios.post("http://127.0.0.1:5001/admin", {
//      username: this.state.username,
//       prenom: this.state.prenom,
//       adresse: this.state.adresse,
//       email: this.state.email,
//       password: this.state.password,
//       telephone: this.state.telephone
//  genre: this.state.genre
//     },
//     {
//       headers: {
//           Authorization: 'Bearer ' + token
//       }
//   }).then(success => {
//       // if status 200 OK
//       if (typeof (success.data.error) != "undefined" && success.data.error !== "") {
//         ToastsStore.error(success.data.error)
//       } else if (typeof (success.data.message) != "undefined" && success.data.message !== "") {
//         ToastsStore.success(success.data.message)
//         this.props.history.push("/admin/list");
//       }
//     }).catch(err => {
//       ToastsStore.error("Server error")
//     })
//   }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  add=()=>
    {
        const {value}=this.state
        if(value==="")
        return {}
        this.props.addReducer(value)
        this.setState({
            value:''
        })
    }

    handleSubmit = () => {
      let erre=this.validate();
        if(!erre){

      let token = localStorage.getItem("token");
      if (!token) {
          token = "";
      }
      axios.post(process.env.REACT_APP_BACKEND_HOST+':'+process.env.REACT_APP_BACKEND_PORT+'/patient/register', {
       nom: this.state.nom,
        prenom: this.state.prenom,

        adresse: this.state.adresse,
        email: this.state.email,
        password: this.state.password,
        telephone: this.state.telephone,
        datenaissance: this.state.datenaissance,
        genre: this.state.genre,

      },
      {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(success => {
        // if status 200 OK
        if (typeof (success.data.error) != "undefined" && success.data.error !== "") {
          ToastsStore.error(success.data.error)
        } else if (typeof (success.data.message) != "undefined" && success.data.message !== "") {
          ToastsStore.success(success.data.message)
          this.props.history.push("/psy/list");
        }
      }).catch(err => {
        ToastsStore.error("Server error")
      })
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
       { /* <ToastsContainer store={ToastsStore} />*/}
        <Row>
          <Col xs="12" sm="12" md="12">
            <Card>
              <CardBody>
                <form>
                  <h1 className="h1 text-center text-success font-weight-bold">Add Patient Plug</h1>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="" className="font-weight-bold text-primary"><i className="fa fa-user-circle fa-lg pr-2"></i> nom</label>
                        <input type="text" name="nom" id="" className="form-control" placeholder="" aria-describedby="helpId"
                        onChange={this.handleChange} value={this.state.nom}/>
                        {

                          this.state.erreur===false ?

                              <p >{this.state.nomERR}</p>:null

                      }
                      {

                          this.state.erreur===true ?

                              <p style ={{color:"red", fontSize:'13px'}}>{this.state.nomERR}</p>:null

                      }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="" className="font-weight-bold text-primary"><i className="fa fa-user-circle fa-lg pr-2"></i> prenom</label>
                        <input type="text" className="form-control" name="prenom" id="" aria-describedby="emailHelpId" placeholder=""
                        onChange={this.handleChange}   value={this.state.prenom}/>
                        {

                          this.state.erreur===false ?

                              <p >{this.state.prenomERR}</p>:null

                      }
                      {

                          this.state.erreur===true ?

                              <p style ={{color:"red" ,fontSize:'13px'}}>{this.state.prenomERR}</p>:null

                      }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="" className="font-weight-bold text-primary"><i className="fa fa-map-marker fa-lg pr-2"></i> adresse</label>
                        <input type="text" className="form-control" name="adresse" id="" aria-describedby="emailHelpId" placeholder=""
                        onChange={this.handleChange} value={this.state.adresse}/>
                        {

                          this.state.erreur===false ?

                              <p >{this.state.adresseERR}</p>:null

                      }
                      {

                          this.state.erreur===true ?

                              <p style ={{color:"red" ,fontSize:'13px'}}>{this.state.adresseERR}</p>:null

                      }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="" className="font-weight-bold text-primary"><i className="fa fa-telephone fa-lg pr-2"></i> telephone</label>
                        <input type="text" name="telephone" id="" className="form-control" placeholder="" aria-describedby="helpId"
                        onChange={this.handleChange} value={this.state.telephone}/>
                        {

                          this.state.erreur===false ?

                              <p >{this.state.telephoneERR}</p>:null

                      }
                      {

                          this.state.erreur===true ?

                              <p style ={{color:"red",fontSize:'13px'}}>{this.state.telephoneERR}</p>:null

                      }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="" className="font-weight-bold text-primary"><i className="fa fa-envelope fa-lg pr-2"></i> E-mail</label>
                        <input type="text" className="form-control" name="email" id="" aria-describedby="emailHelpId" placeholder=""
                        onChange={this.handleChange} value={this.state.email} />
                        {

                          this.state.erreur===false ?

                              <p >{this.state.emailERR}</p>:null

                      }
                      {

                          this.state.erreur===true ?

                              <p style ={{color:"red",fontSize:'13px'}}>{this.state.emailERR}</p>:null

                      }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="" className="font-weight-bold text-primary"> <i className="fa fa-lock fa-lg pr-2"></i> password</label>
                        <input type="password" name="password" id="" className="form-control" placeholder="" aria-describedby="helpId"
                        onChange={this.handleChange} value={this.state.password}/>
                        {

                          this.state.erreur===false ?

                              <p >{this.state.passwordERR}</p>:null

                      }
                      {

                          this.state.erreur===true ?

                              <p style ={{color:"red",fontSize:'13px'}}>{this.state.passwordERR}</p>:null

                      }
                      </div>
                    </div>
                  </div>
                  <div>
                  <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="" className="font-weight-bold text-primary"><i className="fa fa-user-circle fa-lg pr-2"></i> datenaissance</label>
                      <input type="text" name="datenaissance" id="" className="form-control" placeholder="" aria-describedby="helpId"
                      onChange={this.handleChange} value={this.state.datenaissance}/>
                      {

                        this.state.erreur===false ?

                            <p >{this.state.datenaissanceERR}</p>:null

                    }
                    {

                        this.state.erreur===true ?

                            <p style ={{color:"red",fontSize:'13px'}}>{this.state.datenaissanceERR}</p>:null

                    }
                    </div>
                  </div>
               </div>


                    <hr />
                    <div className="row">
                      <div className="col-md-6 d-flex justify-content-start pl-3">
                        <button type="button" name="" id="" className="btn btn-dangerr font-weight-bold w-25 btn-lg"><i className="fa fa-refresh pr-2"></i> Reset</button>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end pr-3">
                        <button type="button" name="" id="" className="btn btn-success font-weight-bold w-25 btn-lg"  onClick={this.handleSubmit}>
                          <i className="fa fa-send pr-2"></i> Submit</button>
                      </div>
                    </div>

                    </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

// const mapDispatchToProps=(dispatch)=>{
//   return{
//       addReducer:newpatient=>{
//           dispatch({
//                type:'ADD_PATIENT',
//                newpatient
//           })
//       }

//   }
//   }
  // export default connect(null,mapDispatchToProps) (AddPatient);
  export default AddPatient


