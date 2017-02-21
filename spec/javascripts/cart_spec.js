import Cart from "cart";
import cartError from 'cart_error';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';


describe("Cart", () => {
    var cart;
    let stubedFetch;
    let successStubResponse;
    let failureStubResponse;
    let syncStubResponse;

    beforeEach(() => {
        cart = new Cart();
        sinonStubPromise(sinon);
        stubedFetch = sinon.stub(window, 'fetch');

        successStubResponse = new Response('{}', {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            }
        });

        failureStubResponse = new Response('{"error": "could not update cart"}', {
            status: 500,
            headers: {
                'Content-type': 'application/json'
            }
        });

        syncStubResponse = new Response('{"items": ["item1", "item2", "item3"]}', {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            }
        });
    });

    afterEach(() => {
        sinon.restore(window.fetch);
    });

    it("synchronize with remote server", () => {
        "use strict";
        stubedFetch.returnsPromise().resolves(syncStubResponse);
        cart.syncRemote().then(() => {
            expect(cart.getCount()).toEqual(3);
        });

    });

    it("adds items", () => {
        stubedFetch.returnsPromise().resolves(successStubResponse);
        cart.addItem("item1").then(() => {
            expect(cart.getCount()).toEqual(1);
        });
    });

    it("removes items", () => {
        stubedFetch.returnsPromise().resolves(successStubResponse);
        cart.addItem("item1");
        let item = cart.removeItem("item1").then(() => {
            expect(cart.getCount()).toEqual(0);
        })
    })

    it("failed cart operation", () => {
        let mock = sinon.mock(cartError);
        mock.expects("popupError").once();

        stubedFetch.returnsPromise().resolves(failureStubResponse);
        cart.addItem('item1');
        expect(cart.getCount()).toEqual(0);
        mock.verify();
    })
});
