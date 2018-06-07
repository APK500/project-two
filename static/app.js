function populate() {
    /* data route */
    var url = "/names";

    //var options = Plotly.d3.select("#selDataset").append("select");

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
};


function optionChanged(sample1){
    url = "/api/academics/"+sample1;
    url1 = "/api/other/"+sample1
    url2 = "/api/demographics/"+ sample1

    var PIE = document.getElementById("pie");
    var BAR = document.getElementById("bar");
    var PIE1 = document.getElementById("pie1");
    var PIE2 = document.getElementById("pie2");


    Plotly.d3.json(url, function(error,sample_data){
        // console.log(sample_data)
        if (error) return console.log("error");
        var v = getValuesAcademics(sample_data);

        Plotly.restyle(PIE,"values",[v[0]]);
        Plotly.restyle(PIE,"labels",[v[1]]);

        });

    Plotly.d3.json(url1, function(error,sample_data){
         // console.log(sample_data)
        if (error) return console.log("error");
        var b = getValuesOther(sample_data);
    
        Plotly.restyle(BAR,"x",[b[0]]);
        Plotly.restyle(BAR,"y",[b[1]]);
    
     });

    Plotly.d3.json(url2, function(error, sample_data){
        if (error) return console.log("error");
        var d = getValuesDemographics(sample_data);
        Plotly.restyle(PIE1,"values",[d[0]]);
        Plotly.restyle(PIE1,"lables",[d[1]]);
    });

    // Plotly.d3.json(url3, function(error, sample_data){
    //     if (error) return console.log("error");
    //     var d1 = getValuesOtherDemographics(sample_data);
    //     Plotly.restyle(PIE2,"values",[d1[0]]);
    //     Plotly.restyle(PIE2,"lables",[d1[1]]);


    // })


        


}
function init(){
    populate();
    url = "/api/academics/"+"Erie%20Community%20College";
    url1 = "/api/other/"+"Erie%20Community%20College";
    url2 = "/api/demographics/"+"Erie%20Community%20College";
    url3 = "/api/demographics/gender/Erie%20Community%20College"

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
            title: "Academic Programs"
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
                color: 'rgb(142,124,195)'
            }
        };
        
        var data = [trace1]
        var layout = {
            title: "Tuition and Revenue",
            font:{
                family: "Raleway, snas-serif"
            },
            showlegend: false,
            // xaxis: {
            //     tickangle: -45
            // },
            // yaxis: {
            //     zeroline: false,
            //     gridwidth: 2
            // },
            bargap: 0.05
        };

        Plotly.newPlot(BAR, data,layout)
    })

    Plotly.d3.json(url2, function(error,sample_data){
        if(error) return console.log("error")
     //   console.log(sample_data)
        var p1 = getValuesDemographics(sample_data)
        console.log(p1)

        var data = [{
            values: p1[0],
            labels: p1[1],
            type: "pie"
          }];      
        var layout = {
            height: 1000,
            width: 1000,
            title: "Demographics by Race"
          };  
          Plotly.plot(PIE1, data,layout);
    });

    // Plotly.d3.json(url3, function(error, sample_data){
    //     if(error) return console.log("error")
    //     var d1 = getValuesOtherDemographics(sample_data)

    //     var data = [{
    //         values: d1[0],
    //         labels: d1[1],
    //         type: "pie"
    //       }];      
    //     var layout = {
    //         height: 1200,
    //         width: 1200,
    //         title: "Demographics by Gender"
    //       };  
    //       Plotly.plot(PIE2, data,layout);
    // });
}

function getValuesOtherDemographics(sample_data){
    gender_values_pie = [];
    gender_labels_pie = [];
    for (var key in sample_data){
        if (sample_data[key].hasOwnProperty(key)){
            gender_values_pie.push(sample_data["Percentage of Women"])
            gender_labels_pie.push("Percentage of Women")
            gender_values_pie.push(sample_data["Percentage of Men"])
            gender_labels_pie.push("Percentage of Men")
        }
    }

    return [gender_values_pie,gender_labels_pie]

}

function getValuesDemographics(sample_data){
    d_values_pie = [];
    d_labels_pie = [];
    for (var key in sample_data){
        if (sample_data.hasOwnProperty(key)){
            if (sample_data[key]>.00001){
                d_values_pie.push(sample_data[key])
                d_labels_pie.push(key.slice(41))
            }
        }
    }
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

    var profit = sample_data["Tuition Revenue per Student"]-sample_data["Expenses per Student"];
    x_bar.push("Profit")
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

