import React, { memo, useState, useEffect, useCallback } from 'react'

const range = (start, end) => [...Array(end - start).keys()].map(k => k + start)

export default memo(({ initialPage = 1, pageSize = 20, items = [], previousLabel = 'Anterior', nextLabel = 'Próxima', fistLabel = 'Primeira', lastLabel = 'Última', onChange = () => {}, ...rest }) => {

  const getPager = useCallback((totalItems, currentPage, pageSize) => {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize)
  
    let startPage, endPage
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1
      endPage = totalPages
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1
        endPage = 10
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9
        endPage = totalPages
      } else {
        startPage = currentPage - 5
        endPage = currentPage + 4
      }
    }
  
    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)
  
    // create an array of pages
    const pages = range(startPage, endPage + 1)
  
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }, [])

  const getPageOfItems = useCallback((items, pager) => items.slice(pager.startIndex, pager.endIndex + 1), [])

  const [pager, setPager] = useState(getPager(items.length, initialPage, pageSize))

  const stringifyItems = JSON.stringify(items)

  useEffect(() => {
    const newPager = getPager(items.length, initialPage, pageSize)
    setPager(newPager)
    const pageOfItems = getPageOfItems(items, newPager)
    onChange(pageOfItems)
  }, [stringifyItems, getPageOfItems, onChange, items, initialPage, pageSize, getPager])

  const setPage = page => {
    const newPager = getPager(items.length, page, pageSize)
    setPager(newPager)
    const pageOfItems = getPageOfItems(items, newPager)
    onChange(pageOfItems)
  }

  const isFirstPage = pager.currentPage === 1
  const isCurrentPage = page => pager.currentPage === page

  if (!items.length) return null

  return (
    <div {...rest}>
      <ul>
        <li className={isFirstPage ? 'disabled' : ''}>
          {isFirstPage ? (<span>{fistLabel}</span>) : (<span tabIndex={0} onKeyPress={e => (e.key === 'Enter') && setPage(1)} onClick={() => setPage(1)}>{fistLabel}</span>)}
        </li>
        <li className={isFirstPage ? 'disabled' : ''}>
          {isFirstPage ? (<span>{previousLabel}</span>) : (<span tabIndex={0} onKeyPress={e => (e.key === 'Enter') && setPage(pager.currentPage - 1)} onClick={() => setPage(pager.currentPage - 1)}>{previousLabel}</span>)}
        </li>
        {pager.pages.map((page, index) =>
          <li key={index} className={isCurrentPage(page) ? 'active' : ''}><span tabIndex={isCurrentPage(page) ? -1 : 0} onKeyPress={e => (e.key === 'Enter') && setPage(page)} onClick={() => setPage(page)}>{page}</span></li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          {pager.currentPage === pager.totalPages ? (<span>{nextLabel}</span>) : (<span tabIndex={0} onKeyPress={e => (e.key === 'Enter') && setPage(pager.currentPage + 1)} onClick={() => setPage(pager.currentPage + 1)}>{nextLabel}</span>)}
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          {pager.currentPage === pager.totalPages ? (<span>{lastLabel}</span>) : (<span tabIndex={0} onKeyPress={e => (e.key === 'Enter') && setPage(pager.totalPages)} onClick={() => setPage(pager.totalPages)}>{lastLabel}</span>)}
        </li>
      </ul>
    </div>
  )
})
