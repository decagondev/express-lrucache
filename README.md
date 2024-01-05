# express-lrucache

## how to get startedhttps://github.com/decagondev/express-lrucache/blob/main/README.md
**install deps and run server**
```bash
npm i
npm run dev
```

## Endpoints

**/get** returns all audio items
```bash
curl -X GET http://localhost:555/get
```

**/get:idKey** returns audio item by idKey provided
```bash
curl -X GET http://localhost:555/get/someidkey
```
**/add** adds an audio item to the database and returns the item back on success
```bash
curl -X POST -H "Content-Type: application/json" -d '{"idKey":"someidkey", "audio":"someaudiostring"}' http://localhost:555/add
```
