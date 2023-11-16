export const types = {
    login:'[auth] login',
    logOut:'[auth] logOut',
    register:'[auth] register',
    recoveryPassword:'[auth] recoveryPassword',
    // types of products
    getAllProducts: '[products] getAllProducts',
    updateProducts: '[products] updateProduct',
    createNewProduct: '[products] createNewProduct',
    deleteProduct: '[products] deleteProduct',
    setError: '[products] setError',
    setLoading: '[products] setLoading',
    // Categories
    getAllCategories: '[categories] getAllCategories',
    // Proveedores
    getAllSuppliers: '[suppliers] getAllSuppliers',
    // Unidades
    getAllUnits: '[units] getAllUnits',

    // Carrito de compras
    addProductToCart: '[cart] addProductToCart',
    updateProducts: '[cart] updateProducts',
    deleteProductCart: '[cart] deleteProductCart',
    setLoadingCheckOut: '[cart] setLoadingCheckOut',
    clearCart: '[cart] clearCart',
    // pedidos
    getAllOrders: '[orders] getAllOrders'
    
}










// Tipo de roles  que tenemos en la base de datos de roles 
export const typesRoles = {
    isAdmin : 1,
    isClient : 2
}