import React from 'react'
import './Styles/Edittable.css'

const Edittable = ({ editRow, editChangeRow, cancleClick }) => {

    return (
        <tr>
            <td>
                <div className="checkbox-container">
                <input
                    type="checkbox"
                    id={`edit-checkbox${editRow.id}`}
                    className="checkbox-input"
                />
                </div>
            </td>
            <td>
                <input type="text"
                required='required'
                name='name'
                placeholder='Enter Name'
                value={editRow.name}
                onChange={editChangeRow}
                >
                </input>
            </td>
            <td>
                <input type="text"
                required='required'
                name='email'
                placeholder='Enter Email'
                value={editRow.email}
                onChange={editChangeRow}
                >
                </input>
            </td>
            <td>
                <input type="text"
                required='required'
                name='role'
                placeholder='Type Member'
                value={editRow.role}
                onChange={editChangeRow}
                >
                </input>
            </td>
            <td>
                <button type='submit'  className='save-btn'>Save</button>
                <button type='button' className='cancel-btn' onClick={cancleClick}>Cancel</button>
            </td>
        </tr>
    )
}

export default Edittable