# xkcd [![Latest xkcd][1]](https://xkcd.com)

[1]: https://img.shields.io/badge/dynamic/json.svg?label=Latest&url=https%3A%2F%2Fxkcd.com%2Finfo.0.json&query=%24.num&colorB=4BC120&logo=data:image/x-icon;base64,AAABAAIAEBAAAAAAAABoBQAAJgAAACAgEAAAAAAA6AIAAI4FAAAoAAAAEAAAACAAAAABAAgAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAJycnABGRkYAenp6AIODgwAkJCQA6+vrAIyMjAAdHR0A29vbAHx8fAAvLy8Ajo6OADg4OAD///8AFhYWAEpKSgB+fn4AsrKyACgoKAAGBgYA+Pj4AKKiogDW1tYAd3d3AICAgAAqKioAiYmJAOjo6AC9vb0AXl5eAPHx8QBnZ2cA+vr6AHBwcADh4eEAgoKCAIuLiwBgYGAA8/PzAJ2dnQBHR0cAe3t7AOPj4wAlJSUAn5+fANPT0wB0dHQAsbGxAFtbWwCPj48AMDAwADk5OQChoaEAdnZ2AH9/fwApKSkAiIiIAJqamgBvb28AeHh4ANfX1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0zADc7NwAzMwAEBAATNzM8DgAODg4ADg4ADg4ADg48Ig4aKg4DGg4OKTASDQ4OIiIOKggOOAMODi00NDUODiIZIA4AKAAOHgkOAAAOLh08OQ8bDgAOGwUAFQwMFQAjGBgfAA4ADgAcIQACAgAnDiIiDiQsACwkDgEQAAAQAQ4iIg4OFgAWDg4CAAAAAAIOIiIOJAAAACQOLxEODjsvDiIYKxQXDhcUKzYlDg4OJg4iGTs9Dg4OPTsyAAcOIjsOIhkYPA4ODjw2BwAAAAAKDiIYBgALMgsACQ4xAAAxDg4iPA46AAAAOg4ODg4ODg4OPDMYEQwyDBE7Ozs7Ozs7GDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAACAAAABAAAAAAQAEAAAAAAAAAgAAAAAAAAAAAAAQAAAAAAAAAAAAAADPz88A39/fACAgIAD///8AcHBwAICAgACQkJAAoKCgANfX1wAoKCgAf39/AIiIiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEAAREREAARAAEREAAREQAREAERERABERABERABEREAERABEREQAREQAVEUARERABEQwNERDA0REYHRHDEREQAREQAREQAREREAEQAFEREAEREAJREAERERABmAERERABERDCkQwNERETAiAxEREQARERABEAEREREEAABREREAEAEQwAANEADREMANEQwRABAA0QwA0QwADREAERDA0QARABEQAREAEMDRABEMDREAEQwNEAEQwNEMDQAQwNERABEQwNABDA0REMAAAA0REQAREQAQAQAREREAAAAREREAEREMAAAA0RFAAAAAABURABEREMAADRERQAAAAAAVEQAREREQAREREQAAAAAAEREAEREQwAANEREADREQwBERABEQwAAAAA0RAJEREQgREQAREAAREQABEQEREREQEREAEQwRERERANEADREREBERABEAEREREQARAADREQwREQARAREREREQEQAAERCAEREAEQARERERABEAAAAAABERABEAEREREQARDAAAAADREQARDAAREQAA0RDAAAANEREAERAAAAAAARERLAAC0RERABEQwAAAAA0REREREREREQARERDAAA0REREREREREREAERERERERERERERERERERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

## API list

- [Search xkcd](#search-xkcd)
- [Get xkcd list](#get-xkcd-list)
- [Give a thumb up to xkcd](#give-a-thumb-up-to-xkcd)
- [Get top xkcds](#get-top-xkcds)
- [Get random xkcd](#get-random-xkcd)


- [Search what if](#search-what-if)
- [Get what if list](#get-what-if-list)
- [Give a thumb up to what if](#give-a-thumb-up-to-what-if)
- [Get top what ifs](#get-top-what-ifs)
- [Get random what if](#get-random-what-if)

---
### Search xkcd

* **URL**

  /xkcd-suggest
  
* **Method**
 
  `GET`

* **URL Params**

| Name | Required | Type | Description |
| ---  | :---:    | ---  | ---         |
|  q   |  *       |String| xkcd query  |
| size |          |Integer| result size|

-------------------------------------------------

### Get xkcd list

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


-------------------------------------------------

### Give a thumb up to xkcd

* **URL**

  /xkcd-thumb-up
  
* **Method**
 
  `POST`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| comic_id|  *    |Integer| xkcd id     |

-------------------------------------------------

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


-------------------------------------------------

### Get random xkcd

* **URL**

  /xkcd-random

* **Method**

  `GET`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| size |          |Integer| result size |


-------------------------------------------------

### Search what if

* **URL**

  /what-if-suggest
  
* **Method**
 
  `GET`

* **URL Params**

| Name | Required | Type | Description |
| ---  | :---:    | ---  | ---         |
|  q   |  *       |String| what if query  |
| size |          |Integer| result size|

-------------------------------------------------

### Get what if list

* **URL**

  /what-if-list
  
* **Method**
 
  `GET`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| start|  *       |Integer| start index, starts from 0, 0 means the last item |
|reversed|        |Integer| 0 not reversed, 1 reversed, default `0` |
| size |          |Integer| size of what if list, default `100` |


-------------------------------------------------
### Give a thumb up to what if

* **URL**

  /what-if-thumb-up
  
* **Method**
 
  `POST`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| what_if_id|  *  |Integer| what if id |

-------------------------------------------------
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


-------------------------------------------------
### Get random what if

* **URL**

  /what-if-random

* **Method**

  `GET`

* **URL Params**

| Name | Required | Type  | Description |
| ---  | :---:    | ---   | ---         |
| size |          |Integer| result size |
