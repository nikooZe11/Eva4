import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { useNavigate } from "react-router-dom";
import config from './../../helpers/config.json';

const UserAdd = () => {
    let navigate = useNavigate(); 
    const cancel = () => {
        var {userName, nickname, password, level} = document.forms[0]; 
        var hasChanges = userName.value.length > 0 ||  nickname.value.length > 0 || password.value.length > 0 || level.value.length > 0;
        if(hasChanges){
            if(window.confirm("Existen cambios sin guardar. ¿Seguro de querer cancelar?")){
                navigate("/users");
            }
        } else {
            navigate("/users")
        }
    }

    const save = async (event) => {
        event.preventDefault();
        var {userName, nickname, password, level,} = document.forms[0];
        var errors = "";
        errors += userName < 0 ? "El descuento por precio no puede superar la mitad del unitario.\n": "";
        errors += nickname < 0 ? "El descuento por descuento no puede superar el 50%.\n": "";
        errors += password < 0 ? "A\n":"";
        errors += level < 0 ? "a\n":"";
        if(errors.length > 0){
            window.alert("Corrija los siguientes errores:\n"+errors);
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ "operatorId": config.operatorId, "name": userName.value,"nickname": nickname.value,"password": password.value,"level": level.value})
              }
              fetch(config.apiURL+"clients", requestOptions).then((response) => {
                switch(response.status){
                  case 400:
                    console.log("consulta mal formada");
                    break;
                  case 403:
                    console.log("acceso prohibido");
                    break;
                  default:
                    //
                }
                return response.json();
              }).then((result) => {
                  window.alert("Regitro existoso");
                  navigate("/users");
              })
        }
    }
    return (<div>
            <Topbar />
            <Sidebar />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Incorporación de Usuario</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Cloud Sales</a></li>
                                    <li className="breadcrumb-item"><a href="/products">Usuarios</a></li>
                                    <li className="breadcrumb-item active">Agregar</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={save}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="userName" className="control-label">Nombre</label>
                                        <input type="text" name="userName" id="userName" className="form-control"required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="nickname" className="control-label">Apodo</label>
                                        <input type="text" name="nickname" id="nickname" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="password" className="control-label">Contraseña</label>
                                        <input type="number" name="password" id="password" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="level" className="control-label">Nivel</label>
                                        <input type="text" name="level" id="level" className="form-control" required />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" onClick={cancel} className="btn btn-secondary"><i className="fas fa-times"></i> Cancelar</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Guardar</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default UserAdd;