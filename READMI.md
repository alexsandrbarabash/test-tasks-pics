BASE_URL = http://3.76.216.29:8080/

All parameters are transmitted as an array in the body of the example

```
curl --location 'http://3.76.216.29:8080/templates/sum/job' \
--header 'Content-Type: application/json' \
--data '[1,2]'
```
