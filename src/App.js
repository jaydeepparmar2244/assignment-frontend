import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { EditBookDetail } from './components/EditBookDetail';
import { EditStudentDetail } from './components/EditStudentDetail';
import { ViewBooks } from './components/ViewBooks';
import { ViewOneBook } from './components/ViewOneBook';
import { ViewOneStudent } from './components/ViewOneStudent';
import { ViewStudents } from './components/ViewStudents';


function App() {
  return (
    <Routes>
      <Route path='/students' element={<ViewStudents/>}></Route>
      <Route path='/students/:id' element={<ViewOneStudent/>}></Route>
      <Route path='/books' element={<ViewBooks/>}></Route>
      <Route path='/books/:id' element={<ViewOneBook/>}></Route>
      <Route path='/students/edit/:id' element={<EditStudentDetail/>}></Route>
      <Route path='/books/edit/:id' element={<EditBookDetail/>}></Route>
   </Routes>
  )
}

export default App;
