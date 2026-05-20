import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState('')

  const passRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPassword = useCallback(() => {
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0, 5)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-black bg-gray-500'>
        <h1 className='text-2xl text-center font-bold mb-4 my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white'>
          <input className="outline-none w-full py-2 px-3" type="text" value={password} placeholder='Password' readOnly ref={passRef}></input>
          <button onClick={copyPassword} className='hover:bg-blue-600 cursor-pointer px-3 py-0.5 bg-blue-500 outline-none text-white shadow'>Copy</button>
        </div>
        <button onClick={passwordGenerator} className='hover:bg-blue-600 active: scale-95 active:shadow-inner mb-2 cursor-pointer px-3 py-0.5 bg-blue-500 outline-none rounded text-white shadow'>Regenerate</button>
        <div className='flex text-sm gap-x-2'> 
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={50} value={length} className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input className="cursor-pointer" type='checkbox'
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  onChange={() => {
                    setNumberAllowed((prev) => !prev)
                    }}/>
              <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input className="cursor-pointer" type='checkbox'
                  defaultChecked={charAllowed}
                  id="charInput"
                  onChange={() => {
                    setCharAllowed((prev) => !prev)
                    }}/>
              <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )}

export default App
