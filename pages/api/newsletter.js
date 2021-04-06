import {MongoClient} from 'mongodb';

async function handler (req, res) {
	if ( req.method === 'POST' ) {
		const userEmail = req.body.email;

		if ( !userEmail || !userEmail.includes('@') ) {
			res.status(422).json({message: 'invalid email address'});
			return;
		}

		const client = await MongoClient.connect(
			 'mongodb+srv://lashatatu:zr1wZbHY6XEc38JY@lashamax.b0l9y.mongodb.net/events?retryWrites=true&w=majority'
		);
		const db = client.db();

		await db.collection('newsletter').insertOne({email: userEmail});

		client.close();

		res.status(201).json({message: 'email sent'});
	}
}

export default handler;