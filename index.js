const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4}=require('uuid');
const methodoverride=require('method-override');


app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodoverride("_method"));

let posts=[
    {   id:uuidv4(),
        username:"kavya",
        content:"fashion creator",
    },
    {   
        id:uuidv4(),
        username:"kkk",
        content:"coder beti",
    },
    {
        id:uuidv4(),
        username:"ami",
        content:"chaiwala",
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/",(req,res)=> {
    res.send("server working well");
});

app.get("/posts/new",(req,res)=> {
    res.render("new.ejs");
});

app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p) => id === p.id);
    // console.log(post);
    // res.send("req working");
    res.render("show.ejs",{post});
});
app.post("/posts",(req,res)=> {
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.patch("/posts/:id", (req,res)=> {
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p) => id === p.id);
    post.content=newcontent;
    console.log(post);
    // console.log(newcontent);
    // console.log(id);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p) => id !== p.id);
     res.redirect("/posts");
});
app.listen(port,()=> {
    console.log("listening to port:8080");
});