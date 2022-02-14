var JSON_data;
var event_list;


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

        let d = new Date();
        let event_date = new Date(labmeeting_array[0].Date);
        let prev_event_date = new Date(labmeeting_array[0].Date);
		
		let main_div = document.getElementById("labmeeting");
		for (let i = 0; i < labmeeting_array.length; i++){
			var temp = document.getElementById("labmeeting_template");
			var clon = temp.content.cloneNode(true);
			let currdata = labmeeting_array[i];
            clon.getElementById("COL1").innerHTML=currdata.Date;
            clon.getElementById("COL2").innerHTML=currdata.Presenter;

            event_date = new Date(labmeeting_array[i].Date);
            
            if (i>0){
                prev_event_date = new Date(labmeeting_array[i-1].Date);
            }

            if (d > event_date){
                clon.getElementById("ROW").style.opacity="50%";
            }

            if (((d > prev_event_date) && (d<event_date)) || (i==0 && event_date>d)){
                clon.getElementById("ROW").style.color="white";
                clon.getElementById("ROW").style.background="red";
                clon.getElementById("ROW").style.opacity="50%";
            }

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
            clon.getElementById("ROW").title=currdata.Description;
            clon.getElementById("COL2").innerHTML=currdata.Person;
		    main_div.appendChild(clon);
        }
    }
	
    function draw_jc(jc_array){ 

        let d = new Date();
        let event_date = new Date(jc_array[0].Date);
        let prev_event_date = new Date(jc_array[0].Date);
        
		let main_div = document.getElementById("journalclub");
		for (let i = 0; i < jc_array.length; i++){
			var temp = document.getElementById("journalclub_template");
			var clon = temp.content.cloneNode(true);
			let currdata = jc_array[i];
            clon.getElementById("COL1").innerHTML=currdata.Date;
            clon.getElementById("COL2").innerHTML=currdata.Presenter;

            event_date = new Date(jc_array[i].Date);
            
            if (i>0){
                prev_event_date = new Date(jc_array[i-1].Date);
            }

            if (d > event_date){
                clon.getElementById("ROW").style.opacity="50%";
            }

            if (((d > prev_event_date) && (d<event_date)) || (i==0 && event_date>d)){
                clon.getElementById("ROW").style.color="white";
                clon.getElementById("ROW").style.background="blue";
                clon.getElementById("ROW").style.opacity="50%";
            }

		    main_div.appendChild(clon);
        }
    }



    $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/18L58hTSOKeZDO-8O2Bfdg-ZWmc9mQbMSh7KMzYtOzrI/values/JClub?key=AIzaSyCdZChtatuP0KOBYfHOtZiuHh4VVG3JyHs', function(data)   {
        jclub_list = get_data_array(data);
        draw_jc(jclub_list);
    });

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


