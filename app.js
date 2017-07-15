var express=require('express')
const app=express()
var fs=require('fs')
app.use(express.static('static'))
var Datastore=require('nedb');

app.set("port",process.env.PORT||3000)


app.set('view engine', 'ejs')


app.listen(app.get('port'),function(){
	console.log('listening to port 3000')
})
app.get('/about',function(req,res){
	console.log('getting file')
	res.render('about')
})

app.get('/',function(req,res){
	res.render('home')
})

var user=new Datastore({filename:'user.db',autoload:true})
var products=new Datastore({filename:'products.db',autoload:true})
var sc=new Datastore({filename:'sc.db', autoload:true})
var newdb=new Datastore({filename:'newdb.db', autoload:true})


/*products.insert(pro,function(err,docs){
	console.log('entered')
})*/


app.get('/login',function(req,res){
	res.render('login');
})
app.get('/signup', function(req,res){
	res.render('signup')
})
app.get('/signupsubmit', function(req,res){
	var result={
		Name:req.query.name,
		Email:req.query.email,
		Username:req.query.username,
		Password:req.query.password
				}
	user.insert(result,function(err,docs){
		console.log(docs)
	});
	res.render('login')
})

app.get('/profile',function(req,res){
	res.render('profile')
})


/*
app.get('/loginsubmit',function(req,res){
	var a={
		Username:req.query.Username,
		Password:req.query.Password
	}
	user.find(a,function(err,docs){
		if(docs.length>0)
			{console.log(docs)
			res.render('profile',{res:docs})}
			else
				console.log('no access')
		})
		
})*/
var username;
app.get('/loginsubmit',function(req,res){/*

	res.send('hello '+req.query.email+" login successful "+"\\n"+req.query.password)*/

	
var result={
	Username:req.query.username,
	Password:req.query.password 
}
/*console.log(Username)*/
username=req.query.username;
user.find(result, function(err,docs)
	{ if(docs.length==0)
		{console.log('Access denied!!');
		res.send('Please login with the right username and password');}
			else

			/*{user.find({}, function(err,docs){
	if(docs.length>0)*/
		{res.render('profile',{res:docs})
		console.log(username)
		/*var obj={
			Username:result.Username,
			Product:
		}
		sc.insert(docs,function(err,docs){
			console.log(docs)
		})*/
}
})
		
	})
/*	}
	)
}
)*/
app.get('/productlist/:Product',function(req,res){
	
	var obj={
		product:req.query.product,
	}
	console.log(obj.product)
	products.find(obj, function(err,docs){
		if(docs.length>0)
			res.render('productlist',{res:docs})
		else
			res.send('cant find your product')
	})
	
})
app.get('/productlist1/:Product',function(req,res){
	
	var obj={
		product:req.query.product,
	}
	console.log(obj.product)
	products.find(obj, function(err,docs){
		if(docs.length>0)
			res.render('productlist1',{res:docs})
		else
			res.send('cant find your product')
	})
	
})

app.get('/list/:product',function(req,res){
	

	var obj={
		product:req.params.product

	}
	

products.find(obj, function(err,docs)
	{ if(docs.length==0)
		{console.log('Access denied!!');
		}
			else
			{var ins={
		Username:username,
		product:req.params.product,
		price:docs[0].price,
		photo:docs[0].photo
	}
				newdb.insert(ins,function(err,docs){
					if (docs.length>0) {
						console.log(docs)

					}
					
					
				})
			}
		/*var obj={
			Username:result.Username,
			Product:
		}
		sc.insert(docs,function(err,docs){
			console.log(docs)

		})*/
	

		})
		})



app.get('/sc/:product', function(req,res){
	var newobj={
		product:req.params.product
	}
	
	products.find(newobj,function(err,docs){
		
	res.render('product',{res:docs})

	})



})
	

app.get('/search/:product',function(req,res){
     var a=req.params.pname;
     console.log(a)
	var obj={product:a}
	products.find(obj,function(err,docs){
		res.render('productlist',{res:docs})
			console.log(docs)
	})
})
	app.get('/cart/:product1', function(req,res){
	var newobj={
		product:req.params.product
	}
	
	products.find(newobj,function(err,docs){
		
	res.render('product1',{res:docs})

	})



})
app.get('/payment',function(req,res){
	var obj={
		Username:username
	}
	sc.find(obj,function(err,docs){
		res.render('payment',{res:docs})
		console.log(docs)
	})
	
})

app.get('/shop',function(req,res){
     newdb.find({},function(err,docs){
     	res.render('shoppingcart',{res:docs})
     })
})
	

	
app.get('/logout',function(req,res){
	var ab={
		Username:username
	}
	newdb.find(ab,function(err,docs){
		sc.insert(docs)
	})
	res.render('login')
	newdb.remove({}, {multi: true}, function (err, numRemoved) {
  	newdb.loadDatabase(function (err) {
    // done
  })
})
	
})


app.get('/products',function(req,res){
	products.find({},function(err,docs){
		if(docs.length==0)
			console.log('no prod')
		else
			res.render('products',{res:docs})

	})
})

app.get('/products1',function(req,res){
	products.find({},function(err,docs){
		if(docs.length==0)
			console.log('no prod')
		else
			res.render('products1',{res:docs})

	})
})