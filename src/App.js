import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((res) => {
      setProjects(res.data);
    })
  }, [])

  async function handleAddRepository() {
    const result = await api.post('repositories', { nome: `testenme${contador}`, url: 'testeUr' })
    setProjects([...projects, result.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setProjects(projects.filter(x => x.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project, index) =>
          <ul key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
          </ul>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;