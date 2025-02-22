import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";
import './Loading.css'

function Loading({ loading }) {
    return (
        <div className="loading-container" style={{ display: loading ? 'flex' : 'none' }}>
            <PuffLoader
                loading={loading}
                color="#000000"
                size={100}
            />
        </div>
    )
}

export default Loading