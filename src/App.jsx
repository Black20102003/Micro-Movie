import { Header } from './components/Header';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Search } from './components/Search';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import { Image } from './components/image';
import { AuthCallBack } from './components/Session';
import { MovieDetail } from './components/MovieDetail';

import './App.css'
import{QueryClient,QueryClientProvider} from "@tanstack/react-query"
import { CommentDetail } from './components/CommentDetail';
import { Collection } from './components/Collection';
const queryClient=new QueryClient();
function App() {
  return (
   
   <QueryClientProvider client={queryClient}>
    <Router>

<Routes>
  <Route path='/' element={<Navigate to= "/login" replace/>}/>
  <Route path='/home' element={<Home />}/>
  <Route path='/auth/callback' element ={<AuthCallBack/>}/>
 <Route path='/search' element={<Search/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/movie/:id' element={<MovieDetail/>}/>
  <Route path='/tv/:id/comments/:reviewId?' element={<CommentDetail/>}/>
  <Route path='/collect' element={<Collection/>}/>
</Routes>
    </Router>
    
   
    
    

   </QueryClientProvider>
   
  )
}

export default App
