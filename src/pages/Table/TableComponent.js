import React, { useEffect, useState } from 'react';
import * as constants from '../Table/Constants'
import '../Table/Table.css';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import ArrowCircleLeft from '@mui/icons-material/ArrowCircleLeftOutlined';

import ReactPaginate from 'react-paginate';



function TableComponent() {
  const [tableData, setTableData] = useState([])
  const [columnData, setColumnData] = useState({})
  const [orderLevel, setOrderLevel] = useState({})

  // Pagination
  const itemsPerPage = 14
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = tableData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(tableData.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tableData.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setTableData(constants.data)
    setOrderLevel({ 'initial': constants.data })
    setColumnData(constants.columns)
  }, [])

  function expandCategory(labelVal, e) {
    setTableData(e)
    orderLevel[labelVal] = e
    setOrderLevel(orderLevel)
  }

  function condenseCategory(labelVal) {
    delete orderLevel[labelVal]
    setOrderLevel(orderLevel)
    setTableData(orderLevel[Object.keys(orderLevel)[Object.keys(orderLevel).length - 1]])
  }

  return (
    <div>
      <div className='headerLabel'><span>Match Reports</span> <span className='count'>{tableData.length} Items</span></div>
      <table>
        <thead>
          <tr className='firstHeader'>
            {columnData && columnData.firstHeader && columnData.firstHeader.map((colData, i) => {
              return (
                <th className={colData.class} key={i} colSpan={colData.span}>{colData.label}</th>
              )
            })}
          </tr>
        </thead>
        <tbody className='secondHeader'>
          <tr>
            {columnData && columnData.secondHeader && columnData.secondHeader.map((colData, i) => {
              return (
                <th key={i} className={((colData && colData.field !== 'category') || (orderLevel && Object.keys(orderLevel).length > 0 && Object.keys(orderLevel).pop() !== 'initial')) ? colData.class : ''}>
                  {(colData && colData.field === 'category' && orderLevel && Object.keys(orderLevel).length > 0 && Object.keys(orderLevel).pop() !== 'initial') ? (<ArrowCircleLeft onClick={() => condenseCategory(Object.keys(orderLevel).pop())} className='iconSpecial' />) : ''}
                  {(colData && colData.field === 'category' && orderLevel && Object.keys(orderLevel).length > 0) && Object.keys(orderLevel).pop() !== 'initial' ?
                    Object.keys(orderLevel).pop() : colData.label}
                </th>
              )
            })}
          </tr>
        </tbody>
        <tbody>
          {currentItems && currentItems.map((data, i) => {
            return (
              <tr key={i}>
                <td className='category'>
                  {(data && data.subCategories && data.subCategories.length > 0) ? (<AddCircleOutline onClick={() => expandCategory(data.category, data.subCategories)} className='iconSpecial' />) : ''}
                  {data.category}
                </td>
                <td className='bg-EAF0F3'>{data.approved}</td>
                <td className='bg-EAF0F3'>{data.pending}</td>
                <td className='bg-F9FAFB'>{data.competitorA}</td>
                <td className='bg-F9FAFB'>{data.competitorB}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <ReactPaginate
        className='pagination'
        breakLabel=""
        nextLabel="Next  >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<  Previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default TableComponent;
