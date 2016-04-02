'use strict';


/************************************************
	LEGOS API
	Vid Brenes

	RESTfull API piezas LEGO.
*************************************************/

//Paquetes necesarios
let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/legosdb',
		port = process.env.PORT || 3000;

//Conexión a la base de datos
mongoose.connect(dbURI);

//Modelo de base de datos
//let Lego = require('./app/api/models/lego');
let Lego = require('./app/api/models/lego');


/*
	MIDDLEWARE
*/

//BodyParser, para obtener data desde POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*
	ROUTES
*/
//Obtener una instancia de Router en Express
let apiRouter = express.Router();

//Middleware a usar en todos los request
apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();   // don't stop here, go to next route
});

//Routes
//Ruta genérica del API
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});


/*
	AQUI
*/
apiRouter.route('/legos')
	//Insertar un lego (http://localhost:3000/api/legos)
	.post((req, res) => {
			let lego = new Lego();

			lego.number = req.body.number;
			lego.model = req.body.model;
			lego.legoSet = req.body.legoSet;
			lego.amount = req.body.amount;
			lego.imageURL = req.body.imageURL;
			lego.save(err => {
					if (err) res.send(err);
						res.json({ message: 'Lego created!' });
					});
		})
	//Obtener todos los legos (http://localhost:3000/legos)
		.get((req, res) => {
		Lego.find((err, legos) => {
			if (err) res.send(err);
			res.json(legos);
		});
	});
//CHECK POINT

apiRouter.route('/legos/:lego_id')
	//Obtener un lego por el ID (http://localhost:3000/api/legos/:lego_id)
	.get((req, res) => {
		Lego.findById(req.params.lego_id, (err, lego) => {
			if (err) res.send(err);
			res.json(lego);
			//console.log('Estoy en getById');
		});
	})
	//Actualizar un lego por el ID (http://localhost:3000/api/legos/:lego_id)
	.put((req, res) => {
		Lego.findById(req.params.lego_id, (err, lego) => {
			if (err) res.send(err);
			// update info
			lego.number = req.body.number;
			lego.model = req.body.model;
			lego.legoSet = req.body.legoSet;
			lego.amount = req.body.amount;
			lego.imageURL = req.body.imageURL;
			beer.country = req.body.country;
			// save lego
			lego.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Lego updated!' });
			});
		});
	})
	//Borrar un lego por el ID (http://localhost:3000/api/legos/:lego_id)
	.delete((req, res) => {
		Lego.remove({ _id: req.params.lego_id }, (err, lego) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});

//Buscar un lego por aproximación del modelo
apiRouter.route('/legos/model/query')
	.get((req,res)=> {
		let modelString = req.query.model;
		Lego.find({"model":{"$regex": modelString}},(err,legos) => {
			if (err) res.send(err);
			res.json(legos);
		})
	});


//Prefijo para todas las rutas del API (/api)
app.use('/api', apiRouter);

//App de inicio
app.use(express.static(__dirname + "/public"));

//Iniciar el server
app.listen(port);
console.log('Magic happens on port ' + port);
