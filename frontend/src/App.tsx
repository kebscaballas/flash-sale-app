import { useEffect, useState } from 'react'
import './App.css'

type Todo = { id: number, title: string }

const API = import.meta.env.ENV_VITE_API_URL ?? 'http://localhost:3000'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [ok, setOk] = useState('')

  useEffect(() => {
    fetch(`${API}/api/health`).then(r => r.text()).then(setOk)
    fetch(`${API}/api/todos`).then(r => r.json()).then(setTodos)
  }, [])

  return (
    <main style={{ padding: '24px', fontFamily: 'ui-sans-serif'}}>
      <h1>Vite + React</h1>
      <p>API health: {ok || '...'}</p>
      <h2>To Dos</h2>
      <ul>
        {
          todos.map(t => (
            <li key={t.id}>
              {t.title}
            </li>
          ))
        }
      </ul>
    </main>
  )
}

export default App
