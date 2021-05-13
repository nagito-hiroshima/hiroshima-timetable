function run(){
    var url = 'https://www.train-guide.westjr.co.jp/api/v3/sanyo2.json';
    var url_st = url.replace('.json','_st.json');
    var res = request.urlopen(url);
    var res_st = request.urlopen(url_st);
    var data = json.loads(res.read().decode('utf-8'));
    var data_st = json.loads(res_st.read().decode('utf-8'));
    var dictst = {};

    for (station in data_st['stations']){

    }
    dictst[station['info']['code']] = station['info']['name']

        for (item in data['trains'])
            if (item['delayMinutes'] > 0){


                stn = item['pos'].split('_')
                    try{
                        position = dictst[stn[0]] + '辺り'
                    }
                    finally{
                        position = "どこかよくわかんない"
                        }
            }

document.getElementById('mydiv').innerHTML= dictst;
        }