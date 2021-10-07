var week=['末日','周一','周二','周三','周四','周五','周六','周日'];
var daytmp=[0,0,0,0];
var nighttmp=[];
var tmp=0;
//初始化地图时，若center属性缺省，地图默认定位到用户所在城市的中心                                   //获取定位
code = '330100';
var map = new AMap.Map('map', {
resizeEnable: true
});
code = map.getAdcode();
                                                                                                    //加载天气查询插件
AMap.plugin('AMap.Weather', function() {
//创建天气查询实例
var weather = new AMap.Weather();
//执行实时天气信息查询
weather.getLive(code, function(err, data) {
    if(data.info != 'OK')
        alert('数据获取失败请检查网络');
    document.getElementById('weather').innerHTML=data.weather;
    if(data.weather.slice(-1,2) == '云' || data.weather =='阴'){
        document.getElementById('weath').src="../picture/多云.png";                               //生活小贴士+实时天气
        document.getElementById('we').innerText="不宜洗车"
    }
    if(data.weather=='晴'){
        document.getElementById('weath').src="../picture/晴.png";
        document.getElementById('we').innerText="注意防晒"
    }
    if(data.weather.slice(-1,2)=='雨'){
        document.getElementById('weath').src="../picture/中雨.png";
        document.getElementById('we').innerText="出门请带把伞"
    }
    document.getElementById('temp').innerHTML=data.temperature;
    if(data.temperature>25)
        document.getElementById('yi').innerText="推荐着装:夏装"
    document.getElementById('dir').innerHTML=data.windDirection;
    document.getElementById('power').innerHTML=data.windPower;
    document.getElementById('shidu').innerHTML=data.humidity;
    document.getElementById('time').innerHTML=data.reportTime;
    document.getElementById('cityname').innerHTML=data.province+"省"+data.city;
});
    update();
});

document.getElementById('next').onclick=function(){
    tmp += 1;
    if(tmp < 4 )
    update() 
    else{
    alert('超出了我的能力!!!');
    tmp -= 1;
    }
}

document.getElementById('previous').onclick=function(){
    tmp -= 1;
    if(tmp > -1 ) 
        update() 
    else{
        alert('超出了我的能力!!!');
        tmp += 1;
    }
}

function  update(){
    AMap.plugin('AMap.Weather', function() {
        var weather = new AMap.Weather();
            weather.getForecast(code, function(err, data) {
                document.getElementById('first1').innerHTML=data.forecasts[tmp].date.slice(0,4)+'年'+data.forecasts[tmp].date.slice(5,7)+'月'+data.forecasts[tmp].date.slice(8)+'日';
                month=data.forecasts[tmp].date.slice(5,7)+'月'+data.forecasts[tmp].date.slice(8)+'日';
                document.getElementById('first2').innerHTML=week[data.forecasts[tmp].week];
                document.getElementById('temp1').innerHTML=data.forecasts[tmp].dayTemp;
                document.getElementById('temp2').innerHTML=data.forecasts[tmp].nightTemp;
                document.getElementById('weather1').innerHTML=data.forecasts[tmp].dayWeather;
                document.getElementById('weather2').innerHTML=data.forecasts[tmp].nightWeather;
                document.getElementById('wind1').innerHTML=data.forecasts[tmp].dayWindDir;
                document.getElementById('wind2').innerHTML=data.forecasts[tmp].nightWindDir;
                document.getElementById('power1').innerHTML=data.forecasts[tmp].dayWindPower;
                document.getElementById('power2').innerHTML=data.forecasts[tmp].nightWindPower;
            });
        });
}








var asd='asd'
var flag = 1;                                                                                                 //夜间日间转换
var t = Date().slice(16,24);
t = t.slice(0,2);
if(t < 6 || t > 18){
    flag = 1;
    ptu();
}
function ptu(){
    var styleh1 = document.getElementsByTagName('h1');
    var stylep = document.getElementsByTagName('p');
    var stylespan = document.getElementsByTagName('span');
    var stylehr = document.getElementsByTagName('hr');
    if(flag){
        document.getElementById('bg').style.backgroundImage="url('../picture/R-C.jfif')";
        flag = 0;
        document.getElementById('mode').title="点击切换为日间模式";
        document.getElementById('mode').src="../picture/夜间.png";
        for(var i=0;i<styleh1.length;i++)
            styleh1[i].style.color="black";
        for(var i=0;i<stylep.length;i++)
            stylep[i].style.color="black";
        for(var i=0;i<stylespan.length;i++)
            stylespan[i].style.color="black";
        for(var i=0;i<stylehr.length;i++)
            stylehr[i].style.backgroundImage="linear-gradient(to right, rgba(0, 0, 0, 0), black, rgba(0, 0, 0, 0))";
        document.getElementById('pic').style.backgroundColor='rgba(0, 0, 0, 0.603)';
        draw();
        document.getElementById("zimu").style.color="rgba(255, 255, 255, 0.466)";
    }
    else{
        document.getElementById('bg').style.backgroundImage="url('../picture/青空.jpg')";
        flag = 1;
        document.getElementById('mode').title="点击切换为夜间模式";
        document.getElementById('mode').src="../picture/日间.png";
        for(var i=0;i<styleh1.length;i++)
            styleh1[i].style.color="white";
        for(var i=0;i<stylep.length;i++)
            stylep[i].style.color="white";
        for(var i=0;i<stylespan.length;i++)
            stylespan[i].style.color="white";
        for(var i=0;i<stylehr.length;i++)
            stylehr[i].style.backgroundImage="linear-gradient(to right, rgba(0, 0, 0, 0), rgb(232, 237, 243), rgba(0, 0, 0, 0))";
        document.getElementById('pic').style.backgroundColor='rgba(255, 248, 220, 0.603)';
        document.getElementById("zimu").style.color="black";
        draw();
    }
}

setInterval(time, 1000);

function time(){
document.getElementById('asd').innerHTML=month+Date().slice(16,24);
}






draw();
    function draw(){                                                                                //温度折线图框体
    var c=document.getElementById("pic");
    var ctx= c.getContext("2d");
    ctx.lineJoin="round";
    ctx.beginPath();
    flag?ctx.strokeStyle="black":ctx.strokeStyle="white";
    ctx.moveTo(10,10);
    ctx.lineTo(10,140);
    ctx.lineTo(290,140);
    ctx.lineTo(285,145);
    ctx.moveTo(290,140);
    ctx.lineTo(285,135);
    ctx.moveTo(5,15);
    ctx.lineTo(10,10);
    ctx.lineTo(15,15);
    ctx.lineWidth=1;
    for(var i=0;i<4;i++){
        ctx.moveTo(10,40+i*25);
        ctx.lineTo(280,40+i*25);
    }
    for(var i=0;i<4;i++){
        ctx.moveTo(60+i*60,140);
        ctx.lineTo(60+i*60,135);
    }
    ctx.stroke();
    ctx.closePath();
    temp();
}
function  temp(){                                                                                           //温度折现
AMap.plugin('AMap.Weather', function() {
    var weather = new AMap.Weather();
        weather.getForecast(code, function(err, data) {
            for(var n=0;n<4;n++){
                window.daytmp[n]=''+data.forecasts[n].dayTemp;
                nighttmp[n]=data.forecasts[n].nightTemp;
            }
            var b=document.getElementsByTagName('b');
                for(var i=0;i<b.length;i++){
                    flag?b[i].style.color="black":b[i].style.color="white";
                    b[i].innerText=week[data.forecasts[i].week];
                }
            var ma=Math.max(daytmp[0],daytmp[1],daytmp[2],daytmp[3]);
            var mi=Math.min(nighttmp[0],nighttmp[1],nighttmp[2],nighttmp[3]);
            var step = 1;
            (ma-mi)/4 != 0?step = parseInt((ma-mi)/4)+1:step=(ma-mi)/4;
            var div=document.getElementsByTagName('div');
            for(var i=div.length-9;i<div.length-5;i++){
                flag?div[i].style.color="black":div[i].style.color="white";
                div[i].innerText=mi+step*(4-(div.length-5-i))+'°C';
            }
            var c=document.getElementById("pic");
            var ctx= c.getContext("2d");
            for(var i=0;i<3;i++){
                ctx.beginPath();
                ctx.strokeStyle="red";
                ctx.lineWidth=3;
                ctx.lineJoin="round";
                ctx.moveTo(60+i*60,115-100*(data.forecasts[i].dayTemp-mi)/(step*4));
                //if(data.forecasts[i+1].dayTemp-data.forecasts[i].dayTemp<=0)
                    //ctx.quadraticCurveTo(60+i*60,115-100*(data.forecasts[i+1].dayTemp-mi)/(step*4),120+i*60,115-100*(data.forecasts[i+1].dayTemp-mi)/(step*4));
                ctx.lineTo(120+i*60,115-100*(data.forecasts[i+1].dayTemp-mi)/(step*4))
                //else
                    //ctx.quadraticCurveTo(120+i*60,115-100*(data.forecasts[i].dayTemp-mi)/(step*4),120+i*60,115-100*(data.forecasts[i+1].dayTemp-mi)/(step*4));
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.strokeStyle="green";
                ctx.lineWidth=3;
                ctx.lineJoin="round";
                ctx.moveTo(60+i*60,115-100*(data.forecasts[i].nightTemp-mi)/(step*4));
                //if(data.forecasts[i+1].nightTemp-data.forecasts[i].nightTemp<=0)
                    //ctx.quadraticCurveTo(60+i*60,115-100*(data.forecasts[i+1].nightTemp-mi)/(step*4),120+i*60,115-100*(data.forecasts[i+1].nightTemp-mi)/(step*4));
                //else
                    //ctx.quadraticCurveTo(120+i*60,115-100*(data.forecasts[i].nightTemp-mi)/(step*4),120+i*60,115-100*(data.forecasts[i+1].nightTemp-mi)/(step*4));
                    ctx.lineTo(120+i*60,115-100*(data.forecasts[i+1].nightTemp-mi)/(step*4))
                ctx.stroke();
                ctx.closePath();
            }
        });
    });
}

//ctx.moveTo(60+i*60,115-100*(data.forecasts[i].dayTemp-mi)/(step*4));
                //ctx.lineTo(120+i*60,115-100*(data.forecasts[i+1].dayTemp-mi)/(step*4))
