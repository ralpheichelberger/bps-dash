#/bin/bash
mongosh --eval 'db.customers.insertMany([{id: "d2gH29R0H", name: "John Doe", active: true, credit: 5000},{id: "CtZbJVMC6", name: "Jane Mow", active: true, credit: 3500}])'
