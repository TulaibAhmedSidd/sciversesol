import React from 'react'

const Loading = ({ text = 'Loading', fontSize = '2.25rem' }) => {
    return (
        <span className="loading" style={{
            fontSize: fontSize
        }}>{text}</span>
    )
}

export default Loading