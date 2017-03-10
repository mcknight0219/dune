export default {
    name: 'Address',

    template: `
    <div class="one-third">
        <div class="name-section">{{ address.name }}</div>
        <div class="address-section">{{ addressBlock }}</div>
        <div class="one-half">
            <button v-on:click.prevent='edit'>Edit</button>
        </div>
        <div class="one-half">
            <button v-on:click.prevent='delete'>Delete</button>
        </div>
    </div>
    `,

    props: ['address'],
}