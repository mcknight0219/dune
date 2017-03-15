export default {

    csrfToken: () => {
        const tags = document.getElementsByTagName("meta")
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].name === 'csrf-token') {
                return tags[i].getAttribute('content')
            }
        }
        return ''
    },

    // return array containing unique elements from arr
    unique: (arr) => {
        if ( !Array.isArray(arr) || arr.length < 2 ) {
            return arr
        }
        return arr.sort((o1, o2) => {
            if (o1 === o2)
                return 0
            return o1.name < o2.name ? -1 : 1
        }).filter((val, i) => i == 0 || (i>0 && arr[i] !== arr[i-1]))
    }
}
