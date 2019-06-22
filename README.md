# xkcd [![Latest xkcd][1]](https://xkcd.com)

[1]: https://img.shields.io/badge/dynamic/json.svg?label=Latest&url=https%3A%2F%2Fxkcd.com%2Finfo.0.json&query=%24.num&colorB=4BC120&logo=data:image/x-icon;base64,AAABAAIAEBAAAAAAAABoBQAAJgAAACAgEAAAAAAA6AIAAI4FAAAoAAAAEAAAACAAAAABAAgAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAJycnABGRkYAenp6AIODgwAkJCQA6+vrAIyMjAAdHR0A29vbAHx8fAAvLy8Ajo6OADg4OAD///8AFhYWAEpKSgB+fn4AsrKyACgoKAAGBgYA+Pj4AKKiogDW1tYAd3d3AICAgAAqKioAiYmJAOjo6AC9vb0AXl5eAPHx8QBnZ2cA+vr6AHBwcADh4eEAgoKCAIuLiwBgYGAA8/PzAJ2dnQBHR0cAe3t7AOPj4wAlJSUAn5+fANPT0wB0dHQAsbGxAFtbWwCPj48AMDAwADk5OQChoaEAdnZ2AH9/fwApKSkAiIiIAJqamgBvb28AeHh4ANfX1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0zADc7NwAzMwAEBAATNzM8DgAODg4ADg4ADg4ADg48Ig4aKg4DGg4OKTASDQ4OIiIOKggOOAMODi00NDUODiIZIA4AKAAOHgkOAAAOLh08OQ8bDgAOGwUAFQwMFQAjGBgfAA4ADgAcIQACAgAnDiIiDiQsACwkDgEQAAAQAQ4iIg4OFgAWDg4CAAAAAAIOIiIOJAAAACQOLxEODjsvDiIYKxQXDhcUKzYlDg4OJg4iGTs9Dg4OPTsyAAcOIjsOIhkYPA4ODjw2BwAAAAAKDiIYBgALMgsACQ4xAAAxDg4iPA46AAAAOg4ODg4ODg4OPDMYEQwyDBE7Ozs7Ozs7GDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAACAAAABAAAAAAQAEAAAAAAAAAgAAAAAAAAAAAAAQAAAAAAAAAAAAAADPz88A39/fACAgIAD///8AcHBwAICAgACQkJAAoKCgANfX1wAoKCgAf39/AIiIiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEAAREREAARAAEREAAREQAREAERERABERABERABEREAERABEREQAREQAVEUARERABEQwNERDA0REYHRHDEREQAREQAREQAREREAEQAFEREAEREAJREAERERABmAERERABERDCkQwNERETAiAxEREQARERABEAEREREEAABREREAEAEQwAANEADREMANEQwRABAA0QwA0QwADREAERDA0QARABEQAREAEMDRABEMDREAEQwNEAEQwNEMDQAQwNERABEQwNABDA0REMAAAA0REQAREQAQAQAREREAAAAREREAEREMAAAA0RFAAAAAABURABEREMAADRERQAAAAAAVEQAREREQAREREQAAAAAAEREAEREQwAANEREADREQwBERABEQwAAAAA0RAJEREQgREQAREAAREQABEQEREREQEREAEQwRERERANEADREREBERABEAEREREQARAADREQwREQARAREREREQEQAAERCAEREAEQARERERABEAAAAAABERABEAEREREQARDAAAAADREQARDAAREQAA0RDAAAANEREAERAAAAAAARERLAAC0RERABEQwAAAAA0REREREREREQARERDAAA0REREREREREREAERERERERERERERERERERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

## Api list

- [Get xkcd search recommendation](#get-xkcd-search-recommendation)
- [Get xkcd list with paging](#get-xkcd-list-with-paging)
- [Give a thumb up to xkcd](#give-a-thumb-up-to-xkcd)
- [Get top xkcds](#get-top-xkcds)
- [Get random xkcd](#get-random-xkcd)
- [Give a thumb up to what if](#give-a-thumb-up-to-what-if)
- [Get top what ifs](#get-top-what-ifs)
- [Get random what if](#get-random-what-if)

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
| size |          |Integer| result size|

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
| start|  *       |Integer| start index, starts from 0, 0 means the last item |
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

### Give a thumb up to xkcd

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
| size |          |Integer| result size |

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
----

### Get  random xkcd

* **URL**

/xkcd-random

* **Method**

`GET`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| size |          |Integer| result size |

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
...
]
```
----

### Give a thumb up to what if

* **URL**

  /what-if-thumb-up
  
* **Method**
 
  `POST`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| what_if_id|  *  |Integer| what if id |

* **Data Params**

  None

* **Success Response**

```json
{
    "thumbCount": 1,
    "_id": "5b3af0592ea0677e5a37fce5",
    "num": 152
}
```
----

### Get top what ifs

* **URL**

  /what-if-top
  
* **Method**
 
  `GET`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| sortby|  *       |String| "thumb-up" |
| size |          |Integer| result size |

* **Data Params**

  None

* **Success Response**

```json
[
    {
        "thumbCount": 7,
        "num": 144
    },
    {
        "thumbCount": 4,
        "num": 13
    },
    ...
]
```
----

### Get random what if

* **URL**

/what-if-random

* **Method**

`GET`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| size |          |Integer| result size |

* **Data Params**

None

* **Success Response**

```json
[
{
"thumbCount": 7,
"num": 144
},
{
"thumbCount": 4,
"num": 13
},
...
]
```
