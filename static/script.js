var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider){
	$routeProvider
	.when('/customers', {
		templateUrl: '/partials/customers.html'
	})
	.when('/orders', {
		templateUrl: '/partials/orders.html'
	})
	.otherwise({
		redirectTo: '/customers'
	})
})
myApp.factory('CustFactory', function(){
	var factory = {}
	var customers = []
	var orders = []
	var products = ['Unicorn', 'Dirty Vans', 'Oolong Tea', 'Tacos']
	// var error = {}
	// console.log(error)
	factory.getCustomers = function(){
		return customers
	}
	factory.getOrders = function(){
		return orders
	}
	factory.getProducts = function(){
		return products
	}
	factory.createCustomer = function(customer){
		var date = new Date
		for(c in customers){
			if(customer == customers[c].name){
				window.alert('name already exists')
				return false
				// return error =  {message: 'name already exists'}
			}
		}
		customers.push({name: customer, createdAt: date})
	}
	factory.createOrder = function(cust, qty, prod){
		var date = new Date
		console.log(cust)
		console.log(qty)
		console.log(prod)
		orders.push({customer: cust, quantity: qty, product: prod, createdAt: date})
	}
	factory.delCustomer = function(customer){
		console.log(customer)
		customers.splice(customers.indexOf(customer), 1)
	}
	factory.getErrors = function(){
		return error
	}
	return factory
})
myApp.controller('custController', function(CustFactory){
	var self = this;
	var getCustomers = function(){
		self.customers = CustFactory.getCustomers();
	}
	
	// var getErrors = function(){
	// 	self.errors = CustFactory.getErrors()
	// }
	// getErrors();
	getCustomers();
	this.createCustomer = function(){
		CustFactory.createCustomer(this.newCustomer)
		//getCustomers()
		self.newCustomer = ''
	}
	this.delCustomer = function(customer){
		CustFactory.delCustomer(customer)
	}
})
myApp.controller('orderController', function(CustFactory){
	var self = this;
	var getOrders = function(){
		self.orders = CustFactory.getOrders();
	}
	var getProducts = function(){
		self.products = CustFactory.getProducts();
		console.log(self.products)
	}
	var getCustomers = function(){
		self.customers = CustFactory.getCustomers();
	}
	getProducts()
	getCustomers();
	getOrders();
	this.createOrder = function(){
		console.log('in create order controller')
		CustFactory.createOrder(this.thisCust, this.thisQty, this.thisProd)
		self.thisCust = ''
		self.thisQty = ''
		self.thisProd = ''
	}
})