import React from 'react'
import './Styles/Search.css'
const Search = ({searchText, setSearchText}) => {
    return (
        <div className='Input'>
            <input 
                className='Input-text'
                type='text'
                value={searchText}
                placeholder='Seach By Name, Email, or Role' 
                onChange={(e) => {setSearchText(e.target.value)}}
            />
        </div>
    )
}

export default Search