import { useState , useCallback,useEffect,useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const[numberAllow,setNumberAllow]=useState(false)
  const[charAllow,setCharAllow]=useState(false)
  const [password,setPassword]=useState(" ")
  const [isCopied, setIsCopied] = useState(false);
  const [istempBackground, setTempBackground] = useState(false);
   // Read useCallback function-- on react docs

  const passwordGenerator =useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllow) str +="0123456789"
  if(charAllow) str +="!@#$%^&*+-_"  
  for(let i=1;i<=length;i++){
    let char = Math.floor(Math.random()*str.length + 1)
    pass += str.charAt(char)
    setIsCopied(false);
    setTempBackground(false);
  }
  setPassword(pass)
  },[length,numberAllow,charAllow,setPassword])
  
  // useRef hook
  const passwordRef = useRef(null) 
  
  const copyPassword=useCallback(()=>{
    setIsCopied(true);
    setTempBackground(true);
    passwordRef.current?.select(); 
    window.navigator.clipboard.writeText(password);
   },[password])
  
  useEffect(()=>
  {passwordGenerator()},[length,numberAllow,charAllow,passwordGenerator])
  return (
    <>
      <div className={`w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-11 ${istempBackground ? 'bg-emerald-900':'bg-gray-800'} text-orange-500`}>
        <h1 className=" text-white  text-center my-2.4 py-2">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden
         md-4 ">
          <input 
            type="text" 
            value={password}
            className="outline-none w-full py-1 px-4"
            readOnly
            ref={passwordRef}
          />
          <button
            id='button'
            onClick={copyPassword}
            // className='outline-none bg-blue-700 text-white px-3'
            className={`outline-none px-3 ${isCopied ? 'bg-green-500' : 'bg-blue-700'} text-white`}
            >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className='flex text-sm gap-x-2 py-1'>

          <div className='flex items-center gap-x-1'>
            <input 
             type="range"
             min={8}
             max={25}
             value={length}
             className='cursor-pointer'
             onChange={(e) =>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>


          <div className="flex items-center gap-x-1 py-0.2">
            <input
             type="checkbox"
             defaultChecked={numberAllow}
             id='numberInput'
             onChange={()=>{setNumberAllow((prev)=> !prev);
             }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>  


          <div className="flex items-center gap-x-1 py-0.2">
             <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              onChange={()=>{setCharAllow((prev)=> !prev);
              }}
            />
            <label htmlFor="charInput">Special Characters</label>
          </div>  
        </div>
          
      </div>
    </>
  )
}

export default App
