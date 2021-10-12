import { useEffect, useState } from "react"

const styleUL = {
    margin: '0',
    padding: '4px'
}
const styleLI = {
    display: 'inline-block',
    marginRight: '5px',
    border: '1px solid #000',
    padding: '3px',
    cursor: 'pointer'
}

/**
 * Pagination Component
 * @param props 
 * @returns 
 */
export const ProductPages = (props: any) => {
    const {
        pageState
    } = props

    const {
        pageCount,
        currentPage,
        setCurrentPage
    } = pageState

    const [pages, setPages] = useState<number []>([])

    useEffect(() => {
        if (pageCount) {
            const pages = []
            for (let p = 0; p < pageCount; p++) {
                const page = p + 1
                pages.push(page)
            }
            setPages(pages)            
        }
    }, [pageCount])

    return (
        <ul style={styleUL}>
            {pages.map((pageNum, index) => {
                let style = {...styleUL, ...styleLI}
                const isCurrent = pageNum === currentPage
                if (isCurrent) {
                    style = Object.assign(style, {color: 'white', backgroundColor: 'black'})
                }
                return (
                    <li key={index} style={style}>
                        <a
                            onClick={() => setCurrentPage(pageNum)}
                        >
                            {pageNum}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}