var JSON_data;
var event_list;

var event_styles = {
    "CTEG Seminar": {
        "bg":"#90A9B7",
        "text":"white"
    },
    "PopGen JC":{
        "bg":"#DDE8B9",
        "text":"black"
    },
    "CCB Seminar":{
        "bg":"#CB8589",
        "text":"white"
    },
    "default":{
        "bg":"#505168",
        "text":"black"
    }
};


function get_data_array(data){
    
    var data_array = [];
   
    var headers = [];
    for (let i = 0; i<data.values[0].length; i++){
       headers.push(data.values[0][i]);
    }

    for (let i = 1; i < data.values.length; i++){
        let datum = Object();
        for (let j=0; j <data.values[0].length; j++){
            datum[headers[j]] = data.values[i][j];
        }
        data_array.push(datum);
    }
	return data_array;
			
}

function date_compare(r1,r2) {
  let a = new Date(r1.DATE);
  let b = new Date(r2.DATE);
  if (a > b)
    return 1;
  if (a < b)
    return -1;
  return 0;
}

(function ($) {
  $(document).ready(function(){

	function draw_labmeeting(labmeeting_array){ 
		
		let main_div = document.getElementById("labmeeting");
		for (let i = 0; i < labmeeting_array.length; i++){
			var temp = document.getElementById("labmeeting_template");
			var clon = temp.content.cloneNode(true);
			let currdata = labmeeting_array[i];
            clon.getElementById("COL1").innerHTML=currdata.Date;
            clon.getElementById("COL2").innerHTML=currdata.Presenter;
		    main_div.appendChild(clon);
        }
    }

	function draw_labjobs(labjobs_array){ 
		
		let main_div = document.getElementById("labjobs");
		for (let i = 0; i < labjobs_array.length; i++){
			var temp = document.getElementById("labjob_template");
			var clon = temp.content.cloneNode(true);
			let currdata = labjobs_array[i];
            clon.getElementById("COL1").innerHTML=currdata.Job;
            clon.getElementById("COL1").title=currdata.Description;
            clon.getElementById("COL2").innerHTML=currdata.Person;
		    main_div.appendChild(clon);
        }
    }



	function draw_events(events_array){ 
		
		let main_div = document.getElementById("events");
		main_div.innerHTML=""; 
		let row_div = document.createElement("div");
		row_div.className="row";	
		main_div.appendChild(row_div);
		
		for (let i = 0; i < events_array.length; i++){
			
			var temp = document.getElementById("event_template");
            
			var clon = temp.content.cloneNode(true);
			let currdata = events_array[i];
		    
			let curr_div = clon.getElementById("CARDHEADER");
            
            var bg_col = event_styles['default']['bg'];
            var text_col = event_styles['default']['text'];

            if (currdata.EVENT_TYPE in event_styles){
                bg_col = event_styles[currdata.EVENT_TYPE]["bg"];
                text_col = event_styles[currdata.EVENT_TYPE]["text"];
            }
            curr_div.style.backgroundColor = bg_col;
            curr_div.style.color = text_col;

			curr_div = clon.getElementById("EVENT");
			curr_div.innerHTML=currdata.EVENT_TYPE;
             
			curr_div = clon.getElementById("DATE");
			curr_div.innerHTML=currdata.DATE;
			
			curr_div = clon.getElementById("SPEAKER");
			curr_div.innerHTML=currdata.SPEAKER;
			
			curr_div = clon.getElementById("TITLE");
			curr_div.innerHTML=currdata.TITLE;
		    
            if (currdata.IMAGE_1){

                curr_div = clon.getElementById("IMAGE");
                let link = "https://drive.google.com/uc?id=" + currdata.IMAGE_1;
                curr_div.src = link;

                if (currdata.IMAGE_1 && currdata.IMAGE_2){
                    curr_div = clon.getElementById("IMAGE_2");
                    let link = "https://drive.google.com/uc?id=" + currdata.IMAGE_2;
                    curr_div.src = link;
                }else{
                    curr_div = clon.getElementById("img_col1");
                    curr_div.classList.remove("col-md-2");
                    curr_div.classList.add("col-md-4");
                    clon.getElementById("IMAGE_2").remove();
                    clon.getElementById("img_col2").remove();
                }
            }
            else{
                curr_div = clon.getElementById("IMAGE");
			    let link = "https://drive.google.com/uc?id=1KrxXeidcTDxfQzgLeR9czbLR7OVdvcr-";
                curr_div.src = link;
            }
			
			curr_div = clon.getElementById("abstract_ID");
			curr_div.innerHTML=currdata.ABSTRACT;
			curr_div.id = currdata.ID;
			
			curr_div = clon.getElementById("abstract_button");
			let newid = "#" + currdata.ID;
			curr_div.dataset.target = newid;
			
			row_div.appendChild(clon);
			row_div.append(document.createElement("br"));
		}
		
		$(function () {
		  $('[data-toggle="popover"]').popover()
		})
	}
    
    $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/18L58hTSOKeZDO-8O2Bfdg-ZWmc9mQbMSh7KMzYtOzrI/values/LabMeeting?key=AIzaSyCdZChtatuP0KOBYfHOtZiuHh4VVG3JyHs', function(data)   {
        labmeeting_list = get_data_array(data);
        draw_labmeeting(labmeeting_list);
    });

    $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/18L58hTSOKeZDO-8O2Bfdg-ZWmc9mQbMSh7KMzYtOzrI/values/LabJobs?key=AIzaSyCdZChtatuP0KOBYfHOtZiuHh4VVG3JyHs', function(data)   {
        labjobs_list = get_data_array(data);
        draw_labjobs(labjobs_list);
    });
    
   	
  });
})(jQuery);


