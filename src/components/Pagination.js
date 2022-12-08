import React, {useState} from 'react'
import './Styles/Pagination.css'

const Pagination = ({ userPerPage, totalUser, pageNum }) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const pageNumber = [];

    for (let pageStart = 1; pageStart <= Math.ceil(totalUser / userPerPage); pageStart++) {
        pageNumber.push(pageStart);
    }
    return (
        <ul>
            <div className="pagination-container">
                <div
                className="pagination-before"
                onClick={() => {
                    pageNum(1);
                    setCurrentPageNumber(1);
                }}
                >
                {"<<"}
                </div>
                <div
                className="pagination-before"
                onClick={() => {
                    if ((currentPageNumber - 1 )> 0) {
                    pageNum(currentPageNumber - 1);
                    setCurrentPageNumber(currentPageNumber - 1);
                    }
                }}
                >
                {"<"}
                </div>
                {pageNumber.map((number) => (
                <div
                    key={number}
                    className={
                    currentPageNumber === number
                        ? "pagination-selected"
                        : "pagination-after mobileView"
                    }
                    onClick={() => {
                    pageNum(number);
                    setCurrentPageNumber(number);
                    }}
                >
                    {number}
                </div>
                ))}
                <div
                className="pagination-after"
                onClick={() => {
                    if ((currentPageNumber + 1) <= pageNumber.length) {
                    pageNum(currentPageNumber + 1);
                    setCurrentPageNumber(currentPageNumber + 1);
                    }
                }}
                >
                {">"}
                </div>
                <div
                className="pagination-after"
                onClick={() => {
                    pageNum(pageNumber[pageNumber.length - 1]);
                    setCurrentPageNumber(pageNumber[pageNumber.length - 1]);
                }}
                >
                {">>"}
                </div>
            </div>
        </ul>
    )
}

export default Pagination