import {createContext, useState} from 'react'

export const ProductContext = createContext()

export function ProductProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <ProductContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </ProductContext.Provider>
    )
}