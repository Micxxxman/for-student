import { PH_Meter } from "./PH_meter.js";
import { PH_data_chart } from "./chart.js";

import { Temp_Meter } from "./Temp_meter.js";
import { Temp_data_chart } from "./chart_temp.js";

import { Do_Meter } from "./Do_mete.js";
import { Do_data_chart } from "./chart_do.js";

// import { Ec_Meter } from "./EC_mete.js";
//  import { Ec_data_chart } from "./chart_EC.js";
var old_PH = 0;
var old_temp = 0;
var old_do = 0;
var old_CONDUCTMITY = 0
export function data(){
$(document).ready(function () {
    // PH_Meter(50);
       //请求Http接口，获得连接Websocket的必备信息
       
       $("#getDataButton").click(function (){
       
$.get({ 
    // http接口地址
    url: "https://api.neptune-iiot.net/device/websocket",
    data: {
        //传入http的Token验证
        app_id: "nep309224a2b",
        //传入要订阅实时数据的设备UUID
        app_secret: "7273a59f5d54e0e760fe946bd95c3815",
        //设备的UUID
        uuid:"61E9-2F9F-E62A-8C69"
    },
    //指定返回的数据以Json解析
    dataType:'json',
    success: function (result) {
        //获取Websocket信息成功
        if(result.code === 200){
            //websocket的url
            var url = result.data.websocket;
            // 设备实时数据的topic
            var topic = result.data.topic;
            //所属团队的令牌(Token)
            var token = result.data.token;
            //stompClient的clientid
            var clientid = result.data.clientid;

            //创建Stomp实例
            var stompClient = Stomp.client(url);
            //连接WebSocket Server
            stompClient.connect({
                
                login: token,
                'client-id':clientid
            }, function () {
                // run(50)
                
                //连接成功时，订阅设备数据
                stompClient.subscribe(topic, function (result) {
                    //获得设备数据,此处为String类型
                    if (result.body) {
                        //转换设备数据为JSON
                        
                       var message = $.parseJSON(result.body);
                       console.log(message.data.TRI_SEN_0);
                       
                    //    run(message.data.TRI_SEN_0);

                    //    run(50);
                       var divElement = document.getElementById("PH");
                       var scoreTextElement = document.getElementById("scoreText");

                        // Set the data-score variable
                       var PH = message.data.TRI_SEN_0;
                       var TEMP = message.data.TRI_SEN_7;
                       var DO = message.data.TRI_SEN_5;
                        if (PH > old_PH)
                        {
                            PH_Meter(PH);
                            PH_data_chart(PH);
                        }
                        old_PH =  PH;

                        if(TEMP > old_temp){
                            Temp_Meter(TEMP);
                            Temp_data_chart(TEMP);
                        }
                        old_temp = TEMP;

                        if(DO > old_do){
                            Do_Meter(DO);
                            Do_data_chart(DO);
                        }
                        old_do = DO;
                                            
                        // Set the data-score attribute of the element
                        divElement.setAttribute("data-score", dataScore);

              
                    }
                });
            });
            return message;
        }else{
            //弹出错误消息
            alert(result.message);
        }
    }
});
});
});
}

