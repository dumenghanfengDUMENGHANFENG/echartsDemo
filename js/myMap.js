let sectionId = ''
let swiperTime = 10000 //饼图高亮(多久循环一次)
let fullScreenIsShow = true //判断是否全屏
let popupWindowIsShow = true
let noData = ` <div class="noData"><div class="noData-img"><img  class="noData-img1" src="img/multiple-9.png" alt=""></div><div class="noData-title">暂无数据</div></div>`
$(function () {
    reload() // 重新加载
    fullScreen() // 全屏/关闭全屏
    // delayAddRess()//定位

    // 隐患/问题趋势图(点击事件)
    $('.trendClick').click(function () {
        $(this).siblings().each(function () {
            $(this).removeClass('trendActive')
        });
        $(this).addClass('trendActive')
    })
    // 责任对比图(柱状图)(点击事件)
    $('.responsibilityClick').click(function () {
        $(this).siblings().each(function () {
            $(this).removeClass('trendActive')
        });
        $(this).addClass('trendActive')
    })
    //  责任对比图(玫瑰图)(点击事件)
    $('.roseChartClick').click(function () {
        if ($(this).hasClass('roseChartActive')) {
            $(this).removeClass('roseChartActive')
        } else {
            $(this).siblings().each(function () {
                $(this).removeClass('roseChartActive')
            });
            $(this).addClass('roseChartActive')
        }
    })
    //  //问题等级(点击事件)
    $('.problemLevelClick').click(function () {
        if ($(this).hasClass('roseChartActive')) {
            $(this).removeClass('roseChartActive')
        } else {
            $(this).siblings().each(function () {
                $(this).removeClass('roseChartActive')
            });
            $(this).addClass('roseChartActive')
        }
    })
})
// 重新加载
function reload() {
    technology() // 工艺
    procedure() //工序
    problemLevel() //问题等级
    problemType() // 问题类型
    trend() // 隐患/问题趋势图
    responsibilityBarChart() // 责任对比图(柱状图)
    responsibilityRoseChart() // 责任对比图(玫瑰图)
}
// 责任对比图(玫瑰图)
function responsibilityRoseChart() {
    var myChart = echarts.init(document.querySelector(".responsibilityRoseChart"), null, {
        devicePixelRatio: 2.5
    });
    let data = []
    data = [{
            name: '测试一',
            value: 0.1 + 0.1,
            rate: 10,
        },
        {
            name: '测试二',
            value: 0.8 + 0.1,
            rate: 15,
        }, {
            name: '测试三',
            value: 0.7 + 0.1,
            rate: 25,
        }, {
            name: '测试四',
            value: 0.6 + 0.1,
            rate: 80,
        }
    ]
    option = {
        tooltip: { //此处配置鼠标移动对应区域时的黑色弹框
            trigger: 'item',
            // show:false,
            formatter: function (item) {
                return `构件类型: ${item.data.name}<br/>数量: ${toPercent(item.data.value-0.1)}`
            },
        },
        color: ['#05CEFF', '#91C849', '#F035A1', '#2D71F2', '#FFA61A'],
        series: [{
            data: data,
            type: 'pie',
            radius: [20, 95],
            center: ['50%', '45%'],
            roseType: 'radius',
            avoidLabelOverlap: false,
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // echarts自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    bulgeTimer(data, myChart)
}
// 责任对比图(柱状图)
function responsibilityBarChart() {
    var myChart = echarts.init(document.querySelector('.responsibilityBarChart'), null, {
        devicePixelRatio: 2.5
    });
    let xAxisData = ['A工区', 'C工区', 'D工区', 'E工区', 'F工区', 'G工区']
    let seriesData = [10, 20, 30, 40, 50, 60]
    var yMax = 70;
    var dataShadow = []; //动态阴影
    let checkName = ''
    option2 = {
        tooltip: { //此处配置鼠标移动对应区域时的黑色弹框
            trigger: 'item',
            show: true
        },
        grid: {
            left: '25',
            right: '25',
            bottom: '20',
            top: '30',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#374D81'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#F3F4F4'
                }
            },
        },
        yAxis: {
            name: '单位:个',
            type: 'value',
            axisLabel: {
                color: '#F3F4F4',
                textStyle: {
                    fontSize: 12
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#F3F4F4'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#F3F4F4'
                }
            },
        },
        series: [{ //背景条
                type: 'bar',
                itemStyle: {
                    color: ' rgba(49, 200, 235, 0.3)'
                },
                barGap: '-75%', //偏移位置
                barCategoryGap: '40%',
                barWidth: '38', //柱形宽度
                data: dataShadow,
                animation: false
            },
            {
                data: seriesData,
                barWidth: '18', //柱形宽度
                type: 'bar',
                itemStyle: { //柱形颜色渐变色
                    normal: {
                        color: function (params) {
                            //判断选中的名字改变柱子的颜色样式
                            let str = ''
                            if (checkName == params.name) {
                                str = new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "#FAD961" // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "#F78F1C" // 100% 处的颜色
                                }], false)
                            } else {
                                str = new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: "#0099FF" // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: "#00FFF5" // 100% 处的颜色
                                }], false)
                            }
                            return str;
                        }
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.on('click', function (params) {
        dataShadow = []
        for (let i = 0; i < seriesData.length; i++) {
            dataShadow.push('')
        }
        myChart.clear();
        checkName = params.name; //重置背景色
        dataShadow[params.dataIndex] = 70
        option2.series[0].data = dataShadow //重置背景
        myChart.setOption(option2);
    })
    myChart.setOption(option2);
    // echarts自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
// 隐患/问题趋势图
function trend() {
    var myChart = echarts.init(document.querySelector('.trend'), null, {
        devicePixelRatio: 2.5
    });
    let xAxisList = ['09-01', '09-02', '09-03', '09-04', '09-05', '09-06', '09-07', '09-08', '09-09', '09-10', '09-11', '09-12',
        '09-13', '09-14', '09-15', '09-16', '09-17', '09-18', '09-19', '09-20', '09-21', '09-22', '09-23', '09-24', '09-25', '09-26',
        '09-27', '09-28', '09-29', '09-30'
    ]
    //判定是否拖动
    let dataZoomEnd = 100
    let dataZoomShow = false
    if (xAxisList.length > 20) {
        dataZoomEnd = (20 / xAxisList.length) * 100;
        dataZoomShow = true
    }
    let problemSeries1 = []
    let problemSeries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    let rectificationSeries = [10, 2, 3, 4, 5, 6, 7, 8, 91, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 70]
    option1 = {
        color: ['#F038A1', '#3BE3B5'],
        legend: {
            itemWidth: 40, // 设置宽度
            data: ['问题数量', '整改数量'],
            itemGap: 100,
            textStyle: {
                color: "#fff",
                fontSize: 14
            }
        },
        grid: {
            left: '25',
            right: '25',
            bottom: '30',
            top: '50',
            containLabel: true
        },
        tooltip: {
            trigger: "axis",
            formatter: function (params) {
                console.log(params)
                let str
                if (params.length == 2) {
                    if (params[0].componentSubType = "bar") {
                        str = `<div style="height:20px;line-height: 20px;margin-left: 20px;">${params[0].axisValue}</div>
                              <div style="display: flex;height:20px;align-items: center;font-size: 14px;">
                                 <div style="background:${params[0].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
                                 <div> ${params[0].seriesName}:${params[0].value}</div>
                              </div>
                              <div style="display:flex;height:20px;align-items: center;font-size: 14px;">
                              <div style="background:${params[1].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
                              <div>${params[1].seriesName}:${params[1].value}</div>
                           </div>`
                    }

                } else if (params.length == 3) {
                    if (params[0].componentSubType = "bar") {
                        str = `<div style="height:20px;line-height: 20px;margin-left: 20px;">${params[1].axisValue}</div>
                              <div style="display: flex;height:20px;align-items: center;font-size: 14px;">
                                 <div style="background:${params[1].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
                                 <div> ${params[1].seriesName}:${params[1].value}</div>
                              </div>
                              <div style="display:flex;height:20px;align-items: center;font-size: 14px;">
                              <div style="background:${params[2].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
                              <div>${params[2].seriesName}:${params[2].value}</div>
                           </div>`
                    }

                }
                return str
            },
            triggerOn: 'mousemove',
            backgroundColor: 'none',
            textStyle: {
                fontSize: 12,
                color: '#FFFFFF',
                align: 'left'
            },
        },
        //          tooltip: {
        //            trigger: 'item',
        //            formatter: function (params) {
        //              let str
        //              if (params.componentSubType != "bar") {
        //                str = `<div style="height:20px;line-height: 20px;margin-left: 20px;">${params.name}</div>
        //                            <div style="display: flex;height:20px;align-items: center;font-size: 14px;">
        //                               <div style="background:${params.color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
        //                               <div> ${params.seriesName}:${params.value}</div>
        //                            </div>
        //                         </div>`
        //              }
        //              return str
        //            },
        //          },
        //          tooltip: {
        //            show: true,
        //            trigger: "axis",
        //            alwaysShowContent: true,
        //            showContent: true,
        //            axisPointer: {
        //              type: "shadow",
        //              shadowStyle: {
        //                color: {
        //                  type: 'linear',
        //                  colorStops: [{
        //                    offset: 1,
        //                    color: 'transparent'
        //                  }]
        //                }
        //              }
        //            },
        //            formatter: function (params) {
        //              let str
        //              if (params.length == 2) {
        //                str = `<div style="height:20px;line-height: 20px;margin-left: 20px;">${params[0].axisValue}</div>
        //	                                 <div style="display: flex;height:20px;align-items: center;font-size: 14px;">
        //	                                    <div style="background:${params[0].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
        //	                                    <div> ${params[0].seriesName}:${params[0].value}</div>
        //	                                 </div>
        //	                                 <div style="display:flex;height:20px;align-items: center;font-size: 14px;">
        //	                                 <div style="background:${params[1].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
        //	                                 <div>${params[1].seriesName}:${params[1].value}</div>
        //	                              </div>`
        //              } else if (params.length == 3) {
        //                str = `<div style="height:20px;line-height: 20px;margin-left: 20px;">${params[1].axisValue}</div>
        //	                                 <div style="display: flex;height:20px;align-items: center;font-size: 14px;">
        //	                                    <div style="background:${params[1].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
        //	                                    <div> ${params[1].seriesName}:${params[1].value}</div>
        //	                                 </div>
        //	                                 <div style="display:flex;height:20px;align-items: center;font-size: 14px;">
        //	                                 <div style="background:${params[2].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
        //	                                 <div>${params[2].seriesName}:${params[2].value}</div>
        //	                              </div>`
        //              }
        //              return str
        //            },
        //            triggerOn: 'click',
        //            backgroundColor: 'none',
        //            textStyle: {
        //              fontSize: 12,
        //              color: '#FFFFFF',
        //              align: 'left'
        //            },
        //          },
        // tooltip: {
        //     show: true,
        //     trigger: "axis",
        //     alwaysShowContent: true,
        //     showContent: true,
        //     axisPointer: {
        //         type: "shadow",
        //         shadowStyle: {
        //             color: {
        //                 type: 'linear',
        //                 colorStops: [{
        //                     offset: 1,
        //                     color: 'transparent'
        //                 }]
        //             }
        //         }
        //     },
        //     formatter: function (params) {
        //         let str
        //         if (params.length == 2) {
        //             str = `<div style="height:20px;line-height: 20px;margin-left: 20px;">${params[0].axisValue}</div>
        //             <div style="display: flex;height:20px;align-items: center;font-size: 14px;">
        //                <div style="background:${params[0].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
        //                <div> ${params[0].seriesName}:${params[0].value}</div>
        //             </div>
        //             <div style="display:flex;height:20px;align-items: center;font-size: 14px;">
        //             <div style="background:${params[1].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
        //             <div>${params[1].seriesName}:${params[1].value}</div>
        //          </div>`
        //         } else if (params.length == 3) {
        //             str = `<div style="height:20px;line-height: 20px;margin-left: 20px;">${params[1].axisValue}</div>
        //             <div style="display: flex;height:20px;align-items: center;font-size: 14px;">
        //                <div style="background:${params[1].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
        //                <div> ${params[1].seriesName}:${params[1].value}</div>
        //             </div>
        //             <div style="display:flex;height:20px;align-items: center;font-size: 14px;">
        //             <div style="background:${params[2].color};width:12px;height:12px;line-height: 15px;margin-right: 10px;border-radius: 50%;"></div>
        //             <div>${params[2].seriesName}:${params[2].value}</div>
        //          </div>`
        //         }
        //         return str
        //     },
        //     triggerOn: 'click',
        //     backgroundColor: 'none',
        //     textStyle: {
        //         fontSize: 12,
        //         color: '#FFFFFF',
        //         align: 'left'
        //     },
        // },
        // dataZoom: [{
        //     type: 'inside',
        //     start: 0,
        //     show: dataZoomShow,
        //     end: dataZoomEnd, //一页面多少柱形
        //     zoomOnMouseWheel: false,
        // }],
        xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: xAxisList,
                minInterval: 1,
                splitLine: { //分割线
                    show: true,
                    lineStyle: {
                        color: '#345983'
                    }
                },
                axisTick: { //是否显示刻度
                    show: false
                },
                axisLabel: { //X轴字体颜色
                    show: true,
                    interval: 0,
                    rotate: 40,
                    color: '#FFFFFF'
                },
                axisLine: { //X轴轴线
                    show: true,
                    lineStyle: {
                        color: '#71A8E8'
                    }
                },
            },
            {
                type: 'category',
                minInterval: 1,
                splitLine: { //分割线
                    show: true,
                    lineStyle: {
                        color: '#345983'
                    }
                },
                axisTick: { //是否显示刻度
                    show: false
                },
                axisLabel: { //X轴字体颜色
                    show: true,
                    interval: 0,
                    color: '#FFFFFF'
                },
                axisLine: { //X轴轴线
                    show: true,
                    lineStyle: {
                        color: '#345983'
                    }
                },
            }
        ],
        yAxis: [{
            name: '单位:个',
            type: 'value',
            nameTextStyle: { //Y轴名称
                color: "#FFFFFF",
                fontSize: 12
            },
            axisLabel: {
                color: '#FFFFFF',
                textStyle: {
                    fontSize: 12
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#345983'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#345983'
                }
            },
        }],
        series: [{ //背景条
                type: 'bar',
                itemStyle: {
                    color: ' rgba(49, 200, 235, 0.3)'
                },
                barGap: '-75%',
                barCategoryGap: '40%',
                barWidth: '38', //柱形宽度
                data: problemSeries1,
                animation: false
            },
            {
                name: '问题数量',
                type: 'line',
                smooth: true,
                symbol: "none",
                data: problemSeries,

            },
            {
                name: '整改数量',
                type: 'line',
                smooth: true,
                symbol: "none",
                data: rectificationSeries
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option1);
    // echarts自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    myChart.getZr().on('click', params => {
        console.log(params, '全局')
        let pointInPixel = [params.offsetX, params.offsetY];
        if (myChart.containPixel('grid', pointInPixel)) {
            let xIndex = myChart.convertFromPixel({
                seriesIndex: 0
            }, [params.offsetX, params.offsetY])[0];
            problemSeries1 = []
            for (let i = 0; i < problemSeries.length; i++) {
                problemSeries1.push('')
            }
            problemSeries1[xIndex] = 100
            option1.series[0].data = problemSeries1 //重置背景
            myChart.setOption(option1);
        }
    })
}
// 工艺
function technology() {
    var myChart = echarts.init(document.querySelector('.technology'), null, {
        devicePixelRatio: 2.5
    });
    let data = [{
            name: '工艺名称1',
            value: 32
        },
        {
            name: '工艺名称2',
            value: 10
        },
        {
            name: '工艺名称3',
            value: 65
        },
        {
            name: '工艺名称4',
            value: 80
        },
        {
            name: '工艺名称5',
            value: 20
        },
        {
            name: '工艺名称6',
            value: 15
        }
    ]
    option = {
        // 触碰显示
        tooltip: { //此处配置鼠标移动对应区域时的黑色弹框
            trigger: 'item',
            show: false
        },
        color: ['#F038A1', '#2B77F2', '#3BE3B5', '#FFA31D', '#F8E60D', '#ED5D5D', '#00CEFF'],
        title: {
            text: '{header1| }' +
                '{header2| 工艺名称}' +
                '{header3| 数量}',
            textAlign: 'left',
            right: '4%',
            top: '5%',
            textStyle: {
                color: '#ccc',
                rich: {
                    header1: {
                        width: 60,
                        fontSize: 10
                    },
                    header2: {
                        width: 80,
                        fontSize: 10
                    },
                    header3: {
                        width: 10,
                        fontSize: 10
                    }
                }
            }
        },
        legend: {
            // selectedMode: true, // 取消图例上的点击事件
            type: 'plain',
            orient: 'vertical',
            right: '0%',
            top: '15%',
            align: 'left',
            itemGap: 15,
            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
            symbolKeepAspect: false,
            selectedMode: false,
            textStyle: {
                color: '#000',
                rich: {
                    name: {
                        verticalAlign: 'right',
                        align: 'left',
                        width: 65,
                        fontSize: 12,
                        color: '#fff',
                    },
                    value: {
                        align: 'left',
                        width: 32,
                        fontSize: 12,
                        color: '#fff',
                    }
                }
            },
            data: data.map(item => item.name),
            formatter: function (name) {
                let className = 'upRate'
                let rateIcon = '▲'
                if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                        if (name === data[i].name) {
                            if (data[i].rate < 0) {
                                className = 'downRate'
                                rateIcon = '▼'
                            }
                            return (
                                '{name| ' + name + '}   ' +
                                '{value| ' + data[i].value + '个' + '}'
                            )
                        }
                    }
                }
            }
        },
        series: [{
            name: '数量',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['25%', '45%'],
            data: data,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    // 设置默认圈内文字
                    formatter: function (item, dom) {
                        return `{text|${item.data.name} }\n{value|${item.data.value}}`
                    },
                    rich: {
                        text: {

                            align: 'center',
                            color: '#9BD0FF',
                            verticalAlign: 'middle',
                            fontSize: 14,
                            padding: 8,
                        },

                        value: {
                            align: 'center',
                            verticalAlign: 'middle',
                            color: '#FFFFFF',
                            padding: 8,
                            fontSize: 24
                        }
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // echarts自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    bulgeTimer(data, myChart)
}
// 工序
function procedure() {
    var myChart = echarts.init(document.querySelector('.procedure'), null, {
        devicePixelRatio: 2.5
    });
    let data = [{
            name: '工艺名称1',
            value: 32
        },
        {
            name: '工艺名称2',
            value: 10
        },
        {
            name: '工艺名称3',
            value: 65
        },
        {
            name: '工艺名称4',
            value: 80
        },
        {
            name: '工艺名称5',
            value: 20
        },
        {
            name: '工艺名称6',
            value: 15
        }
    ]
    option = {
        // 触碰显示
        tooltip: { //此处配置鼠标移动对应区域时的黑色弹框
            trigger: 'item',
            show: false
        },
        color: ['#F038A1', '#2B77F2', '#3BE3B5', '#FFA31D', '#F8E60D', '#ED5D5D', '#00CEFF'],
        title: {
            text: '{header1| }' +
                '{header2| 工序名称}' +
                '{header3| 数量}',
            textAlign: 'left',
            right: '4%',
            top: '5%',
            textStyle: {
                color: '#ccc',
                rich: {
                    header1: {
                        width: 40,
                        fontSize: 10
                    },
                    header2: {
                        width: 80,
                        fontSize: 10
                    },
                    header3: {
                        width: 10,
                        fontSize: 10
                    }
                }
            }
        },
        legend: {
            // selectedMode: true, // 取消图例上的点击事件
            type: 'plain',
            orient: 'vertical',
            right: '0%',
            top: '15%',
            align: 'left',
            itemGap: 15,
            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
            symbolKeepAspect: false,
            selectedMode: false,
            textStyle: {
                color: '#000',
                rich: {
                    name: {
                        verticalAlign: 'right',
                        align: 'left',
                        width: 65,
                        fontSize: 12,
                        color: '#fff',
                    },
                    value: {
                        align: 'left',
                        width: 32,
                        fontSize: 12,
                        color: '#fff',
                    }
                }
            },
            data: data.map(item => item.name),
            formatter: function (name) {
                let className = 'upRate'
                let rateIcon = '▲'
                if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                        if (name === data[i].name) {
                            if (data[i].rate < 0) {
                                className = 'downRate'
                                rateIcon = '▼'
                            }
                            return (
                                '{name| ' + name + '}   ' +
                                '{value| ' + data[i].value + '个' + '}'
                            )
                        }
                    }
                }
            }
        },
        series: [{
            name: '数量',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['25%', '40%'],
            data: data,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    // 设置默认圈内文字
                    formatter: function (item, dom) {
                        return `{text|${item.data.name} }\n{value|${item.data.value}}`
                    },
                    rich: {
                        text: {

                            align: 'center',
                            color: '#9BD0FF',
                            verticalAlign: 'middle',
                            fontSize: 14,
                            padding: 8,
                        },

                        value: {
                            align: 'center',
                            verticalAlign: 'middle',
                            color: '#FFFFFF',
                            padding: 8,
                            fontSize: 24
                        }
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // echarts自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    bulgeTimer(data, myChart)
}
// 问题等级
function problemLevel() {
    var myChart = echarts.init(document.querySelector('.problemLevel'), null, {
        devicePixelRatio: 2.5
    });
    let data = [{
            name: '重要',
            value: 35
        },
        {
            name: '次要',
            value: 10
        },
        {
            name: '一般',
            value: 65
        }
    ]
    let dataTotal = 110
    option = {
        // 触碰显示
        tooltip: { //此处配置鼠标移动对应区域时的黑色弹框
            trigger: 'item',
            show: false
        },
        color: ['#F038A1', '#FFA31D', '#00CEFF'],
        series: [{
            name: '数量',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '45%'],
            data: data,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    // 设置默认圈内文字
                    formatter: function (item, dom) {
                        return `{text|${item.data.name} }\n{rate|${toPercent(item.data.value/dataTotal)}}\n{value|${item.data.value}}`
                    },
                    rich: {
                        text: {

                            align: 'center',
                            color: '#9BD0FF',
                            verticalAlign: 'middle',
                            fontSize: 14,
                            padding: 4,
                        },
                        rate: {
                            align: 'center',
                            verticalAlign: 'middle',
                            color: '#FFFFFF',
                            padding: 8,
                            fontSize: 24
                        },
                        value: {
                            align: 'center',
                            verticalAlign: 'middle',
                            color: '#3BE3B5',
                            // padding: 8,
                            fontSize: 24
                        }
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // echarts自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    bulgeTimer(data, myChart)
}
// 问题类型
function problemType() {
    var myChart = echarts.init(document.querySelector('.problemType'), null, {
        devicePixelRatio: 2.5
    });
    let data = [{
            name: '工艺名称1',
            value: 32
        },
        {
            name: '工艺名称2',
            value: 10
        },
        {
            name: '工艺名称3',
            value: 65
        },
        {
            name: '工艺名称4',
            value: 80
        },
        {
            name: '工艺名称5',
            value: 20
        },
        {
            name: '工艺名称6',
            value: 15
        }
    ]
    option = {
        // 触碰显示
        tooltip: { //此处配置鼠标移动对应区域时的黑色弹框
            trigger: 'item',
            show: false
        },
        color: ['#F038A1', '#2B77F2', '#3BE3B5', '#FFA31D', '#F8E60D', '#ED5D5D', '#00CEFF'],
        title: {
            text: '{header1| }' +
                '{header2| 工艺名称}' +
                '{header3| 数量}',
            textAlign: 'left',
            right: '4%',
            top: '5%',
            textStyle: {
                color: '#ccc',
                rich: {
                    header1: {
                        width: 40,
                        fontSize: 10
                    },
                    header2: {
                        width: 80,
                        fontSize: 10
                    },
                    header3: {
                        width: 10,
                        fontSize: 10
                    }
                }
            }
        },
        legend: {
            // selectedMode: true, // 取消图例上的点击事件
            type: 'plain',
            orient: 'vertical',
            right: '0%',
            top: '15%',
            align: 'left',
            itemGap: 15,
            itemWidth: 10, // 设置宽度
            itemHeight: 10, // 设置高度
            symbolKeepAspect: false,
            selectedMode: false,
            textStyle: {
                color: '#000',
                rich: {
                    name: {
                        verticalAlign: 'right',
                        align: 'left',
                        width: 65,
                        fontSize: 12,
                        color: '#fff',
                    },
                    value: {
                        align: 'left',
                        width: 32,
                        fontSize: 12,
                        color: '#fff',
                    }
                }
            },
            data: data.map(item => item.name),
            formatter: function (name) {
                let className = 'upRate'
                let rateIcon = '▲'
                if (data && data.length) {
                    for (var i = 0; i < data.length; i++) {
                        if (name === data[i].name) {
                            if (data[i].rate < 0) {
                                className = 'downRate'
                                rateIcon = '▼'
                            }
                            return (
                                '{name| ' + name + '}   ' +
                                '{value| ' + data[i].value + '个' + '}'
                            )
                        }
                    }
                }
            }
        },
        series: [{
            name: '数量',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['25%', '50%'],
            data: data,
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    // 设置默认圈内文字
                    formatter: function (item, dom) {
                        return `{text|${item.data.name} }\n{value|${item.data.value}}`
                    },
                    rich: {
                        text: {

                            align: 'center',
                            color: '#9BD0FF',
                            verticalAlign: 'middle',
                            fontSize: 14,
                            padding: 8,
                        },

                        value: {
                            align: 'center',
                            verticalAlign: 'middle',
                            color: '#FFFFFF',
                            padding: 8,
                            fontSize: 24
                        }
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // echarts自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
    bulgeTimer(data, myChart)
}
// 全屏/关闭全屏
function fullScreen() {
    $('.fullScreen').click(function () {
        if (fullScreenIsShow) {
            fullScreenIsShow = false
            let docElm = document.documentElement;
            //W3C
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            //FireFox
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            //Chrome等
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            //IE11
            else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else if (fullScreenIsShow == false) {
            fullScreenIsShow = true
            let elem = document;
            if (elem.webkitCancelFullScreen) {
                elem.webkitCancelFullScreen();
            } else if (elem.mozCancelFullScreen) {
                elem.mozCancelFullScreen();
            } else if (elem.cancelFullScreen) {
                elem.cancelFullScreen();
            } else if (elem.exitFullscreen) {
                elem.exitFullscreen();
            } else {
                //浏览器不支持全屏API或已被禁用
            }
        }
    })
}
//定位
function delayAddRess() {
    var url = basePath + 'irest/base/ccbim_projectInfoHandler/getProjectInfo?id=' + projectId;
    $.ajax({
        type: 'GET',
        url: url,
        async: false, // 同步请求
        dataType: 'JSON',
        error: function () {
            console.log('获取项目地址错误');
        },
        success: function (res) {
            $('.delayAddRess').html(`${res.areaCodeCaption}`)
            $('.delayAddRess').attr("title", `${res.areaCodeCaption}`);
        }
    });
}
// 天气
function weather() {
    $.ajax({
        type: "POST",
        url: url + "irest/base/bim_commonHandler/getWeatherInfo",
        data: {
            sectionId: sectionId
        },
        success: function (res) {
            let todaySrc = ''
            let todaySrc1 = ''
            let todaySrc2 = ''
            if (res.today.wea_img == "xue") {
                todaySrc = 'img/xue.png'
            } else if (res.today.wea_img == "lei") {
                todaySrc = 'img/lei.png'
            } else if (res.today.wea_img == "shachen") {
                todaySrc = 'img/shachen.png'
            } else if (res.today.wea_img == "wu") {
                todaySrc = 'img/wu.png'
            } else if (res.today.wea_img == "bingbao") {
                todaySrc = 'img/bingbao.png'
            } else if (res.today.wea_img == "yun") {
                todaySrc = 'img/yun.png'
            } else if (res.today.wea_img == "yu") {
                todaySrc = 'img/yu.png'
            } else if (res.today.wea_img == "yin") {
                todaySrc = 'img/yin.png'
            } else if (res.today.wea_img == "qing") {
                todaySrc = 'img/qing.png'
            }

            if (res.tomorrow.wea_img == "xue") {
                todaySrc1 = 'img/xue.png'
            } else if (res.tomorrow.wea_img == "lei") {
                todaySrc1 = 'img/lei.png'
            } else if (res.tomorrow.wea_img == "shachen") {
                todaySrc1 = 'img/shachen.png'
            } else if (res.tomorrow.wea_img == "wu") {
                todaySrc1 = 'img/wu.png'
            } else if (res.tomorrow.wea_img == "bingbao") {
                todaySrc1 = 'img/bingbao.png'
            } else if (res.tomorrow.wea_img == "yun") {
                todaySrc1 = 'img/yun.png'
            } else if (res.tomorrow.wea_img == "yu") {
                todaySrc1 = 'img/yu.png'
            } else if (res.tomorrow.wea_img == "yin") {
                todaySrc1 = 'img/yin.png'
            } else if (res.tomorrow.wea_img == "qing") {
                todaySrc1 = 'img/qing.png'
            }

            if (res.dayAfterTomorrow.wea_img == "xue") {
                todaySrc2 = 'img/xue.png'
            } else if (res.dayAfterTomorrow.wea_img == "lei") {
                todaySrc2 = 'img/lei.png'
            } else if (res.dayAfterTomorrow.wea_img == "shachen") {
                todaySrc2 = 'img/shachen.png'
            } else if (res.dayAfterTomorrow.wea_img == "wu") {
                todaySrc2 = 'img/wu.png'
            } else if (res.dayAfterTomorrow.wea_img == "bingbao") {
                todaySrc2 = 'img/bingbao.png'
            } else if (res.dayAfterTomorrow.wea_img == "yun") {
                todaySrc2 = 'img/yun.png'
            } else if (res.dayAfterTomorrow.wea_img == "yu") {
                todaySrc2 = 'img/yu.png'
            } else if (res.dayAfterTomorrow.wea_img == "yin") {
                todaySrc2 = 'img/yin.png'
            } else if (res.dayAfterTomorrow.wea_img == "qing") {
                todaySrc2 = 'img/qing.png'
            }
            let str = `<div class="weather-title">今日</div>
            <div class="weather-img">
            <img src="${todaySrc}" alt="" />
            </div>
            <div class="weather-degree">${res.today.tempRange}</div>`
            $('.today').html(str)

            let str1 = `<div class="weather-title">明日</div>
            <div class="weather-img">
            <img src="${todaySrc1}" alt="" />
            </div>
            <div class="weather-degree">${res.tomorrow.tempRange}</div>`
            $('.tomorrow').html(str1)

            let str2 = `<div class="weather-title">后天</div>
            <div class="weather-img">
            <img src="${todaySrc2}" alt="" />
            </div>
            <div class="weather-degree">${res.dayAfterTomorrow.tempRange}</div>`
            $('.tomorrow').html(str2)
        }
    });
}
//截取小数点
function hasDot(num) {
    if (!isNaN(num)) {
        if ((num + '').indexOf('.') != -1) {
            if (num.toString().split('.')[1].length == 1) {
                num = num.toFixed(1)
            } else if (num.toString().split('.')[1].length >= 2) {
                num = num.toFixed(2)
            }
        }
        return num
    }
}
// 小数转换百分比
function toPercent(point) {
    var str = Number(point * 100).toFixed(2);
    if (isNaN(point)) {
        str = 0;
    } else {
        if (str.toString().split('.')[1] == 00) {
            str = str.toString().split('.')[0]
        }
    }
    str += "%";
    return str;
} // 动态判定最大宽度
function maxStyleWidth() {
    let styleArr = []
    $('.keynote-li-title').each(function () {
        styleArr.push($(this).text().length)
    })
    let styleMaxName = Math.max.apply(null, styleArr);
    let styleIndex = styleArr.findIndex((ele) => ele == styleMaxName)
    let styleWidth = 0
    $('.keynote-li-title').each(function (index, item) {
        if (index == styleIndex) {
            styleWidth = $(this).outerWidth(true)
        }
    })
    $('.keynote-li-title').each(function () {
        $(this).css('width', styleWidth);
    })
}
// 饼图,环形图,玫瑰图自动凸出
function bulgeTimer(data, myChart) {
    let mTime
    if (data.length == 1) {
        // 设置默认高亮
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });
        // 鼠标进入
        myChart.on("mouseover", (e) => {
            // 是否点击高亮的当前值
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
        });
        myChart.on("mouseout", (e) => {
            // 设置鼠标离开时默认显示的高亮
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
        });
    } else {
        let currentIndex = 0 // 循环下标
        let dataLen = option.series[0].data.length; // 获取数组总长度
        // 设置默认高亮
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });
        // 循环高亮
        mTime = setInterval(function () {
            // 取消上一个高亮
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: currentIndex
            });
            currentIndex = (currentIndex + 1) % dataLen;
            // 高亮当前
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: currentIndex
            });
        }, swiperTime);
        // 鼠标进入
        myChart.on("mouseover", (e) => {
            // // 停止循环
            clearInterval(mTime);
            // 是否点击高亮的当前值
            if (currentIndex == e.dataIndex) {
                // 高亮当前
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
            } else {
                // 取消之前高亮的图形
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
            }
        });
        // 鼠标离开
        myChart.on("mouseout", (e) => {
            clearInterval(mTime);
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: currentIndex
            });
            // // 启动循环高亮
            mTime = setInterval(function () {
                // 取消上一个高亮
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
            }, swiperTime);
        });
    }
}