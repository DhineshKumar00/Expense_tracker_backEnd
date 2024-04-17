const exp = require('express')
const mongoose = require('mongoose')
const bodyparse = require('body-parser')
const cors = require('cors')
const { Expense , User } = require('./schema.js')
const app = exp()
app.use(cors())
app.use(bodyparse.json())
async function connectiontoDb(){
  try{ 
    await mongoose.connect('mongodb+srv://DhineshKumar:Mahi9443@cluster0.bquinxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    
  console.log("Connection Established ;)")
  app.listen(5000, function(){
        console.log("Running port 5000...")
    })
  }
  catch(error){
    console.log(error);
    console.log("Couldn`t establish DB Connection");
  }
}
connectiontoDb()
//expence
app.post('/add-expense',async function(req,res){
   ///console.log(req.body)
    try{
    await Expense.create({
        "amount": req.body.amount,
        "category":req.body.category,
        "date":req.body.date
    })
    res.status(201).json({
        "status" : "success",
        "message" : "Entry Successfully Created"
    })
    } catch (error){
        res.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : "Connection not yet Creaated"
        })
    }
})

//User

// app.post('/add-expense',async function(req,res){
//     console.log(req.body)
//      try{
//      await User.create({
//          "amount": req.body.amount,
//          "category":req.body.category,
//          "date":req.body.date
//      })
//      res.status(201).json({
//          "status" : "success",
//          "message" : "Entry Successfully Created"
//      })
//      } catch (error){
//          res.status(500).json({
//              "status" : "failure",
//              "message" : "entry not created",
//              "error" : "Connection not yet Creaated"
//          })
//      }
//  })

app.get('/get-expense',async function(req,res){
   try{
     const expenseDetails = await Expense.find()
    res.status(200).json(expenseDetails)
    }catch(error){
        res.json({
            "status" : "failure",
            "message" : "could not fetch data",
            "error" : error
        }) 
    }
})

app.delete('/delete-expense/:id',async function(req,res){
   try{  
      await Expense.findByIdAndDelete(req.params.id) 
      res.status(200).json({
        "status" : "success",
        "message" : "Entry deleted"
      })         
}
       catch(error){
            res.status(500).json({
                "status" : "failure",
                "message" : "Not yet Deleted",
                "error" : error
            })
       }
})

app.patch('/update-expense/:id',async function(req,res){
    try{
        await Expense.findByIdAndUpdate((req.params.id),{
            "amount": req.body.amount,
            "category":req.body.category,
            "date":req.body.date
        })
        res.status(200).json({
            "status" : "success",
            "message" : "Entry Updated"
          }) 
    }
    catch(error){
         res.status(500).json({
             "status" : "failure",
             "message" : "not yet Deleted",
             "error" : error
         })
    }
})