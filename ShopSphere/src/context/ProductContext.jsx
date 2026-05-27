import { createContext, useEffect, useMemo, useState } from 'react'

export const ProductContext = createContext()

export function ProductProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [products, setProducts] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000])
    const [selectedRating, setSelectedRating] = useState(0)

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            setProducts(data)
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [searchTerm])

    function filterCategory(category) {
        setSelectedCategories((prev) => {
            const alreadySelected = prev.includes(category)

            if (alreadySelected) {
                return prev.filter((item) => item !== category)
            }

            return [...prev, category]
        })
    }

    const categories = useMemo(
        () => [...new Set(products.map((product) => product.category))],
        [products]
    )

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category)

            const [minPrice, maxPrice] = selectedPriceRange
            const matchesPriceRange =
                product.price >= minPrice && product.price <= maxPrice

            const matchesRating = Math.round(product.rating.rate) >= selectedRating

            return matchesSearch && matchesCategory && matchesPriceRange && matchesRating
        })
    }, [products, debouncedSearch, selectedCategories, selectedPriceRange, selectedRating])

    const value = {
        searchTerm,
        setSearchTerm,
        products,
        categories,
        selectedCategories,
        filterCategory,
        selectedPriceRange,
        setSelectedPriceRange,
        filteredProducts,
        // filterRating,
        selectedRating,
        setSelectedRating,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}