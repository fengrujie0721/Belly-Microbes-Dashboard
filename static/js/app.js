// read json file
d3.json("samples.json").then((data)=>{
    // select the selDataset
    var selectID=d3.select("#selDataset");
    // loop through the data.names
    for (i=0;i<153;i++){
        // append option to selDataset and add text of data.names
        selectID.append("option").text(data.names[i]);     
};
// On change to the document object model, call submit()

});
// define function init()
function init()
{   
    // create variables according to selection of different ids
    
    var id=d3.select("#id");
    var ethnicity=d3.select("#ethnicity");
    var gender=d3.select("#gender");
    var age=d3.select("#age");
    var location=d3.select("#location");
    var bbtype=d3.select("#bbtype");
    var wfreq=d3.select("#wfreq");
    // read json file
    d3.json("samples.json").then((data)=>{
        
                
    //add text to each selection 
    id.text("id:"+data.metadata[0].id);
    ethnicity.text("ethnicity:"+data.metadata[0].ethnicity);
    gender.text("gender:"+data.metadata[0].gender);
    age.text("age:"+data.metadata[0].age);
    location.text("location:"+data.metadata[0].location);
    bbtype.text("bbtype:"+data.metadata[0].bbtype);
    wfreq.text("wfreq:"+data.metadata[0].wfreq);
    // plot the gauge
    var data1=[
     {
        type:"indicator",
        mode:"gauge+number",
        value:data.metadata[0].wfreq,
        title:{text:"Scrubs per Week",font:{size:20}},
                
        gauge:{
            axis:{range:[null,9],tickwidth:1,tickcolor:"black"},
            bar:{color:"green"},
            bgcolor:"white",
            borderwidth:1,
            bordercolor:"black",
            steps:[
                {range:[0,1],color:"#fff"},
                {range:[1,2],color:"#dae0e9"},
                {range:[2,3],color:"#b5c1d3"},
                {range:[3,4],color:"#91a3bd"},
                {range:[4,5],color:"#6d87a8"},
                {range:[5,6],color:"#476b93"},
                {range:[6,7],color:"#17517e"},
                {range:[7,8],color:"#0e4d79"},
                {range:[8,9],color:"#024874"}
                                
                ],
            threshold:{
                line:{color:"red",width:4},
                thickness:0.75,
                value:data.metadata[0].wfreq
                }
            }
        }
        ];
    var layout={
        width:500,
        height:400,
        margin:{t:50,r:150,l:50,b:50},
        paper_bgcolor:"white",
        font:{color:"darkblue",family:"Arial"}
        };
    //Plot the chart to a div tag with id gauge 
    Plotly.newPlot("gauge",data1,layout);

    //create variables of sample_values  
    var data2=data.samples[0].sample_values; 
    //get the first 10 items    
    var data3=data2.slice(0,10);
    // reverse the 10 items
    var data4=data3.reverse();
    // get otu_ids
    var otuid=data.samples[0].otu_ids              
    //Plot horizontal bar    
    var trace1={
        x:data4,
        text:[data.samples[0].otu_labels[9],data.samples[0].otu_labels[8],data.samples[0].otu_labels[7],data.samples[0].otu_labels[6],data.samples[0].otu_labels[5],data.samples[0].otu_labels[4],data.samples[0].otu_labels[3],data.samples[0].otu_labels[2],data.samples[0].otu_labels[1],data.samples[0].otu_labels[0]],                    
        name:"otu",
        type:"bar",
        orientation:"h"
                };           
    var chartData = [trace1];          
    var layout1 = {
        title: "Top 10 Bacteria Cultures Found",
        yaxis:{
            tickmode:"array",
            tickvals:[0,1,2,3,4,5,6,7,8,9],
            ticktext:["OTU "+data.samples[0].otu_ids[9],"OTU "+data.samples[0].otu_ids[8],"OTU "+data.samples[0].otu_ids[7],"OTU "+data.samples[0].otu_ids[6],"OTU "+data.samples[0].otu_ids[5],"OTU "+data.samples[0].otu_ids[4],"OTU "+data.samples[0].otu_ids[3],"OTU "+data.samples[0].otu_ids[2],"OTU "+data.samples[0].otu_ids[1],"OTU "+data.samples[0].otu_ids[0]]
             }
        };

    //Plot the chart to a div tag with id bar   
    Plotly.newPlot("bar", chartData, layout1);

    // Plot the bubble chart
    var trace2={
        x:otuid,
        y:data2,
        text:data.samples[0].otu_labels,
        mode:"markers",
        marker:{
            size:data2,
            color:otuid,
           
            }
        };
    var chartdata2=[trace2]
    var layout2={
        title:"Bacteria Cultures Per Sample",
        xaxis:{
            title: "OTU ID",
                }
                }
    //Plot the chart to a div tag with id bubble 
    Plotly.newPlot("bubble",chartdata2,layout2);
        
    //On change to the document object model, call submit()
    d3.selectAll("#selDataset").on("change",submit); 
    });
 
}
// Define submit()
function submit(){
    // prevent the page from refreshing
    d3.event.preventDefault();
    // create variabels of selections of different ids
    var dataset=d3.select("#selDataset").node().value;
    var id=d3.select("#id");
    var ethnicity=d3.select("#ethnicity");
    var gender=d3.select("#gender");
    var age=d3.select("#age");
    var location=d3.select("#location");
    var bbtype=d3.select("#bbtype");
    var wfreq=d3.select("#wfreq");
    // read json file
    d3.json("samples.json").then((data)=>{
        // loop through items of data.metadata
        for (i=0;i<153;i++){
            //set condition of if statement     
            if (dataset===data.metadata[i].id.toString()){
                // add text to each selection of id
               id.text("id:"+data.metadata[i].id);
               if (data.metadata[i].ethnicity===null){
                ethnicity.text("ethnicity:"+"null")
               }
               else{
                ethnicity.text("ethnicity:"+data.metadata[i].ethnicity)
               };
               if (data.metadata[i].gender===null){
                gender.text("gender:"+"null")
               }
               else{
                gender.text("gender:"+data.metadata[i].gender)
               };
               if (data.metadata[i].age===null){
                age.text("age:"+"null")
               }
               else{
                age.text("age:"+data.metadata[i].age)
               };
               
               if (data.metadata[i].location===null){
                location.text("location:"+"null")
               }
               else{
                location.text("location:"+data.metadata[i].location)
               };
               if (data.metadata[i].bbtype===null){
                bbtype.text("bbtype:"+"null")
               }
               else{
                bbtype.text("bbtype:"+data.metadata[i].bbtype)
               };
               if (data.metadata[i].wfreq===null){
                wfreq.text("wfreq:"+"null")
               }
               else{
                wfreq.text("wfreq:"+data.metadata[i].wfreq)
               };
               
                // plot the gauge
                var data1=[
                    {
                    type:"indicator",
                    mode:"gauge+number",
                    value:data.metadata[i].wfreq,
                   
                    title:{text:"Scrubs per Week",font:{size:20}},
                
                    gauge:{
                        axis:{range:[null,9],tickwidth:1,tickcolor:"black"},
                        bar:{color:"green"},
                        bgcolor:"white",
                        borderwidth:1,
                        bordercolor:"black",
                        steps:[
                            {range:[0,1],color:"#fff"},
                            {range:[1,2],color:"#dae0e9"},
                            {range:[2,3],color:"#b5c1d3"},
                            {range:[3,4],color:"#91a3bd"},
                            {range:[4,5],color:"#6d87a8"},
                            {range:[5,6],color:"#476b93"},
                            {range:[6,7],color:"#17517e"},
                            {range:[7,8],color:"#0e4d79"},
                            {range:[8,9],color:"#024874"}
                                
                    ],
                        threshold:{
                            line:{color:"red",width:4},
                            thickness:0.75,
                            value:data.metadata[i].wfreq
                        }
                    }
                }
                ];
                var layout={
                    width:500,
                    height:400,
                    margin:{t:50,r:150,l:50,b:50},
                    paper_bgcolor:"white",
                    font:{color:"darkblue",family:"Arial"}
                };
                //Plot the chart to a div tag with id gauge
                Plotly.newPlot("gauge",data1,layout);
                // get sample_values
                var data2=data.samples[i].sample_values;
                // get the first 10 items of sample_values
                var data3=data2.slice(0,10);
                // reverse the 10 items
                var data4=data3.reverse();
                // get otu_ids
                var otuid=data.samples[i].otu_ids;
                // if there is only 1 sample_value
                if (data.samples[i].sample_values.length===1){
                    // Plot the bar
                    var trace2={
                        x:data.samples[i].sample_values,
                        text:data.samples[i].otu_labels,
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartdata2=[trace2]
                    var layout2={
                        title:"Bacteria Culture Found",
                        yaxis:{
                            tickvals:[0],
                            ticktext:["OTU "+data.samples[i].otu_ids]
                            
                        }
                    }
                    // Plot the chart to a div tag with bar
                    Plotly.newPlot("bar",chartdata2,layout2);
                }
                // if there are 2 sample_values
                else if (data.samples[i].sample_values.length===2){ 
                    //Plot the bar   
                    var trace11={
                        x:data4,
                        text:[data.samples[i].otu_labels[1],data.samples[i].otu_labels[0]],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData11 = [trace11];
                    var layout11 = {
                        title: "Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0,1],
                            ticktext:["OTU "+data.samples[i].otu_ids[1],"OTU "+data.samples[i].otu_ids[0]]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData11, layout11);

                }
                 // if there are 3 sample_values
                else if (data.samples[i].sample_values.length===3){ 
                    //Plot the bar   
                    var trace12={
                        x:data4,
                        text:[data.samples[i].otu_labels[2],data.samples[i].otu_labels[1],data.samples[i].otu_labels[0]],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData12 = [trace12];
                    var layout12 = {
                        title: "Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0,1,2],
                            ticktext:["OTU "+data.samples[i].otu_ids[2],"OTU "+data.samples[i].otu_ids[1],"OTU "+data.samples[i].otu_ids[0]]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData12, layout12);

                }
                 // if there are 4 sample_values
                else if (data.samples[i].sample_values.length===4){ 
                    //Plot the bar   
                    var trace13={
                        x:data4,
                        text:[data.samples[i].otu_labels[3],data.samples[i].otu_labels[2],data.samples[i].otu_labels[1],data.samples[i].otu_labels[0]],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData13 = [trace13];
                    var layout13 = {
                        title: "Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0,1,2,3],
                            ticktext:["OTU "+data.samples[i].otu_ids[3],"OTU "+data.samples[i].otu_ids[2],"OTU "+data.samples[i].otu_ids[1],"OTU "+data.samples[i].otu_ids[0]]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData13, layout13);

                }
                 // if there are 5 sample_values
                else if (data.samples[i].sample_values.length===5){ 
                    //Plot the bar   
                    var trace14={
                        x:data4,
                        text:[data.samples[i].otu_labels[4],data.samples[i].otu_labels[3],data.samples[i].otu_labels[2],data.samples[i].otu_labels[1],data.samples[i].otu_labels[0]],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData14 = [trace14];
                    var layout14 = {
                        title: "Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0,1,2,3,4],
                            ticktext:["OTU "+data.samples[i].otu_ids[4],"OTU "+data.samples[i].otu_ids[3],"OTU "+data.samples[i].otu_ids[2],"OTU "+data.samples[i].otu_ids[1],"OTU "+data.samples[i].otu_ids[0]]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData14, layout14);

                }
                 // if there are 6 sample_values
                else if (data.samples[i].sample_values.length===6){ 
                    //Plot the bar   
                    var trace15={
                        x:data4,
                        text:[data.samples[i].otu_labels[5],data.samples[i].otu_labels[4],data.samples[i].otu_labels[3],data.samples[i].otu_labels[2],data.samples[i].otu_labels[1],data.samples[i].otu_labels[0]],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData15 = [trace15];
                    var layout15 = {
                        title: "Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0,1,2,3,4,5],
                            ticktext:["OTU "+data.samples[i].otu_ids[5],"OTU "+data.samples[i].otu_ids[4],"OTU "+data.samples[i].otu_ids[3],"OTU "+data.samples[i].otu_ids[2],"OTU "+data.samples[i].otu_ids[1],"OTU "+data.samples[i].otu_ids[0]]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData15, layout15);

                }
                 // if there are 7 sample_values
                else if (data.samples[i].sample_values.length===7){ 
                    //Plot the bar   
                    var trace16={
                        x:data4,
                        text:[data.samples[i].otu_labels[6],data.samples[i].otu_labels[5],data.samples[i].otu_labels[4],data.samples[i].otu_labels[3],data.samples[i].otu_labels[2],data.samples[i].otu_labels[1],data.samples[i].otu_labels[0]],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData16 = [trace16];
                    var layout16 = {
                        title: "Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0,1,2,3,4,5,6],
                            ticktext:["OTU "+data.samples[i].otu_ids[6],"OTU "+data.samples[i].otu_ids[5],"OTU "+data.samples[i].otu_ids[4],"OTU "+data.samples[i].otu_ids[3],"OTU "+data.samples[i].otu_ids[2],"OTU "+data.samples[i].otu_ids[1],"OTU "+data.samples[i].otu_ids[0]]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData16, layout16);

                }
                 // if there are 8 sample_values
                else if (data.samples[i].sample_values.length===8){ 
                    //Plot the bar   
                    var trace17={
                        x:data4,
                        text:[data.samples[i].otu_labels[7],data.samples[i].otu_labels[6],data.samples[i].otu_labels[5],data.samples[i].otu_labels[4],data.samples[i].otu_labels[3],data.samples[i].otu_labels[2],data.samples[i].otu_labels[1],data.samples[i].otu_labels[0]],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData17 = [trace17];
                    var layout17 = {
                        title: "Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0,1,2,3,4,5,6,7],
                            ticktext:["OTU "+data.samples[i].otu_ids[7],"OTU "+data.samples[i].otu_ids[6],"OTU "+data.samples[i].otu_ids[5],"OTU "+data.samples[i].otu_ids[4],"OTU "+data.samples[i].otu_ids[3],"OTU "+data.samples[i].otu_ids[2],"OTU "+data.samples[i].otu_ids[1],"OTU "+data.samples[i].otu_ids[0]]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData17, layout17);

                }
                 // if there are 9 sample_values
                else if (data.samples[i].sample_values.length===9){ 
                    //Plot the bar   
                    var trace18={
                        x:data4,
                        text:[data.samples[i].otu_labels[8],data.samples[i].otu_labels[7],data.samples[i].otu_labels[6],data.samples[i].otu_labels[5],data.samples[i].otu_labels[4],data.samples[i].otu_labels[3],data.samples[i].otu_labels[2],data.samples[i].otu_labels[1],data.samples[i].otu_labels[0]],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData18 = [trace18];
                    var layout18 = {
                        title: "Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0,1,2,3,4,5,6,7,8],
                            ticktext:["OTU "+data.samples[i].otu_ids[8],"OTU "+data.samples[i].otu_ids[7],"OTU "+data.samples[i].otu_ids[6],"OTU "+data.samples[i].otu_ids[5],"OTU "+data.samples[i].otu_ids[4],"OTU "+data.samples[i].otu_ids[3],"OTU "+data.samples[i].otu_ids[2],"OTU "+data.samples[i].otu_ids[1],"OTU "+data.samples[i].otu_ids[0]]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData18, layout18);

                }
                 // if there is 0 sample_value
                else if (data.samples[i].sample_values.length===0){ 
                    //Plot the bar   
                    var trace19={
                        x:0,
                        text:[0],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData19 = [trace19];
                    var layout19 = {
                        title: "No Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0],
                            ticktext:[0]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData19, layout19);

                }
                // if there are 10 or over 10 sample_values
                else{ 
                    //Plot the bar   
                    var trace1={
                        x:data4,
                        text:[data.samples[i].otu_labels[9],data.samples[i].otu_labels[8],data.samples[i].otu_labels[7],data.samples[i].otu_labels[6],data.samples[i].otu_labels[5],data.samples[i].otu_labels[4],data.samples[i].otu_labels[3],data.samples[i].otu_labels[2],data.samples[i].otu_labels[1],data.samples[i].otu_labels[0]],                    
                        name:"otu",
                        type:"bar",
                        orientation:"h"
                    };
                    var chartData = [trace1];
                    var layout1 = {
                        title: "Top 10 Bacteria Cultures Found",
                        yaxis:{
                            tickmode:"array",
                            tickvals:[0,1,2,3,4,5,6,7,8,9],
                            ticktext:["OTU "+data.samples[i].otu_ids[9],"OTU "+data.samples[i].otu_ids[8],"OTU "+data.samples[i].otu_ids[7],"OTU "+data.samples[i].otu_ids[6],"OTU "+data.samples[i].otu_ids[5],"OTU "+data.samples[i].otu_ids[4],"OTU "+data.samples[i].otu_ids[3],"OTU "+data.samples[i].otu_ids[2],"OTU "+data.samples[i].otu_ids[1],"OTU "+data.samples[i].otu_ids[0]]
                        }
                       };
       
                        //Plot the Chart to a div tag with bar
                       Plotly.newPlot("bar", chartData, layout1);

                }
            // plot the bubble chart
            var trace3={
                    x:otuid,
                    y:data2,
                    text:data.samples[i].otu_labels,
                    mode:"markers",
                    marker:{
                    size:data2,
                    color:otuid
                    }
                };
            var chartdata3=[trace3]
            var layout3={
                    title:"Bacteria Cultures Per Sample",
                    xaxis:{
                        title: "OTU ID",
                    }
                }
                // Plot the Chart to a div tag with bubble
                Plotly.newPlot("bubble",chartdata3,layout3);    
                        
                    
                
                
            break;
            
           
            
            }
        }
    });
    
    
}
init();
