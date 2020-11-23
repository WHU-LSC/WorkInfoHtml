import pymysql
import os
import json
import datetime
from flask_cors import *
from flask_cors import CORS
os.environ['NLS_LANG'] = 'SIMPLIFIED CHINESE_CHINA.UTF8'
from flask import Flask,request
app = Flask(__name__)
CORS(app, resources=r"/*",supports_credentials=True)
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')

        elif isinstance(obj, datetime.date):
            return obj.strftime("%Y-%m-%d")

        else:
            return json.JSONEncoder.default(self, obj)
@app.route("/api/test",methods=['GET','post'])

def getcontent():
    conn = pymysql.connect(host="localhost", user="root",password="123456",database="shixi",charset="utf8")
    # 得到一个可以执行SQL语句的光标对象
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 定义要执行的SQL语句
    sql1 = "select * from shixi_country;"
    sql2 = "select * from shixi_wuhan;"
    re1 = cursor.execute(sql1)
    result1 = cursor.fetchall()
    re2 = cursor.execute(sql2)
    result2 = cursor.fetchall()
    conn.commit()
    # 关闭光标对象
    cursor.close()
    # 关闭数据库连接
    conn.close()
    data={}
    data_country={}
    data_wuhan={}
    data_country['total']=len(result1)
    data_country['message']=result1
    data_wuhan['total']=len(result2)
    data_wuhan['message']=result2
    data['country']=data_country
    data['wuhan']=data_wuhan
    request_json = request.get_json(force=True)
    if request_json: 
        return json.dumps(data, ensure_ascii=False, indent=4, cls=DateEncoder)
    else:
        # 若发生错误，未接收到数据，则返回错误信息
        return "Sorry, no json data received."
    
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8888)