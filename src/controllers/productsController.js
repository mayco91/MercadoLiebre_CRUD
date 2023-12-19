const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const getJson = ()=>{
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products
}


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = getJson();
		res.render("products",{products})
		},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = req.params.id;
		const products = getJson()
		const producto = products.find(producto => producto.id == id);
		res.render("detail", {title: producto.name,producto,toThousand});
		
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const product = req.body;
		
		products.push(product);
		product.id = Date.now();
		const json = JSON.stringify(products);
		fs.writeFileSync(productsFilePath,json,"utf-8")
		res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id = req.params.id;
		const products = getJson();
		const producto = products.find(producto => producto.id == id)
		
		res.render("product-edit-form", {producto});
	},
	// Update - Method to update
	update: (req, res) => {
		const id = req.params.id;
		const{name,price,discount,category,description,image} = req.body;
		const products = getJson()
		const nuevoArrary = products.map(producto =>{
		if(producto.id == id){
			return{
				id,
				name:name.trim(),
				price,
				discount,
				category,
				description:description.trim(),
				image: image ? image : producto.image
			}
		}
		return producto
	})
	const json = JSON.stringify(nuevoArrary);
	fs.writeFileSync(productsFilePath,json,"utf-8");
	res.redirect(`/products/detail/${id}`)
},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = req.params.id;
		const leerjson = products;
		const producto = leerjson.filter( producto => producto.id != id );
		const json = JSON.stringify(producto);
    	fs.writeFileSync(productsFilePath,json,"utf-8");
		res.redirect("/products")
	}
};

module.exports = controller;