var weekdays = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var weekdays2 = new Array("Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat.");

var monthnames = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

var states = new Array("Alabama","Alaska","Arizona","Arkansas","California","Canada","Colorado","Connecticut","Delaware","D.C.","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Mexico","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","American Samoa","Guam","Puerto Rico","Virgin Islands");


var foods_veryhigh = new Array("Arugula","Bok Choy","Spinach","Lettuce","Swiss Chard","Celery");
var foods_high = new Array("Beetroots","Chinese cabbage","Radish","Endive","Mustard leaf","Fennel");
var foods_medium = new Array("Turnips","Green Beans","Cabbage","Leeks","Kale");
var foods_low = new Array("Carrots","Broccoli","Cucumber","Cauliflower","Potato");
var foods_verylow = new Array("Onions","Garlic","Tomato","Asparagus","Brussels sprouts","Peas","Pepper");


var currentTime = new Date();
var newtime = new Date();
var currentcell;

function sign_in(){
    $("ul.nicebox li:nth-child(3)").show();
    $("#navbartitle").html("Sign in");
    $("#login_button").show();
    $("#password_button").show();
    $("#newuser_button").show();
    $("#olduser_button").hide();
    $("#register_button").hide();
    $("#login_response").html("<br>");
    $("#input_user").val("");
    $("#input_password").val("");
    jQT.goTo('#login_page','slideup');
    //appML.refreshIscroll("login_page",$(".nicebox").height());
}

function sign_up(){
    $("ul.nicebox li:nth-child(3)").hide();    
    $("#navbartitle").html("Register");
    $("#login_button").hide();
    $("#register_button").show();
    $("#password_button").hide();
    $("#newuser_button").hide();
    $("#olduser_button").show();
    $("#login_response").html("<br>");
    $("#input_user").val("");
    $("#input_password").val("");
    jQT.goTo('#login_page','slideup');
    //appML.refreshIscroll("login_page",650);
}

function sign_off(){
    user_data=[];
    localStorage.removeItem('user_data');
    access_token="";
    document.getElementById("r_email").value ="";
    document.getElementById("r_password").value="";
    setTimeout(function(){
    $("#appML_navigation_bar").hide();
    $("#appML_top").hide();
               },500);
    landing();
}




function onPubFacebookBtn() {
	var fb = FBConnect.install();
    fb.connect(client_id,redir_url,"touch");
    fb.onConnect = saveUserInfo;
}




function activate_reminders(){

    var n0 = new Date();
    var n1 = Date.today().set({hour: 11, minute: 0 });
    var n2 = Date.today().set({hour: 21, minute: 0 });
    var n3 = new Date().add(3).day();
    console.log(n0);
    console.log(n1);
    console.log(n2);
    
    if(n0>n1){
        var n1 = Date.today().add(1).day().set({hour: 11, minute: 0 });
    }
    if(n0>n2){
        var n2 = Date.today().add(1).day().set({hour: 21, minute: 0 });
    }

        
    window.plugins.localNotification.add({
                                         date: n1, // 11am
                                         message: 'What is your Nitric Oxide level?',
                                         id: '1',
                                         repeat: 'daily',
                                         badge: 1,
                                         foreground:'',
                                         background:'notification1callback',
                                         sound:'sub.caf'
                                         });

    window.plugins.localNotification.add({
                                         date: n2, // 9pm
                                         message: 'What is your Nitric Oxide level?',
                                         id: '2',
                                         repeat: 'daily', 
                                         badge: 1,
                                         foreground:'',
                                         background:'notification1callback',
                                         sound:'sub.caf'
                                         });
        
    
    window.plugins.localNotification.add({
                                         date: n3,
                                         message: 'It has been 3 days since your last Berkeley Test',
                                         id: '3',
                                         repeat: '',
                                         badge: 1,
                                         foreground:'',
                                         background:'notification2callback',
                                         sound:'sub.caf'
                                         });
    
    
}



function deactivate_reminders(){
    window.plugins.localNotification.cancelAll();
}



function saveUserInfo(){
    console.log("saveUserInfo for fb token: "+access_token);
    $.ajax({
           type: 'GET',
           url: "https://graph.facebook.com/me?access_token="+access_token,
           cache: false,
           data: null,
           success: function (data) {
           data = eval(data);
           console.log(data);
           document.getElementById("user_id").value = data.id;
           //document.getElementById("user_firstname").value = data.first_name;
           //document.getElementById("user_lastname").value = data.last_name;
           document.getElementById("user_email").value = data.email;
           //document.getElementById("userPictureSrc").value = "http://graph.facebook.com/"+data.id+"/picture";
           //document.getElementById("userPicture").src = "http://graph.facebook.com/"+data.id+"/picture";
           
           var cachekiller = new Date();
           $.ajax({
                  type: 'POST',
                  url: "http://www.budgetappdev.com/apps/berkeleytest/account.php?cachekiller="+cachekiller,
                  async: true,
                  data: {
                  user_id : data.id,
                  user_email : document.getElementById("user_email").value,
                  //user_firstname : document.getElementById("user_firstname").value,
                  //user_lastname : document.getElementById("user_lastname").value,
                  access_token : access_token,
                  action:"check"
                  },
                  success: function (data) {
                  console.log("profile data= "+data);
                  
                  if(data=="fb problem"){
                  console.log("problem retrieving profile data after fb login");
                  }else{
                  user_data = data;
                  localStorage.setItem("user_data",JSON.stringify(user_data));
                  user_id = user_data[0];
                  jQT.goTo('#mynoxy_page');
                  landing();
                  }
                   
                  },
                  error: function (xhr, err1, err2) {navigator.notification.alert("An error has occurred. Possibly a network failure. Please try again (later).", null, "OOPS!");},//if(err2.search(/Duplicate/i)){navigator.notification.alert("If you are the owner of this account please go back to the home page and SIGN IN.", null, "This account already exists.")}
                  dataType: "json",
                  timeout: 10000
                  });
           },
           error: function (xhr, err1, err2) {navigator.notification.alert("An error has occurred. Possibly a network failure. Please try again (later).", null, "OOPS!");
           },
           dataType: "json",
           timeout: 10000
           });

}





function login() {
    var cachekiller = new Date();
    $.ajax({
           type: 'POST',
           url: "http://www.budgetappdev.com/apps/berkeleytest/account.php?cachekiller="+cachekiller,
           async: false,
           data: {
           user_email: document.getElementById("r_email").value,
           user_password: document.getElementById("r_password").value,
           action:"login"
           },
           success: function (data) {
           console.log("data="+data);
           if(data==0){
           document.getElementById("login_response").innerHTML = "Sorry, we could not identify you.";
           }else{
           user_data = data;
           console.log(data);
           localStorage.setItem("user_data",JSON.stringify(user_data));
           user_id = user_data[0];
           document.getElementById("userPictureSrc").src = "http://graph.facebook.com/"+user_data[0]+"/picture";
           document.getElementById("user_email").value = user_data[1];
           document.getElementById("user_password").value = user_data[2];
           //document.getElementById("user_firstname").value = user_data[3];
           //document.getElementById("user_lastname").value = user_data[4];
           document.getElementById("user_sex").value = user_data[5];
           document.getElementById("user_age").value = user_data[6];
           document.getElementById("user_weight").value = user_data[7];
           document.getElementById("user_hypertensive").value = user_data[8];
           document.getElementById("user_activity").value = user_data[9];
           //document.getElementById("user_address").value = user_data[10];
           //document.getElementById("user_city").value = user_data[11];
           //document.getElementById("user_zip").value = user_data[12];
           //document.getElementById("user_state").value = user_data[13];
           //document.getElementById("user_country").value = user_data[14];
           document.getElementById("login_response").innerHTML = "Welcome back";
           
           setTimeout(function(){jQT.goTo('#mynoxy_page');landing()},1000);
           }
           },
           error: function (xhr, err1, err2) {navigator.notification.alert("An error has occurred. Possibly a network failure. Please try again (later).", null, "OOPS!");},
           dataType: "json",
           timeout: 10000
           });
}


function register() {

    user_email = document.getElementById("r_email").value;
    user_password = document.getElementById("r_password").value;
    
    if(user_email=="" || user_password==""){
        document.getElementById("login_response").innerHTML = "Please fill every field.";
    }else{
        var cachekiller = new Date();
        $.ajax({
               type: 'POST',
               url: "http://www.budgetappdev.com/apps/berkeleytest/account.php?cachekiller="+cachekiller,
               async: true,
               data: {
               //user_id : user_data[0],
               user_email : document.getElementById("r_email").value,
               user_password : document.getElementById("r_password").value,
               action:"register"
               },
               success: function (data) {
                    console.log("data="+data);
                    if(data==-1){
                        document.getElementById("login_response").innerHTML = "Sorry, we could not register you.<br>Please contact us.";
                    }else{
                        user_data = data;
                        localStorage.setItem("user_data",JSON.stringify(user_data));
                        user_id = user_data[0];
                        jQT.goTo('#mynoxy_page');
                        landing();
                    }
               },
               error: function (xhr, err1, err2) {if(err2.search(/Duplicate/i)){navigator.notification.alert("If you are the owner of this account please go back to the home page and SIGN IN.", null, "This account already exists.")}},
               dataType: "json",
               timeout: 10000
               });
    }
}




function send_password() {
    if(document.getElementById("email_for_password").value==""){
        document.getElementById("password_response").innerHTML = "Please enter your user e-mail.";
    }else{
        var cachekiller = new Date();
        $.ajax({
               type: 'POST',
               url: "http://www.budgetappdev.com/apps/berkeleytest/password.php?cachekiller="+cachekiller,
               async: false,
               data: {
               officer_email: document.getElementById("email_for_password").value,
               action:"send"
               },
               success: function (data) {
               console.log("data="+data);
               if(data==0){
               document.getElementById("password_response").innerHTML = "Sorry, this user e-mail is not registered.";
               }else{
               document.getElementById("password_response").innerHTML = "Your password has been sent.<br>Please check your mailbox.";
               setTimeout(function(){jQT.goBack()},1000);
               }
               },
               error: function (xhr, err1, err2) {navigator.notification.alert("An error has occurred. Possibly a network failure. Please try again (later).", null, "OOPS!");},
               dataType: "json",
               timeout: 10000
               });
    }
}



function update_account() {
        console.log("update_account for "+user_data[0]);
    var cachekiller = new Date();
        $.ajax({
               type: 'POST',
               url: "http://www.budgetappdev.com/apps/berkeleytest/account.php?cachekiller="+cachekiller,
               async: true,
               data: {
               user_id : user_data[0],
               user_email : $("#user_email").val(),
               user_password : $("#user_password").val(),
               //user_firstname : $("#user_firstname").val(),
               //user_lastname : $("#user_lastname").val(),
               user_sex : $("#user_sex").val(),
               user_age : $("#user_age").val(),
               user_weight : $("#user_weight").val(),
               user_hypertensive : $("#user_hypertensive").val(),
               user_activity : $("#user_activity").val(),
               //user_address : $("#user_address").val(),
               //user_city : $("#user_city").val(),
               //user_zip : $("#user_zip").val(),
               //user_state : $("#user_state").val(),
               //user_country : $("#user_country").val(),
               action:"update"
               },
               success: function (data) {
               console.log("data="+data);
               if(data==-1){
               navigator.notification.alert("Sorry, we could not update your personal data.<br>Please check your network connection.", null, "OOPS!")
               }else{
               user_data = eval(data);
               localStorage.setItem("user_data",JSON.stringify(user_data));
               user_id = user_data[0];
               navigator.notification.alert("Your personal data was successfully updated.", null, "Saved")
               }
               },
               error: function (xhr, err1, err2) {navigator.notification.alert("An error has occurred. Possibly a network failure. Please try again (later).", null, "OOPS!");},//if(err2.search(/Duplicate/i)){navigator.notification.alert("If you are the owner of this account please go back to the home page and SIGN IN.", null, "This account already                dataType: "json",
               timeout: 10000
               });
    
}







function load_measurements() {
    console.log("load_measurements of user "+user_data[0]);
    db.transaction(function (tx) {
                   tx.executeSql('DROP TABLE IF EXISTS log');
                   });
    
    db.transaction(function (tx) {
                   tx.executeSql('CREATE TABLE IF NOT EXISTS log (recording_id INTEGER PRIMARY KEY, DOM DATE, TOM TIME, NO_value INTEGER, TSM TIME, LOF BLOB, TSE INTEGER, DOE INTEGER, LOE BLOB)');
                   });
 
    var cachekiller = new Date();
    $.ajax({
           type: 'POST',
           url: "http://www.budgetappdev.com/apps/berkeleytest/recordings.php?cachekiller="+cachekiller,
           async: true,
           data: {
           user_id : user_data[0],
           action:"list"
           },
           success: function (data) {
           measurements = eval(data);
           //console.log("measurements:"+measurements);
           db.transaction(function (tx) 
                          {
                          console.log("measurements.length "+measurements.length);
           for(i=0;i<measurements.length;i++){ 
                tx.executeSql("INSERT INTO log (recording_id,DOM,TOM,NO_value,TSM,LOF,TSE,DOE,LOE) VALUES (?,?,?,?,?,?,?,?,?)",[measurements[i][0],measurements[i][1],measurements[i][2],measurements[i][3],measurements[i][4],measurements[i][5],measurements[i][6],measurements[i][7],measurements[i][8]],function(tx,res) {
                         }, function(e) {
                         return console.log("ERROR: " + e.message);
                         });           
           }
                          });
           currentTime = new Date();
           list_measurements(0);
           },
           error: function (xhr, err1, err2) {navigator.notification.alert("An error has occurred. Possibly a network failure. Please try again (later).", null, "OOPS!");},
           dataType: "json",
           timeout: 10000
           });
}





function stat_point(xOffset,yOffset,size,color,totalNO,measurements,records,thisdot){
    
    $("#stats_overlay").cssFadeTo(500,0.6);
    //$(".stat_points").not(thisdot).cssFadeTo(500,0.2);
    //$(thisdot).cssFadeTo(500,1);
    
    
    if(xOffset==1){time="half an hour"}else
    if(xOffset==2){time="one hour"}else
    if(xOffset==3){time="one and a half hours"}else
    if(xOffset==4){time="two hours"}else
    if(xOffset==5){time="two and a half hours"}else
    if(xOffset==6){time="three hours"}else
    if(xOffset==7){time="three and a half hours"}else
    if(xOffset==8){time="four hours"}else
    {time="n/a"}
    
    if(totalNO>=16){richness="very rich"}else
    if(totalNO>=12){richness="rich"}else
    if(totalNO>=4){richness="moderately rich"}else
    if(totalNO>=2){richness="poor"}else
    {richness="very poor"}
    
    if(size>=5){quantities="very large"}else
    if(size>=4){quantities="large"}else
    if(size>=3){quantities="moderate"}else
    if(size>=2){quantities="small"}else
    {quantities="very small"}
    
    if(color==color_depleted){NOvalue="depleted";}else
    if(color==color_low){NOvalue="low";}else
    if(color==color_threshold){NOvalue="threshold";}else
    if(color==color_ontarget){NOvalue="target";}else
    if(color==color_high){NOvalue="high";}else
    {NOvalue="n/a/";}
    

    measurements_text=measurements+" measurements";
    if(measurements==1){
        measurements_text="1 measurement";
    }
    
    //$("#stats_alert").html("Approximately <b>"+time+"</b> after a meal of <b>"+size+" cups</b> of <b>"+richness+"</b> NO food, your NO levels tend to reach <b>"+NOvalue+"</b> levels.");
    var stats_text = 'Approximately <b>'+time+'</b> after meals including <b>'+quantities+' quantities</b> of foods with <b>'+richness+'</b> NO potential, your NO levels tend to reach <b>'+NOvalue+'</b> levels.<br>(Based on '+measurements_text+'.)';
    $("#stats_alert_text").html("<div style='font-family: AvenirNext-UltraLight; font-size:30px;'>STATUS</div>"+stats_text+"<div class='blueButton' style='position:absolute; left:28px; bottom:5px; width:150px' ontouchstart='if(!allowClick) return false; list_stats_measurements(\""+records+"\",\""+stats_text+"\")'>see details</div>");
    
    $("#stats_alert").cssFadeTo(500,1);
    console.log(xOffset+" "+yOffset+" "+size+" "+color+" "+totalNO+" "+records);
}







function plot_stat_point(xOffset,yOffset,size,color,totalNO,measurements,records){
    template = "<div ontouchstart='stat_point(\"xOffset\",\"yOffset\",\"size\",\"THISCOLOR\",\"totalNO\",\"measurements\",\"records\",this); preventGhostClick();' style='display:block; border:2px solid white;border-radius:40px; position:absolute; left:THISLEFTpx; top:THISTOPpx; width:THISWIDTHpx; height:THISHEIGHTpx; background:THISCOLOR'><span style='display:inline-block;line-height:THISHEIGHTpx; color:white; font-size:12px; font-weight:bold; text-shadow:0px 0px 3px black'>measurements</span></div>";
    thiswidth  = eval(10+size*7);
    thisheight = eval(10+size*7);
    thisleft   = -34+eval(xOffset*34-(thiswidth/2));
    thistop    = -12+4+eval(yOffset*12-(thisheight/2));
    thiscolor  = color;
    
    
    $("#stats_graph").append(template.replace(/THISLEFT/g,thisleft).replace(/THISTOP/g,thistop).replace(/THISWIDTH/g,thiswidth).replace(/THISHEIGHT/g,thisheight).replace(/THISCOLOR/g,thiscolor).replace(/xOffset/,xOffset).replace(/yOffset/,yOffset).replace(/size/,size).replace(/totalNO/,totalNO).replace(/measurements/g,measurements).replace(/records/g,records));
}




/*


function load_stats2(from,to) {
    console.log("load_measurements of user "+user_data[0]+" from "+from+" to "+to);
    $("#stats_graph").html("");
    if(from != "" && to != ""){
    
    

    var cachekiller = new Date();
    $.ajax({
           type: 'POST',
           url: "http://www.budgetappdev.com/apps/berkeleytest/stats.php?cachekiller="+cachekiller,
           async: true,
           data: {
           user_id : user_data[0],
           from:from,
           to:to
           },
           success: function (data) {
           statistics = eval(data);
           console.log("statistics:"+statistics);
           db.transaction(function (tx)
                          {
                          console.log("statistics "+statistics.length);
                          for(i=0;i<statistics.length;i++){
                          tx.executeSql("INSERT INTO stats (HOUR,LOF,NO) VALUES (?,?,?)",[statistics[i][0],statistics[i][1],statistics[i][2]],function(tx,res) {
                                        }, function(e) {
                                        return console.log("ERROR: " + e.message);
                                        });
                          
                          
                          //plot stats
                          if(statistics[i][0]=="0:30"){xOffset=1;}else
                          if(statistics[i][0]=="1:00"){xOffset=2;}else
                          if(statistics[i][0]=="1:30"){xOffset=3;}else
                          if(statistics[i][0]=="2:00"){xOffset=4;}else
                          if(statistics[i][0]=="2:30"){xOffset=5;}else
                          if(statistics[i][0]=="3:00"){xOffset=6;}else
                          if(statistics[i][0]=="3:30"){xOffset=7;}else
                          if(statistics[i][0]=="4:00"){xOffset=8;}else
                          {xOffset=0;}
                        
                          meal = eval(statistics[i][1]);
                          totalNO=0;
                          NO=0;
                          totalsize=0;
                          size=0;
                          for(f=0;f<meal.length;f++){
                            dish = meal[f];
                            food = dish[0];
                            serv = dish[1];
                            
                            if(foods_veryhigh.indexOf(food)>=0){NO=4}else
                            if(foods_high.indexOf(food)>=0){NO=3}else
                            if(foods_medium.indexOf(food)>=0){NO=1}else
                            if(foods_low.indexOf(food)>=0){NO=0.5}else
                            if(foods_verylow.indexOf(food)>=0){NO=0.25}
                          
                            if(serv=="<2 cups"){size=1;multiplier=0.5}else
                            if(serv=="2 cups"){size=2;multiplier=1}else
                            if(serv==">2 cups"){size=3;multiplier=2}
                          
                            console.log("dish: "+food+' '+serv+" "+NO+" "+NO*multiplier);
                            totalNO+=NO*multiplier;
                            totalsize+=size;
                          }
                          //totalNO = 18;
                          yOffset = 18-totalNO;
               
                          console.log("meal: "+xOffset+" "+totalNO+" "+totalsize);
                          
                          if(statistics[i][2]=="1.0000"){color=color_depleted;}else
                          if(statistics[i][2]=="5.0000"){color=color_low;}else
                          if(statistics[i][2]=="10.0000"){color=color_threshold;}else
                          if(statistics[i][2]=="20.0000"){color=color_ontarget;}else
                          if(statistics[i][2]=="40.0000"){color=color_high;}else
                          {NOvalue="#000000";}
                          
                          if(xOffset!=0 && yOffset!=0 && size!=0){
                          plot_stat_point(xOffset,yOffset,totalsize,color,totalNO);
                          }
                          
                          }
                          });
           plot_stats();
           },
           error: function (xhr, err1, err2) {navigator.notification.alert(err2, null, "oops!")},
           dataType: "json",
           timeout: 10000
           });
        
    }
}

*/



function reload_stats(){
    var selectedoption = $("#stats_period").find(":selected").text();
    
    if(selectedoption == "period"){
        $("#stats_from").attr('disabled','');
        $("#stats_to").attr('disabled','');
        load_stats($("#stats_from").val(),$("#stats_to").val());
    }else{
        $("#stats_from").attr('disabled','disabled');
        $("#stats_to").attr('disabled','disabled');
        
        if(selectedoption == "all time"){
            load_stats("2012-12-12","2111-11-11");
        }else if(selectedoption == "this week"){
            load_stats(Date.monday().toString('yyyy-MM-dd'),Date.next().sunday().toString('yyyy-MM-dd'));
        }else if(selectedoption == "this month"){
            load_stats(Date.today().moveToFirstDayOfMonth().toString('yyyy-MM-dd'),Date.today().moveToLastDayOfMonth().toString('yyyy-MM-dd'));
        }else if(selectedoption == "last week"){
            load_stats(Date.monday().addWeeks(-1).toString('yyyy-MM-dd'),Date.next().sunday().addWeeks(-1).toString('yyyy-MM-dd'));
        }else if(selectedoption == "last month"){
            load_stats(Date.today().addMonths(-1).moveToFirstDayOfMonth().toString('yyyy-MM-dd'),Date.today().addMonths(-1).moveToLastDayOfMonth().toString('yyyy-MM-dd'));
        }
        
    }
    
    console.log(from);
    console.log(to);
};



function load_stats(from,to) {
    console.log("load stats from "+from+" to "+to);
    
    $("#stats_graph").html("");
    
    db.transaction(function (tx) {
                   tx.executeSql('DROP TABLE IF EXISTS stats');
                   });
    
    db.transaction(function (tx) {
                   tx.executeSql('CREATE TABLE IF NOT EXISTS stats (recording_id INTEGER,TSM INTEGER,MVA FLOAT,MPO TEXT,TMS INTEGER,NO INTEGER)');
                   });
    
    db.transaction(function (tx) {
                tx.executeSql("SELECT * from log WHERE DOM >= ? AND DOM <= ?",[from,to], function (tx,results) {
                             var listItems = [];
                             var template = "<li id='ID' onclick='if(!allowClick) return false; edit_measurement(ID); preventGhostClick();'><div class='measurement_color' style='background:BGCOLOR;'><img src='img/chevron.png' class='measurement_arrow'></div></div><div align='left' class='measurement_value'>MEASUREMENTVALUE</div><div class='measurement_data'><span style='opacity:SHOWMEAL'><img src='img/icons@x2_EAT.png' height='16' style='padding-right:5px'>TSM</span><span><img src='img/icons@x2_TIME.png' width='16' style='padding-right:5px'>TOM</span></div></li>";
                             
                             if(results.rows.length==0){
                             $("#list_of_measurements").html("<div align='center'><br><br><br><br><br><br><br><br>NO RECORDINGS FOR THIS DATE</div>");
                             }else{
                              
                             var stats_array = [];
                             for(r=0;r<results.rows.length;r++){
                             
                             recording_id = results.rows.item(r).recording_id;
                             NO_value = results.rows.item(r).NO_value;
                             LOF = JSON.parse(results.rows.item(r).LOF);
                             DOM = results.rows.item(r).DOM;
                             TOM = results.rows.item(r).TOM;
                             TSM = results.rows.item(r).TSM;
                              

                              function parseTime(s) {
                              var c = s.split(':');
                              return parseInt(c[0]) * 60 + parseInt(c[1]);
                              }
                              
                              
                              console.log("");
                              console.log(r +" "+NO_value+" "+DOM+" "+TOM+" "+TSM+" "+LOF);
                              MSM = parseTime(TOM)-parseTime(TSM);
                              MSM2= Math.ceil(MSM / 30) * 30;
                              MSM3= Math.floor(MSM / 30) * 30;
                              MSM4 = ((MSM2-MSM)>(MSM-MSM3))?MSM3:MSM2;
                              console.log(MSM+" "+MSM2+" "+MSM3+" "+MSM4);
                           
                              
                              
                              totalNO=0;
                              NO=0;
                              totalsize=0;
                              size=0;
                              for(f=0;f<LOF.length;f++){
                              dish = LOF[f];
                              food = dish[0];
                              serv = dish[1];
                              

                              
                              if(foods_veryhigh.indexOf(food)>=0){NO=4}else
                              if(foods_high.indexOf(food)>=0){NO=3}else
                              if(foods_medium.indexOf(food)>=0){NO=1}else
                              if(foods_low.indexOf(food)>=0){NO=0.5}else
                              if(foods_verylow.indexOf(food)>=0){NO=0.25}
                              
                              if(serv=="<2 cups"){size=1;multiplier=0.5}else
                              if(serv=="2 cups"){size=2;multiplier=1}else
                              if(serv==">2 cups"){size=3;multiplier=2}
                              
                              console.log("dish: "+food+' '+serv+" "+NO+" "+NO*multiplier);
                              totalNO+=NO*multiplier;
                              totalsize+=size;
                              
                              if(NO*multiplier>=16){meal_potency="VH"}else
                              if(NO*multiplier>=12){meal_potency="H"}else
                              if(NO*multiplier>=4){meal_potency="M"}else
                              if(NO*multiplier>=2){meal_potency="L"}else
                              if(NO*multiplier>=0){meal_potency="VL"}
                              
                              
                              }
                              console.log("meal value: "+totalNO);
                              console.log("minutes: "+MSM4);
                              console.log("totalsize: "+totalsize);
                          
                              
                              

                              

                              
                              //stats_array.push(new Array(recording_id,DOM,TOM,TOM,MSM4,NO_value,LOF,totalNO,totalsize,xOffset,yOffset,color,meal_potency));
                               
                                             tx.executeSql("INSERT INTO stats (recording_id,TSM,MVA,MPO,TMS,NO) VALUES (?,?,?,?,?,?)",[recording_id,MSM4,totalNO,meal_potency,totalsize,NO_value],function(tx,res) {
                                                           }, function(e) {
                                                           return console.log("ERROR: " + e.message);
                                                           });
                                          
                                                        
                             }
                        
                                             tx.executeSql("SELECT *, AVG(MVA) AS aMVA, AVG(TMS) AS aTMS, AVG(NO) AS aNO, COUNT(recording_id) AS measurements, GROUP_CONCAT(recording_id) AS records from stats GROUP BY TSM,MPO",[], function (tx,results) {
                                                           console.log(results.rows.length);
                                                           for(r=0;r<results.rows.length;r++){
                                                                measurements = results.rows.item(r).measurements;
                                                                TSM = results.rows.item(r).TSM;
                                                                aMVA = results.rows.item(r).aMVA;
                                                                MPO = results.rows.item(r).MPO;
                                                                aTMS = results.rows.item(r).aTMS;
                                                                aNO = results.rows.item(r).aNO;
                                                                records = results.rows.item(r).records;
                                                        
                                                           if(TSM==30){xOffset=1;}else
                                                           if(TSM==60){xOffset=2;}else
                                                           if(TSM==90){xOffset=3;}else
                                                           if(TSM==120){xOffset=4;}else
                                                           if(TSM==150){xOffset=5;}else
                                                           if(TSM==180){xOffset=6;}else
                                                           if(TSM==210){xOffset=7;}else
                                                           if(TSM==240){xOffset=8;}else
                                                           {xOffset=0;}
                                                           
                                                           yOffset = 18-aMVA;
                                                           
                                                         
                                                           if(aNO>=30){color=color_high;}else
                                                           if(aNO>=15){color=color_ontarget;}else
                                                           if(aNO>=7.5){color=color_threshold;}else
                                                           if(aNO>=2.5){color=color_low;}else
                                                           {color=color_depleted;}
                                                           
                                                           
                                                           //function plot_stat_point(xOffset,yOffset,size,color,totalNO){
                                                                if(xOffset>0 && yOffset>0 && aTMS>0)
                                                                plot_stat_point(xOffset,yOffset,aTMS,color,aMVA,measurements,records);
                                                                console.log(r+" "+TSM+" "+aMVA+" "+aTMS+" "+aNO+" "+measurements+" / "+records);
                                                           }
                                                           });
                          
                             /*
                      
                              stats_array.sort(function(a,b){
                                               return a[4] - b[4];
                                               });
                                               
                              for(s=0;s<stats_array.length;s++){
                                if(stats_array[s][9]!=0 && stats_array[s][10]!=0 && stats_array[s][8]!=0){
                                    plot_stat_point(stats_array[s][9],stats_array[s][10],stats_array[s][8],stats_array[s][11],stats_array[s][7]);
                              console.log("TSM:"+stats_array[s][4]+"  MVA:"+stats_array[s][7]+" ("+stats_array[s][12]+")  NO:"+stats_array[s][5]);
                                }else{
                                    //console.log(stats_array[s]);
                                }
                              }
                            */


                             
                             }
                             
                             }, null);
               });
}








function list_stats_measurements(records_list,stats_text) {
    
    jQT.goTo("#panel2");
    $("#mylog_picker").hide();
    $("#mylog_stats").show();
    console.log("records_list:"+records_list);
    db.transaction(function (tx) {
                   tx.executeSql("SELECT * from log WHERE recording_id IN ("+records_list+")",[], function (tx,results) {
                                 
                                 var listItems = [];
                                 var template = "<li id='ID' onclick='if(!allowClick) return false; edit_measurement(ID); preventGhostClick();'><div class='measurement_color' style='background:BGCOLOR;'><img src='img/chevron.png' class='measurement_arrow'></div></div><div align='left' class='measurement_value'>MEASUREMENTVALUE</div><div class='measurement_data'><span style='opacity:SHOWMEAL'><img src='img/icons@x2_EAT.png' height='16' style='padding-right:5px'><span>TSM</span></span><span><img src='img/icons@x2_TIME.png' width='16' style='padding-right:5px'><span>TOM</span></span></div></li>";
                                 console.log("ok so far");
                                 console.log(results.rows.length);
                                 
                                 if(results.rows.length==0){
                                 $("#list_of_measurements").html("<div align='center'><br><br><br><br><br><br><br><br>NO RECORDINGS FOR THIS DATE</div>");
                                 }else{
                                 for(r=0;r<results.rows.length;r++){
                                 
                                 NO_value = results.rows.item(r).NO_value;
                                 bg_color="";
                                 NO_level="";
                                 
                                 switch (NO_value){
                                 case 1:
                                 bg_color=color_depleted;
                                 NO_level="DEPLETED";
                                 break;
                                 
                                 case 5:
                                 bg_color=color_low;
                                 NO_level="LOW";
                                 break;
                                 
                                 case 10:
                                 bg_color=color_threshold;
                                 NO_level="AT THRESHOLD";
                                 break;
                                 
                                 case 20:
                                 bg_color=color_ontarget;
                                 NO_level="ON TARGET";
                                 break;
                                 
                                 case 40:
                                 bg_color=color_high;
                                 NO_level="HIGH";
                                 break;
                                 }
                                 
                                 
                                 if(results.rows.item(r).LOF.length>4){
                                 showmeal = 1;
                                 }else{
                                 showmeal = 0;
                                 }
                                 
                                 showexercise = 0;
                                 console.log(showmeal+" %% "+showexercise);
                                 
                                 listItems.push(template.replace(/ID/g,results.rows.item(r).recording_id).replace(/TOM/g,toAMPM(results.rows.item(r).TOM)).replace(/TSM/g,toAMPM(results.rows.item(r).TSM)).replace(/MEASUREMENTVALUE/g,NO_level).replace(/TSM/g,results.rows.item(r).TSM).replace(/SHOWMEAL/g,showmeal).replace(/SHOWEXERCISE/g,showexercise).replace(/DOE/g,results.rows.item(r).DOE).replace(/LOE/g,results.rows.item(r).LOE).replace(/BGCOLOR/g,bg_color));
                                 }
                                 
                                 
                                 document.getElementById("list_of_measurements").innerHTML = listItems.join("");
                                 //appML.refreshIscroll("mylog_scrollable",$("#list_of_measurements").height()+10);
                                 }
                                 
                                 }, null);
                   });
    
}











function list_measurements(offset) {
    
    console.log("list_measurements offset="+offset);
    
    if(offset=="0"||offset=="1"||offset=="-1"){
        daysoffset += offset;
        
        if(targetday!=0){
            targetday = targetday.add(offset).days();
        }else{
            targetday = Date.today().add(daysoffset).days();
        }
    }else if (offset!="-"){
        targetday = Date.parse(offset);
    }
    
    currentcell = targetday.toString('yyyyMMdd');
    
    console.log(Date.today());
    console.log(targetday);
    console.log(currentcell);
/*
    
    if(targetday.equals(Date.today())) {
        $("#mylog_picker span:nth-child(3)").unbind();
    }else if(targetday.isAfter(Date.today())){
        $("#mylog_picker span:nth-child(3)").unbind();
        console.log("we do not travel to the future!");
        return;
    }else{
        $("#mylog_picker span:nth-child(3)").show().bind("touchstart",function(){
                                                        if(!allowClick) return false;
                                                        list_measurements(1);
                                                        preventGhostClick();
                                                        }); ;
    }
 */
    
    
    $("#mylog_picker span:nth-child(2)").html(targetday.toString('dddd, MMMM d'));
    
    newtime3 = targetday.toString('yyyy-MM-dd');
    console.log("newtime3:"+newtime3);
    
    db.transaction(function (tx) {
                     tx.executeSql("SELECT * from log WHERE DOM=? ORDER BY TOM ASC",[newtime3], function (tx,results) {

                   var listItems = [];
                        var template = "<li id='ID' onclick='if(!allowClick) return false; edit_measurement(ID); preventGhostClick();'><div class='measurement_color' style='background:BGCOLOR;'><img src='img/chevron.png' class='measurement_arrow'></div></div><div align='left' class='measurement_value'>MEASUREMENTVALUE</div><div class='measurement_data'><span style='opacity:SHOWMEAL'><img src='img/icons@x2_EAT.png' height='16' style='padding-right:1px'><span>TSM</span></span><span><img src='img/icons@x2_TIME.png' width='16' style='padding-right:1px'><span>TOM</span></span></div></li>";
                                 
                        if(results.rows.length==0){
                            $("#list_of_measurements").html("<div align='center'><br><br><br><br><br><br><br><br>NO RECORDINGS FOR THIS DATE</div>");     
                        }else{
                            for(r=0;r<results.rows.length;r++){
                                 
                                NO_value = results.rows.item(r).NO_value;
                                bg_color="";
                                NO_level="";
                                 
                                switch (NO_value){
                                 case 1:
                                 bg_color=color_depleted;
                                 NO_level="DEPLETED";
                                 break;
                                 
                                 case 5:
                                 bg_color=color_low;
                                 NO_level="LOW";
                                 break;
                                 
                                 case 10:
                                 bg_color=color_threshold;
                                 NO_level="AT THRESHOLD";
                                 break;
                                 
                                 case 20:
                                 bg_color=color_ontarget;
                                 NO_level="ON TARGET";
                                 break;
                                 
                                 case 40:
                                 bg_color=color_high;
                                 NO_level="HIGH";
                                 break;
                                }
                                 
       
                                 if(results.rows.item(r).LOF.length>4){
                                    showmeal = 1;
                                 }else{
                                    showmeal = 0;
                                 }

                                 showexercise = 0;
                                 console.log(showmeal+" %% "+showexercise);
                                 
                                     listItems.push(template.replace(/ID/g,results.rows.item(r).recording_id).replace(/TOM/g,toAMPM(results.rows.item(r).TOM)).replace(/TSM/g,toAMPM(results.rows.item(r).TSM)).replace(/MEASUREMENTVALUE/g,NO_level).replace(/TSM/g,results.rows.item(r).TSM).replace(/SHOWMEAL/g,showmeal).replace(/SHOWEXERCISE/g,showexercise).replace(/DOE/g,results.rows.item(r).DOE).replace(/LOE/g,results.rows.item(r).LOE).replace(/BGCOLOR/g,bg_color));
                                 }
                                 

                                 document.getElementById("list_of_measurements").innerHTML = listItems.join("");
                                 //appML.refreshIscroll("mylog_scrollable",$("#list_of_measurements").height()+10);
                                   if(window.screen.height==568) {
                                   $("#mylog_scrollable").height("400");
                                   }else{
                                    $("#mylog_scrollable").height("310");
                                   }
                                  
                        }
                                 
                }, null);
        });

}








function toAMPM(time){
    time_arr = time.split(":");
    hours_in = time_arr[0];
    suffix = (hours_in >= 12)? 'pm' : 'am';
    hours_out = (hours_in > 12)? hours_in -12 : hours_in;
    hours_out = (hours_out == '00')? 12 : hours_out;
    hours_out = eval(hours_out);
    //hours_out = (hours_out < 10)? "0"+hours_out : hours_out;
    return hours_out+":"+time_arr[1]+""+suffix;
}







function summarise_measurement(){
      
    bg_color="";
    NO_level="";
    switch (NO_value){
        case 1:
            bg_color=color_depleted;
            NO_level="DEPLETED";
            break;
            
        case 5:
            bg_color=color_low;
            NO_level="LOW";
            break;
            
        case 10:
            bg_color=color_threshold;
            NO_level="AT THRESHOLD";
            break;
            
        case 20:
            bg_color=color_ontarget;
            NO_level="ON TARGET";
            break;
            
        case 40:
            bg_color=color_high;
            NO_level="HIGH";
            break;
    }


    
    
    $("#summary #summary_scrollable ul li:first-child span:nth-child(1)").css("background",bg_color);
    $("#summary #summary_scrollable li:nth-child(1) span:nth-child(2)").html("<div style='color:#0d76dc;padding-bottom:5px'>Measured on "+Date.parse($("#DOM").val()).toString("MM/dd/yy")+" at "+toAMPM($("#TOM").val())+"</div>NO level: "+NO_level);
    
    $("#summary #summary_scrollable li:nth-child(2) span:nth-child(2)").html("");
    

    $("#summary #summary_scrollable li:nth-child(2) span:nth-child(2)").html("");
    if(LOF.length>0){
        $("#summary #summary_scrollable li:nth-child(2) span:nth-child(2)").append("<div style='padding-bottom:5px'><div style='color:#0d76dc'>Meal at "+toAMPM($("#TSM").val())+"</div></div>");
        for(f=0;f<LOF.length;f++){
            $("#summary #summary_scrollable li:nth-child(2) span:nth-child(2)").append("<div style='padding-bottom:5px'><div style='color:#000; width:150px;display:inline-block'>"+LOF[f][0]+"</div><div align='right'style='color:#666; width:50px;display:inline-block'>"+LOF[f][1]+"</div></div>");

        }
    }else{
        $("#summary #summary_scrollable li:nth-child(2) span:nth-child(2)").append("<div style='padding-bottom:5px'><div style='color:#999'><i>BEFORE MEAL</i></div></div>");
    }
    

    //setTimeout(function(){appML.refreshIscroll("summary",$("#summary_scrollable ul").height()+50)},500);
}






function edit_measurement(recording_id){
    
    $(".nextButton").html("Edit");
    $(".editbuttons").hide();
    
    current_recording_id=recording_id;
    
    console.log("current_recording_id="+current_recording_id);
    
    
    db.transaction(function (tx) {
                   tx.executeSql("SELECT * from log WHERE recording_id=?",[current_recording_id], function (tx,results) {

                                 NO_value = results.rows.item(0).NO_value;
                                 bg_color="";
                                 NO_level="";
                                 switch (NO_value){
                                 case 1:
                                 bg_color=color_depleted;
                                 NO_level="DEPLETED";
                                 break;
                                 
                                 case 5:
                                 bg_color=color_low;
                                 NO_level="LOW";
                                 break;
                                 
                                 case 10:
                                 bg_color=color_threshold;
                                 NO_level="AT THRESHOLD";
                                 break;
                                 
                                 case 20:
                                 bg_color=color_ontarget;
                                 NO_level="ON TARGET";
                                 break;
                                 
                                 case 40:
                                 bg_color=color_high;
                                 NO_level="HIGH";
                                 break;
                                 }
                                 
                                 DOM = results.rows.item(0).DOM;
                                 TOM = results.rows.item(0).TOM;
                                 TSM = results.rows.item(0).TSM;
                                 
                                 $("#edit_date").click(function(){
                                                          //TOM_selector('edit_date',h,mn,dd,day,d.getMonth(),year);
                                                          });
                           
                                 
                                 
                                 $("#edit_content div#edit_date span:nth-child(3)").click(function(){
                                                                                          if(!allowClick) return false;
                                                                                          delete_measurement(current_recording_id);
                                                                                          preventGhostClick();
                                                                                          
                                                                                          });

                          
                                 $("#edit_content #edit_scrollable ul li:first-child span:nth-child(1)").css("background",bg_color);
                                 $("#edit_content #edit_scrollable li:nth-child(1) span:nth-child(2)").html("<div style='color:#0d76dc;padding-bottom:5px'>Measured at "+toAMPM(TOM)+"</div>NO level: "+NO_level);
                                 $("#edit_content #edit_scrollable li:nth-child(1)").append("<div onclick='jQT.goTo(\"#mynoxyedit_page\",\"slide\")' class='redButton editbuttons' style='display:none; position:absolute; top:10px; right:0px; width:50px;height:20px;padding:3px;font-family:AvenirNextCondensed-DemiBold;'>EDIT</div>");
                                 //on "+Date.parse(DOM).toString("MM/dd/yy")+"
                                 

                                 $("#edit_content #edit_scrollable li:nth-child(2) span:nth-child(2)").html("");
                                 LOF = JSON.parse(results.rows.item(0).LOF);
                                 console.log(LOF);
                                 if(LOF.length>0){
                                    $("#edit_content #edit_scrollable li:nth-child(2) span:nth-child(2)").append("<div style='color:#0d76dc;padding-bottom:5px'>Meal at "+toAMPM(TSM)+"</div>");
                                    for(f=0;f<LOF.length;f++){
                                        $("#edit_content #edit_scrollable li:nth-child(2) span:nth-child(2)").append("<div style='padding-bottom:5px'><div style='color:#000; width:150px;display:inline-block'>"+LOF[f][0]+"</div><div align='right'style='color:#666; width:50px;display:inline-block'>"+LOF[f][1]+"</div></div>");       
                                    }
                                 }else{
                                    $("#edit_content #edit_scrollable li:nth-child(2) span:nth-child(2)").append("<div style='padding-bottom:5px'><div style='color:#999'><i>BEFORE MEAL</i></div></div>");

                                 }
                                 $("#edit_content #edit_scrollable li:nth-child(2)").append("<div class='redButton editbuttons' onclick='jQT.goTo(\"#mealedit_page2\",\"slide\")' style='display:none; position:absolute; top:10px; right:0px; width:50px;height:20px;padding:3px;font-family:AvenirNextCondensed-DemiBold;'>EDIT</div>");

                                
                                 setTimeout(function(){jQT.goTo("#edit_page","slide")},50);
                                 
                                 //setTimeout(function(){appML.refreshIscroll("edit_scrollable",$("#edit_scrollable ul").height()+50)},500);
                                 
                            }, null);
                   });
}







function record_measurement() {
    console.log("record_measurement");
    console.log("DOM:"+$("#DOM").val());
    console.log("TOM:"+$("#TOM").val());
    console.log("TSM:"+$("#TSM").val());
    //console.log("TSE:"+$("#TSE").val());
    //console.log("DOE:"+doe_val);
    
    if($("#DOM").val()==""){
        DOM="";
    } else {
        t1=Date.parse($("#DOM").val()+"T"+$("#TOM").val()+"Z");
        //TOM=Math.round(t1.getTime()/1000);
        DOM = $("#DOM").val();
    }
    
    
    if($("#TOM").val()==""){
        TOM="";
    } else {
        t1=Date.parse($("#DOM").val()+"T"+$("#TOM").val()+"Z");
        //TOM=Math.round(t1.getTime()/1000);
        TOM = $("#TOM").val();
    }
    
    if($("#TSM").val()==""){
        TSM="";
    } else {
        t2=Date.parse($("#DOM").val()+"T"+$("#TSM").val()+"Z");
        //TSM=Math.round(t2.getTime()/1000);
        TSM = $("#TSM").val();
    }
    /*
    
    if($("#TSE").val()==""){
        TSE="";
    } else {
        t3=Date.parse($("#DOM").val()+"T"+$("#TSE").val()+"Z");
        TSE=Math.round(t3.getTime()/1000);
    }
    */

    console.log("DOM:"+DOM);
    console.log("TOM:"+TOM);
    console.log("TSM:"+TSM);
    //console.log("TSE:"+TSE);
    console.log(LOF);
    //console.log(LOE);
    console.log("recording_id:"+current_recording_id);
    console.log("user_id:"+user_data[0]);
    
    var cachekiller = new Date();
    $.ajax({
           type: 'POST',
           url: "http://www.budgetappdev.com/apps/berkeleytest/recordings.php?cachekiller="+cachekiller,
           async: true,
           data: {
           recording_id : current_recording_id,
           user_id : user_data[0],
           DOM : DOM,
           TOM : TOM,
           NO_value : NO_value,
           TSM : TSM,
           LOF : JSON.stringify(LOF),
           action:"record"
           },
           success: function (data) {
           console.log("data="+data);
           LOF=[];
           //LOE=[];
           $("#meal_items").html("<li><br></li><li><br></li><li><br></li>");
           //$("#exercise_items").html("<li><br></li><li><br></li><li><br></li>");
           targetday= Date.today();
           
           
           
           // Notification 3 - Strips
           total_rec_measurements=localStorage['total_rec_measurements'];
           if(isNaN(total_rec_measurements)==true){
                total_rec_measurements=1;
           }else{
                total_rec_measurements++;
           }
           
           localStorage.setItem("total_rec_measurements",total_rec_measurements);
           if(total_rec_measurements%20==0){
                setTimeout(function(){$("#notification_3").cssFadeIn()},3000);
           }
           
           
           if(NO_value==0){NO_level = "DEPLETED"};
           if(NO_value==5){NO_level = "LOW"};
           if(NO_value==10){NO_level = "AT THRESHOLD"};
           if(NO_value==20){NO_level = "ON TARGET"};
           if(NO_value==40){NO_level = "HIGH"};
           
           // fb post suggestion when TARGET OR HIGH 
           if(NO_value>=20){  //&&((total_rec_measurements==1)||(total_rec_measurements%10==0)))
           
               function onConfirm(button){
                 if(button==1){
                    fbPostStart(NO_level);
                 }
               }
               navigator.notification.confirm("Do you want to post these results on your facebook wall?", onConfirm, "Share the health!", "Yes,No");
               
           
           }
            //fbPostStart();
           
           console.log("total_rec_measurements="+total_rec_measurements+" "+isNaN(total_rec_measurements));
           
           
           var d = new Date();
           hours = d.getHours();

           if(hours<11){
           
                // Cancel current notifications
               window.plugins.localNotification.cancel(1);
           
                // Set future notifications
               var n1 = new Date().add(1).day().set({hour: 11, minute: 0, second: 0 });
               window.plugins.localNotification.add({
                                                    date: n1, // 11am
                                                    message: 'What is your Nitric Oxide level?',
                                                    id: '1',
                                                    repeat: 'daily',
                                                    badge: 1,
                                                    foreground:'',
                                                    background:'notification1callback',
                                                    sound:'sub.caf'
                                                    });
           }
           
           if((hours>11) && (hours<21)){
           
                // Cancel current notifications
                window.plugins.localNotification.cancel(2);
           
           
                // Set future notifications
                var n2 = new Date().add(1).day().set({hour: 21, minute: 0, second: 0 });
                window.plugins.localNotification.add({
                                                date: n2, // 21am
                                                message: 'What is your Nitric Oxide level?',
                                                id: '2',
                                                repeat: 'daily',
                                                badge: 1,
                                                foreground:'',
                                                background:'notification1callback',
                                                sound:'sub.caf'
                                                });
                     
           }
           
           
           
           // Notification 3 - "3 days"
           window.plugins.localNotification.cancel(3);
           
           var n3 = new Date().add(3).day();
           window.plugins.localNotification.add({
                                                date: n3,
                                                message: 'It has been 3 days since your last Berkeley Test',
                                                id: '3',
                                                repeat: '',
                                                badge: 1,
                                                foreground:'',
                                                background:'notification2callback',
                                                sound:'sub.caf'
                                                });
           
           
           

           
           
           load_measurements();
           
           },
           error: function (xhr, err1, err2) {navigator.notification.alert("An error has occurred. Possibly a network failure. Please try again (later).", null, "OOPS!");},
           dataType: "json",
           timeout: 10000
           });
}





var foods_veryhigh = new Array("Arugula","Bok Choy","Spinach","Lettuce","Swiss Chard","Celery");
var foods_high = new Array("Beetroots","Chinese cabbage","Radish","Endive","Mustard leaf","Fennel");


function fbPostStart(NO_level) {
    console.log("fbPostStart for token "+access_token);
    appML.appManagerShowLoading();
    thismessage = "I just measured "+NO_level+" levels of Nitric Oxide with Berkeley Test";
    $.ajax({
           type: 'POST',
           url: "https://graph.facebook.com/me/feed",
           data: {
           message: thismessage,
           picture: "http://www.budgetappdev.com/apps/berkeleytest/FBappicon.png",
           name: "Berkeley Test",
           link: "http://www.berkeleytest.com",
           caption: "What is your Nitric Oxide level?",
           description: "Berkeley Test is an easy-to-use test strip for measuring saliva Nitric Oxide status, a naturally-produced vascular fitness factor.",
           access_token: access_token,
           format: "json"
           },
           success: function (data) {
           appML.appManagerHideLoading();
           console.log("fb posted");
           //navigator.notification.alert("You have successfully updated your mission status!", null, "Thanks!")
           },
           error: function (data,err,err2) {
           appML.appManagerHideLoading();
           console.log("error="+err2);
           if(err2.indexOf("Bad Request") !== -1){
                console.log("starting fb login");
                var fb = FBConnect.install();
                fb.connect(client_id,redir_url,"touch");
           fb.onConnect = function(){fbPostStart(NO_level)};
                
           }
           },
           dataType: "json",
           timeout: 10000  //Facebook times out after 10 sec
           })
}










function update_measurement() {
    console.log("update_measurement");
    
    console.log("DOMedit:"+$("#DOMedit").val());
    console.log("TOMedit:"+$("#TOMedit").val());
    console.log("TSMedit:"+$("#TSMedit").val());

    if($("#TOMedit").val()!=""){
        TOM=$("#TOMedit").val();
    }
    
    if($("#DOMedit").val()!=""){
        DOM=$("#DOMedit").val();
    }

    if($("#TSMedit").val()!=""){
        TSM=$("#TSMedit").val();
    }
    
    console.log("DOM:"+DOM);
    console.log("TOM:"+TOM);
    console.log("TSM:"+TSM);

    console.log(LOF);

    var cachekiller = new Date();
    $.ajax({
           type: 'POST',
           url: "http://www.budgetappdev.com/apps/berkeleytest/recordings.php?cachekiller="+cachekiller,
           async: true,
           data: {
           recording_id : current_recording_id,
           user_id : user_data[0],
           DOM:DOM,
           TOM : TOM,
           NO_value : NO_value,
           TSM : TSM,
           LOF : JSON.stringify(LOF),
           action:"record"
           },
           success: function (data) {
           console.log("data="+data);
           LOF=[];
           $("#meal_items").html("<li><br></li><li><br></li><li><br></li>");
           targetday= Date.today();
           load_measurements();
           jQT.goTo("#mylog_page");
           },
           error: function (xhr, err1, err2) {navigator.notification.alert("An error has occurred. Possibly a network failure. Please try again (later).", null, "OOPS!");},
           dataType: "json",
           timeout: 10000
           });
}










function delete_measurement(recording_id){
    console.log(recording_id);
    function onConfirm(button){
        if(button==1) {
            var cachekiller = new Date();
            $.ajax({
                   type: 'POST',
                   url: "http://www.budgetappdev.com/apps/berkeleytest/recordings.php?cachekiller="+cachekiller,
                   async: true,
                   data: {
                   recording_id : recording_id,
                   action:"delete"
                   },
                   success: function (data) {
                   console.log("data="+data);
                   if(data==-1){
                   navigator.notification.alert("Sorry, we could not delete this measurement.<br>Please check your network connection.", null, "OOPS!");
                   }else{
                   load_measurements();
                   jQT.goBack();
                   }
                   },
                   error: function (xhr, err1, err2) {navigator.notification.alert("An error has occurred. Possibly a network failure. Please try again (later).", null, "OOPS!");},
                   dataType: "json",
                   timeout: 10000
                   });
        }
        else{
            //navigator.notification.alert("Your project is unharmed.", appML.appManagerHideLoading, "That was close!");
        }
    }                    
    
    navigator.notification.confirm("Do you want to delete this measurement?", onConfirm, "Caution!", "Yes,No");
}















function plot_measurements(offset) {
    console.log("plot_measurements offset="+offset);
    
    $(".graphlegend table tr:nth-child(1) td:nth-child(1) div").css("border-bottom","1px dotted #CC0000");
    $(".graphlegend table tr:nth-child(1) td:nth-child(2)").text("MEAL");
    $(".graphlegend table tr:nth-child(2) td:nth-child(1) div").css("border-bottom","0px dotted #DB4C3C");
    $(".graphlegend table tr:nth-child(2) td:nth-child(2)").text("MEASUREMENT");
    
    
    if(offset=="0"||offset=="1"||offset=="-1"){
        daysoffset += offset;
        
        if(targetday!=0){
            targetday = targetday.add(offset).days();
        }else{
            targetday = Date.today().add(daysoffset).days();
        }
    }else if (offset!="-"){
        targetday = Date.parse(offset);
    }
    
    console.log("targetday:"+targetday);
    
    currentcell = targetday.toString('yyyyMMdd');
    
    console.log(Date.today());
    console.log(targetday);
    console.log(currentcell);
    
    
    $("#myday_picker span:nth-child(2)").show().html(targetday.toString('dddd, MMMM d'));
    
    
    
    /*
    if(targetday.equals(Date.today())) {
        console.log("hide nextButton");
        $(".nextButton").hide();
    }else if(targetday.isAfter(Date.today())){
        $(".nextButton").hide();
        console.log("we do not travel to the future!");
        return;
    }else{
        console.log("show nextButton");
        $(".nextButton").show().css("opacity",1);
    }
    
    */
        
    newtime3 = targetday.toString('yyyy-MM-dd');
    console.log("newtime3:"+newtime3);
    
    db.transaction(function (tx) {
                   tx.executeSql("SELECT * from log WHERE DOM=? ORDER BY TOM ASC",[newtime3], function (tx,results) {
                                 $("#graphdiv").empty();
                                 chartData = [];
                                 if(results.rows.length==0){
                                 $("#graphdiv").html("<br><br><br><br><br><br>NO RECORDINGS FOR THIS DATE");
                                 $("#meal_noexe").html(0);
                                 $("#nomeal_noexe").html(0);
                                 $("#meal_exe").html(0);
                                 $("#nomeal_exe").html(0);
                                 $("#totalmeasurements").html(0);
                                 $("#avgnolevel").html(0);
                                 $("#avgnolevel").html("-");
                                 }else{
                                 meal_noexe=0;
                                 nomeal_noexe=0;
                                 meal_exe=0;
                                 nomeal_exe=0;
                                 totalnolevel = 0;
                                 hourcursor = 0;
                                 meals_guides=[];
                                 exercise_guides=[];
                                 
                                 for(r=0;r<results.rows.length;r++){
                                     if(results.rows.item(r).NO_value == 1){NO_level = 1}
                                     if(results.rows.item(r).NO_value == 5){NO_level = 2}
                                     if(results.rows.item(r).NO_value == 10){NO_level = 3}
                                     if(results.rows.item(r).NO_value == 20){NO_level = 4}
                                     if(results.rows.item(r).NO_value == 40){NO_level = 5}
                                     
                                     LOF = JSON.parse(results.rows.item(r).LOF);
                                     
                                     if(LOF.length>0){
                                         thiscolor="#FEC514";
                                         dm=results.rows.item(r).TSM.split(':');
                                         hrs = eval(dm[0]);
                                         suffix = (hrs >= 12)? 'PM' : 'AM';
                                         hours = (hrs > 12)? hrs -12 : hrs;
                                         hours = (hours == '00')? 12 : hours;
                                         mealtime = hours+" "+suffix;
                                         meal_noexe++;
                                         meals_guides.push(mealtime);
                                         //console.log("mealtime:"+mealtime);
                                     }
                                     
                                     console.log("TOM:"+results.rows.item(r).TOM);
                                     d=results.rows.item(r).TOM.split(":");
                                     thishour = eval(d[0]);
                                     totalnolevel += NO_level;
                                     
                                     while(hourcursor<thishour){
                                         console.log(hourcursor+ " "+thishour);
                                         suffix = (hourcursor >= 12)? 'PM' : 'AM';
                                         hours = (hourcursor > 12)? hourcursor -12 : hourcursor;
                                         hours = (hours == 0)? 12 : hours;
                                         chartData.push({object:eval(hours)+" "+suffix, value:0, color:"#86AECC"});
                                         hourcursor++;
                                     }
                                 
                                     if(hourcursor==thishour){
                                         suffix = (hourcursor >= 12)? 'PM' : 'AM';
                                         hours = (hourcursor > 12)? hourcursor -12 : hourcursor;
                                         hours = (hours == 0)? 12 : hours;
                                         console.log("push: "+hours+" "+suffix);
                                         chartData.push({object:eval(hours)+" "+suffix, value:NO_level, color: "#86AECC"});
                                         hourcursor++;
                                     }
                                 
                                     if(r==results.rows.length-1){
                                         while(hourcursor<24){
                                         console.log(hourcursor+ " "+thishour);
                                         suffix = (hourcursor >= 12)? 'PM' : 'AM';
                                         hours = (hourcursor > 12)? hourcursor -12 : hourcursor;
                                         hours = (hours == 0)? 12 : hours;
                                         chartData.push({object:eval(hours)+" "+suffix, value:0, color: "#86AECC"});
                                         hourcursor++;
                                         }
                                     }
                                 }
                                 
                                 $("#meal_noexe").html(meal_noexe);
                                 $("#nomeal_noexe").html(nomeal_noexe);
                                 $("#meal_exe").html(meal_exe);
                                 $("#nomeal_exe").html(nomeal_exe);
                                 $("#totalmeasurements").html(results.rows.length);
                                 
                                 avgnolevelval = (totalnolevel/results.rows.length).toFixed(0);
                                 switch (true){
                                 case (avgnolevelval>=5):
                                 NO_level="HIGH";
                                 break;
                                 case (avgnolevelval>=4):
                                 NO_level="ON TARGET";
                                 break;
                                 case (avgnolevelval>=3):
                                 NO_level="THRESHOLD";
                                 break;
                                 case (avgnolevelval>=2):
                                 NO_level="LOW";
                                 break;
                                 case (avgnolevelval>=1):
                                 NO_level="DEPLETED";
                                 break;
                                 default:
                                 NO_level="-";
                                 break;
                                 }
                                 
                                 $("#avgnolevel").html(NO_level);
                                 
                                 // SERIAL CHART
                                 chart = new AmCharts.AmSerialChart();
                                 chart.dataProvider = chartData;
                                 chart.categoryField = "object";
                                 chart.startDuration = 1;
                                 chart.marginTop = 20;
                                 chart.marginLeft = 55;
                                 chart.marginRight = 10;
                                 chart.marginBottom = 70;
                                 chart.fontSize= 14;
                                 chart.fontFamily = "AvenirNextCondensed-Regular";
                                 
                                 // AXES
                                 
                                 // category
                                 var categoryAxis = chart.categoryAxis;
                                 categoryAxis.labelRotation = 90; // this line makes category values to be rotated
                                 categoryAxis.gridAlpha = 0;
                                 categoryAxis.fillAlpha = 1;
                                 categoryAxis.autoGridCount = false;
                                 categoryAxis.gridCount = 24;
                                 categoryAxis.labelFrequency = 3;
                                 
                                 
                                 // value
                                 var valueAxis = new AmCharts.ValueAxis();
                                 valueAxis.dashLength = 5;
                                 valueAxis.axisAlpha = 0;
                                 valueAxis.minimum = 0;
                                 valueAxis.maximum = 5;
                                 valueAxis.offset = -10;
                                 valueAxis.labelsEnabled = false;
                                 chart.addValueAxis(valueAxis);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 1;
                                 guide.label = "DEPLETED";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 2;
                                 guide.label = "LOW";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 3;
                                 guide.label = "THRESHOLD";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 4;
                                 guide.label = "TARGET";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 5;
                                 guide.label = "HIGH";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 
                                 
                                 // GRAPH
                                 var graph = new AmCharts.AmGraph();
                                 graph.valueField = "value";
                                 graph.balloonText = "NO-level:[[value]]";
                                 graph.type = "column";
                                 graph.lineAlpha = 0;
                                 graph.fillAlphas = 1;
                                 graph.colorField = "color";
                                 graph.cornerRadiusTop = 3;
                                 chart.addGraph(graph);
                                 
                                 
                                 
                                 
                                 
                                 // WRITE
                                 chart.write("graphdiv");
                                 }
                                 
                                 function add_guide(when){
                                     var guide1 = new AmCharts.Guide();
                                     guide1.category = when;
                                     guide1.lineColor = "#cc0000";
                                     guide1.lineAlpha = 1;
                                     guide1.dashLength = 2;
                                     guide1.lineThickness = 2;
                                     guide1.inside = true;
                                     guide1.labelRotation = 90;
                                     guide1.label = "";
                                     categoryAxis.addGuide(guide1);
                                     console.log("guide added at "+when);
                                     chart.write("graphdiv");
                                 }
                                 
                                 for(g=0;g<meals_guides.length;g++){
                                    add_guide(meals_guides[g]);
                                    console.log("meal at "+meals_guides[g]);
                                    
                                 }

                                 
                                 }, null);
                   });
    
}













function plot_weekly_measurements(offset) {
    console.log("plot_weekly_measurements offset="+offset);
    
    $(".graphlegend table tr:nth-child(1) td:nth-child(1) div").css("border-bottom","0px dotted #FEC514");
    $(".graphlegend table tr:nth-child(1) td:nth-child(2)").text("");
    $(".graphlegend table tr:nth-child(2) td:nth-child(1) div").css("border-bottom","0px dotted #DB4C3C");
    $(".graphlegend table tr:nth-child(2) td:nth-child(2)").text("MEASUREMENT");
    
    
    if(offset!="-"){
        weeksoffset += offset;
        targetday = Date.today().addWeeks(weeksoffset);
    }
    
    console.log("targetday:"+targetday);
    
    if(targetday.is().monday()){
        console.log("monday")
       firstday = targetday.clone();
       lastday = targetday.clone().add(6).days();
    }else{
       firstday = targetday.clone().moveToDayOfWeek(1,-1);
       lastday = firstday.clone().moveToDayOfWeek(0);
    }
       
    console.log("firstday:"+firstday);
    console.log("lastday:"+lastday);
       

    firstday2 = firstday.toString('yyyy-MM-dd');
    lastday2 = lastday.toString('yyyy-MM-dd');
    
    console.log("firstday2:"+firstday2);
    console.log("lastday2:"+lastday2);
    
    $("#myday_picker span:nth-child(2)").html(firstday.toString('MMM d')+" - "+lastday.toString('MMM d'));
    
    if(Date.today().between(firstday,lastday)) {
        $(".nextButton").hide();
    }else if(firstday.isAfter(Date.today())){
        $(".nextButton").hide();
        console.log("we do not travel to the future!");
        return;
    }else{
        $(".nextButton").show();
    }
    
    
    db.transaction(function (tx) {
                   tx.executeSql("SELECT * from log WHERE DOM >= ? AND DOM <= ?",[firstday2,lastday2], function (tx,results) {
                                 
                                 $("#graphdiv").empty();
                                 chartData = [];
                                 console.log("results="+results.rows.length);
                                 if(results.rows.length==0){
                                 $("#meal_noexe").html(0);
                                 $("#nomeal_noexe").html(0);
                                 $("#meal_exe").html(0);
                                 $("#nomeal_exe").html(0);
                                 $("#totalmeasurements").html(0);
                                 $("#avgnolevel").html(0);
                                 $("#graphdiv").html("<br><br><br><br><br><br>NO RECORDINGS FOR THIS WEEK");
                                 $("#avgnolevel").html("-");
                                 }else{
                                 
                                 meal_noexe=0;
                                 nomeal_noexe=0;
                                 meal_exe=0;
                                 nomeal_exe=0;
                                 totalnolevel = 0;
                                 
                                 NO_mon=0;
                                 NO_tue=0;
                                 NO_wed=0;
                                 NO_thu=0;
                                 NO_fri=0;
                                 NO_sat=0;
                                 NO_sun=0;
                                 mon=0;
                                 tue=0;
                                 wed=0;
                                 thu=0;
                                 fri=0;
                                 sat=0;
                                 sun=0;
                                 
                                 for(r=0;r<results.rows.length;r++){
                                 
                                 if(results.rows.item(r).NO_value == 1){NO_level = 1}
                                 if(results.rows.item(r).NO_value == 5){NO_level = 2}
                                 if(results.rows.item(r).NO_value == 10){NO_level = 3}
                                 if(results.rows.item(r).NO_value == 20){NO_level = 4}
                                 if(results.rows.item(r).NO_value == 40){NO_level = 5}
                                 
                                 LOF = JSON.parse(results.rows.item(r).LOF);
                                 //LOE = JSON.parse(results.rows.item(r).LOE);
                                 
                                 if(LOF.length>0){
                                 thiscolor="#FEC514";
                                 if(LOE.length>0){
                                 thiscolor="#7F8DA9";
                                 }
                                 } else if(LOE.length>0){
                                 thiscolor="#DB4C3C";
                                 }else{
                                 thiscolor="#DAF0FD";
                                 }
                                 
                                 if(thiscolor=="#FEC514"){meal_noexe++;}
                                 if(thiscolor=="#7F8DA9"){meal_exe++;}
                                 if(thiscolor=="#DB4C3C"){nomeal_exe++;}
                                 if(thiscolor=="#DAF0FD"){nomeal_noexe++;}
                                 
                                 
                                 
                                 DOM = results.rows.item(r).DOM;
                                 if(Date.parse(DOM).is().monday()){
                                 NO_mon += NO_level;
                                 mon++;
                                 }
                                 if(Date.parse(DOM).is().tuesday()){
                                 NO_tue += NO_level;
                                 tue++;
                                 }
                                 if(Date.parse(DOM).is().wednesday()){
                                 NO_wed += NO_level;
                                 wed++;
                                 }
                                 if(Date.parse(DOM).is().thursday()){
                                 NO_thu += NO_level;
                                 thu++;
                                 }
                                 if(Date.parse(DOM).is().friday()){
                                 NO_fri += NO_level;
                                 fri++;
                                 }
                                 if(Date.parse(DOM).is().saturday()){
                                 NO_sat += NO_level;
                                 sat++;
                                 }
                                 if(Date.parse(DOM).is().sunday()){
                                 NO_sun += NO_level;
                                 sun++;
                                 }
                                 
                                 totalnolevel += NO_level;
                                 
                                 }
                                 
                                 $("#meal_noexe").html(meal_noexe);
                                 $("#nomeal_noexe").html(nomeal_noexe);
                                 $("#meal_exe").html(meal_exe);
                                 $("#nomeal_exe").html(nomeal_exe);
                                 $("#totalmeasurements").html(results.rows.length);
                                 
                                 avgnolevelval = (totalnolevel/results.rows.length).toFixed(0);
                                 switch (true){
                                 case (avgnolevelval>=5):
                                 NO_level="HIGH";
                                 break;
                                 case (avgnolevelval>=4):
                                 NO_level="ON TARGET";
                                 break;
                                 case (avgnolevelval>=3):
                                 NO_level="THRESHOLD";
                                 break;
                                 case (avgnolevelval>=2):
                                 NO_level="LOW";
                                 break;
                                 case (avgnolevelval>=1):
                                 NO_level="DEPLETED";
                                 break;
                                 default:
                                 NO_level="-";
                                 break;
                                 }
                                 
                                 $("#avgnolevel").html(NO_level);
                                 $("#avgnolevel").html(NO_level);
                                 
                                 chartData.push({object:"Monday", value:(NO_mon/mon), color: "#86AECC"});
                                 chartData.push({object:"Tuesday", value:(NO_tue/tue), color: "#86AECC"});
                                 chartData.push({object:"Wednesday", value:(NO_wed/wed), color: "#86AECC"});
                                 chartData.push({object:"Thursday", value:(NO_thu/thu), color: "#86AECC"});
                                 chartData.push({object:"Friday", value:(NO_fri/fri), color: "#86AECC"});
                                 chartData.push({object:"Saturday", value:(NO_sat/sat), color: "#86AECC"});
                                 chartData.push({object:"Sunday", value:(NO_sun/sun), color: "#86AECC"});
                                 
                                 // SERIAL CHART
                                 chart = new AmCharts.AmSerialChart();
                                 chart.dataProvider = chartData;
                                 chart.categoryField = "object";
                                 chart.startDuration = 1;
                                 chart.marginTop = 20;
                                 chart.marginLeft = 55;
                                 chart.marginRight = 10;
                                 chart.marginBottom = 70;
                                 chart.fontSize= 14;
                                 chart.fontFamily = "AvenirNextCondensed-Regular";
                                 
                                 // AXES
                                 
                                 // category
                                 var categoryAxis = chart.categoryAxis;
                                 categoryAxis.labelRotation = 45; // this line makes category values to be rotated
                                 categoryAxis.gridAlpha = 0;
                                 categoryAxis.fillAlpha = 1;
                                 categoryAxis.autoGridCount = false;
                                 categoryAxis.gridCount = 7;
                                 categoryAxis.labelFrequency = 1;
                                 
                                 // value
                                 var valueAxis = new AmCharts.ValueAxis();
                                 valueAxis.dashLength = 5;
                                 valueAxis.axisAlpha = 0;
                                 valueAxis.minimum = 0;
                                 valueAxis.maximum = 5;
                                 valueAxis.offset = -10;
                                 valueAxis.labelsEnabled = false;
                                 chart.addValueAxis(valueAxis);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 1;
                                 guide.label = "DEPLETED";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 2;
                                 guide.label = "LOW";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 3;
                                 guide.label = "THRESHOLD";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 4;
                                 guide.label = "TARGET";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 5;
                                 guide.label = "HIGH";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 
                                 // GRAPH
                                 var graph = new AmCharts.AmGraph();
                                 graph.valueField = "value";
                                 graph.balloonText = "[[category]]: [[value]]";
                                 graph.type = "column";
                                 graph.lineAlpha = 0;
                                 graph.fillAlphas = 1;
                                 graph.colorField = "color";
                                 graph.cornerRadiusTop = 8;
                                 chart.addGraph(graph);
                                 
                                 // WRITE
                                 chart.write("graphdiv");
                                 }
                                 }, null);
                   });
    
}











function plot_monthly_measurements(offset) {
    console.log("plot_monthly_measurements offset="+offset);
    
    $(".graphlegend table tr:nth-child(1) td:nth-child(1) div").css("border-bottom","0px dotted #FEC514");
    $(".graphlegend table tr:nth-child(1) td:nth-child(2)").text("");
    $(".graphlegend table tr:nth-child(2) td:nth-child(1) div").css("border-bottom","0px dotted #DB4C3C");
    $(".graphlegend table tr:nth-child(2) td:nth-child(2)").text("MEASUREMENT");
    
    if(offset!="-"){
        monthsoffset += offset;
        targetday = Date.today().addMonths(monthsoffset);
    }
    
    firstday = targetday.clone().moveToFirstDayOfMonth();
    console.log("firstday:"+firstday);
    
    lastday = firstday.clone().moveToLastDayOfMonth();
    console.log("lastday:"+lastday);
    
    
    
    

    firstday2 = firstday.toString('yyyy-MM-dd');
    lastday2 = lastday.toString('yyyy-MM-dd');
    
    console.log("firstday2:"+firstday2);
    console.log("lastday2:"+lastday2);
    
    $("#myday_picker span:nth-child(2)").html(monthnames[firstday.getMonth()]+" "+firstday.toString('yyyy'));
    
    if(Date.today().between(firstday,lastday)) {
        $(".nextButton").hide();
    }else if(firstday.isAfter(Date.today())){
        $(".nextButton").hide();
        console.log("we do not travel to the future!");
        return;
    }else{
        $(".nextButton").show();
    }
    
    
    db.transaction(function (tx) {
                   tx.executeSql("SELECT strftime('%d',DOM) DAY, AVG(NO_value) NOV, DOM from log WHERE DOM >= ? AND DOM <= ? GROUP BY DAY",[firstday2,lastday2], function (tx,results) {
                                 
                                 $("#graphdiv").empty();
                                 chartData = [];
                                 console.log("results="+results.rows.length);
                                 
                                 if(results.rows.length==0){
                                    $("#meal_noexe").html(0);
                                    $("#nomeal_noexe").html(0);
                                    $("#meal_exe").html(0);
                                    $("#nomeal_exe").html(0);
                                    $("#totalmeasurements").html(0);
                                    $("#avgnolevel").html(0);
                                    $("#graphdiv").html("<br><br><br><br><br><br>NO RECORDINGS FOR THIS MONTH");
                                 $("#avgnolevel").html("-");
                                 }else{
                                 monthvals={};
                                 
                                 for(r=0;r<results.rows.length;r++){
                                    key = results.rows.item(r).DAY.replace('0','');
                                    monthvals[key] = results.rows.item(r).NOV;
                                 }
                                 
                                 for(d=1;d<Date.getDaysInMonth(firstday.toString('yyyy'),firstday.getMonth());d++){
                                 
                                 if(monthvals[d]){
                                 NOV = monthvals[d];
                                 }
                                 else{
                                 NOV = 0;
                                 }
                                 if(NOV==0){NOL = 0}
                                 if(NOV>=1 && NOV<5){NOL = 1}
                                 if(NOV>=5 && NOV<10){NOL = 2}
                                 if(NOV>=10 && NOV<20){NOL = 3}
                                 if(NOV>=20 && NOV<40){NOL = 4}
                                 if(NOV>=40){NOL = 5}
                                 
                                 chartData.push({object:d, value:NOL});
                                 }
                                 
                                 
                                 
                                 // SERIAL CHART
                                 chart = new AmCharts.AmSerialChart();
                                 chart.dataProvider = chartData;
                                 chart.categoryField = "object";
                                 chart.startDuration = 0;
                                 chart.marginTop = 20;
                                 chart.marginLeft = 55;
                                 chart.marginRight = 10;
                                 chart.marginBottom = 70;
                                 chart.fontSize= 14;
                                 chart.fontFamily = "AvenirNextCondensed-Regular";
                                 
                                 // AXES
                                 
                                 // category
                                 var categoryAxis = chart.categoryAxis;
                                 categoryAxis.labelRotation = 45; // this line makes category values to be rotated
                                 categoryAxis.gridAlpha = 0;
                                 categoryAxis.fillAlpha = 1;
                                 categoryAxis.autoGridCount = false;
                                 categoryAxis.gridCount = 31;
                                 categoryAxis.labelFrequency = 3;
                                 
                                 // value
                                 var valueAxis = new AmCharts.ValueAxis();
                                 valueAxis.dashLength = 5;
                                 valueAxis.axisAlpha = 0;
                                 valueAxis.minimum = 0;
                                 valueAxis.maximum = 5;
                                 valueAxis.offset = -10;
                                 valueAxis.labelsEnabled = false;
                                 chart.addValueAxis(valueAxis);
                                 
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 1;
                                 guide.label = "DEPLETED";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 2;
                                 guide.label = "LOW";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 3;
                                 guide.label = "THRESHOLD";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 4;
                                 guide.label = "TARGET";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 var guide = new AmCharts.Guide();
                                 guide.value = 5;
                                 guide.label = "HIGH";
                                 guide.inside = false;
                                 guide.lineAlpha = 0;
                                 valueAxis.addGuide(guide);
                                 
                                 
                                 
                                 // GRAPH
                                 var graph = new AmCharts.AmGraph();
                                 graph.valueField = "value";
                                 graph.balloonText = "[[category]]: [[value]]";
                                 graph.type = "line";
                                 graph.lineColor = "#86AECC";
                                 graph.bullet = "round";
                                 graph.bulletBorderColor = "#FFFFFF";
                                 graph.bulletBorderThickness = 2;
                                 graph.lineThickness = 2;
                                 graph.connect = false;
                                 chart.addGraph(graph);
                                 
                                 
                                 // WRITE
                                 chart.write("graphdiv");
                                 
                                 }
                                 }, null);
                   });
    
    
    
    db.transaction(function (tx) {
                   tx.executeSql("SELECT * from log WHERE DOM >= ? AND DOM <= ?",[firstday2,lastday2], function (tx,results) {
                                 
                                 console.log("results="+results.rows.length);
                                 
                                 if(results.rows.length==0){
                                     $("#meal_noexe").html(0);
                                     $("#nomeal_noexe").html(0);
                                     $("#meal_exe").html(0);
                                     $("#nomeal_exe").html(0);
                                     $("#totalmeasurements").html(0);
                                     $("#avgnolevel").html(0);
                                     $("#graphdiv").html("<br><br><br><br><br><br>NO RECORDINGS FOR THIS MONTH");
                                     $("#avgnolevel").html("-");
                                 }else{
                                     meal_noexe=0;
                                     nomeal_noexe=0;
                                     meal_exe=0;
                                     nomeal_exe=0;
                                     totalnolevel = 0;
                                 
                                 
                                     for(r=0;r<results.rows.length;r++){
                                         if(results.rows.item(r).NO_value == 1){NO_level = 1}
                                         if(results.rows.item(r).NO_value == 5){NO_level = 2}
                                         if(results.rows.item(r).NO_value == 10){NO_level = 3}
                                         if(results.rows.item(r).NO_value == 20){NO_level = 4}
                                         if(results.rows.item(r).NO_value == 40){NO_level = 5}
                                         
                                         LOF = JSON.parse(results.rows.item(r).LOF);
                                         
                                         totalnolevel += NO_level;
                                     }
                                 
                                     $("#meal_noexe").html(meal_noexe);
                                     $("#nomeal_noexe").html(nomeal_noexe);
                                     $("#meal_exe").html(meal_exe);
                                     $("#nomeal_exe").html(nomeal_exe);
                                     $("#totalmeasurements").html(results.rows.length);
                                     
                                 avgnolevelval = (totalnolevel/results.rows.length).toFixed(0);
                                 switch (true){
                                 case (avgnolevelval>=5):
                                 NO_level="HIGH";
                                 break;
                                 case (avgnolevelval>=4):
                                 NO_level="ON TARGET";
                                 break;
                                 case (avgnolevelval>=3):
                                 NO_level="THRESHOLD";
                                 break;
                                 case (avgnolevelval>=2):
                                 NO_level="LOW";
                                 break;
                                 case (avgnolevelval>=1):
                                 NO_level="DEPLETED";
                                 break;
                                 default:
                                 NO_level="-";
                                 break;
                                 }
  
                                 }
                                 
                                 }, null);
                   })
}
































function calendarBuilder(offset)
{	
    console.log("calendarBuilder offset="+offset);
    monthsoffset += offset;
    
    if(targetday!=0){
        targetday = targetday.addMonths(offset);
    }else{
        targetday = Date.today().addMonths(monthsoffset);
    }
    
    $(".calendar_picker span:nth-child(3)").unbind().bind("touchstart",function(){
                                                     if(!allowClick) return false;
                                                     calendarBuilder(1);
                                                     preventGhostClick();
                                                     }); 
    $(".calendar_picker span:nth-child(1)").unbind().bind("touchstart",function(){
                                                     if(!allowClick) return false;
                                                     calendarBuilder(-1);
                                                     preventGhostClick();
                                                     });
    

    if(Date.today().toString("MM") <= targetday.toString("MM")) {
       if(Date.today().toString("yyyy") <= targetday.toString("yyyy")) {
        $(".nextButton").hide();
       }
        console.log("hide");
    }else{
        $(".nextButton").show();
    }
    
    
    var today = new Date()					
    thisday=today.getDate();
    thismonth=today.getMonth();
    thisyear=today.getFullYear()
    totcell=0;

    function getNumberOfDays(year, month) {
        var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
        return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }
    
    monthsofyear= new Array('January','February','March','April','May','June','July','August','September','October','November','December');
    
  
    year = targetday.getFullYear();
    month = targetday.getMonth();
    if(month > 11){month=month-12; year = year+1; }

    timestamp  = new Date(year, month, 1);
    month_name = monthsofyear[month];
    td=getNumberOfDays(year,month);
    fd=timestamp.getDay();
    var offset = fd-1;
    if(offset<0){offset=offset+7;}
    rows=6;
    if(month==0){
        tdp=getNumberOfDays(year-1,11);
    }else{
        tdp=getNumberOfDays(year,month-1);
    }
    pm = month-1;
    nm = month+1;
    
    
    var thiscalendar="";

    $(".calendar_picker span:nth-child(2)").html( monthsofyear[month] + " " + year).unbind().bind("touchstart",function(){
                                                                                                  if(!allowClick) return false;
                                                                                                  jQT.goBack();
                                                                                                  preventGhostClick();
                                                                                                  }); ;

    var day=0;
    var cell=0;
    var background_image = "";


    for(row=1;row<=6;row++)
    {
        thiscalendar += "<tr>";
        for(col=1;col<=7;col++)
        {
            cell++;
            totcell++;
            var date = cell-offset;
            var currentdate = new Date(year,month,date,10,10,10);
            
            if(date>td)
            {
                date -= td;
                d=date;if(date<10){d="0"+d;}
                m=nm;if(nm<10){m="0"+m;}
                cellval = year+"-"+m+"-"+d;
                thiscalendar+="<td class='calendar_cell0'>"+date+"</td>";
            }
            else if(date<1)
            {
                date += tdp;
                d=date;if(date<10){d="0"+d;}
                m=pm;if(m<10){m="0"+m;}
                cellval = year+"-"+m+"-"+d;
                thiscalendar+="<td class='calendar_cell0'>"+date+"</td>";
            }
            else if((date==thisday) && (month==thismonth) && (year==thisyear))
            {
                d=date;if(date<10){d="0"+d;}
                m=month+1;if(m<10){m="0"+m;}
                cellval = year+"-"+m+"-"+d;
                cellID =year+""+m+""+d;
                timestamp  = new Date(month+","+date+","+year);
                leday = timestamp.getDate();
                wodate  = date+" "+monthsofyear[month]+" " + year;
                                thiscalendar+="<td id='cell"+activepanel+cellID+"' class='calendar_today' style='position:relative;' onTouchstart='if(!allowClick) return false; $(this).addClass(\"calendar_down\"); jQT.goBack(); currentcell="+cellID+"; if(activepanel==\"mylog\"){list_measurements(\""+cellval+"\");}else if(activepanel==\"myday\"){plot_measurements(\""+cellval+"\");}; preventGhostClick();'>"+date+"<div style='position:absolute; top:0px; left:4px;font-size:10px'><b>TODAY</b></div></td>";
            }
            else if(currentdate>today)
            {
                d=date;if(date<10){d="0"+d;}
                m=pm;if(m<10){m="0"+m;}
                cellval = year+"-"+m+"-"+d;
                thiscalendar+="<td class='calendar_cell0'>"+date+"</td>";
            }
            else
            {
                d=date;if(date<10){d="0"+d;}
                m=month+1;if(m<10){m="0"+m;}
                cellval = year+"-"+m+"-"+d;
                cellID =year+""+m+""+d;
                lemonth = month-1;
                timestamp  = new Date(month+","+date+","+year);
                leday = timestamp.getDate();
                wodate  = date+" "+monthsofyear[month]+" " + year;
                console.log("cell"+activepanel+cellID);
                thiscalendar+="<td id='cell"+activepanel+cellID+"' class='calendar_cell' onTouchstart='if(!allowClick) return false; $(this).addClass(\"calendar_down\"); jQT.goBack(); currentcell="+cellID+"; if(activepanel==\"mylog\"){list_measurements(\""+cellval+"\");}else if(activepanel==\"myday\"){plot_measurements(\""+cellval+"\");}; preventGhostClick();'>"+date+"</td>";
            }
        }	
        $(".fullcalendar").html(thiscalendar);
        
        if(currentcell!=0){
            $("#cell"+activepanel+currentcell+":not(.calendar_today)").css("color","#cc0000");
        }
        thiscalendar += "</tr>"; 
    }
    
    firstday = targetday.clone().moveToFirstDayOfMonth();
    lastday = firstday.clone().moveToLastDayOfMonth();    
    firstday2 = firstday.toString('yyyy-MM-dd 22:00:00');
    lastday2 = lastday.toString('yyyy-MM-dd 22:00:00');
    
    console.log("firstday:"+firstday2);
    console.log("lastday:"+lastday2);
    
    db.transaction(function (tx) {
                   tx.executeSql("SELECT strftime('%d',DOM) DAY, LOF, LOE from log WHERE DOM >= ? AND DOM <= ? GROUP BY DAY",[firstday2,lastday2], function (tx,results) {
                                 console.log("results="+results.rows.length);
                                 for(r=0;r<results.rows.length;r++){ 
                                    day = results.rows.item(r).DAY;
                                    cellID=firstday.toString('yyyy')+""+firstday.toString('MM')+""+day;
                                 
                                    $("#cell"+activepanel+cellID+":not(.calendar_today)").addClass("calendar_scheduled")
                                 console.log("cell"+activepanel+cellID);
                                 }

                                 }, null);
                   });
    
           
    
}








function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

function callWebPage(url)
{
    if(not_online == 1){
        navigator.notification.alert("This device is not connected to the internet. This features will not work.", null, "");
    }else{
        var authorize_url = "http://"+url;
        if (isUrl(authorize_url) && (authorize_url!="http://n/a"))
        {
            window.plugins.childBrowser.showWebPage(authorize_url);
            
        }
        else
        {
            navigator.notification.alert("Website not available");
        }
    }
}



function contains(arr, obj, currentindex) {
    var i = arr.length;
    while (i--) {
        console.log(arr[i]);
        if ((arr[i].indexOf(obj)!=-1) && (i!=currentindex)){
            return true;
        }
    }
    return false;
}



function cancel() {
    appML.appManagerHideLoading();
}



var currentfoodindex;

function food_selector(destination,ID,thisfood,thisqty) {
    console.log(destination+" "+ID+" "+thisfood+" "+thisqty);
    if(!allowClick) return false;
    preventGhostClick();
    appML.appManagerShowLoading();
    currentfoodindex = ID;
    //SpinningWheel.addSlot({'Arugula, Spinach, mixed Lettuce':'Arugula, Spinach, mixed Lettuce','Beetroot, Chard, Radish':'Beetroot, Chard, Radish','Celery, Fennel, Chinese cabbage':'Celery, Fennel, Chinese cabbage','Kale, Turnips, Carrots':'Kale, Turnips, Carrots','Broccoli, Cucumber, Beans':'Broccoli, Cucumber, Beans'},'center');
    SpinningWheel.addSlot({'Arugula':'color_high/Arugula',
                          'Asparagus':'color_depleted/Asparagus',
                          'Beetroots':'color_ontarget/Beetroots',
                          'Bok Choy':'color_high/Bok Choy',
                          'Broccoli':'color_low/Broccoli',
                          'Brussels sprouts':'color_depleted/Brussels sprouts',
                          'Cabbage':'color_threshold/Cabbage',
                          'Carrots':'color_low/Carrots',
                          'Cauliflower':'color_low/Cauliflower',
                          'Celery':'color_high/Celery',
                          'Chinese cabbage':'color_ontarget/Chinese cabbage',
                          'Cucumber':'color_low/Cucumber',
                          'Endive':'color_ontarget/Endive',
                          'Fennel':'color_ontarget/Fennel',
                          'Garlic':'color_depleted/Garlic',
                          'Green Beans':'color_threshold/Green Beans',
                          'Kale':'color_threshold/Kale',
                          'Leeks':'color_threshold/Leeks',
                          'Lettuce':'color_high/Lettuce',
                          'Mustard leaf':'color_ontarget/Mustard leaf',
                          'Onions':'color_depleted/Onions',
                          'Peas':'color_depleted/Peas',
                          'Pepper':'color_depleted/Pepper',
                          'Potato':'color_low/Potato',
                          'Radish':'color_ontarget/Radish',
                          'Spinach':'color_high/Spinach',
                          'Swiss Chard':'color_high/Swiss Chard',
                          'Tomato':'color_depleted/Tomato',
                          'Turnips':'color_threshold/Turnips'
                          },'center');
    
    SpinningWheel.addSlot({'none': 'none', '<2 cups': '<2 cups', '2 cups': '2 cups', '>2 cups': '>2 cups'},'center');
    SpinningWheel.setDoneAction(donefood);
    SpinningWheel.setCancelAction(cancel);
    SpinningWheel.open();
    if(thisqty){
        SpinningWheel.scrollToValue('0',thisfood);
        SpinningWheel.scrollToValue('1',thisqty);
    }else{
        SpinningWheel.scrollToValue('1','<2 cups');
    }
    appML.appManagerShowLoading();
    //$('.darkOverlay').addClass('darkOverlay_off');
		

    function donefood() {
        appML.appManagerHideLoading();
        results = SpinningWheel.getSelectedValues();
        if(currentfoodindex=="add"){
            if(LOF.length>0){
                if(contains(LOF,results.values[0],currentfoodindex)==true){
                    navigator.notification.alert("You already add entered '"+results.values[0]+"'.", null, "Note");
                }else if(results.values[1]!="none"){
                    LOF.push(new Array(results.values[0],results.values[1]));
                }
            }else if(results.values[1]!="none"){
                LOF.push(new Array(results.values[0],results.values[1]));
            }
        }else{
            if(results.values[1]=="none"){
                LOF.splice(currentfoodindex,1);
            }else{
                if(LOF.length>0){

                        LOF[currentfoodindex][0]=results.values[0];
                        LOF[currentfoodindex][1]=results.values[1];
                    
                }   
            }
        }
        
        var listItems = [];
        var template = "<li class='arrow' style='font-family:AvenirNextCondensed-Regular' onclick='food_selector(\"DESTINATION\",\"ID\",\"FOOD\",\"QTY\")'><span style='display:inline-block; width:220px'>FOOD</span><span style='display:inline-block; width:50px'>QTY</span></li>"
        
        for(i=0;i<LOF.length;i++){
            listItems.push(template.replace(/ID/g,i).replace(/DESTINATION/g,destination).replace(/FOOD/g,LOF[i][0]).replace(/QTY/g,LOF[i][1]));
        }
        document.getElementById(destination).innerHTML = listItems.join("");
        //setTimeout(function(){appML.refreshIscroll("food_list",$("#"+destination).height()+50)},500);
    }

}





var currentexerciseindex;


function exercise_selector(destination,ID,thissport,thisintense) {
    if(!allowClick) return false;
    preventGhostClick();
    appML.appManagerShowLoading();
    currentexerciseindex = ID;
    SpinningWheel.addSlot({'Aerobics training':'Aerobics training','Anaerobic training':'Anaerobic training','Bicycling':'Bicycling','Eliptical':'Eliptical','Jumping rope':'Jumping rope','Hiking':'Hiking','Running':'Running','Swimming':'Swimming'},'center');
    SpinningWheel.addSlot({'Low':'Low intensity','High':'High intensity','none':'none'},'center');
    SpinningWheel.setDoneAction(doneexercise);
    SpinningWheel.setCancelAction(cancel);
    SpinningWheel.open();
    console.log(thisintense+"+"+thissport);
    console.log(thisintense);
    if(thissport){
        SpinningWheel.scrollToValue('0',thissport);
        SpinningWheel.scrollToValue('1',thisintense);
    }
    appML.appManagerShowLoading();
    //$('.darkOverlay').addClass('darkOverlay_off');
	

    function doneexercise() {
        appML.appManagerHideLoading();
        results = SpinningWheel.getSelectedValues();
        
        if(currentexerciseindex=="add"){
            if(LOE.length>0){
                if(contains(LOE,results.values[0],currentexerciseindex)==true){
                    navigator.notification.alert("You already entered '"+results.values[0]+"'.", null, "Note");
                }else if(results.values[1]!="none"){
                    LOE.push(new Array(results.values[0],results.values[1]));
                }
            }else if(results.values[1]!="none"){
                LOE.push(new Array(results.values[0],results.values[1]));
            }
        }else{
            if(results.values[1]=="none"){
                LOE.splice(currentexerciseindex,1);
            }else{
                if(LOE.length>0){
                    if(contains(LOE,results.values[0],currentexerciseindex)==true){
                        navigator.notification.alert("You already entered '"+results.values[0]+"'.", null, "Note");
                    }else if(results.values[0]!=0){
                        LOE[currentexerciseindex][0]=results.values[0];
                        LOE[currentexerciseindex][1]=results.values[1];
                    }
                }
            }
        }
        
        
        
        var listItems = [];
        var template = "<li class='arrow' onclick='exercise_selector(\"DESTINATION\",\"ID\",\"EXERCISE\",\"INTENSITY\")'><span style='display:inline-block; width:220px'>EXERCISE</span><span style='display:inline-block; width:50px'>INTENSITY</span></li>"
        
        for(i=0;i<LOE.length;i++){
            console.log("LOE[i][0]="+LOE[i][0]);
            listItems.push(template.replace(/ID/g,i).replace(/DESTINATION/g,destination).replace(/EXERCISE/g,LOE[i][0]).replace(/INTENSITY/g,LOE[i][1].replace(' intensity','')));
        }
        document.getElementById(destination).innerHTML = listItems.join("");
        //setTimeout(function(){appML.refreshIscroll("exercise_list",$("#"+destination).height()+50)},500);
    }
}	






function state_selector(destination) {
    if(!allowClick) return false;
    preventGhostClick();
    appML.appManagerShowLoading();
    SpinningWheel.addSlot({0:'Alabama',1:'Alaska',2:'Arizona',3:'Arkansas',4:'California',5:'Canada',6:'Colorado',7:'Connecticut',8:'Delaware',9:'D.C.',10:'Florida',11:'Georgia',12:'Hawaii',13:'Idaho',14:'Illinois',15:'Indiana',16:'Iowa',17:'Kansas',18:'Kentucky',19:'Louisiana',20:'Maine',21:'Maryland',22:'Massachusetts',23:'Mexico',24:'Michigan',25:'Minnesota',26:'Mississippi',27:'Missouri',28:'Montana',29:'Nebraska',30:'Nevada',31:'New Hampshire',32:'New Jersey',33:'New Mexico',34:'New York',35:'North Carolina',36:'North Dakota',37:'Ohio',38:'Oklahoma',39:'Oregon',40:'Pennsylvania',41:'Rhode Island',42:'South Carolina',43:'South Dakota',44:'Tennessee',45:'Texas',46:'Utah',47:'Vermont',48:'Virginia',49:'Washington',50:'West Virginia',51:'Wisconsin',52:'Wyoming',53:'American Samoa',54:'Guam',55:'Puerto Rico',56:'Virgin Islands'},'center');
    SpinningWheel.setDoneAction(done_state);
    SpinningWheel.setCancelAction(cancel);
    SpinningWheel.open();
    for(st=0;st<states.length;st++){
        if(states[st]==$("#"+destination).val()){
            SpinningWheel.scrollToValue('0',st);
        }
    }
    
    
    function done_state() {
        var results = SpinningWheel.getSelectedValues();
        document.getElementById(destination).value=results.values[0];
        appML.appManagerHideLoading();
    }
}


function country_selector(destination) {
    if(!allowClick) return false;
    preventGhostClick();
    appML.appManagerShowLoading();
    SpinningWheel.addSlot({'United States':'United States','Canada':'Canada'},'center');
    SpinningWheel.setDoneAction(done_country);
    SpinningWheel.setCancelAction(cancel);
    SpinningWheel.open();  
    SpinningWheel.scrollToValue('0',$("#user_country").val());
    
    function done_country() {
        var results = SpinningWheel.getSelectedValues();
        document.getElementById(destination).value=results.values[0];
        appML.appManagerHideLoading();
    }
}





function weight_selector(destination) {
    if(!allowClick) return false;
    preventGhostClick();
    appML.appManagerShowLoading();
    SpinningWheel.addSlot({0: '0',1: '1', 2: '2', 3: '3', 4: '4'});
    SpinningWheel.addSlot({0: '0',1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11'});
    SpinningWheel.addSlot({0: '0',1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11'});
    SpinningWheel.addSlot({ separator: 'lbs.' }, 'readonly');
    
    SpinningWheel.setDoneAction(done_weight);
    SpinningWheel.setCancelAction(cancel);
    SpinningWheel.open();
    SpinningWheel.scrollToValue('0',$("#user_weight").val());
    
    function done_weight() {
        var results = SpinningWheel.getSelectedValues();
        document.getElementById(destination).value=eval(results.values[0]*100+results.values[1]*10+results.values[2]*1)+" lbs.";
        appML.appManagerHideLoading();
    }
}




function dob_selector(destination) {
    if(!allowClick) return false;
    preventGhostClick();
    appML.appManagerShowLoading();
    //SpinningWheel.addSlot({1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12', 13: '13', 14: '14', 15: '15', 16: '16', 17: '17', 18: '18', 19: '19', 20: '20', 21: '21', 22: '22', 23: '23', 24: '24', 25: '25', 26: '26', 27: '27', 28: '28', 29: '29', 30: '30', 31: '31'});
    //SpinningWheel.addSlot({1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',7: 'July', 8: 'August', 9: 'September',10: 'October', 11: 'November', 12: 'December'});
    
    SpinningWheel.addSlot({1940:'1940',1941:'1941',1942:'1942',1943:'1943',1944:'1944',1945:'1945',1946:'1946',1947:'1947',1948:'1948',1949:'1949',1950:'1950',1951:'1951',1952:'1952',1953:'1953',1954:'1954',1955:'1955',1956:'1956',1957:'1957',1958:'1958',1959:'1959',1960:'1960',1961:'1961',1962:'1962',1963:'1963',1964:'1964',1965:'1965',1966:'1966',1967:'1967',1968:'1968',1969:'1969',1970:'1970',1971:'1971',1972:'1972',1973:'1973',1974:'1974',1975:'1975',1976:'1976',1977:'1977',1978:'1978',1979:'1979',1980:'1980',1981:'1981',1982:'1982',1983:'1983',1984:'1984',1985:'1985',1986:'1986',1987:'1987',1988:'1988',1989:'1989',1990:'1990',1991:'1991',1992:'1992',1993:'1993',1994:'1994',1995:'1995',1996:'1996',1997:'1997',1998:'1998',1999:'1999',2000: '2000', 2001: '2001', 2002: '2002', 2003: '2003', 2004: '2004', 2005: '2005', 2006: '2006', 2007: '2007', 2008: '2008', 2009: '2009', 2010: '2010', 2011: '2011', 2012: '2012', 2013: '2013', 2014: '2014', 2015: '2015', 2016: '2016', 2017: '2017', 2018: '2018', 2019: '2019', 2020: '2020', 2021: '2021', 2022: '2022', 2023: '2023', 2024: '2024', 2025: '2025', 2026: '2026', 2027: '2027', 2028: '2028', 2029: '2029'});
    SpinningWheel.setDoneAction(done_dob);
    SpinningWheel.setCancelAction(cancel);
    SpinningWheel.open();
    //SpinningWheel.scrollToValue('0','01');
    //SpinningWheel.scrollToValue('1','January');
    SpinningWheel.scrollToValue('0',$("#user_age").val());
    
    function done_dob() {
        var results = SpinningWheel.getSelectedValues();
        document.getElementById(destination).value=results.values[0];
        appML.appManagerHideLoading();
    }
}



function sex_selector(destination) {
    if(!allowClick) return false;
    preventGhostClick();
    appML.appManagerShowLoading();
    SpinningWheel.addSlot({'male': 'male','female': 'female'});    
    SpinningWheel.setDoneAction(done_sex);
    SpinningWheel.setCancelAction(cancel);
    SpinningWheel.open();
    SpinningWheel.scrollToValue('0',$("#user_sex").val());
    
    function done_sex() {
        var results = SpinningWheel.getSelectedValues();
        document.getElementById(destination).value=results.values[0];
        appML.appManagerHideLoading();
    }
}




function hypertensive_selector(destination) {
    if(!allowClick) return false;
    preventGhostClick();
    appML.appManagerShowLoading();
    SpinningWheel.addSlot({'not reporting': 'not reporting','normal (120/80)': 'normal (120/80)','prehypertensive (140/90)': 'prehypertensive (140/90)','high blood pressure (>140/90)': 'high blood pressure (>140/90)'});    
    SpinningWheel.setDoneAction(done_hypertensive);
    SpinningWheel.setCancelAction(cancel);
    SpinningWheel.open();
    SpinningWheel.scrollToValue('0',$("#user_hypertensive").val());
    
    function done_hypertensive() {
        var results = SpinningWheel.getSelectedValues();
        document.getElementById(destination).value=results.values[0];
        appML.appManagerHideLoading();
    }
}




function activity_selector(destination) {
        if(!allowClick) return false;
        preventGhostClick();
        appML.appManagerShowLoading();
        SpinningWheel.addSlot({'limited': 'limited','consistent': 'consistent','active': 'active'});    
        SpinningWheel.setDoneAction(done_activity);
        SpinningWheel.setCancelAction(cancel);
        SpinningWheel.open();
        SpinningWheel.scrollToValue('0',$("#user_activity").val());
        
        function done_activity() {
            var results = SpinningWheel.getSelectedValues();
            document.getElementById(destination).value=results.values[0];
            appML.appManagerHideLoading();
        }
}

function query_addressbook(){
    console.log("query_addressbook");
    
    function onthisSuccess(contacts) {
        console.log(contacts.length+" contacts");
        for (var i=0; i<contacts.length; i++) {
            console.log("Display Name = " + contacts[i].displayName+" " + contacts[i].emails[0].value);
        }
    }
    
    function onthisError(contactError) {
        alert('onError!');
    }
    
    function find(arg) {
        console.log("find "+arg);
        var options = new ContactFindOptions();
        options.filter="";
        options.multiple=true;
        var fields = ["displayName", "emails"];
        navigator.contacts.find(fields, onthisSuccess, onthisError, options);
    }
    
    find("speich");
}



/**************************************\
 *  cssAnimate 1.1.7 for jQuery       *
 *  (c) 2012 - Clemens Damke          *
 *  Licensed under MIT License        *
 *  Works with jQuery >=1.4.3         *
 \**************************************/
(function(a){var b=parseFloat(a.fn.jquery);if(!b)b=0;var c=["Webkit","Moz","O","Ms","Khtml",""];var d=["borderRadius","boxShadow","userSelect","transformOrigin","transformStyle","transition","transitionDuration","transitionProperty","transitionTimingFunction","backgroundOrigin","backgroundSize","animation","filter","zoom","columns","perspective","perspectiveOrigin","appearance"];a.fn.cssSetQueue=function(b,c){v=this;var d=v.data("cssQueue")?v.data("cssQueue"):[];var e=v.data("cssCall")?v.data("cssCall"):[];var f=0;var g={};a.each(c,function(a,b){g[a]=b});while(1){if(!e[f]){e[f]=g.complete;break}f++}g.complete=f;d.push([b,g]);v.data({cssQueue:d,cssRunning:true,cssCall:e})};a.fn.cssRunQueue=function(){v=this;var a=v.data("cssQueue")?v.data("cssQueue"):[];if(a[0])v.cssEngine(a[0][0],a[0][1]);else v.data("cssRunning",false);a.shift();v.data("cssQueue",a)};a.cssMerge=function(b,c,d){a.each(c,function(c,e){a.each(d,function(a,d){b[d+c]=e})});return b};a.fn.cssAnimationData=function(a,b){var c=this;var d=c.data("cssAnimations");if(!d)d={};if(!d[a])d[a]=[];d[a].push(b);c.data("cssAnimations",d);return d[a]};a.fn.cssAnimationRemove=function(){var b=this;var c=b.data("cssAnimations");var d=b.data("identity");a.each(c,function(a,b){c[a]=b.splice(d+1,1)});b.data("cssAnimations",c)};a.css3D=function(b){a("body").data("cssPerspective",isFinite(b)?b:b?1e3:0).cssOriginal(a.cssMerge({},{TransformStyle:b?"preserve-3d":"flat"},c))};a.cssPropertySupporter=function(b){a.each(d,function(d,e){if(b[e])a.each(c,function(a,c){var d=e.substr(0,1);b[c+d[c?"toUpperCase":"toLowerCase"]()+e.substr(1)]=b[e]})});return b};a.cssAnimateSupport=function(){var b=false;a.each(c,function(a,c){b=document.body.style[c+"AnimationName"]!==undefined?true:b});return b};a.fn.cssEngine=function(b,d){function f(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()}var e=this;var e=this;if(typeof d.complete=="number")e.data("cssCallIndex",d.complete);var g={linear:"linear",swing:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out"};var h={};var i=a("body").data("cssPerspective");if(b.transform)a.each(c,function(a,c){var d=c+(c?"T":"t")+"ransform";var g=e.cssOriginal(f(d));var j=b.transform;if(!g||g=="none")h[d]="scale(1)";b[d]=(i&&!/perspective/gi.test(j)?"perspective("+i+") ":"")+j});b=a.cssPropertySupporter(b);var j=[];a.each(b,function(a,b){j.push(f(a))});var k=false;var l=[];var m=[];for(var n=0;n<j.length;n++){l.push(String(d.duration/1e3)+"s");var o=g[d.easing];m.push(o?o:d.easing)}l=e.cssAnimationData("dur",l.join(", ")).join(", ");m=e.cssAnimationData("eas",m.join(", ")).join(", ");var p=e.cssAnimationData("prop",j.join(", "));e.data("identity",p.length-1);p=p.join(", ");var q={TransitionDuration:l,TransitionProperty:p,TransitionTimingFunction:m};var r={};r=a.cssMerge(r,q,c);var s=b;a.extend(r,b);if(r.display=="callbackHide")k=true;else if(r.display)h["display"]=r.display;e.cssOriginal(h);setTimeout(function(){e.cssOriginal(r);var b=e.data("runningCSS");b=!b?s:a.extend(b,s);e.data("runningCSS",b);setTimeout(function(){e.data("cssCallIndex","a");if(k)e.cssOriginal("display","none");e.cssAnimationRemove();if(d.queue)e.cssRunQueue();if(typeof d.complete=="number"){e.data("cssCall")[d.complete].call(e);e.data("cssCall")[d.complete]=0}else d.complete.call(e)},d.duration)},0)};a.str2Speed=function(a){return isNaN(a)?a=="slow"?1e3:a=="fast"?200:600:a};a.fn.cssAnimate=function(b,c,d,e){var f=this;var g={duration:0,easing:"swing",complete:function(){},queue:true};var h={};h=typeof c=="object"?c:{duration:c};h[d?typeof d=="function"?"complete":"easing":0]=d;h[e?"complete":0]=e;h.duration=a.str2Speed(h.duration);a.extend(g,h);if(a.cssAnimateSupport()){f.each(function(c,d){d=a(d);if(g.queue){var e=!d.data("cssRunning");d.cssSetQueue(b,g);if(e)d.cssRunQueue()}else d.cssEngine(b,g)})}else f.animate(b,g);return f};a.cssPresetOptGen=function(a,b){var c={};c[a?typeof a=="function"?"complete":"easing":0]=a;c[b?"complete":0]=b;return c};a.fn.cssFadeTo=function(b,c,d,e){var f=this;opt=a.cssPresetOptGen(d,e);var g={opacity:c};opt.duration=b;if(a.cssAnimateSupport()){f.each(function(b,d){d=a(d);if(d.data("displayOriginal")!=d.cssOriginal("display")&&d.cssOriginal("display")!="none")d.data("displayOriginal",d.cssOriginal("display")?d.cssOriginal("display"):"block");else d.data("displayOriginal","block");g.display=c?d.data("displayOriginal"):"callbackHide";d.cssAnimate(g,opt)})}else f.fadeTo(b,opt);return f};a.fn.cssFadeOut=function(b,c,d){if(a.cssAnimateSupport()){if(!this.cssOriginal("opacity"))this.cssOriginal("opacity",1);this.cssFadeTo(b,0,c,d)}else this.fadeOut(b,c,d);return this};a.fn.cssFadeIn=function(b,c,d){if(a.cssAnimateSupport()){if(this.cssOriginal("opacity"))this.cssOriginal("opacity",0);this.cssFadeTo(b,1,c,d)}else this.fadeIn(b,c,d);return this};a.cssPx2Int=function(a){return a.split("p")[0]*1};a.fn.cssStop=function(){var b=this,d=0;b.data("cssAnimations",false).each(function(f,g){g=a(g);var h={TransitionDuration:"0s"};var i=g.data("runningCSS");var j={};if(i)a.each(i,function(b,c){c=isFinite(a.cssPx2Int(c))?a.cssPx2Int(c):c;var d=[0,1];var e={color:["#000","#fff"],background:["#000","#fff"],"float":["none","left"],clear:["none","left"],border:["none","0px solid #fff"],position:["absolute","relative"],family:["Arial","Helvetica"],display:["none","block"],visibility:["hidden","visible"],transform:["translate(0,0)","scale(1)"]};a.each(e,function(a,c){if((new RegExp(a,"gi")).test(b))d=c});j[b]=d[0]!=c?d[0]:d[1]});else i={};h=a.cssMerge(j,h,c);g.cssOriginal(h);setTimeout(function(){var c=a(b[d]);c.cssOriginal(i).data({runningCSS:{},cssAnimations:{},cssQueue:[],cssRunning:false});if(typeof c.data("cssCallIndex")=="number")c.data("cssCall")[c.data("cssCallIndex")].call(c);c.data("cssCall",[]);d++},0)});return b};a.fn.cssDelay=function(a){return this.cssAnimate({},a)};a.fn.cssOriginal=a.fn.css;a.fn.css=function(d,e){var f=this,g={};if(typeof d=="string")if(e)g[a.camelCase(d)]=e;else return f.cssOriginal(d);else g=d;if(!g.transitionDuration)g.transitionDuration="0s";if(b<1.8)g=a.cssPropertySupporter(g);var h=a("body").data("cssPerspective");if(g.transform)a.each(b<1.8?c:[""],function(a,b){var c=b+(b?"T":"t")+"ransform";var d=g.transform;g[c]=(h&&!/perspective/gi.test(d)?"perspective("+h+") ":"")+d});var i=f.cssOriginal("transition-duration");f.cssOriginal(g);setTimeout(function(){f.cssOriginal("transition-duration",i)},0);return f}})(jQuery)

