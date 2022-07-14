import { useState } from 'react'
import Content from './content.js'
function App() {
  // localStorage.clear();
  const [mounte, setMounte] = useState(false)
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState(() => JSON.parse(localStorage.getItem('jobs')) ?? [])
  const handleSubmit = () => {
    if(job && name) {
      setJobs(prev => {
        const newJobs = [...prev, {name: name, content: job}]
        const jsonJobs = JSON.stringify(newJobs)
  
        localStorage.setItem('jobs', jsonJobs)
        return newJobs
      })
      setJob('')
      setName('')
    } 
  }
  return (
    <div className="App" style={{padding: '32px'}}>
        <button onClick={() => setMounte(!mounte)}>Toggle</button>
        {mounte ? <Content /> : null}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Title" />
        <input type="text" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Content" />
        <button onClick={handleSubmit}>Gửi</button>
        <button onClick={() => {localStorage.clear(); setJobs([])}}>Xóa</button>

      <ul style={{paddingLeft: 0, marginLeft: '25px'}}>
        {jobs.map((job, index) => (
            <li key={index} style={{display: 'flex', alignItems: 'center'}}>
              <p style={{color: '#0055ff', margin: '3px 10px 3px 0'}}>{job.name}</p>
              <span>{job.content}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
