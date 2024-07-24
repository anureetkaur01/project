var express=require("express");
var mysql2=require("mysql2");
var fileuploader=require("express-fileupload");
var nodemailer=require("nodemailer");
const bodyParser = require("body-parser");

let app=express();
app.use(fileuploader());

app.listen(2009,function(){
    console.log("Server 2009 started!");
})

app.use(express.static("public"));
app.use(express.urlencoded("true"));
app.use(bodyParser.urlencoded({ extended: true }));

/*let config={
    host:"127.0.0.1",
    user:"root",
    password:"hmuj3bse93",
            database:"project",
            dateStrings:true
    }
    */

let config={
    host:"be3ovxaynee5q5aosfxc-mysql.services.clever-cloud.com",
    user:"utyetjkhnxcegim8",
    password:"cOUmIBhsn9AcBCljzWC1",
            database:"be3ovxaynee5q5aosfxc",
            dateStrings:true,
            keepAliveInitialDelay:10000,
            enableKeepAlive:true
    }
    var mysql=mysql2.createConnection(config);
    mysql.connect(function(err){
        if(err)
            console.log(err.message);
        else console.log("Connected to database successfully...");
    
    })

app.get("/",function(reqme,respme){
    let path=__dirname+"/public/index2.html";
   respme.sendFile(path);
})
app.get("/admin-dash",function(req,resp){

let root=__dirname+"/public/admin-dash.html";
resp.sendFile(root);
     
})

app.get("/admin-users",function(req,resp){

   let path=__dirname+"/public/admin-users.html";
   resp.sendFile(path);

})
app.get("/admin-all-infl",function(req,resp){
    let path=__dirname+"/public/admin-all-infl.html";
    resp.sendFile(path);
})

app.get("/admin-all-clients",function(req,resp){

  let path=__dirname+"/public/admin-all-clients.html";
  resp.sendFile(path);

})

app.get("/infl-finder",function(req,resp){
    let root=__dirname+"/public/infl-finder.html";
    resp.sendFile(root);
})

app.get("/infl-dash",function(req,resp){
    let path=__dirname+"/public/infl-dash.html";
   resp.sendFile(path);
})

app.get("/infl-profile",function(req,resp){
    let root=__dirname+"/public/infl-profile.html";
    resp.sendFile(root);
})

app.get("/signup-process",function(req,resp){

let email=req.query.txtmail;
let pass=req.query.txtpwd;
let type=req.query.type;
let status=1;
if(email==""||pass==""||type=="")
{
    resp.send("All fields are required");
    return;
}
mysql.query("insert into user values(?,?,?,?)",[email,pass,type,status],function(err){
    if(err)
        resp.send(err.message);
    else resp.send("Data saved.Kindly proceed to login.");
})

})
app.get("/login-process",function(req,resp){
    let email=req.query.txtemail;
    let pass=req.query.txtPwd;
   /* if(email==""||pass=="")
    {
        resp.send("All fields required");
        return;
    }*/
    mysql.query("select * from user where email=? and pwd=?",[email,pass],function(err,resultarray){
        if(err)
            resp.send(err.message);
        else if(resultarray.length==0)
            resp.send(resultarray);
        else resp.send(resultarray);
    })
})

app.get("/login-fp-sendmail",function(req,resp){
    //console.log("Form data received:", req.query);
   
   let sendto=req.query.txtemail;
if(sendto=="")
{
    resp.send("Enter email id");
    return;
}
mysql.query("select pwd from user where email=?",[sendto],function(err,result){

    if(err)
    {
        resp.send(err.message);
        return;
    }
    if(result.length==0)
       { resp.send("Email id not found.<br>Kindly create account.");
    return;}

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kanureet001@gmail.com',
          pass: 'casb qqiy sggf akoo'
        }
      })
        var mailOptions = {
          from: "kanureet001@gmail.com",
          to: sendto ,
          subject: 'Password recovery',
          text:"Your password is =" + result[0].pwd , 
        }
        transporter.sendMail(mailOptions, function(error){
          if (error) {
            resp.send(error.message);
          } else 
              resp.send("Email sent!!");
          
        })
      

})
   
})
 
app.get("/client-profile",function(req,resp){

   let path=__dirname+"/public/client-profile.html";
   resp.sendFile(path);

})

app.get("/save-client-profile",function(req,resp){

if(req.query.txtemailclient==""||req.query.txtnameclient==""||req.query.txtcityclient==""||req.query.txtstateclient==""||req.query.txtorgclient==""||req.query.txtmobclient=="")
{
    resp.send("All fields are required");
    return;
}
mysql.query("insert into cprofile values(?,?,?,?,?,?)",[req.query.txtemailclient,req.query.txtnameclient,req.query.txtcityclient,req.query.txtstateclient,req.query.txtorgclient,req.query.txtmobclient],function(err,result){

  if(err)
    resp.send(err.message);
else resp.send("Data sent!");

})

})

app.get("/update-client-profile",function(req,resp){

    if(req.query.txtemailclient=="")
        {
            resp.send("Email required");
            return;
        }

    mysql.query("update cprofile set name=?,city=?,state=?,org=?,mobile=? where email=?",[req.query.txtnameclient,req.query.txtcityclient,req.query.txtstateclient,req.query.txtorgclient,req.query.txtmobclient,req.query.txtemailclient],function(err,result){

        if(err)
          resp.send(err.message);
      else resp.send("Data modified!");
      
      })


})

app.get("/search-client-profile",function(req,resp){

    if(req.query.txtemailclient=="")
        {
            resp.send("Email required");
            return;
        }

   mysql.query("select * from cprofile where email=?",[req.query.txtemailclient],function(err,resultarray){

 if(err)
    resp.send(err.message);
else{
    console.log(resultarray);
     resp.send(resultarray);
}
   })

})

app.get("/show-names-client",function(req,resp){

    mysql.query("select name from cprofile",function(err,result){

if(err)
   { resp.send(err.message);
return;}

else resp.send(result);

    })

 })

app.post("/submit-process-infl-profile",function(req,resp){

    let filename="";
    if(req.files!=null)
    {
        filename=req.files.pic.name;
        console.log(filename);
        let path=__dirname+"/public/uploads/"+filename;
        req.files.pic.mv(path);
    }
    else{
        filename="no pic";
    }
//let info=req.body.txtinfo;
/*if(req.body.txtinfo==null)
    info="No other info";
else info=req.body.txtinfo;*/
let array=req.body.field;
let str;
   
     if(Array.isArray(array))
        { str="";
    for(i=0;i<array.length;i++)
        {
            str=str+array[i]+",";
        }
        str=str.substring(0,str.length-1);
        } 
        else str=array;
       console.log(str);
mysql.query("insert into iprofile values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.txtemailinflu,req.body.txtname,req.body.gender,req.body.txtdate,req.body.txtaddress,req.body.txtcity,req.body.txtmob,str,req.body.txtinsta,req.body.txtfb,req.body.txtyt,req.body.txtinfo,filename],function(err){
    
    if(err)
        resp.send(err.message);
    else 
    {
        resp.redirect("result.html");
        //resp.redirect("/infl-profile?dataSaved=true");
    }
})

})



app.post("/update-process-infl-profile",function(req,resp){

    let filename;
    let array=req.body.field;
    let str;
       
         if(Array.isArray(array))
            { str="";
        for(i=0;i<array.length;i++)
            {
                str=str+array[i]+",";
            }
            str=str.substring(0,str.length-1);
            } 
            else str=array;
           console.log(str);
    if(req.files!=null)
        {    filename=req.files.pic.name;
            console.log(filename);
            let path=__dirname+"/public/uploads/"+filename;
            req.files.pic.mv(path);
       
            mysql.query("update iprofile set name=?,gender=?,dob=?,address=?,city=?,contact=?,fields=?,insta=?,fb=?,youtube=?,others=?,picpath=? where emailid=?",[req.body.txtname,req.body.gender,req.body.txtdate,req.body.txtaddress,req.body.txtcity,req.body.txtmob,str,req.body.txtinsta,req.body.txtfb,req.body.txtyt,req.body.txtinfo,filename,req.body.txtemailinflu],function(err,result){
                if(err)
                   { 
                     resp.send(err.message);
                     
                }
                else if(result.affectedRows>=1)
                  { console.log("updated");
                    resp.redirect("result.html");
                }
                else resp.redirect("resulterror.html");
            })
            }

            else {
                
                mysql.query("update iprofile set name=?,gender=?,dob=?,address=?,city=?,contact=?,fields=?,insta=?,fb=?,youtube=?,others=? where emailid=?",[req.body.txtname,req.body.gender,req.body.txtdate,req.body.txtaddress,req.body.txtcity,req.body.txtmob,str,req.body.txtinsta,req.body.txtfb,req.body.txtyt,req.body.txtinfo,req.body.txtemailinflu],function(err,result){
                    if(err)
                        {resp.send(err.message);
                            console.log(err.message);
                        }
                    else if(result.affectedRows>=1)
                        resp.redirect("result.html");
                    else resp.redirect("resulterror.html");
                })
             }

})

app.get("/search-infl-profile",function(req,resp){

let email=req.query.txtemailinflu;

mysql.query("select * from iprofile where emailid=?",[email],function(err,resultarray){

    if(err)
        console.log(err.message);
    else {
        console.log(resultarray);
        resp.send(resultarray);
    }
})

})


app.get("/post-bookings-infl",function(req,resp){
    let email=req.query.txtemail;
    let event=req.query.txtevent;
    let date=req.query.txtdate;
    let time=req.query.txttime;
    let city=req.query.txtcity;
    let venue=req.query.txtvenue;
    
    if(email==""||event==""||date==""||time==""||city==""||venue=="")
    {
        resp.send("All fields required");
        return;
    }

    mysql.query("insert into events values(null,?,?,?,?,?,?)",[email,event,date,time,city,venue],function(err){

        if(err)
            resp.send(err.message);
        else resp.send("Data saved!");

    })

})

app.get("/event-manager",function(req,resp){

let root=__dirname+"/public/events-manager.html";
resp.sendFile(root);

})

app.get("/fetch-events",function(req,resp){

mysql.query("select * from events where emailid=?",[req.query.user],function(err,resultarray){

   if(err)
   {
    resp.send(err.message);
    return;
   }
   else 
  
        {  console.log(resultarray);
            resp.send(resultarray);
        }
})

})

app.get("/delete-event",function(req,resp){

   mysql.query("delete from events where rid=?",[req.query.delrid],function(err){

   if(err)
   {
    resp.send(err.message);
    return;
   }
   else 
      resp.send("Event deleted");

   })

})

app.get("/update-pwd-settings",function(req,resp){

  let email=req.query.txtEmail;
  let oldpwd=req.query.txtpwdOld;
  let newpwd=req.query.txtpwdNew;
  let confirmpwd=req.query.txtpwdConfirm;

  mysql.query("select * from user where email=? and pwd=?",[email,oldpwd],function(err,resarray){

if(err)
    resp.send(err)
 if(resarray.length==0)
{ resp.send("Invalid credentials");
   return;
}
  if(newpwd!=confirmpwd)
   { resp.send("New password and confirm password must be same!")
   return;
   }
     else{

     mysql.query("update user set pwd=? where email=?",[newpwd,email],function(err){
  
        if(err)
            resp.send(err.message);
        else 
        resp.send("Password updated!");

     })

     }
  })

})
app.get("/fetch-users-all",function(req,resp){

    mysql.query("select * from user",function(err,resultarray){

if(err)
{
    resp.send(err.message);
    return;
} 
else resp.send(resultarray);

    })

})

app.get("/block-user",function(req,resp){

    mysql.query("update user set status=? where email=?",[0,req.query.email],function(err){

if(err)
{
    resp.send(err.message);
    return;
} 
else resp.send("Blocked user");

    })

})

app.get("/unblock-user",function(req,resp){

    mysql.query("update user set status=? where email=?",[1,req.query.email],function(err){

if(err)
{
    resp.send(err.message);
    return;
} 
else resp.send("Unblocked user");

    })

})

app.get("/delete-user",function(req,resp){

    if(req.query.utype==="Influencer")
    {
        mysql.query("delete from user where email=?",[req.query.emailid],function(err){

            if(err)
            {
                resp.send(err.message);
                return;
            } 
            else 
                {
                    mysql.query("delete from iprofile where emailid=?",[req.query.emailid],function(err){

                        if(err)
                        {
                            resp.send(err.message);
                            return;
                        } 
                      else {
                        mysql.query("delete from events where emailid=?",[req.query.emailid],function(err){

                            if(err)
                            {
                                resp.send(err.message);
                                return;
                            } 
                            resp.send("Influencer data deleted");
                        })
                      }
                           
                        
                            })
                }
            
                })
               
    }
    if(req.query.utype==="Collaborator")
    {
        mysql.query("delete from user where email=?",[req.query.emailid],function(err){

            if(err)
            {
                resp.send(err.message);
                return;
            } 
            else 
                {
                    mysql.query("delete from cprofile where email=?",[req.query.emailid],function(err){

                        if(err)
                        {
                            resp.send(err.message);
                            return;
                        } 
                        resp.send("Collaborator deleted");
                           
                        
                            })
                }
            
                })
    }
   
})

app.get("/fetch-infl-all",function(req,resp){

mysql.query("select * from iprofile",function(err,resultarray){

  if(err)
   { resp.send(err.message);
    return;
   }
else resp.send(resultarray); 

})

})

app.get("/fetch-clients-all",function(req,resp){

mysql.query("select * from cprofile",function(err,resultarray){

if(err)
    resp.send(err.message);
else resp.send(resultarray);

})

})

 app.get("/show-cities",function(req,resp){

  mysql.query("select distinct city from iprofile",function(err,resultarray){
  
if(err)
{
    resp.send(err.message);
    return;
}
else resp.send(resultarray);

  })

 })

 app.get("/show-cities-some",function(req,resp){

   mysql.query("select distinct city from iprofile where fields like ?",["%"+req.query.fieldselected+"%"],function(err,resultcities){

  if(err)
  {
    resp.send(err.message);
    return;
  }
  else { 
         console.log(resultcities);
         resp.send(resultcities);
  }

   })

 })
 app.get("/show-users",function(req,resp){

  /*if(req.query.cityselected=="" || req.query.fieldselected=="")
  {
    resp.send("Kindly fill all options");
    return;
  }*/

   mysql.query("select * from iprofile where fields like ? and city=?",["%"+req.query.fieldselected+"%",req.query.cityselected],function(err,resultarrayusers){

   if(err)
   {
    resp.send(err.message);
    return;
   }
   else {
    console.log(resultarrayusers);
    resp.send(resultarrayusers);
   }

   })

 })

 app.get("/show-users-by-name",function(req,resp){

   mysql.query("select * from iprofile where name like ?",["%"+req.query.usersname+"%"],function(err,resultarray){
    if(err)
    {  console.log(err.message);
        resp.send(err.message);
        return;
    }
    else { console.log(resultarray);
        resp.send(resultarray);}
   })

 })
 app.get("/show-details-by-email",function(req,resp){

    mysql.query("select * from iprofile where emailid=?",[req.query.emailreceived],function(err,resultarray){
        if(err)
        {  console.log(err.message);
            resp.send(err.message);
            return;
        }
        else { console.log(resultarray);
            resp.send(resultarray);
        }
       })

 })

 app.get("/show-names-infl",function(req,resp){

    mysql.query("select name from iprofile",function(err,result){

if(err)
   { resp.send(err.message);
return;}

else resp.send(result);

    })

 })
 app.get("/send-mail-connect-to-influ",function(req,resp){

    if(req.query.mailto=="")
    {
        resp.send("Receiver's email id required");
        return;
    }
    else if(req.query.client=="")
    {
        resp.send("Sender's email id required");
        return;
    }
    
    
      //  resp.send(req.query.client);
        var transporter3 = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'kanureet001@gmail.com',
              pass: 'casb qqiy sggf akoo'
            }
          })
            var mailOptions3 = {
              from: req.query.client,
              to: req.query.mailto ,
              subject: 'Connection request from Confluencer.com',
              text: req.query.client+", from Confluencer.com, wants to connect to you", 
            }
            transporter3.sendMail(mailOptions3, function(error){
              if (error) {
                resp.send(error.message);
              } else 
                  resp.send("Email sent!!");
              
            })
    
    })

    app.get("/show-events-infl-finder",function(req,resp){

  mysql.query("select * from events where emailid=?",[req.query.inflemail],function(err,resultarray){

if(err)
    resp.send(err.message);
else resp.send(resultarray);

  })

    })




