import { mutations, actions } from 'store/dashboard';
import api from 'api'
import sinon from 'sinon';

const {RECEIVE_PRODUCTS, ADD_NEW_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, ADD_TO_CART, DEL_FROM_CART, CART_SUCCESS, CART_FAILED, RECEIVE_ORDERS, MARK_ORDER_SHIPPED} = mutations

describe("mutations", () => {
    it('receives products', () => {
        const state = { products: [] }
        const payload = { products: [{ "id": 1, "name": 'fishoil', "price": 9.99 }] }
        RECEIVE_PRODUCTS(state, payload)
        expect(state.products.length).toEqual(1)
    })

    it('add item product', () => {
        const state = {products: []}
        const payload = {product: {"sku": 'A00001', "name": "fishoil", "price": 9.99}}
        ADD_NEW_PRODUCT(state, payload)
        expect(state.products.length).toEqual(1)
    })

    it('updates product', () => {
        const state = {products: [{"sku": 'A00001', "name": "fishoil", "price": 9.99}]}
        const payload = {product: {"sku": 'A00001', "name": "fishoil", "price": 8.99}}
        UPDATE_PRODUCT(state, payload)
        expect(state.products[0].price).toEqual(8.99)
    })

    it('receive orders', () => {
        const state = {orders: []}
        RECEIVE_ORDERS(state, {orders: [{"id": 1, "user": 123, "shipped": false}]})
        expect(state.orders.length).toEqual(1)
    })

    it('mark order as shipped', () => {
        const state = {orders: [{"id": 1, "user": 123, "shipped": false}]}
        MARK_ORDER_SHIPPED(state, {id: 1})
        expect(state.orders[0].shipped).toBeTruthy()
    })

    it('add to cart', () => {
        const state = { added: [], checkoutStatus: null }
        ADD_TO_CART(state, { id: 1 })
        expect(state.added).toEqual([{id: 1, quantity: 1}])
        expect(state.checkoutStatus).toBeNull()
    })

    it('delete from cart', () => {
        const state = { added: [], checkoutStatus: null }
        ADD_TO_CART(state, { id: 1 })
        DEL_FROM_CART(state, { id: 1 })
        expect(state.added).toEqual([{id: 1, quantity: 0}])
        expect(state.checkoutStatus).toBeNull()
    })

    it('update cart successfully', () => {
        const state = { checkoutStatus: null }
        CART_SUCCESS(state)
        expect(state.checkoutStatus).toEqual('successful')
    })

    it('update cart failed', () => {
        const state = { added:[], checkoutStatus: null }
        CART_FAILED(state, { savedCartItems: [] })
        expect(state.checkoutStatus).toEqual('failed')
        expect(state.added).toEqual([])
    })
});


const testAction = (action, payload, state, expectedMutations, done) => {

    // number of times mutation is committed
    let count = 0

    // mock commit
    const commit = (type, payload) => {
        const mutation = expectedMutations[count]
        expect(mutation.type).toEqual(type)
        if (payload) {
            expect(mutation.payload).toEqual(payload)
        }
        count++
        if (count >= expectedMutations.length) {
            done()
        }
    }

    action({ commit, state }, payload)

    if (expectedMutations.length === 0) {
        expect(count).toEqual(0)
        done()
    }
}

const validResponseHeader = {
    status: 200,
    headers: {
        'Content-type': 'application/json'
    }
}

describe('actions', () => {
    beforeAll(() => {
        sinon.stub(api, 'getProducts', () => {
            return new Promise((resolve, reject) => {
                resolve(new Response('{"products": [{"id": 1, "name": "fishoil"}]}', validResponseHeader))
            })
        })

        sinon.stub(api, 'newProduct', () => {
            return new Promise((resolve, reject) => {
                resolve(new Response('{"product": {"sku": "A00001", "name": "fishoil", "price": 9.99}}', validResponseHeader))
            })
        })

        sinon.stub(api, 'deleteProduct', () => {
            return new Promise((resolve, reject) => {
                resolve(new Response('{"success": true}'), validResponseHeader)
            })
        })

        sinon.stub(api, 'getOrders', () => {
            return new Promise((resolve, reject) => {
                resolve(new Response('{"orders": [{"id": 1, "user": 123, "shipped": false}]}', validResponseHeader))
            })
        })

        sinon.stub(api, 'addCart', () => {
            let success = false
            return new Promise((resolve, reject) => {
                // flip success to test both scenarios
                success = !success
                setTimeout(() => {
                    resolve(new Response(`{"success": ${success}}`, validResponseHeader))
                }, 100)
            })
        })
    })

    it ('get all products', (done) => {
        testAction(actions.getAllProducts, null, {}, [{
            type: 'RECEIVE_PRODUCTS',
            payload: {products: [{id: 1, name: 'fishoil'}]}
        }], done)
    })

    it('add item product', (done) => {
        let state = {products: []}
        testAction(actions.addNewProduct, {product: {"name": "fishoil", "price": 9.99}}, state, [
            {type: 'ADD_NEW_PRODUCT', payload: {product: {"sku": 'A00001', "name": "fishoil", "price": 9.99}}}
        ], done)
    })

    it('delete product', (done) => {
        let state = {products: [{id: 1}]}
        testAction(actions.deleteProduct, {product: {"id": 1}}, state, [
            {type: 'DELETE_PRODUCT', payload: {product: {"id": 1}}}
        ], done)
    })

    it('get all orders', (done) => {
        testAction(actions.getAllOrders, null, {}, [
            {type: 'RECEIVE_ORDERS', payload: {orders: [{id: 1, user: 123, shipped: false}]}}
        ], done)
    })

    it('add products to cart', (done) => {
        testAction(actions.addToCart, {id: 1}, {}, [
            { type: 'ADD_TO_CART', payload: { id: 1 } },
            { type: 'CART_SUCCESS' }
        ], done)

        let state = { added: [] }
        testAction(actions.addToCart, {id: 1}, state, [
            { type: 'CART_FAILED', payload: { saved: []}}
        ], done)
        expect(state.added).toEqual([])
    })
})