# xkcd

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

  /images
  
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
