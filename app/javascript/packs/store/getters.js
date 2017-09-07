export default {
    allProducts: state => state.products,
    allProductCategories: state => state.productCategories,
    allOrders: state => state.orders,
    allAddresses: state => state.addresses,
    allPackages: state => state.packages,
    allUploads: state => state.uploads,
    allCarousels: state => state.carousels,
    updatingPackage: state => state.updatingPackage,
    shipOrderStatus: state => state.shipOrderStatus,
    wishes: state => state.wishes,
    sidebar: state => state.sidebar
}