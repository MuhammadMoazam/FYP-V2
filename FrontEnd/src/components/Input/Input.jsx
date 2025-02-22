export function Input(label, type, value, setValue) {
    return (
        <div className='input-container'>
            <label className="heading-1-style"> {label} <label style={{ color: 'red' }}>*</label></label>
            <input type={type} value={value} autoComplete="off" onChange={(e) => { setValue(e.target.value) }} className="input-style" />
        </div>
    )
}