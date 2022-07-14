import { useState, useEffect, useRef, memo, useCallback } from 'react'

// 1.useEffect(callback)
//  - Gọi callback mỗi khi component re-render
//  - Gọi callback sau khi component thêm element vào DOM
// 2.useEffect(callback, [])
//  - Chỉ gọi callback 1 lần sau khi component mounted
// 3.useEffect(callback, [deps])
//  - Callback được gọi lại mỗi khi dependencies thay đổi

function Content() {
    const [avatar, setAvatar] = useState()
    const [time, setTime] = useState(60)
    let timerId = useRef()
    useEffect(() => {
        return () => avatar && URL.revokeObjectURL(avatar.preview)
    }, [avatar])
    
    const handlePreviewAvatar = useCallback((e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
    }, [])
    const handleStart = () => {
        timerId.current = setInterval(() => {
            setTime(prev => prev > 0 ? prev - 1 : 60)
        }, 1000)
    }
    const handleStop= () => {
        clearInterval(timerId.current)
    }
    return (<>
        <input type="file" onChange={handlePreviewAvatar} />
        {avatar && <img src={avatar.preview} alt="ảnh" width="50%" />}
        <h1>{time}</h1>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
    </>)
}

export default memo(Content)