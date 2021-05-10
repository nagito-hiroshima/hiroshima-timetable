import json
import urllib.request
import requests, bs4
import sys

args = sys.argv

dictst = {}
dictline = {}
payloadstr = ''
line = {}

#jsonここにある
jsonbase = 'https://www.train-guide.westjr.co.jp/api/v3/'

#近畿各路線のjson特定
try:
    pages = requests.get('https://www.train-guide.westjr.co.jp/area_kinki.html')
    pages.raise_for_status()
    soup = bs4.BeautifulSoup(pages.content, "html.parser")
    for i in soup.select(".routeList_item-link"):
        linename = i['title']
        lineurl = i['href'].replace('.html','.json')
        line[linename] = lineurl
except:
    #何もせず終了する
    pass
url = jsonbase + line[args[1]]
url_st = url.replace('.json','_st.json')

#遅延取得
try:
    res = urllib.request.urlopen(url)
    res_st = urllib.request.urlopen(url_st)
    data = json.loads(res.read().decode('utf-8'))
    data_st = json.loads(res_st.read().decode('utf-8'))

    for station in data_st['stations']:
        dictst[station['info']['code']] = station['info']['name']
    for item in data['trains']:
        if item['delayMinutes'] > 0:
            stn = item['pos'].split('_')
            try:
                position = dictst[stn[0]] + '辺り'
            except KeyError:
                position = "どこかよくわかんない"
            payload = [item['displayType'], item['dest']['text'],'行き:',item['delayMinutes'],'分遅れ',position]
            payloadstr += ' '.join(map(str,payload)) + '\n'
    if not payloadstr:
        print(args[1] + 'に電車遅延はありません')
    else:
        print('【' + args[1] + 'の遅延情報】\n' + payloadstr)

except urllib.error.HTTPError as err:
    print('HTTPError: ', err)
except json.JSONDecodeError as err:
    print('JSONDecodeError: ', err)