import React from 'react';
import fetchJsonp from 'fetch-jsonp';
class FetchJsonp extends React.Component {
    //构造函数
    constructor() {
        super();
        //react定义数据
        this.state = {
            list: []
        }
    }

    //请求接口的方法
    getData = () => {
        var api = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20';

        fetchJsonp(api)
            .then(function(response) {
                return response.json()
            }).then((json) => {
                console.log(json);
                //用到this需要注意指向，箭头函数
                this.setState({
                    list: json.result
                })
            }).catch(function(ex) {})
    }
    render() {
        return ( <
            div >
            <
            h2 > FetchJsonp获取数据 < /h2> <
            button onClick = { this.getData } > 获取api接口 < /button> <
            ul > {
                this.state.list.map((value, key) => {
                    return <li key = { key } > { value.title } < /li>
                })
            } <
            /ul> <
            /div>
        )
    }
}
export default FetchJsonp;