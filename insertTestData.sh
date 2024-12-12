#/bin/bash
mongosh "mongodb://localhost:27017/bubblepoint" --eval 'db.customers.insertOne({id: "d2gH29R0H", name: "John Doe", active: true, credit: 5000})'
