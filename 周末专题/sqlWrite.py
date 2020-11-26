import pymysql
import pandas as pd
import datetime
data = pd.read_table('weekendDate.txt',sep='\s+', encoding = 'gb2312')

#%%
#将获取到的数据插入数据库
# 连接database
conn = pymysql.connect(host="localhost", user="root",password="123456",database="shixi",charset="utf8")
# 得到一个可以执行SQL语句的光标对象
cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
#如果没有数据表要进行生成
sql_create1 =" CREATE TABLE IF NOT EXISTS `WeekendSpecial`\
    (\
   `title` VARCHAR(100) NOT NULL,\
   `detail` VARCHAR(40) NOT NULL,\
   `herf` VARCHAR(100) NOT NULL,\
   `upgrade_date` DATE\
    )\
    ENGINE=InnoDB DEFAULT CHARSET=utf8;"
cursor.execute(sql_create1)
#批量插入数据
sql_country = "INSERT INTO WeekendSpecial  VALUES (%s, %s, %s, %s)"
for i in range(len(data)):
    a = data['Title'][i]
    b = data['Detail'][i]
    c = data['herf'][i]
    d = datetime.datetime.now().strftime('%Y-%m-%d')
    values = (a, b, c, d)#在从也可以进行插入数据格式修改
    cursor.execute(sql_country,values)
#在插入完数据之后，将最近跟新的数据覆盖掉之前有的数据，也就是查找重复，如果时间越早则删除记录
conn.commit()
sql_delete_weekend=" delete from WeekendSpecial where (title,upgrade_date) in (select title,n from(select title,min(upgrade_date)as n,count(*) as c from WeekendSpecial group by `title` having c>1)as t)"
cursor.execute(sql_delete_weekend)
# 执行SQL语句
conn.commit()
# 关闭光标对象
cursor.close()
# 关闭数据库连接
conn.close()
print('done')