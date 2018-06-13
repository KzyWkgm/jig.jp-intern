var originalData=[];
var originalLen=0;
var sNumMax=1000;
var snum=sNumMax;
var data=[];
var start=0;
var categories=[];

$(".backButton").text("前へ");
$(".nextButton").text("次へ");

$(function() {
	$.getJSON("data/fukui-event.json" , function(jsons) {
		getCategories(jsons);
		originalData=jsons;
		data=jsons;
		originalLen=jsons.length;
		showDatas(jsons);
	});
});

function searchSbm(code){
	if(code==13){
		$("#searchButton").trigger("click");
	}
}

$("#searchButton").on("click", function(){
	var key=$("#searchText").val();
	//キーワード絞り込み
	data=[];
	for(var i=0;i<originalLen;i++){
		if(~originalData[i].event_name.indexOf(key)||
			~originalData[i].category.indexOf(key)||
			~originalData[i].start_date.indexOf(key)||
			~originalData[i].end_date.indexOf(key)||
			~originalData[i].description.indexOf(key)||
			~originalData[i].schedule_description.indexOf(key)||
			~originalData[i].contact.indexOf(key)||
			~originalData[i].contact_phone_number.indexOf(key)||
			~originalData[i].event_place.indexOf(key)||
			~originalData[i].city.indexOf(key)
		){
			data.push(originalData[i]);	
		}
	}
	showDatas(data);
});

$(document).on("click",".category",function(){
	var val=$(this).attr("name");
	//カテゴリ絞りこみ
	data=[];
	if(val=="") data=originalData;
	else{
		for(var i=0;i<originalLen;i++){
			if(originalData[i].category==val){
				data.push(originalData[i]);
			}
		}
	}
	showDatas(data);
});


$("#snumButton").on("click", function(){
	var key=$("#snum").val();
	snumSet(key);
	showDatas(data);
});

function snumSet(n){ 
	if(isFinite(n) && n!=null){
		if(n>0 && n<=sNumMax){
			snum=Math.floor(n);
			//console.log(snum);
			return;
		}
	}
	alert("1-1000");
}

function snumSbm(code){
	if(code==13){
		$("#snumButton").trigger('click');
	}
}

$(".snumChange").on("click",function(){
	snum=parseInt($(this).attr("value"));
	showDatas(data);
});

$(".backButton").on("click",function(){
	start-=snum;
	if(start<0){
		start=0;
	}
	showDatas(data);
});

$(".nextButton").on("click",function(){
	//console.log(snum);
	start+=snum;
	if(start>=originalLen){
		start=originalLen-2;
	}
	showDatas(data);
});

$(function(){
	$("a.button").click(function(){
		var speed = 300;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});

function checkbnBtn(){
	if(start<=0) $(".backButton").hide();
	else $(".backButton").show();
	if(start+snum>=data.length){
		$(".backButton").removeClass("link");
		$(".nextButton").hide();
	}
	else{
		$(".backButton").addClass("link");
		$(".nextButton").show();
	}
	//console.log("sn="+start+" snum="+snum+" data="+data.length);
}

function showDatas(data){
	var mainObj = $("#info"), len = data.length;
	mainObj.html("");
	if(!isFinite(len)||len<=0){
		var noDataText="該当するデータがありません";
		mainObj.append($("<div>").attr({"id":"noDataText"}).text(noDataText));
		return;
	}
	if(start>len) start=0;
	dataNum=len-start;
	if(dataNum>snum) dataNum=snum;
	//console.log("showData start="+start+" dataNum="+dataNum);
	mainObj.append($("<div>").attr({"id":"eventsTitle","class":"blockTitle"}).text("イベント情報"));
	$("#pageGuide").text((start+1)+"～"+(start+dataNum)+"件目を表示("+data.length+"件中)");
	for(var i = start; i < start+dataNum; i++) {
		//console.log(i);
		mainObj.append($("<li>").attr({"id":"event"+(i+1),"class":"eventInfo"}));
		var evObj=$("#event"+(i+1));
		evObj.append($("<div>").attr({"class":"event_name"}).text(data[i].event_name));
		evObj.append($("<div>").attr({"class":"category","name":data[i].category}).text(data[i].category));
		evObj.append($("<div>").attr({"class":"start_date"}).text(data[i].start_date));
		evObj.append($("<div>").attr({"class":"end_date"}).text(data[i].end_date));
		evObj.append($("<div>").attr({"class":"description"}).text(data[i].description));
		evObj.append($("<div>").attr({"class":"schedule_description"}).text(data[i].schedule_description));
		evObj.append($("<div>").attr({"class":"contact"}).text(data[i].contact));
		evObj.append($("<div>").attr({"class":"contact_phone_number"}).text(data[i].contact_phone_number));
		evObj.append($("<div>").attr({"class":"event_place"}).text(data[i].event_place));
		evObj.append($("<div>").attr({"class":"latitude"}).text(data[i].latitude));
		evObj.append($("<div>").attr({"class":"longitude"}).text(data[i].longitude));
		evObj.append($("<div>").attr({"class":"city"}).text(data[i].city));
	}
	checkbnBtn();
}

function getCategories(data){
	for(var i=0;i<data.length;i++){
		categories.push(data[i].category);
	}
	categories=arrayUnique(categories);
	var target="その他";
	categories.some(function(v, i){
		if (v==target) categories.splice(i,1);
	});
	categories.push(target);
	var ctgobj=$("#categories");
	ctgobj.append($("<div>").attr({"class":"category","name":""}));
	$(".category").text("全て");
		for(var i=0;i<categories.length;i++){
		ctgobj.append($("<div>").attr({"class":"category","name":categories[i]}));
		var cObj=$(".category[name="+categories[i]+"]");
		cObj.text(categories[i]);

	}
}

function arrayUnique (array) {
	return array.filter(function(value, index) {
		return index === array.indexOf(value) ;
	} ) ;
}



