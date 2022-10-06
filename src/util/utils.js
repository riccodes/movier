export const sanitizeResults = results => {
    return results.map(result => {
        delete result.media_type
        return result
    })
}

export const toTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
}