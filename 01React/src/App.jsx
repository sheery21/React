import "./App.css";
import { useState } from 'react';
function App() {
  // let userName = 'sherry';
  // let [ counter , setCounter ] = useState(0)

  // const addValue = () =>{

  //   if( counter < 20){
  //     setCounter(counter = counter +1)
  //   }
  // }
  // const removeValue = () => {
  //   if( counter > 0){
  //     setCounter(counter - 1)
  //   }
  // }

  let arr = ["sherry", "sherry", "sherry"];

  
  let str = "sheharyar";

  const [userName, setuserName] = useState('sherry');

  const click = () =>{
    setuserName( ( prev) =>( prev ===  'sherry' ? str : 'sherry')  ) 
  }

  const [inputValue, setinputValue] = useState('');

  const handleChange = (e) =>{
    setinputValue(e.target.value);
  }
const handleClick = () =>{
  }


  return (
    <>
      {arr.map((value, index) => {
        return <h1 key={index}> {value} </h1>;
      })
      }

      <div className="myDiv">
      <h1>hello {userName}</h1>
      <button onClick={click}>Click</button>
      
      <input type="text" onChange={ handleChange} value={inputValue} />
      <p>{inputValue}</p>
      <button onClick={handleClick}>agin click</button>
      </div>
    </>
  );
  
  // <div className='container'>
  // <div className='heading'>
  // <span className='h1'>Hello {userName} </span>
  // <span className='h2'>Counter {counter}</span>
  // </div>

  // <div className='btn_div'>
  // <button
  // className='btn_1'
  // onClick={addValue}
  // >Add value</button>
  // <button
  // className='btn_2'
  // onClick={removeValue}
  // >Remove value</button>
  // </div>
  // </div>
}

export default App;