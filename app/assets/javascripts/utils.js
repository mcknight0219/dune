export default {

    csrfToken: () => {
        const tags = document.getElementsByTagName("meta")
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].name === 'csrf-token') {
                return tags[i].getAttribute('content')
            }
        }
        return ''
    }
}
