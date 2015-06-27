exports.createRules = function(text){
    var output = {};
    var shop = [];
    var Previous = [];
    var seperate = [];
    var total_count;
    var cid;
    // var text = req.body;
    var seperate_count;
    var arr ;//= text[0];
    var z = 0;
    for(z = 0;z<text.length;z++){
    	arr = text[z];
    	cid = arr.CID;
    	total_count = 0;
    	if(shop.length == 0){
    		output = {};
    		To_Data_Base_Null();
    		shop[cid] = {"Rule_Arr":output,"Total_Count":total_count};

    	}else{
    		if (cid in shop){
    			output = shop[cid].Rule_Arr;
    			total_count = shop[cid].Total_Count;
    			To_Data_Base();
    			shop[cid] = {"Rule_Arr":output,"Total_Count":total_count};
    		}else{
    			output = {};
    			To_Data_Base_Null();	
    			shop[cid] = {"Rule_Arr":output,"Total_Count":total_count};
    		}
    	}
    }

    // res.json(shop);
    return shop;









    // sub functions
    function size(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    // Get the size of an object
    // var size = Object.size(myArray);

    function To_Data_Base(){
    	var i;
    	var sid = arr.SID;
    	
    	var ShoppingList = arr.ShoppingList;
    	var Time = arr.Time;
    	var j = total_count+1;
    	if(ShoppingList.length>1){
    		var jsonarr = [];
    		for(i = 0;i<ShoppingList.length;i++){
    			jsonarr.push(ShoppingList[i].PID);
    		}
    		
    		for(i = 0;i<jsonarr.length;i++){
    			var jsontemp = jsonarr[i];
    			jsonarr[i] = -1;
    			seperate_count = 0;
    			j = recursive(jsonarr,j,jsontemp);
    			seperate.push(seperate_count);
    			jsonarr[i] = jsontemp;
    		}
    	}
        total_count = j-1;
    }
    function To_Data_Base_Null(){	
    	var i;
    	var sid = arr.SID;
    	
    	var ShoppingList = arr.ShoppingList;
    	var Time = arr.Time;
    	var jsonarr = [];
    	for(i = 0;i<ShoppingList.length;i++){
    		jsonarr.push(ShoppingList[i].PID);
    	}
    	var j = 1;
    	for(i = 0;i<jsonarr.length;i++){
    		var jsontemp = jsonarr[i];
    		jsonarr[i] = -1;
    		seperate_count = 0;
    		j = recursive_null(jsonarr,j,jsontemp);
    		seperate.push(seperate_count);
    		jsonarr[i] = jsontemp;
    	}
    	total_count = j-1;
    }
    function recursive(jarr,j1,Recom){
    	var i1 = 0;
    	for(i1 = 0;i1<jarr.length;i1++){
    		if(jarr[i1]>=0){
    			seperate_count++;
    			Previous.push(jarr[i1]);
    			var tempout = Previous.slice(0,Previous.length);
    			var rule = tempout+"-"+Recom;
    			if(output[rule]){
    				output[rule].Count++;
    			}else{
    				var jsonObject = {
    	                RID:j1,
    	                Previous: tempout,
    	                Recommand: Recom,
    	                Rule: rule,
    	                Count: 1
    	            };
    				output[j1]=jsonObject;
    	            output[rule]=jsonObject;
    	            j1++;
    			}
    			var jarrtemp;
    			jarrtemp = jarr[i1];
    			jarr[i1] = -1;
    			j1 = recursive(jarr,j1,Recom);
    			Previous.pop();
    			jarr[i1] = jarrtemp;
    		}
    	}
    	return j1;
    }

    function recursive_null(jarr,j1,Recom){
    	var i1 = 0;
    	for(i1 = 0;i1<jarr.length;i1++){
    		if(jarr[i1]>=0){
    			seperate_count++;
    			var jarrtemp;
    			Previous.push(jarr[i1]);
    			var tempout = Previous.slice(0,Previous.length);
    			var rule = tempout+"-"+Recom;
    			var jsonObject = {
    	                RID:j1,
    	                Previous: tempout,
    	                Recommand: Recom,
    	                Rule: rule,
    	                Count: 1
    	            };
    				output[j1]=jsonObject;
    	            output[rule]=jsonObject;
                j1++;
    			jarrtemp = jarr[i1];
    			jarr[i1] = -1;
    			j1 = recursive_null(jarr,j1,Recom);
    			Previous.pop();
    			jarr[i1] = jarrtemp;
    		}
    	}
    	return j1;
    }
}