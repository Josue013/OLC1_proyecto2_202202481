import React from "react";
import NavBar from "../components/NavBar";
import Consola from "../components/Editor";
import Service from "../Services/Service";
import '../Styles/NavBar.css'

function Index() {
    const [value, setValue] = React.useState("");
    const [response, setResponse] = React.useState("");
    const [fileName, setFileName] = React.useState("archivo.ci");

    const changeText = (text) => {
        setValue(text);
    }

    const handlerClick = () => {
        if (value === "") {
            alert("No hay nada que analizar");
            return;
        }
        Service.analisis(value)
            .then((response) => {
                console.log("Respuesta recibida:", response);
                setResponse(response.mensaje); 
            })
            .catch((error) => {
                console.error("Error al analizar:", error);
                alert("Ocurrió un error al analizar el archivo.");
            });
    }

    const handlerLimpiar = () => {
        if (value === "") {
            alert("No hay nada que limpiar");
            return;
        }
        changeText("");
        setResponse("");
    }

    const handleLoadClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.addEventListener("change", handleFileChange);
        input.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            setValue(text);
            setFileName(file.name); // Actualizar el nombre del archivo
        }
        reader.readAsText(file);
    }

    const handleNewFileClick = () => {
        changeText("");
        setResponse("");
        setFileName("archivo.ci"); // Restablecer el nombre del archivo

    }

    const handleSaveClick = () => {
        const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName; // Usar el nombre del archivo cargado
        link.click();
    }

    // Abrir Reporte de Errores html en una nueva ventana con Edge
    const handleOpenReportClick = () => {
        fetch('http://localhost:3000/open-report')
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    // Abrir Reporte de AST en formato pdf en una nueva ventana con Brave
    const handleOpenASTClick = () => {
        fetch('http://localhost:3000/open-ast')
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    return (
        <>
            <div className="item-0">
                <div className="container-NavB">
                    <div className="item-1-NavB">
                        <div className="dropdown">
                            <button className="button-74" role="button">Archivo</button>
                            <div className="dropdown-content">
                                <button className="button-75" role="button" onClick={handleNewFileClick}>Nuevo archivo</button>
                                <button className="button-75" role="button" onClick={handleLoadClick}>Abrir archivos</button>
                                <button className="button-75" role="button" onClick={handleSaveClick}>Guardar</button>
                            </div>
                        </div>
                    </div>
                    <div className="item-2-NavB">
                        <button className="button-74" role="button" onClick={handlerClick}>Ejecutar</button>
                    </div>
                    <div className="item-3-NavB">
                        <div className="dropdown">
                            <button className="button-74" role="button">Reportes</button>
                            <div className="dropdown-content">
                                <button className="button-75" role="button" onClick={handleOpenReportClick}>Errores</button>
                                <button className="button-75" role="button" onClick={handleSaveClick}>Símbolos</button>
                                <button className="button-75" role="button" onClick={handleOpenASTClick}>AST</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <h1>Proyecto 2 - OLC1 - 202202481</h1>
            
            <div className="container">
                <button type="button" className="btn btn-primary" onClick={handlerLimpiar}>Limpiar</button>
            </div>

            <div className="Consola">
                <Consola text={"Entrada"} handlerChange={changeText} value={value} />
                <Consola text={"Consola"} handlerChange={setResponse} value={response} readOnly />
            </div>
        </>
    )
}

export default Index;