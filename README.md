url-shortener
=============


#### To shorten

`POST /shorten`

Generates a new short URL for the given long url.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `url` | `string` | Url to shorten


**Response**

    {
      "status": "success",
      "orig_url": "https://www.google.com",
      "short_url": "http://localhost:8000/bc"
    }
