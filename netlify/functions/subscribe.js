const { MongoClient, ServerApiVersion, Timestamp } = require("mongodb");

exports.handler = async function (event) {
    const uri = `mongodb+srv://${process.env.MONGO_AUTH}@${process.env.MONGO_AT}/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });

    try {
        await new Promise((resolve, reject) =>
            client.connect((err) => {
                if (err) reject(`Mongo error: [${err.message}]`);
                resolve();
            })
        );
    } catch (err) {
        client.close();

        return {
            statusCode: 499,
            body: err,
        };
    }

    const collection = client.db("prosopo").collection("emails");

    const { email } = JSON.parse(event.body || "{}");
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/    

    if (!email) {
        client.close();

        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Email not provided" }),
        };
    } else if (!emailRegexp.test(email)) {
        client.close();

        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Email not valid" }),
        };
    }

    try {
        await collection.insertOne({
            _id: email,
            created_at: new Timestamp(),
        });
    } catch (err) {
        if (err.code !== 11000) {
            client.close();

            return {
                statusCode: 499,
                body: `Mongo error: ${err.message}`,
            };
        }
    }

    client.close();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `${email} subscribed` }),
    };
};
