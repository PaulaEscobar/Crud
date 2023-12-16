const { log } = require('console');
const fs = require('fs');
const path = require('path');

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
		const product = products.find(product => product.id == id);
		res.render('detail', {title: product.name, product, toThousand}) 
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('./product-create-form', {title: products})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		res.render('./store')
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
		const {name, price, descount,category, description, image} = req.body;
		const newArray = products.map(product => {
			if(product.id == id) {
				return {
				id,
				name:name.trim(),
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
		// Do the magic
	}
};

module.exports = controller;