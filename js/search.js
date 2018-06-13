var originalData=[];
var originalLen=0;
var sNumMax=1000;
var snum=sNumMax;
var data=[];
var start=0;
var categories=[];

//データ読み込み
$(function() {
	$.getJSON("data/fukui-event.json" , function(jsons) {
		getCategories(jsons);
		originalData=jsons;
		data=jsons;
		originalLen=jsons.length;
		showDatas(jsons);
	});
});

//キーワード検索内でEnter押下で検索開始
function searchSbm(code){
	if(code==13){
		$("#searchButton").trigger("click");
	}
}

//キーワード絞り込み
$("#searchButton").on("click", function(){
	var key=$("#searchText").val();
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
	start=0;
	showDatas(data);
	sclTop();
});

//カテゴリ絞りこみ
$("#contents").on("click",".category",function(){
	var val=$(this).attr("name");
	data=[];
	if(val=="") data=originalData;
	else{
		for(var i=0;i<originalLen;i++){
			if(originalData[i].category==val){
				data.push(originalData[i]);
			}
		}
	}
	start=0;
	showDatas(data);
	sclTop();
});

//表示件数設定(カスタム)の変更ボタン押下
$("#snumButton").on("click", function(){
	var key=$("#snum").val();
	snumSet(key);
	showDatas(data);
	sclTop();
});

//表示数設定の反映
function snumSet(n){ 
	if(isFinite(n) && n!=null){
		if(n>0 && n<=sNumMax){
			snum=Math.floor(n);
			return;
		}
	}
}

//表示数設定(カスタム)内でEnter押下で反映
function snumSbm(code){
	if(code==13){
		$("#snumButton").trigger('click');
	}
}

//10件30件全件ボタン
$(".snumChange").on("click",function(){
	snum=parseInt($(this).attr("value"));
	showDatas(data);
	sclTop();
});

//イベント情報のトップに移動(ヌルっと)
function sclTop(){
	var speed = 300;
	var target = $("#top");
	var position = target.offset().top;
	$("html, body").animate({scrollTop:position}, speed, "swing");

}

