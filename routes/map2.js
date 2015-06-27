exports.recommend = function(shop, cid){
    var max = 0;
    var rule_arr_out = [];
    cid = 1;
    var select = 10;
    var t = 0;
    while(t<select){
        max = 0;
        for(var i in shop[cid].Rule_Arr){
            if(shop[cid].Rule_Arr[i].Count>max){
                var bool = true;
                var k = 0;
                for(k = 0;k<rule_arr_out.length;k++){  
                    if(rule_arr_out[k] === i)
                        bool = false;
                }
                if(bool){
                    max = shop[cid].Rule_Arr[i].Count;
                    console.log(max);
                    rule_arr_out[t] = i;
                }
            }
        }
        t++;
    }
    for(var i = 0;i<rule_arr_out.length;i++){
        console.log("rule = "+rule_arr_out[i]);
    }
    return rule_arr_out;
}