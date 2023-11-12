import './App.css';
import React,{useState,useEffect} from 'react';

function App(props) {
  const [state,setState]=useState([]);
  const [loading,setLoading]=useState(true);
  const [visible,setVisible]=useState(false);
  const [qimage,setQimage]=useState([]);
  var iurl='https://RandomQuotes.onrender.com/images';
 
 function nextAll() {
  iurl=qimage[0].next_page;
  fetchimage();
  fetchdata();
 }
 
 async function fetchdata(){

  try {
    const response= await fetch("https://RandomQuotes.onrender.com/quotes");
    const res=await response.json()
    
    if(response.ok){
      setState([res])
    }
  } catch (error) {
      console.log(error)
  }

 }
 
 async function fetchimage() {

  try {
    const response= await fetch(iurl);
    const res=await response.json()

    if (response.ok){
      setQimage([res]);
    }
  } catch (error) {
    console.log(error)
  }
  
  }

  function author() {
    setVisible(true);
    setLoading(false);
  }
  
  function hide() {
    setVisible(false);
    setLoading(true);
  }

  useEffect(()=>{
   fetchdata()
   fetchimage()
   // eslint-disable-next-line
 },[]);

 const isDesc=(aDesc)=>{
    if(aDesc===""){
      return <div className='auth-desc'>Sorry No Information Available.</div>
    }
    else{
      return <div className='auth-desc'>{aDesc}</div>
    }
 }
  
  return (
  <div className="App"> 
    <div id='quote-div'>
        {state && state.map(list=>
            <div key={list.id}> 
                {loading && 
                  <div id='quotes'>
                    <div id='title'>Random Quote</div>
                    <div id='quote-content'>" {list.content} "</div>
                    <div id='author-name'>
                        <div id='line-div'><div id='line'></div></div>
                        <div id='name'>{list.originator.name}</div>
                    </div>
                    <div id='btns'>
                        <div onClick={author} id='abt-author'>About Author</div>
                        <div onClick={nextAll} id='nxt-quote'>Next Quote</div>
                    </div>
                  </div>}
      
                {visible &&
                  <div id='about-author'>
                    <div id='auth-name'>{list.originator.name}</div>
                    {isDesc(list.originator.description)}
                    <div onClick={hide} id='hide-btn'>OK</div>
                  </div>}
            </div>)}
     </div>

     {qimage && qimage.map(list=>
        <div id='bg-img' key={list.photos[0].id}>
          <img src={list.photos[0].src.original} alt="bg" />
        </div>
      )}
  </div>
  );
}

export default App;