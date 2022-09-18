export const sanitizeResults = results => {
    return results.map(result => {
        delete result.media_type
        return result
    })
}