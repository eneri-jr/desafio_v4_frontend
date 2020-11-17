import React, {useEffect, useState} from "react";
import './App.css';
import api from "./services/conexApi";

const App = () => {
  const [tools, setTools] = useState([]);

  console.log("aqui")

  interface Tools{
    id: number,
    title: string,
    link: string,
    description: string,
    tags: Array<string>
  }

    async function getTools(){
      console.log("passou")
      const response = await api.get("//localhost:3000/tools/");
      setTools(response.data);
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

        <div className="tools-list">
          {tools.map((tool: Tools) => (
            <div key={tool.id} className="Tool-item">
              <header>
                <a href={tool.link} className= "link">{tool.title}</a>
              </header>

              <p>{tool.description}</p>

              {tool.tags.map(tag => (
                <strong>#{tag} </strong>
              ))}
              </div>
          ))}
        </div>

      </div>
    )
}
export default App;
