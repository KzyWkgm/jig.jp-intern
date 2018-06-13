//前へ次へボタンのテキスト設定
$(".backButton").text("前へ");
$(".nextButton").text("次へ");

//前へ次へボタンの表示判定
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
}

//前へボタンのクリックイベント
$(".backButton").on("click",function(){
	start-=snum;
	if(start<0){
		start=0;
	}
	showDatas(data);
	sclTop();
});

//次へボタンのクリックイベント
$(".nextButton").on("click",function(){
	start+=snum;
	if(start>=originalLen){
		start=originalLen-2;
	}
	showDatas(data);
	sclTop();
});

//イベント情報，メインデータの表示
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
	mainObj.append($("<div>").attr({"id":"eventsTitle","class":"blockTitle"}).text("イベント情報"));
	$("#pageGuide").text((start+1)+"～"+(start+dataNum)+"件目を表示("+data.length+"件中)");
	for(var i = start; i < start+dataNum; i++) {
		mainObj.append($("<li>").attr({"id":"event"+(i+1),"class":"eventInfo"}));
		var ebn=("#event"+(i+1));
		var evObj=$(ebn);
		evObj.append($("<div>").attr({"class":"event_name"}).text(data[i].event_name));

		evObj.append($("<div>").attr({"class":"event_obj"}));
		evObj=$(ebn+" .event_obj");

		evObj.append($("<div>").attr({"class":"evBlock eb1"}));

		$(ebn+" .eb1").append($("<div>").attr({"class":"category evblbl","name":data[i].category}));
		var tt=$(ebn+" .category");
		tt.append($("<div>").attr({"class":"category_index"}).text("カテゴリ"));
		tt.append($("<div>").attr({"class":"category_text"}).text(data[i].category));
		
		evObj.append($("<div>").attr({"class":"evBlock eb2"}));
		$(ebn+" .eb2").append($("<div>").attr({"class":"start_date evblbl"}));
		var tt=$(ebn+" .start_date");
		tt.append($("<div>").attr({"class":"start_date_index"}).text("開始日"));
		tt.append($("<div>").attr({"class":"start_date_text"}).text(data[i].start_date));

		$(ebn+" .eb2").append($("<div>").attr({"class":"end_date evblbl"}));
		tt=$(ebn+" .end_date");
		tt.append($("<div>").attr({"class":"end_date_index"}).text("終了日"));
		tt.append($("<div>").attr({"class":"end_date_text"}).text(data[i].end_date));

		evObj.append($("<div>").attr({"class":"evBlock eb3"}));
		$(ebn+" .eb3").append($("<div>").attr({"class":"description evblbl"}));
		tt=$(ebn+" .description");
		tt.append($("<div>").attr({"class":"description_index"}).text("説明"));
		tt.append($("<div>").attr({"class":"description_text"}).text(data[i].description));

		evObj.append($("<div>").attr({"class":"evBlock eb4"}));
		$(ebn+" .eb4").append($("<div>").attr({"class":"schedule_description evblbl"}));
		tt=$(ebn+" .schedule_description");
		tt.append($("<div>").attr({"class":"schedule_description_index"}).text("スケジュール"));
		tt.append($("<div>").attr({"class":"schedule_description_text"}).text(data[i].schedule_description));

		evObj.append($("<div>").attr({"class":"evBlock eb5"}));
		$(ebn+" .eb5").append($("<div>").attr({"class":"contact evblbl"}));
		tt=$(ebn+" .contact");
		tt.append($("<div>").attr({"class":"contact_index"}).text("連絡方法"));
		tt.append($("<div>").attr({"class":"contact_text"}).text(data[i].contact));

		$(ebn+" .eb5").append($("<div>").attr({"class":"contact_phone_number evblbl"}));
		tt=$(ebn+" .contact_phone_number");
		tt.append($("<div>").attr({"class":"contact_phone_number_index"}).text("連絡先電話番号"));
		tt.append($("<div>").attr({"class":"contact_phone_number_text"}).text(data[i].contact_phone_number));

		evObj.append($("<div>").attr({"class":"evBlock eb6"}));
		$(ebn+" .eb6").append($("<div>").attr({"class":"event_place evblbl"}));
		tt=$(ebn+" .event_place");
		tt.append($("<div>").attr({"class":"event_place_index"}).text("イベント開催場所"));
		tt.append($("<div>").attr({"class":"event_place_text"}).text(data[i].event_place));
		
		$(ebn+" .eb6").append($("<div>").attr({"class":"latitude evblbl"}));
		tt=$(ebn+" .latitude");
		tt.append($("<div>").attr({"class":"latitude_index"}).text("緯度"));
		tt.append($("<div>").attr({"class":"latitude_text"}).text(data[i].latitude));

		$(ebn+" .eb6").append($("<div>").attr({"class":"longitude evblbl"}));
		tt=$(ebn+" .longitude");
		tt.append($("<div>").attr({"class":"longitude_index"}).text("経度"));
		tt.append($("<div>").attr({"class":"longitude_text"}).text(data[i].longitude));

		$(ebn+" .eb6").append($("<div>").attr({"class":"city evblbl"}));
		tt=$(ebn+" .city");
		tt.append($("<div>").attr({"class":"city_index"}).text("市町村"));
		tt.append($("<div>").attr({"class":"city_text"}).text(data[i].city));

	}
	checkbnBtn();
}

//カテゴリの種類の取得
function getCategories(data){
	for(var i=0;i<data.length;i++){
		categories.push(data[i].category);
		holdingCheck(data,i);
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

//開催中のものを追加
function holdingCheck(data,i){
	var s=data[i].start_date;
	var e=data[i].end_date;
	if(s <= today && e >= today){
		holdings.push(data[i]);
	}
}

//重複削除
function arrayUnique (array) {
	return array.filter(function(value, index) {
		return index === array.indexOf(value) ;
	} ) ;
}


