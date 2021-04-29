var Live = "";	
	function progress_bar_update(btn, limit){
	
		var e = document.getElementById("selectprogess"); 
		var selectedprogess = e.options[e.selectedIndex].value;	
		
		var old_value = document.getElementById("percent-"+selectedprogess).innerHTML;
		old_value = old_value.slice(0, - 1);
		
		btn = parseInt(btn,0) + parseInt(old_value,0);
		if (btn >= limit){
			document.getElementById(selectedprogess).style="background-color: red;width:"+btn+"%; visibility: visible;transition: width 0.25s";
			document.getElementById("percent-"+selectedprogess).innerHTML = btn+"%";		
		} else if (btn > 0 ){		
			document.getElementById(selectedprogess).style="width:"+btn+"%; visibility: visible;transition: width 0.25s";
			document.getElementById("percent-"+selectedprogess).innerHTML = btn+"%";		
		} else {
			document.getElementById(selectedprogess).style="width:0%;visibility: hidden;";
			document.getElementById("percent-"+selectedprogess).innerHTML = "0%";
		}
	}
	
	function processresponse(json_in){
		if (typeof json_in == "object"){
			Live = json_in;			
		} else {
			Live = JSON.parse(json_in);
		}
		
		var buttonselector = "";
	
		
			for (var i = 0; i < Live.buttons.length; i++) {
		
			buttonselector = buttonselector + "<button class='btncontrols' onclick='progress_bar_update("+Live.buttons[i]+","+100+")' value='"+Live.buttons[i]+"'>"+ Live.buttons[i] +"</button>";	
		}
	

	
	
		
		document.getElementById("btnctrls").innerHTML = buttonselector;
		
		var barselector = "<select id='selectprogess'>";
		var progressUI = "";
		
		
		for (var j = 0; j < Live.bars.length; j++){
			var counter = j + 1;
			barselector = barselector+ "<option value='progress"+counter+"'>#Progress"+ counter +"</option>";
			progressUI = progressUI + "<div class='prog-border'><div id='progress"+counter+"' class='prog-container prog-gray' style='width:"+ Live.bars[j]+"%'></div><div class='percent' title='"+Live.limit+"' id='percent-progress"+counter+"'>"+Live.bars[j]+"%</div></div>";
		}
		barselector = barselector + "</select>";
		
		document.getElementById("barctrls").innerHTML = barselector;
		document.getElementById("prog").innerHTML = progressUI;
	}

	function loadJSON(path, success, error)	{
		var XHRR = new XMLHttpRequest();
		XHRR.onreadystatechange = function()
		{
			if (XHRR.readyState === XMLHttpRequest.DONE) {
				if (XHRR.status === 230) {
					if (success)
						success(JSON.parse(XHRR.responseText));
				} else {
					if (error)
						error(XHRR);
				}
			}
		};
		XHRR.open("GET", path, true);
		XHRR.send();
	}
	loadJSON('https://pb-api.herokuapp.com/bars',
         function(data) { 
		
			processresponse(data); 			
		 },
         function(data) { 	
			console.log(data.response);
			processresponse(data.response); 
			
		 }
	);	