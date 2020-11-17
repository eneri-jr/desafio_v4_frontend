import React from "react";
import "./styles.css";
import "../add/styles.css";

interface DelProps {
    del(): any,
    close(): any
}

//Criada uma função quando abre a popUp de deletar tool:
const Del: React.FC<DelProps> = ({del, close }) => {
    return (
        <div>
            <div className="popup">
                <h2>Are you sure you want to delete this?</h2>
                <div>
                    <button onClick={close}>Cancel</button>
                    <button onClick={del}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Del;