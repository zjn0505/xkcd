# xkcd

## Api list

- [Get xkcd search recommendation](#get-xkcd-search-recommendation)
- [Get xkcd list with paging](#get-xkcd-list-with-paging)
- [Give a thumb up](#give-a-thumb-up)
- [Get top xkcds](#get-top-xkcds)

---
### Get xkcd search recommendation

* **URL**

  /xkcd-suggest
  
* **Method**
 
  `GET`

* **URL Params**

| Name | Required | Type | Description |
| ---  | :---:    | ---  | ---         |
|  q   |  *       |String| xkcd query  |

* **Data Params**

  None

* **Success Response**

  * **Code:** 200 <br />
    **Content:** 
```json
[
  {
    "width": 516,
    "height": 719,
    "num": 886,
    "alt": "$1600 / 1386153BR 3BATH, MODERN SLIDING DOORS, GUEST ROOMS, GARBAGE DISPOSAL. FREE MANDATORY PARKING (ENFORCED). CONVENIENT TO ALDERAAN.",
    "title": "Craigslist Apartments",
    "img": "https://imgs.xkcd.com/comics/craigslist_apartments.png",
    "score": 2.125
  },
  {
    "width": 587,
    "height": 324,
    "num": 1600,
    "alt": "Markets have been rocked by a second day of uncertainty after someone set up a giant Ouija board on the NYSE wall controlled collectively by the movement of the stock tickers.",
    "title": "MarketWatch",
    "img": "https://imgs.xkcd.com/comics/marketwatch.png",
    "score": 0
  }
]
```
----

### Get xkcd list with paging

* **URL**

  /xkcd-list
  
* **Method**
 
  `GET`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| start|  *       |Integer| start index |
|reversed|        |Integer| 0 not reversed, 1 reversed, default `0` |
| size |          |Integer| size of xkcd list, default `100` |

* **Data Params**

  None

* **Success Response**

```json
[
  {
    "width": 577,
    "height": 311,
    "num": 1,
    "alt": "Don't we all.",
    "title": "Barrel - Part 1",
    "img": "https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg"
  },
  {
    "width": 504,
    "height": 477,
    "num": 2,
    "alt": "'Petit' being a reference to Le Petit Prince, which I only thought about halfway through the sketch",
    "title": "Petit Trees (sketch)",
    "img": "https://imgs.xkcd.com/comics/tree_cropped_(1).jpg"
  },
  {
    "width": 618,
    "height": 487,
    "num": 3,
    "alt": "Hello, island",
    "title": "Island (sketch)",
    "img": "https://imgs.xkcd.com/comics/island_color.jpg"
  },
  {
    "width": 626,
    "height": 347,
    "num": 4,
    "alt": "There's a river flowing through the ocean",
    "title": "Landscape (sketch)",
    "img": "https://imgs.xkcd.com/comics/landscape_cropped_(1).jpg"
  },
  {
    "width": 640,
    "height": 355,
    "num": 5,
    "alt": "Blown into prime factors",
    "title": "Blown apart",
    "img": "https://imgs.xkcd.com/comics/blownapart_color.jpg"
  }
]
```
----

### Give a thumb up

* **URL**

  /xkcd-thumb-up
  
* **Method**
 
  `POST`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| comic_id|  *    |Integer| xkcd id     |

* **Data Params**

  None

* **Success Response**

```json
{
    "width": 560,
    "height": 451,
    "thumbCount": 1,
    "num": 12,
    "alt": "Poisson distributions have no value over negative numbers",
    "title": "Poisson",
    "img": "https://imgs.xkcd.com/comics/poisson.jpg",
    "day": "1",
    "month": "1",
    "year": "2006",
}
```
----

### Get top xkcds

* **URL**

  /xkcd-top
  
* **Method**
 
  `GET`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| sortby|  *       |String| "thumb-up" |

* **Data Params**

  None

* **Success Response**

```json
[
    {
        "width": 571,
        "height": 366,
        "thumbCount": 36,
        "num": 1983,
        "alt": "I found a copy of The Life-Changing Magic of Tidying Up, but the idea of reading it didn't spark joy, so I gave it away.",
        "title": "Clutter",
        "img": "https://imgs.xkcd.com/comics/clutter.png",
        "day": "20",
        "month": "4",
        "year": "2018"
    },
    {
        "width": 672,
        "height": 408,
        "thumbCount": 27,
        "num": 1980,
        "alt": "I take it Narnia doesn't have Cinnabons? Because if you can magic up a plate of those, I'll betray whoever.",
        "title": "Turkish Delight",
        "img": "https://imgs.xkcd.com/comics/turkish_delight.png",
        "day": "13",
        "month": "4",
        "year": "2018"
    },
    {
        "width": 386,
        "height": 294,
        "thumbCount": 14,
        "num": 1973,
        "alt": "That one is a variable star which pulses every 30 seconds. Its name comes from a Greek word meaning \"smoke alarm.\"",
        "title": "Star Lore",
        "img": "https://imgs.xkcd.com/comics/star_lore.png",
        "day": "28",
        "month": "3",
        "year": "2018"
    },
    {
        "width": 636,
        "height": 359,
        "thumbCount": 11,
        "num": 1956,
        "alt": "For a while, some physicists worked on a theory unifying the other forces with both the force of gravity and the film \"Gravity,\" but even after Alfonso CuarÃ³n was held in a deep underground chamber of water for 10^31 years he refused to sell his film to Disney.",
        "title": "Unification",
        "img": "https://imgs.xkcd.com/comics/unification.png",
        "day": "16",
        "month": "2",
        "year": "2018"
    },
    {
        "width": 615,
        "height": 282,
        "thumbCount": 10,
        "num": 1955,
        "alt": "Don't be nervous about the robots, be nervous about the people with the resources to build them.",
        "title": "Robots",
        "img": "https://imgs.xkcd.com/comics/robots.png",
        "day": "14",
        "month": "2",
        "year": "2018"
    },
    ...
]
```
