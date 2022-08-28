export const sorts = [
    {key: "pop.desc", name: "popularity.desc", label: "popularity desc"},
    {key: "pop.asc", name: "popularity.asc", label: "popularity asc"},
    {key: "rel.desc", name: "release_date.desc", label: "release date desc"},
    {key: "rel.asc", name: "release_date.asc", label: "release date asc"},
    {key: "vot.desc", name: "vote_average.desc", label: "vote average desc"},
    {key: "vot.asc", name: "vote_average.asc", label: "vote average asc"}
]
export const minYear = 1881
export const currentYear = new Date().getFullYear()
export const jsonify = string => JSON.parse(string)
export const handleError = error => console.error(error)
export const generatePersonsOptions = persons => persons.map(person => person.label = person.name)
export const getYear = date => (date ? date.slice(0, 4) : "")
export const handleSuccess = (response, target, handleResponse, action) => {
    handleResponse(jsonify(response)[target])
    if(action) action()
}