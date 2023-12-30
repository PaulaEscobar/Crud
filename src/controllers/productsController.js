const { log } = require('console');
const fs = require('fs');
const path = require('path');
const {v4:uuidv4} = require('uuid')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		console.log(id);
		const product = products.find(product => product.id == id);
		res.render('detail', {title: product.name, product, toThousand}) 
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form', {title: 'Formulario de creación'})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const id = uuidv4() /*genera serie de n y letras*/
		const { name, price, descount, category, description } = req.body
		const newProduct = {
			id: id,
			name,
			price,
			descount,
			category,
			description,
			image: 'default.png'
		}
		
		products.push(newProduct)
		console.log(products);
		const json = JSON.stringify(products); 
		fs.writeFileSync(productsFilePath, json, 'utf-8');

		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;
		const product = products.find(product => product.id == id);
		res.render('product-edit-form', {title: product.name, product, toThousand})
	},
	
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params;
		const {name, price, descount,category, description, image} = req.body; /*el destruct+body. procesa los datos del form y crea un nuev product en json*/
		const newArray = products.map(product => { /*itera y arregla*/
			if(product.id == id) {
				return {
				id,
				name:name.trim(), /* recorta los espacios en una cadena d texto*/
				price,   
				descount,
				category,
				description:description.trim(),
				image: image ? image : product.image 
			}
		}
			return product
		})
		const json = JSON.stringify(newArray); 
		fs.writeFileSync(productsFilePath, json, 'utf-8');
		res.redirect(`/products/detail/${id}`);
	},




	// Delete - Delete one product from DB
	destroy : (req, res) => {
			const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
			const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
			const {id} = req.params;
			// const product = products.find(product => product.id == id); 
			const newArray = products.filter(product => product.id != +id);  /*devuelve el array nuevo con el prod eliminado multer*/
			const json = JSON.stringify(newArray);
			fs.writeFileSync(productsFilePath, json, 'utf-8');
			res.redirect('/products');
	}
};

module.exports = controller;