#/bin/bash
mongosh --eval 'db.customers.insertMany([{id: "d2gH29R0H", name: "John Doe", active: true, credit: 5000},{id: "CtZbJVMC6", name: "Jane Mow", active: true, credit: 3500}])'
bubblepoint> db.price_lines.find()
[
  {
    _id: ObjectId('675ef5b1b86daf336cc1c190'),
    id: 'washer_small',
    price: 400
  },
  {
    _id: ObjectId('675ef5bbb86daf336cc1c191'),
    id: 'washer_medium',
    price: 600
  },
  {
    _id: ObjectId('675ef5c5b86daf336cc1c192'),
    id: 'washer_big',
    price: 900
  },
  {
    _id: ObjectId('675ef5e2b86daf336cc1c193'),
    id: 'dryer_10_minutes',
    price: 100
  }
]
bubblepoint> db.locations.find()
[
  {
    _id: ObjectId('675ee78bb86daf336cc1c18c'),
    id: 'ATAH',
    address: 'Andreas-Hofer-Str. 37, 6020 Innsbruck'
  },
  {
    _id: ObjectId('675ee7d2b86daf336cc1c18d'),
    id: 'ATFW',
    address: 'Fürstenweg 8,, 6020 Innsbruck'
  },
  {
    _id: ObjectId('675ee7f2b86daf336cc1c18e'),
    id: 'ATMW',
    address: 'Mitterweg 58, 6020 Innsbruck'
  },
  {
    _id: ObjectId('675ee83ab86daf336cc1c18f'),
    id: 'ATBX',
    address: 'Brixnerstraße 1, 6020 Innsbruck'
  }
]
