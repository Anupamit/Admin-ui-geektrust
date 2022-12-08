import React from 'react'
import './Styles/Tablelist.css'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const Tablelist = ({ obj, checkedSingleBox, editClick, deleteRow }) => {

    return (
        <tr key={obj.id}>
            <td>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id={`checkbox${obj.id}`}
                        className="checkbox"
                        value={obj.isChecked}
                        checked={obj.isChecked}
                        onChange = { () => checkedSingleBox(obj.id)}
                    />
                </div>
            </td>
            <td>{obj.name}</td>
            <td>{obj.email}</td>
            <td>{obj.role}</td>
            <td className='action'>
                <span className='edit-icon'
                    onClick={(event) => editClick(event, obj)}>
                    <AiFillEdit /></span>
                <span className='delete-icon'
                    onClick={() => deleteRow(obj.id)}>
                    <AiFillDelete /></span>
            </td>
        </tr>
    )
}

export default Tablelist