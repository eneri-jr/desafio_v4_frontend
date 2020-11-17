import React, {useEffect, useState} from "react";
import './App.css';
import api from "./services/conexApi";
import exclude from "./assets/close.svg";
import Del from "./components/del/index";
import Add from "./components/add";

const App = () => {
  const [tools, setTools] = useState([]);
  const [tag, setTag] = useState("");
  const [check, setCheck] = useState(false);
  const [remove, setRemove] = useState(false);
  const [idTool, setIdTool] = useState(0);
  const [add, setAdd] = useState(false);

  interface Tools{
    id: number,
    title: string,
    link: string,
    description: string,
    tags: Array<string>
  }

    async function getTools(){
      if(tag == "" || check == false){
        const response = await api.get("/tools");
        setTools(response.data)
      }else{
      const response = await api.get(`/tools?tag=${tag}`);
      setTools(response.data);
      }
    }

    async function deleteTool(id: number){
      await api.delete("/tools/" + id);
      setRemove(false)
    }

    useEffect(() => {
      getTools()
    })

    return(
      <div className="App">
        
        <header className="App-header">
          <h1>VUTTR</h1>
          <h2>Very Useful Tools to Remember</h2>
        </header>

        <div>
          <form>
            <input type="text" placeholder="Search" onChange={(i) => setTag(i.target.value)}/>
              <input type="checkbox" placeholder="true" onChange={() => setCheck(!check)}/>
              <label>Search in tags only</label>
          </form>
          <button className="Add-Tool" onClick={() => setAdd(true)}>+ Add</button>

          
        </div>

        <div className="tools-list">
          {tools.map((tool: Tools) => (
            <div key={tool.id} className="Tool-item">
              <header>
                <a href={tool.link} className= "link">{tool.title}</a>

                <button className = "Button-Delete" onClick={() => {setRemove(true); setIdTool(tool.id)}}>
                <img className = "Img-Delete" src={exclude} alt="Icone de remover tool"/><b> Remove</b></button>
              </header>

              <p>{tool.description}</p>

              {tool.tags.map(tag => (
                <strong>#{tag} </strong>
              ))}
              </div>
          ))}
        </div>
        {
          add ?
          <Add
          close={() => {setAdd(false); getTools()}}/> : null
        }
        
        {
          remove ?
          <Del
            del={() => deleteTool(idTool)}
            close={() => setRemove(false)}
            /> : null
        }
      </div>
    )
}
export default App;
