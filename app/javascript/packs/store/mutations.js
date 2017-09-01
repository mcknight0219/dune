
export default {
    TOGGLE_SIDEBAR: (state, opened) => {
        state.sidebar = opened
    },

    TOGGLE_DEVICE: (state, isMobile) => {
        state.isMobile = isMobile
    },

    RECEIVE_UPLOADS: (state, { uploads }) => {
        state.uploads = uploads
    },

    RECEIVE_PRODUCTS: (state, { products }) => {
        state.products = products
    },

    RECEIVE_PRODUCT_CATEGORIES: (state, categories) => {
        state.productCategories = categories
    },

    ADD_PRODUCT_CATEGORY: (state, category) => {
        state.productCategories.push(category)
    },

    DEL_PRODUCT_CATEGORY: (state, id) => {
        const record = state.productCategories.find(pc => pc.id === id)
        if (record) {
            state.productCategories.splice(state.productCategories.indexOf(record), 1)
        }
    },

    ADD_NEW_PRODUCT: (state, {product}) => {
        state.products.push(product)
    },

    DELETE_PRODUCT: (state, {product}) => {
        const record = state.products.find(p => p.id === product.id)
        if (record) {
            state.products.splice(state.products.indexOf(record), 1)
        }
    },

    UPDATE_PRODUCT: (state, {product}) => {
        const record = state.products.find(p => p.sku === product.sku)
        if (!record) {
            state.products.push(record)
        } else {
            Object.keys(record).map((k, i) => {
                record[k] = product[k]
            })
        }
    },

    RECEIVE_ORDERS: (state, { orders }) => {
        state.orders =  orders
    },

    SHIP_ORDER: (state, {id, trackingNumber}) => {
        const order = state.orders.find(o => o.id == id)
        order.is_shipped = true
        order.tracking_number = trackingNumber
    },

    MARK_SHIP_ORDER_STATUS: (state, status) => {
        state.shipOrderStatus = status
    },
    
    RECEIVE_ADDRESSES: (state, {addresses}) => {
        state.addresses = addresses
    },

    RECEIVE_PACKAGES: (state, {packages}) => {
        state.packages = packages
    },

    START_PACKAGE_UPDATING: (state, id) => {
        state.updatingPackage = id
    },

    STOP_PACKAGE_UPDATING: (state) => {
        state.updatingPackage = null
    },

    UPDATE_PACKAGE: (state, { pac }) => {
        const record = state.packages.find(p => p.id === pac.id)
        if (record) {
            record.is_shipped = pac.is_shipped
            record.is_received = pac.is_received
        }
    },

    UPDATE_INVENTORY: (state, { id, stock }) => {
        const p = state.products.find(p => p.inventory.id === id)
        if (p) {
            p.inventory.stock = stock
        }
    },

    GET_WISHLIST: (state, wishes)=> {
        state.wishes = wishes
    }
}