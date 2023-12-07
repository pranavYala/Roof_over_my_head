const {MongoClient} = require('mongodb');

async function connect() {
  const client = new MongoClient('mongodb+srv://Aghalya:progLikeFrog@useraccountinfo.ccdikk5.mongodb.net/');
  await client.connect();
  return client.db('userAccountInfo').collection('users');
}

exports.handler = async (event, context) => {
    try {
        const data = JSON.parse(event.body);
        const collection = await connect();

        const user = await collection.insertOne({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        });

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Account created', insertedId: user.insertedId})
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Error creating account', error: err.message})
        };
    }
};