import React, { useState, useEffect, Fragment } from 'react'
import Search from './Search'
import Pagination from './Pagination'
import Edittable from './Edittable'
import Tablelist from './Tablelist'
import './Styles/Home.css'


const Home = () => {
    const [rowData, setRowData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [editRowID, setEditRowID] = useState(null);
    const [userData, setUserData] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage] = useState(10);
    const keys = ["name", "email", "role"];
    const [editRow, setEditRow] = useState({
        name: "",
        email: "",
        role: "",
    });

    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;

    const addIsCheckRowData = (userObj) => {
        const addedIsChecked = userObj.map((user) => {
            return { ...user, isChecked: false }
        })
        return addedIsChecked;
    }

    useEffect(() => {
        const getRowData = async () =>{
            let url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
            let response = await fetch(url)
            let responseJson= await response.json();
            console.log("sss", responseJson)
            let data = await responseJson
            let editedData = addIsCheckRowData(data);
                filterArr(editedData)
                setUserData(filterArr(editedData))
                if (filterArr(editedData).length < userPerPage) {
                    setRowData(filterArr(editedData))
                } else {
                    const currentUserList = filterArr(editedData).slice(indexOfFirstUser, indexOfLastUser);
                    setRowData(currentUserList)
                }
        }
        getRowData()
    },[searchText, currentPage,indexOfFirstUser,indexOfLastUser,userPerPage])

    const filterArr = (objectData) => {
        return objectData.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(searchText.toLowerCase())))
    }

    const checkedSingleBox = (userId) => {
        const updateIsChecked = rowData.map((user) => {
            if (user.id === userId) {
                return { ...user, isChecked: !user.isChecked };
            }
            return user;
        });
        setRowData(updateIsChecked);
    };

    const allBoxChecked = () => {
        setIsAllChecked(!isAllChecked);
        let updatedCheckedBoxRow;
        if (!isAllChecked) {
            updatedCheckedBoxRow = rowData.map((user) => {
                return { ...user, isChecked: true };
            });
        } else {
            updatedCheckedBoxRow = rowData.map((user) => {
                return { ...user, isChecked: false };
            });
        }
        setRowData(updatedCheckedBoxRow);
    };

    const editChangeRow = (event) => {
        event.preventDefault();
        const fieldName = event.target.name
        const filedValue = event.target.value;
        const newFormData = { ...editRow };
        newFormData[fieldName] = filedValue;
        setEditRow(newFormData);
    }

    const editRowDataSubmit = (event) => {
        event.preventDefault();
        const editedRow = {
            id: editRowID,
            name: editRow.name,
            email: editRow.email,
            role: editRow.role,
        }

        const newRowData = [...rowData];
        const index = rowData.findIndex((obj) => obj.id === editRowID);
        newRowData[index] = editedRow;
        setRowData(newRowData);
        setEditRowID(null);
    }

    const editClick = (event, obj) => {
        event.preventDefault();
        setEditRowID(obj.id);
        const formValues = {
            name: obj.name,
            email: obj.email,
            role: obj.role,
        }
        setEditRow(formValues);
    };

    const cancleClick = () => {
        setEditRowID(null);
    }

    const deleteSelected = () => {
        let returnedData = rowData.filter((ele) => {
            return ele.isChecked === false;
        })
        setRowData(returnedData);
    }

    const deleteRow = (id) => {
        let returnedData = rowData.filter((ele) => {
            return ele.id !== id;
        })
        setRowData(returnedData);
    }

    const pageNum = (number) => {
        setCurrentPage(number);
    };
    return (
        <>
            <Search searchText={searchText} setSearchText={(text) => setSearchText(text)} />
            <div className='table-list'>
                <form onSubmit={editRowDataSubmit}>
                    <table className='styleTable'>
                        <thead className='tableHead'>
                            <tr>
                                <td>
                                    <div className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            id="checkAll"
                                            value={isAllChecked}
                                            checked={isAllChecked}
                                            onChange={allBoxChecked}
                                        />
                                        <span className ="checkmark"></span>
                                    </div>
                                </td>
                                <td><span>Name</span></td>
                                <td><span>Email</span></td>
                                <td><span>Role</span></td>
                                <td><span>Actions</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rowData.map((obj) => (
                                    <Fragment>
                                        {editRowID === obj.id ? (
                                            <Edittable
                                                editRow={editRow}
                                                editChangeRow={editChangeRow}
                                                cancleClick={cancleClick}
                                            />
                                        ) : (
                                            <Tablelist obj={obj}
                                                checkedSingleBox={checkedSingleBox}
                                                editClick={editClick}
                                                deleteRow={deleteRow} />
                                        )}
                                    </Fragment>
                                ))
                            }
                        </tbody>
                    </table>
                </form>
            </div>
            <div className='Pagination'>
                <button className='delete-btn' onClick={() => deleteSelected()}>
                    Delete Selected</button>
                <Pagination
                    userPerPage={userPerPage}
                    totalUser={userData.length}
                    pageNum={pageNum}
                />
            </div>
        </>
    )
}

export default Home