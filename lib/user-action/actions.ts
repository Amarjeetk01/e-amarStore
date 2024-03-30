
const url=process.env.ECOMMERCE_STORE_URL || "http://localhost:3000"
export const getUser = async () => {
    const users = await fetch(`${url}/api/users`)
    return await users.json()
  }

export const getCollections = async () => {
    const collections = await fetch(`${url}/api/collections`)
    return await collections.json()
  }
  
  export const getCollectionDetails = async (collectionId: string) => {
    const collection = await fetch(`${url}/api/collections/${collectionId}`)
    return await collection.json()
  }
  
  export const getProducts = async () => {
    const products = await fetch(`${url}/api/products`)
    return await products.json()
  }

  export const getProductDetails = async (productId: string) => {
    const product = await fetch(`${url}/api/products/${productId}`)
    return await product.json()
  }

  
  export const getSearchedProducts = async (query: string) => {
    const searchedProducts = await fetch(`${url}/api/search/${query}`)
    return await searchedProducts.json()
  }
  
  export const getOrders = async (customerId: string) => {
    const orders = await fetch(`${url}/api/orders/customers/${customerId}`)
    return await orders.json()
  }
  
  export const getRelatedProducts = async (productId: string) => {
    const relatedProducts = await fetch(`${url}/api/products/${productId}/related`)
    return await relatedProducts.json()
  }