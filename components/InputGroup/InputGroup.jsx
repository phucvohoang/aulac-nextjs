import React from 'react';


const InputGroup = ({label, ...otherProps})=>{
    // console.log(otherProps)
    return (
        <div className="input__group">
            {label && <label>{label} : </label>}
            <input {...otherProps}/>
        </div>
    )
}

export default InputGroup;