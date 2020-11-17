import React, { FormEvent, useState } from 'react';
import Api from '../../services/conexApi';
import './styles.css';

interface AddProps {
  close(): any,
}

//Criada uma função quando abre a popUp de adicionar tools:
const Add: React.FC<AddProps> = ({ close = () => {} }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");

  async function AddTool(i: FormEvent) {
    i.preventDefault()
    //usa o split para construir a lista de tools por espaço:
    const listTags = tags.split(' ')

    await Api.post('/tools', {
      title,
      description,
      link,
      tags: listTags
    });
    close()
  }

  //retorna o html dentro do javascript com os campos a serem preenchidos:
  return (
    <div className="Main">
      <div className="popup">
        <h2>+ Add new tool</h2>
        <form onSubmit={AddTool}>
          <label htmlFor="name">Tool name:</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Tool Name"
            value={title}
            onChange={(i) => setTitle(i.target.value)}
          />

          <label htmlFor="link">Tool link:</label>
          <input
            required
            type="text"
            name="link"
            placeholder="http://digiteaqui.com"
            value={link}
            onChange={(i) => setLink(i.target.value)}
          />

          <label htmlFor="description">Tool description:</label>
          <textarea
            required
            name="description"
            placeholder="Describe the tool"
            value={description}
            onChange={(i) => setDescription(i.target.value)}
          />

          <label htmlFor="tags">Tags:</label>
          <input
            required
            type="text"
            name="tags"
            placeholder="Enter your tags with space"
            value={tags}
            onChange={(i) => setTags(i.target.value)}
          />

          <footer>
            <button onClick={close} className="secondary">Cancel</button>
            <button type="submit">Add tool</button>
          </footer>
        </form>
       
      </div>
    </div>
  )
}

export default Add;