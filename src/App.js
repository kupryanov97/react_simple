import React, {Component} from 'react';
import './App.css';
import Note from './components/note/Note';
import NoteItem from './components/note-item/NoteItem';
import Search from './components/search/Search';
import BtnAdd from './components/button-add/BtnAdd';



class App extends Component {
  constructor(props) {
      super(props);
      this.newNote = this.newNote.bind(this); 
      this.saveNote = this.saveNote.bind(this); 
      this.removeNote = this.removeNote.bind(this); 
      this.updateNote = this.updateNote.bind(this); 
      this.updateData=this.updateData.bind(this);
      
      this.state = {
        notes:[],
        active:0,
        search:'',
        icons:{
        delete:require('./styles/icons/delete.svg'),
        save: require('./styles/icons/save.svg'),
        edit: require('./styles/icons/edit.svg'),
      }
    
      };
     
    }

  componentDidMount() {
      let notes = localStorage.getItem("notes");
      this.initialData=JSON.parse(notes);
        if (notes)
           this.setState({notes: this.initialData});
    } 
  
  updateData(value) {
      this.setState(value);
    }

  newNote(title, text) { 
      let notes = [{title: title, text: text}].concat(this.state.notes);   
      this.saveNote(notes);
      this.setState({active: 0});
    } 
    
  saveNote(notes) {
      localStorage.setItem('notes', JSON.stringify(notes)); 
      this.setState({notes: notes});
    } 
  
  removeNote(index) {
      let notes = this.state.notes;
      notes.splice(index, 1);
      this.saveNote(notes);
    }
    
  updateNote(index, title, text) {

      let notes = this.state.notes;
      notes[index].title = title;
      notes[index].text = text;
      this.saveNote(notes);
    }

    render() { 
       
      let list=this.state.notes.map((obj, i) =>  
        { if (i===this.state.active)
          return <NoteItem  class="active" key={i} index={i} title={obj.title} text={obj.text} updateData={this.updateData}/>
        else 
          return <NoteItem class="" key={i} index={i} title={obj.title} text={obj.text} updateData={this.updateData}/>  }  
      );
      
      
      let note;

      for (var i=0; i<this.state.notes.length;i++){ //кирпич

        if (i===this.state.active)
           note = <Note key={i} index={i} active={this.state.active} notes={this.state.notes} title={this.state.notes[i].title} text={this.state.notes[i].text } onUpdate={this.updateNote} onRemove={this.removeNote} icons={this.state.icons}/>
      }

      
    
      
      //конец кирпича
       
       return ( <div className="App">
           
                 <header className="header">
                   <h1 className="header__titl">Заметки</h1>
                 </header>

                 
                 
                 <div className="container">
                  <div className="container__left">
                    <BtnAdd newNote={this.newNote} updateData={this.updateData} />

                    <Search search={this.state.search} notes={this.initialData} updateData={this.updateData}/>
                    {list}
                  </div>
                    
                  <div className="container__right">
                    
                      {note}
                    
                  </div>

                 </div>

                 </div>     

                 
       )
     }
  
 
    }
 
  

  export default App;