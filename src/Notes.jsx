import React , {useState,useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Footer from '../src/components/Footer'
import Notification from './components/Notification'


const Notes = () => {
const [notes, setNotes] = useState([])
const[newNote, setNewNote] = useState('a new note...')
const[showAll, setShowAll] = useState(false)
const[errorMessage, setErrorMessage] = useState(null)

useEffect(() => {
    
    noteService
    .getAll()
    .then(initialNotes => {
         setNotes(initialNotes)
     })
 }, [])

 const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
        content:newNote,
        date:new Date().toISOString(),
        important: Math.random() < 0.5,
        id: notes.length + 1,   
    
    }
    
    noteService
    .create(noteObject)
    .then(returnedNode => {
        setNotes(notes.concat(returnedNode))
       setNewNote('')
    })
    
    //setNotes(notes.concat(noteObject))
    //setNewNote('') //setting value of input element to default (empty)
        
    }

const toggleImportanceOf = (id) => {
  
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }
  
noteService
.update(id, changedNote)
.then(returnedNote =>{
    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
}).catch(error => {
    setErrorMessage(
        `Note '${note.content}' was already removed from server`
    )
    setTimeout(()=> {
        setErrorMessage(null)
    },5000)
    setNotes(notes.filter(n => n.id !== id))
})

}


const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
}


const notesToShow = showAll ? notes : notes.filter(note => note.important )  //also notes.filter(note => note.important === true)


return(
<div>
<h1>Notes</h1>
<Notification message={errorMessage} />
<div>
<button onClick={() => setShowAll(!showAll)}>
show {showAll ? 'important' : 'all' }
</button>
</div>
<ul>
{notesToShow.map((note,i) => 
<Note 
key={i} 
note={note}
toggleImportance={() => toggleImportanceOf(note.id)}
/>)}

</ul>
<form action="" onSubmit={addNote}>
<input value={newNote} onChange={handleNoteChange}/>
<button type="submit">save</button>
</form>
<Footer />
</div>
    )
}


export default Notes;