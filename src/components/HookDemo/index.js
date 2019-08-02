import React, { useState, useEffect } from 'react'

function HookDemo() {
    const [num, setNum] = useState(9)
    useEffect(()=>{
        console.log(1234)
        return () => {
            console.log(3333)
        }
    },[num])
    return (
        <div>
            <p>HookDemoHookDemo{num}</p>
            <button
                onClick={()=>{
                    setNum(num + 1)
                }}
            >增加</button>
            <button
                onClick={()=>{
                    // setNum((num) => num - 1)
                    setNum(num - 1)
                }}
            >减少</button>
        </div>
    )
}

export default HookDemo