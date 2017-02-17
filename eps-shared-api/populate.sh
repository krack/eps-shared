#!/bin/bash
#populate
api="http://localhost:8080/api/articles/"

curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"title\":\"title1\",\"describe\":\"miam\"}" "$api"
curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{\"title\":\"title2\",\"describe\":\"miam!!\"}" "$api"


#curl -X DELETE --header "Content-Type: application/json" --header "Accept: application/json" "$api/570518dd908773010068c6f5"
