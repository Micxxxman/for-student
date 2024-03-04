// { "action" : "data", "time" : "2024-02-28 11:35:16.100", "uuid" : "B1E6-9C7F-E9FA-2139", "data" : { "Led11" : 0.0, "Led12" : 0.0, "Led13" : 0.0, "Led21" : 0.0, "Led22" : 0.0, "Led23" : 0.0, "Led31" : 0.0, "Led32" : 
// 0.0, "Led33" : 0.0, "Fan1" : false, "Fan2" : false, "Fan3" : false, "Pump1" : "FALSE", "Pump2" : "FALSE", "Pump3" : "FALSE", "PM25" : 24.0, "PM100" : 31.0, "Co2" : 442.0, "Jiaquan" : 0.0, "O3" : 0.0, "O2" : 
// 16.7, "Shinei_WD" : 19.4, "Shinei_SD" : 81.4, "Electricity" : 69.0, "Battery_Voltage" : 50.0, "Battery_Ampere" : 0.6, "PV_Voltage" : 0.0, "PV_Ampere" : 0.0, "Battery_Status" : 0.0, "Emeter_Voltage_1" : 0.0, 
// "Emeter_Ampere_1" : 0.0, "Emeter_Power_1" : 6.36, "Emeter_Voltage_2" : 0.0, "Emeter_Ampere_2" : 0.0, "Emeter_Power_2" : 112.59, "Water_Level" : 220.0, "Flow_Amount" : 0.0, "Flow_Rate" : 0.0, 
// "Conductivity" : 17563.0, "Forward_Cumulative_Flow" : 0.0, "Reverse_Cumulative_Flow" : 0.0, "Cumulative_Net_Flow" : 0.0, "RJO2" : 0.0, "RJO2_1" : 0.0, 
// "Water_Tem" : 18.6, "EC" : 0.16, "TDS" : 80.0, "Yandu" : 0.8, "Resistance" : 0.0, "Ph" : 745.0, "lastDataReceiveTime" : { "$date" : 1709091307538 } }, 
// "receiveTime" : { "$date" : 1709091317410 }, "create_date" : "2024-02-28 11:35:17.450" }




import { PH_Meter } from "./PH_meter.js";
import { PH_data_chart } from "./chart.js";

import { Temp_Meter } from "./Temp_meter.js";
import { Temp_data_chart } from "./chart_temp.js";

import { TDS_Meter } from "./TDS_mete.js";
import { Temp_data_chart_t } from "./chart_tds.js";

//  import { Do_data_chart_t } from "./chart_do_test.js";
import { Ec_data_chart_t } from "./chart_Ec_test.js";
import { Ec_Meter } from "./EC_mete.js";
// import { Ec_data_chart } from "./chart_EC.js";
import {Power_data_chart} from "./chart_power.js"

var old_PH = 0;
var old_temp = 0;
var old_TDS = 0;
var old_CONDUCTMITY = 0;
var PW_Battery_old =0;
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
        uuid:"B1E6-9C7F-E9FA-2139"
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
                       var divElement = document.getElementById("PH");
                       var scoreTextElement = document.getElementById("scoreText");

                        // Set the data-score variable
                        var PH = message.data.Ph;
                        var TEMP = message.data.Water_Tem;
                        var TDS_ = message.data.TDS;
                        var CONDUCTMITY = message.data.Conductivity;
                       var PW_Battery = message.data.Electricity;
                     
                       if (PH > old_PH) 
                        {
                            PH_Meter(PH*0.01);
                            PH_data_chart(PH*0.01);
                        }
                        old_PH =  PH;

                        if(TEMP > old_temp){
                            Temp_Meter(TEMP);
                            Temp_data_chart(TEMP);
                        }
                        old_temp = TEMP;

                        if(TDS_ > old_TDS){
                            TDS_Meter(TDS_);
                            Temp_data_chart_t(TDS_);
                        }
                        old_TDS = TDS_;
  
                        if(CONDUCTMITY >= old_CONDUCTMITY){
                            Ec_Meter(CONDUCTMITY*0.001);
                            Ec_data_chart_t(CONDUCTMITY*0.001);
                            // Ec_data_chart(Resistance);
                        }
                        old_CONDUCTMITY = CONDUCTMITY;
                        
                        if(PW_Battery >= PW_Battery_old){
                            // Ec_Meter(Power);
                            Power_data_chart(PW_Battery);
                            // Ec_data_chart(Resistance);
                        }
                        PW_Battery_old = PW_Battery;
                       
              
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

