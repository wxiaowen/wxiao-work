
    angular.module('myApp', []).controller('weatherCtrl', function ($scope, $http) {

        $http.get('http://wxw.ngrok.xiaomiqiu.cn/api/weather/dayinfos').success(function (response) {
            $scope.Weather6 = response.HeWeather6;
            charFunction($scope.Weather6[0].daily_forecast);
            console.log($scope.Weather6[0]);

            var data = [{
                lat: $scope.Weather6[0].basic.lat,
                lon: $scope.Weather6[0].basic.lon,
                color: 'green',
                name: $scope.Weather6[0].basic.parent_city
            }];
            console.log(data);
            var map = new Highcharts.Map('container', {
                title: {
                    text: '你所在位置'
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                tooltip: {
                    useHTML: true,
//                    formatter: function () {
//                        return "你所在位置：" + this.point.name;
//                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        },
                        marker: {
                            radius: 3
                        }
                    }
                },
                series: [{
                    // 空数据列，用于展示底图
                    mapData: Highcharts.maps['cn/china'],
                    showInLegend: false
                }, {
                    type: 'mappoint',
                    name: '中国地图',
                    data: data
                }]
            });
        });
        $http.get('http://wxw.ngrok.xiaomiqiu.cn/api/get-ip').success(function (response) {
            $scope.ip = response.ip;
            $scope.count = response.count;
        });
    });

    //绘制表格
    function charFunction(result) {
        var date = new Array();
        var tmp_min = new Array();
        var tmp_max = new Array();
        var cond_txt_d = new Array();
        var cond_txt_n = new Array();
        var len = 0;
        for (var i = 0; i < (len = result.length); i++) {
            date[i] = result[i].date;
            tmp_min[i] = result[i].tmp_min;
            tmp_max[i] = result[i].tmp_max;
            cond_txt_d[i] = result[i].cond_txt_d;
            cond_txt_n[i] = result[i].cond_txt_n;

        }

        var options = {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: '温度走势'
            },
            xAxis: [{
                categories: date,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis

                title: {
                    text: '',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                labels: {
                    style: {
                        color: '#ff3da6'
                    }
                },
                title: {
                    text: '温度(℃)',
                    style: {
                        color: '#67cdcc'
                    }
                },
                opposite: false
            }],
            tooltip: {
                shared: true,
//                formatter: function () {
//                        return "白天：" + cond_txt_n+"夜晚："+cond_txt_d  ;
//                    }
            },
            exporting: {enabled: false},
            series: [{
                name: '最高温度',
                type: 'spline',
                yAxis: 1,
                color: '#4BB44B',
                data: tmp_max,

                tooltip: {
                    valueSuffix: '℃'
                }

            },
                {
                    name: '最低温度',
                    type: 'spline',
                    yAxis: 1,
                    color: '#a222bb',
                    data: tmp_min,
                    tooltip: {
                        valueSuffix: '℃'
                    }
                }
            ]
        };

        // 图表初始化函数
        var chart = Highcharts.chart('weatherChart', options);
    };



//听歌
function jump() {
    window.location.href = "/music";

}

function sing() {
    var audio = document.getElementsByTagName('audio')[0];
    var play = document.getElementById("ic_play_img");
    var coverAlum = document.getElementById("cover_alum");
    if (audio.paused) {
        audio.play();
        //适配各种浏览器
        coverAlum.style.animationName = "go";
        coverAlum.style.animationPlayState = "running";
        coverAlum.style.webkitAnimationName = "go";
        coverAlum.style.webkitAnimationPlayState = "running";
        coverAlum.style.mozAnimationName = "go";
        coverAlum.style.mozAnimationPlayState = "running";
        coverAlum.style.oAnimationName = "go";
        coverAlum.style.oAnimationPlayState = "running";
        coverAlum.style.oAnimationPlayState = "running";
        play.style.display = "none";
    } else {
        audio.pause();
        //适配各种浏览器
        coverAlum.style.animationName = "go";
        coverAlum.style.animationPlayState = "paused";
        coverAlum.style.webkitAnimationName = "go";
        coverAlum.style.webkitAnimationPlayState = "paused";
        coverAlum.style.mozAnimationName = "go";
        coverAlum.style.mozAnimationPlayState = "paused";
        coverAlum.style.oAnimationName = "go";
        coverAlum.style.oAnimationPlayState = "paused";
        play.style.display = "block";
    }
}



