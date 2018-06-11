
function populate() {
    /* data route */
    var url = "/names";
    var urlCost = "/api/cost";
    var urlCostRank = "/api/cost/rank";
    var urlSpend = "/api/other/rank";


    var SCAT = document.getElementById("scatter");
    var RANK = document.getElementById("costRank");
    var SPEND = document.getElementById("spendRank");


    var dropDown = document.getElementById("selDataset");

    Plotly.d3.json(url, function(error,sample_names){
        if (error) return console.log("error");
        for (var i = 0; i < sample_names.length; i++){
            var option1 = document.createElement("option");
            option1.text = sample_names[i];
            option1.value = sample_names[i];
            dropDown.append(option1);   
        }
    });

    Plotly.d3.json(urlSpend, function(error, spend_names){
        console.log(spend_names)
        if (error) return console.log("error");
        var th = document.createElement("th")
        var txth = document.createTextNode("Top 100 Schools based on Tuition and amount Spent on Students")
        // th.appendChild(txth)
        SPEND.appendChild(th)
        for (var k = 1; k <= 50;k++){
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var txt = document.createTextNode(k +" : " +spend_names["school_name"][k-1]+ " : $"+ spend_names["Payment Difference"][k-1])
            var txt2 = document.createTextNode((k+50) +" : " +spend_names["school_name"][(k+50)-1]+ " : $"+ spend_names["Payment Difference"][(k+50)-1])
            var txt3 = document.createTextNode((k+100) +" : " +spend_names["school_name"][(k+100)-1]+ " : $"+ spend_names["Payment Difference"][(k+100)-1])
            console.log(txt);
            td.appendChild(txt);
            tr.appendChild(td);
            td2.appendChild(txt2);
            tr.appendChild(td2);
            td3.appendChild(txt3);
            tr.appendChild(td3);
            SPEND.appendChild(tr);
            
        }
    })

    Plotly.d3.csv(urlSpend, function(err, rows) {
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
            }
          
            var headerNames = Plotly.d3.keys(rows[0]);
          
            var headerValues = [];
            var cellValues = [];
            for (i = 0; i < headerNames.length; i++) {
              headerValue = [headerNames[i]];
              headerValues[i] = headerValue;
              cellValue = unpack(rows, headerNames[i]);
              cellValues[i] = cellValue;
            }

            var data = [{
                type: 'table',
                columnwidth: [200,500,600],
                columnorder: [0,1,2],
                header: {
                  height: 40,
                  values: ["Rank", "School", "Spending Gap (Tuition - Spending)"],
                  align: "center",
                  line: {width: 1, color: 'rgb(50, 50, 50)'},
                  fill: {color: ['rgb(93, 164, 214)']},
                  font: {family: "Arial", size: 26, color: "white"}
                },
                cells: {
                  height: 30,
                  values: cellValues,
                  align: ["center", "center"],
                  line: {color: "black", width: 1},
                  fill: {color: ['rgba(228, 222, 249, 0.65)','rgb(93, 164, 214)', 'rgba(228, 222, 249, 0.65)']},
                  font: {family: "Arial", size: 20, color: ["black"]}
                }
              }]
              
              var layout = {
                height: 1000,
                width: 2000,
                plot_bgcolor: "transparent",
                paper_bgcolor: "transparent"
              }
              
              Plotly.plot(SPEND, data, layout);
    });

    // Plotly.d3.json(urlCostRank,function(error,rank_names){
    //     if (error) return console.log("error");
    //    // console.log(rank_names["Payment Difference"].length)
    //     var th = document.createElement("th")
    //     var txth = document.createTextNode("Top 100 Schools based on Cost and Earnings")
    //     th.appendChild(txth)
    //     RANK.appendChild(th)
    //     for (var j = 1; j <= rank_names["Payment Difference"].length; j++){
    //         var tr = document.createElement("tr");
    //         var td = document.createElement("td");
    //         var txt = document.createTextNode(j +" : " +rank_names["school_name"][j-1]+ " : $"+ rank_names["Payment Difference"][j-1])
    //       //  console.log(txt);
    //         td.appendChild(txt);
    //         tr.appendChild(td)
    //         RANK.appendChild(tr)
    //     }
        
    // });

    Plotly.d3.csv(urlCostRank, function(err, rows) {
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
            }
          
            var headerNames = Plotly.d3.keys(rows[0]);
          
            var headerValues = [];
            var cellValues = [];
            for (i = 0; i < headerNames.length; i++) {
              headerValue = [headerNames[i]];
              headerValues[i] = headerValue;
              cellValue = unpack(rows, headerNames[i]);
              cellValues[i] = cellValue;
            }

            var data = [{
                type: 'table',
                columnwidth: [200,500,600],
                columnorder: [0,1,2],
                header: {
                  height: 40,
                  values: ["Rank", "School", "Post-Grad Earnings per Dollar (Cost)"],
                  align: "center",
                  line: {width: 1, color: 'rgb(50, 50, 50)'},
                  fill: {color: ['rgb(93, 164, 214)']},
                  font: {family: "Arial", size: 26, color: "white"}
                },
                cells: {
                  height: 30,
                  values: cellValues,
                  align: ["center", "center"],
                  line: {color: "black", width: 1},
                  fill: {color: ['rgba(228, 222, 249, 0.65)','rgb(93, 164, 214)', 'rgba(228, 222, 249, 0.65)']},
                  font: {family: "Arial", size: 20, color: ["black"]}
                }
              }]
              
              var layout = {
                height: 1000,
                width: 2000,
                plot_bgcolor: "transparent",
                paper_bgcolor: "transparent"
              }
              
              Plotly.plot(RANK, data, layout);
    });

 

    Plotly.d3.json(urlCost, function(error, json){
       //console.log(json);
       if (error) return console.log("error");
        xValues = [];
        yValues = [];
        schoolName = [];
        trace2x = 0;
        trace2y = 0;
        var school = "Erie Community College";
        for(var i = 0; i < json.length; i++) {
            var obj = json[i];
            
            if (obj["2013_cost_attendance_academic_year"] > 0 && obj["2013_earnings_6_yrs_after_entry_median"] > 0) {
                if (obj["school_name"] == school) {
                    continue
                }
                
                else {
                    yValues.push(obj["2013_earnings_6_yrs_after_entry_median"]);
                    xValues.push(obj["2013_cost_attendance_academic_year"])
                    schoolName.push(obj.school_name)
                }
            }
        }
 
        for(var i = 0; i < json.length; i++) {
            var obj = json[i];
            
            if (obj["2013_cost_attendance_academic_year"] > 0 && obj["2013_earnings_6_yrs_after_entry_median"] > 0) {
                if (obj["school_name"] == school) {
                    yValues.push(obj["2013_earnings_6_yrs_after_entry_median"]);
                    xValues.push(obj["2013_cost_attendance_academic_year"])
                    schoolName.push(obj.school_name)
                    trace2x = obj["2013_cost_attendance_academic_year"];
                    trace2y = obj["2013_earnings_6_yrs_after_entry_median"];
                }
                else {
                    continue
                }
            }
            // console.log(obj["2013_cost_avg_net_price_overall"]);
        }
 
        
        colors = [];
        size = [];
        opacity = [];
        for (var i = 0; i < schoolName.length; i++) {
            var obj = schoolName[i];
 
            // if (obj == school) {
            //     colors.push('rgb(100, 100, 300)');
            //     size.push(20);
            //     opacity.push(1);
            // }
            if (obj == school) {
                colors.push('black');
                size.push(10);
                opacity.push(1);
            }
 
            else {
                colors.push('rgb(93, 164, 214)');
                size.push(10);
                opacity.push(0.5)
            }
        }
 
        var trace1 = {
            x: xValues,
            y: yValues,
            text: schoolName,
            mode: 'markers',
            marker: {
            size: size,
            color: colors,
            opacity: opacity
            }
        };
        
        var data = [trace1];
        
        var layout = {
            plot_bgcolor: 'transparent',
            paper_bgcolor: 'transparent',
            // title: 'College Cost vs Post-Grad Earnings',
            showlegend: false,
            height: 1100,
            width: 1700,
            xaxis: {
                title: "2013 Average Cost"
            },
            yaxis: {
                title: "2013 Median Earnings (6 Yrs After Enrollment)"
            },
            annotations: [
                {
                  x: trace2x,
                  y: trace2y,
                  xref: 'x',
                  yref: 'y',
                  text: school,
                  showarrow: true,
                  arrowhead: 3,
                  ax: -30,
                  ay: -40,
                  font: {
                    size: 16,
                  }
                }
              ]
        };
        
        Plotly.newPlot(SCAT, data, layout);


    }) 
}




function optionChanged(sample1){
    url = "/api/academics/"+sample1;
    url1 = "/api/other/"+sample1;
    url2 = "/api/demographics/"+sample1;
    url3 = "/api/demographics/gender/"+sample1;

    var sample = sample1;
    urlCost = "/api/cost"

    var PIE = document.getElementById("pie");
    var BAR = document.getElementById("bar");
    var PIE1 = document.getElementById("pie1");
    var PIE2 = document.getElementById("pie2");
    var SCAT = document.getElementById("scatter")
    var SCHOOLNAME = document.getElementById("school-text")

    SCHOOLNAME.innerHTML = "School Selected: " + sample;



    Plotly.d3.json(urlCost, function(error, json){
        // console.log(sample_data)
        if (error) return console.log("error");
        xValues = [];
        yValues = [];
        schoolName = [];
        trace2x = 0;
        trace2y = 0;
        var school = sample;
        for(var i = 0; i < json.length; i++) {
            var obj = json[i];
            
            if (obj["2013_cost_attendance_academic_year"] > 0 && obj["2013_earnings_6_yrs_after_entry_median"] > 0) {
                if (obj["school_name"] == school) {
                    continue
                }
                
                else {
                    yValues.push(obj["2013_earnings_6_yrs_after_entry_median"]);
                    xValues.push(obj["2013_cost_attendance_academic_year"])
                    schoolName.push(obj.school_name)
                }
            }
        }
 
        for(var i = 0; i < json.length; i++) {
            var obj = json[i];
            
            if (obj["2013_cost_attendance_academic_year"] > 0 && obj["2013_earnings_6_yrs_after_entry_median"] > 0) {
                if (obj["school_name"] == school) {
                    yValues.push(obj["2013_earnings_6_yrs_after_entry_median"]);
                    xValues.push(obj["2013_cost_attendance_academic_year"])
                    schoolName.push(obj.school_name)
                    trace2x = obj["2013_cost_attendance_academic_year"];
                    trace2y = obj["2013_earnings_6_yrs_after_entry_median"];
                }
                else {
                    continue
                }
            }
            // console.log(obj["2013_cost_avg_net_price_overall"]);
        }
 
        
        colors = [];
        size = [];
        opacity = [];
        for (var i = 0; i < schoolName.length; i++) {
            var obj = schoolName[i];
 
            // if (obj == school) {
            //     colors.push('rgb(100, 100, 300)');
            //     size.push(20);
            //     opacity.push(1);
            // }
            if (obj == school) {
                colors.push('black');
                size.push(10);
                opacity.push(1);
            }
 
            else {
                colors.push('rgb(93, 164, 214)');
                size.push(10);
                opacity.push(0.5)
            }
        }
 
        var trace1 = {
            x: xValues,
            y: yValues,
            text: schoolName,
            mode: 'markers',
            marker: {
            size: size,
            color: colors,
            opacity: opacity
            }
        };
        
        var data = [trace1];
        
        var layout = {
            plot_bgcolor: 'transparent',
            paper_bgcolor: 'transparent',
            // title: 'College Cost vs Post-Grad Earnings',
            showlegend: false,
            height: 1100,
            width: 1700,
            xaxis: {
                title: "2013 Average Cost"
            },
            yaxis: {
                title: "2013 Median Earnings (6 Yrs After Enrollment)"
            },
            annotations: [
                {
                  x: trace2x,
                  y: trace2y,
                  xref: 'x',
                  yref: 'y',
                  text: school,
                  showarrow: true,
                  arrowhead: 3,
                  ax: -30,
                  ay: -40,
                  font: {
                    size: 16,
                  }
                }
              ]
        };
        
        Plotly.newPlot(SCAT, data, layout);
        
        });


    Plotly.d3.json(url, function(error,sample_data){
        // console.log(sample_data)
        if (error) return console.log("error");
        var v = getValuesAcademics(sample_data);

        Plotly.restyle(PIE,"values",[v[0]]);
        Plotly.restyle(PIE,"labels",[v[1]]);

        });

    Plotly.d3.json(url1, function(error,sample_data){
         // console.log(sample_data)
         //create an average of differences and add to bar chart
        if (error) return console.log("error");
        var b = getValuesOther(sample_data);
    
        Plotly.restyle(BAR,"x",[b[0]]);
        Plotly.restyle(BAR,"y",[b[1]]);
    
     });

    Plotly.d3.json(url2, function(error, sample_data){
        if (error) return console.log("error");
        var d = getValuesDemographics(sample_data);
        console.log(d)
        Plotly.restyle(PIE1,"values",[d[0]]);
        Plotly.restyle(PIE1,"labels",[d[1]]);
    });

    Plotly.d3.json(url3, function(error, sample_data1){
        if (error) return console.log("error");
        var d1 = getValuesOtherDemographics(sample_data1);
        Plotly.restyle(PIE2,"values",[d1[0]]);
        Plotly.restyle(PIE2,"labels",[d1[1]]);


    })


        


}
function init(){
    populate();
    url = "/api/academics/"+"Erie%20Community%20College";
    url1 = "/api/other/"+"Erie%20Community%20College";
    url2 = "/api/demographics/"+"Erie%20Community%20College";
    url3 = "/api/demographics/gender/"+"Erie%20Community%20College";

    var PIE = document.getElementById("pie");
    var BAR= document.getElementById("bar");
    var PIE1 = document.getElementById("pie1");
    var PIE2 = document.getElementById("pie2");

    Plotly.d3.json(url, function(error,sample_data){
        if (error) return console.log("error");
        var v = getValuesAcademics(sample_data)
        var data = [{
            values: v[0],
            labels: v[1],
            type: "pie"
          }];      
        var layout = {
            height: 1200,
            width: 1200,
            // title: "Academic Programs"
            paper_bgcolor: 'transparent',
            // plot_bgcolor: 'transparent'
          };
          Plotly.plot(PIE, data,layout);
    })

    Plotly.d3.json(url1,function(error,sample_data){
        if (error) return console.log("error")
        var b = getValuesOther(sample_data);

        var trace1 = {
            x: b[0],
            y: b[1],
            type: 'bar',
            marker:{
                color: 'rgb(93, 164, 214)'
            }
        };
        
        var data = [trace1]
        var layout = {
            height: 1000,
            width: 1500,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            // title: "Tuition and Revenue",
            font:{
                family: "Raleway, snas-serif"
            },
            showlegend: false,
            xaxis: {
                tickfont: {
                    size: 20,
                  }
            },
            yaxis: {
                tickfont: {
                    size: 14,
                  }
            },
            bargap: 0.05
        };

        Plotly.newPlot(BAR, data,layout)
    })

    Plotly.d3.json(url2, function(error,sample_data){
        if(error) return console.log("error")
     //   console.log(sample_data)
        var p1 = getValuesDemographics(sample_data)
      //  console.log(p1)

        var data = [{
            values: p1[0],
            labels: p1[1],
            type: "pie"
          }];      
        var layout = {
            height: 1100,
            width: 1100,
            // title: "Demographics by Race",
            plot_bgcolor: 'transparent',
            paper_bgcolor: 'transparent'
          };  
          Plotly.plot(PIE1, data,layout);
    });

    Plotly.d3.json(url3, function(error, sample_data1){
        if(error) return console.log("error")
        console.log(sample_data1)
        var d1 = getValuesOtherDemographics(sample_data1)

        console.log(d1)

        

        var data = [{
            values: d1[0],
            labels: d1[1],
            type: "pie"
          }];      
        var layout = {
            height: 1200,
            width: 1200,
            // title: "Demographics by Gender"
            paper_bgcolor: 'transparent'
          };  
          Plotly.plot(PIE2, data,layout);
    });
}

function getValuesOtherDemographics(sample_data1){
    var gender_values_pie = [];
    var gender_labels_pie = [];


    gender_values_pie.push(sample_data1["Percentage of Women"])
    gender_labels_pie.push("Percentage of Women")
    gender_values_pie.push(sample_data1["Percentage of Men"])
    gender_labels_pie.push("Percentage of Men")

    console.log(gender_values_pie)

    return [gender_values_pie,gender_labels_pie]

}

function getValuesDemographics(sample_data){
    console.log(sample_data)
    d_values_pie = [];
    d_labels_pie = [];
    for (var key in sample_data){
        if (sample_data.hasOwnProperty(key)){
            if (sample_data[key]>0){
                d_values_pie.push(sample_data[key])
                d_labels_pie.push(key.slice(41))
            }
        }
    }
  //  console.log(d_labels_pie +" : "+d_values_pie)
    return [d_values_pie,d_labels_pie]
}

function getValuesOther(sample_data){
    x_bar = [];
    y_bar = [];
    for (var key in sample_data){
        if (sample_data.hasOwnProperty(key)){
            y_bar.push(sample_data[key])
            x_bar.push(key)
        }
    }

    var profit = sample_data["Tuition Revenue per Student"]-sample_data["School Spending per Student"];
    x_bar.push("Difference")
    y_bar.push(profit)
    //console.log(y_bar)
    return[x_bar,y_bar]

}

function getValuesAcademics(sample_data){
    values_pie = [];
    labels_pie = [];
    for (var key in sample_data){
        if (sample_data.hasOwnProperty(key)){
            if (sample_data[key]>0.001){
                values_pie.push(sample_data[key])
                labels_pie.push(key.slice(34))
             }
        }
    }
    return [values_pie,labels_pie]
}

init();

