
export function csrfToken() {
    const tags = document.getElementsByTagName("meta")
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].name === 'csrf-token') {
            return tags[i].getAttribute('content')
        }
    }
    return ''
}

// return array containing unique elements from arr
export function unique(arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
        return arr
    }
    return arr.sort((o1, o2) => {
        if (o1 === o2)
            return 0
        return o1.name < o2.name ? -1 : 1
    }).filter((val, i) => i == 0 || (i > 0 && arr[i] !== arr[i - 1]))
}

// Parse the range string like "2017-04-01 to 2017-05-01" that is returned
// by date picker.
export function parseRange(r) {
    const idx = r.indexOf("to")
    if (r.length === 0 || idx < 0) return []
    const start = new Date(r.substring(0, idx))
    const end = new Date(r.substring(idx + 3))

    if (start.getDate() === NaN || end.getDate() === NaN) {
        return []
    } else {
        return [start, end]
    }
}
