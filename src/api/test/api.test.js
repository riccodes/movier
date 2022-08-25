import {getMovie} from '../api'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios.get

const mockedConsole = jest.spyOn(global.console, 'error')

const response = {
    "adult": false,
    "backdrop_path": "/ikR2qy9xJCHX7M8i5rcvuNfdYXs.jpg",
    "belongs_to_collection": null,
    "budget": 12800000,
    "genres": [
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 80,
            "name": "Crime"
        }
    ],
    "homepage": "",
    "id": 16,
    "imdb_id": "tt0168629",
    "original_language": "en",
    "original_title": "Dancer in the Dark",
    "overview": "Selma, a Czech immigrant on the verge of blindness, struggles to make ends meet for herself and her son, who has inherited the same genetic disorder and will suffer the same fate without an expensive operation. When life gets too difficult, Selma learns to cope through her love of musicals, escaping life's troubles - even if just for a moment - by dreaming up little numbers to the rhythmic beats of her surroundings.",
    "popularity": 13.548,
    "poster_path": "/uXvyCRpoTRLSEia59Yj7nAZOSej.jpg",
    "production_companies": [
        {
            "id": 8,
            "logo_path": "/78ilmDNTpdCfsakrsLqmAUkFTrO.png",
            "name": "Fine Line Features",
            "origin_country": ""
        },
        {
            "id": 46,
            "logo_path": "/3xFdKHLXPGHEbrAkmsepGE8974Y.png",
            "name": "WDR",
            "origin_country": "DE"
        },
        {
            "id": 47,
            "logo_path": "/i7Z9ot2o3N5Sa3HrF09kniFs2y8.png",
            "name": "Constantin Film",
            "origin_country": "DE"
        },
        {
            "id": 76,
            "logo_path": "/nebkQYtQKhZyHJfh5v0oGpNbPzu.png",
            "name": "Zentropa Entertainments",
            "origin_country": "DK"
        },
        {
            "id": 94,
            "logo_path": "/huC7HqorvUThGIrENrbcHmQVUA0.png",
            "name": "ARTE France Cinéma",
            "origin_country": "FR"
        },
        {
            "id": 104,
            "logo_path": "/9aotxauvc9685tq9pTcRJszuT06.png",
            "name": "Canal+",
            "origin_country": "FR"
        },
        {
            "id": 119,
            "logo_path": "/1di2gITGUZr730AMuMKiCrP90Vl.png",
            "name": "DR",
            "origin_country": "DK"
        },
        {
            "id": 157,
            "logo_path": null,
            "name": "SVT Drama",
            "origin_country": ""
        },
        {
            "id": 201,
            "logo_path": "/6UIpEURdjnmcJPwgTDRzVRuwADr.png",
            "name": "ARTE",
            "origin_country": "FR"
        },
        {
            "id": 321,
            "logo_path": "/pfp6VWF3tYfOHHVRHpYe2iGcYrf.png",
            "name": "Memfis Film",
            "origin_country": "SE"
        },
        {
            "id": 447,
            "logo_path": null,
            "name": "TV 1000 Sverige",
            "origin_country": "SE"
        },
        {
            "id": 591,
            "logo_path": "/q5I5RDwMEiqoNmfaJgd2LraEOJY.png",
            "name": "France 3 Cinéma",
            "origin_country": "FR"
        },
        {
            "id": 2801,
            "logo_path": "/bswb1PLLsKDUXMLgy42bZtCtIde.png",
            "name": "Film i Väst",
            "origin_country": "SE"
        },
        {
            "id": 2996,
            "logo_path": null,
            "name": "Angel films",
            "origin_country": ""
        },
        {
            "id": 5975,
            "logo_path": "/vvjgoKygWWYZvYyidT3RmOCq5If.png",
            "name": "YLE",
            "origin_country": "FI"
        },
        {
            "id": 6705,
            "logo_path": "/e8EXNSfwr5E9d3TR8dHKbQnQK4W.png",
            "name": "Film4 Productions",
            "origin_country": "GB"
        },
        {
            "id": 7330,
            "logo_path": null,
            "name": "Blind Spot Pictures",
            "origin_country": "FI"
        },
        {
            "id": 8659,
            "logo_path": "/96hCWEsfmTZQsoUap0CcG21qaA.png",
            "name": "VPRO",
            "origin_country": "NL"
        },
        {
            "id": 11239,
            "logo_path": null,
            "name": "Liberator Productions",
            "origin_country": "FR"
        },
        {
            "id": 14937,
            "logo_path": null,
            "name": "Íslenska kvikmyndasamsteypan",
            "origin_country": "IS"
        },
        {
            "id": 30268,
            "logo_path": null,
            "name": "Pain Unlimited GmbH Filmproduktion",
            "origin_country": ""
        },
        {
            "id": 53667,
            "logo_path": null,
            "name": "Trust Film Svenska",
            "origin_country": ""
        },
        {
            "id": 53668,
            "logo_path": null,
            "name": "Cinematograph A/S",
            "origin_country": ""
        },
        {
            "id": 53669,
            "logo_path": null,
            "name": "What Else? B.V",
            "origin_country": ""
        },
        {
            "id": 53670,
            "logo_path": null,
            "name": "Filmek A/S",
            "origin_country": ""
        },
        {
            "id": 53671,
            "logo_path": null,
            "name": "Lantia Cinema & Audiovisivi",
            "origin_country": ""
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "AR",
            "name": "Argentina"
        },
        {
            "iso_3166_1": "DK",
            "name": "Denmark"
        },
        {
            "iso_3166_1": "FI",
            "name": "Finland"
        },
        {
            "iso_3166_1": "FR",
            "name": "France"
        },
        {
            "iso_3166_1": "DE",
            "name": "Germany"
        },
        {
            "iso_3166_1": "IS",
            "name": "Iceland"
        },
        {
            "iso_3166_1": "IT",
            "name": "Italy"
        },
        {
            "iso_3166_1": "NL",
            "name": "Netherlands"
        },
        {
            "iso_3166_1": "NO",
            "name": "Norway"
        },
        {
            "iso_3166_1": "SE",
            "name": "Sweden"
        },
        {
            "iso_3166_1": "GB",
            "name": "United Kingdom"
        },
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2000-06-30",
    "revenue": 40031879,
    "runtime": 141,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "You don't need eyes to see.",
    "title": "Dancer in the Dark",
    "video": false,
    "vote_average": 7.9,
    "vote_count": 1438
}

describe('api tests', () => {

    beforeEach(() => {
        mockedAxios.mockReset()
        mockedConsole.mockReset()
    })

    describe('getMovie()', () => {
        it('Should get move based on id', async () => {
            axios.get.mockResolvedValue({ data: [{ test: 'Hi I worked!' }] })
            const data = await getMovie(1)
            expect(axios.get).toBeCalledTimes(1)

            expect(data).toEqual(
                expect.objectContaining({
                    "id": 16
                })
            )
        })

    })
})
