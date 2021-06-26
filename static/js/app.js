
d3.json("samples.json").then((data)=>{
    
    var selectID=d3.select("#selDataset");
    
    for (i=0;i<153;i++){
    
        selectID.append("option").text(data.names[i]);     
};

 d3.selectAll("#selDataset").on("change",submit);  
});
function init()
{
    
    
    var dataset=d3.select("#selDataset").node().value;
    var metadata=d3.select("#sample-metadata");
    var id=d3.select("#id");
    var ethnicity=d3.select("#ethnicity");
    var gender=d3.select("#gender");
    var age=d3.select("#age");
    var location=d3.select("#location");
    var bbtype=d3.select("#bbtype");
    var wfreq=d3.select("#wfreq");

    d3.json("samples.json").then((data)=>{
        
                
                
    id.text("id:"+data.metadata[0].id.toString());
    ethnicity.text("ethnicity:"+data.metadata[0].ethnicity.toString());
    gender.text("gender:"+data.metadata[0].gender.toString());
    age.text("age:"+data.metadata[0].age.toString());
    location.text("location:"+data.metadata[0].location.toString());
    bbtype.text("bbtype:"+data.metadata[0].bbtype.toString());
    wfreq.text("wfreq:"+data.metadata[0].wfreq.toString());

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
    Plotly.newPlot("gauge",data1,layout);

                
    var data2=data.samples[0].sample_values; 
               
    var data3=data2.slice(0,10);
    var data4=data3.reverse();
    var otuid=data.samples[0].otu_ids              
                
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

               
    Plotly.newPlot("bar", chartData, layout1);
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
    Plotly.newPlot("bubble",chartdata2,layout2);
        

    d3.selectAll("#selDataset").on("change",submit);
            
        
    });
 
}
function submit(){
    d3.event.preventDefault();
    
    var dataset=d3.select("#selDataset").node().value;
    var metadata=d3.select("#sample-metadata");
    var id=d3.select("#id");
    var ethnicity=d3.select("#ethnicity");
    var gender=d3.select("#gender");
    var age=d3.select("#age");
    var location=d3.select("#location");
    var bbtype=d3.select("#bbtype");
    var wfreq=d3.select("#wfreq");

    d3.json("samples.json").then((data)=>{
        for (i=0;i<153;i++){
            console.log(dataset.toString());
            console.log(data.metadata[i].id.toString());            
            if (dataset===data.metadata[i].id.toString()){
                console.log(dataset);
                
                console.log(data.metadata[i]);
               id.text("id:"+data.metadata[i].id.toString());
               ethnicity.text("ethnicity:"+data.metadata[i].ethnicity.toString());
               gender.text("gender:"+data.metadata[i].gender.toString());
               age.text("age:"+data.metadata[i].age.toString());
               location.text("location:"+data.metadata[i].location.toString());
               bbtype.text("bbtype:"+data.metadata[i].bbtype.toString());
               wfreq.text("wfreq:"+data.metadata[i].wfreq.toString());

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
                Plotly.newPlot("gauge",data1,layout);
                
                var data2=data.samples[i].sample_values;
                var data3=data2.slice(0,10);
                var data4=data3.reverse();
                var otuid=data.samples[i].otu_ids;

                if (data.samples[i].sample_values.length===1){
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
                            
                            title:"OTU "+data.samples[i].otu_ids
                            
                        }
                    }
                    Plotly.newPlot("bar",chartdata2,layout2);
                }
                else{           
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
       
                      
                       Plotly.newPlot("bar", chartData, layout1);

                }
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
                    Plotly.newPlot("bubble",chartdata3,layout3);    
                        
                    
                
                
            break;
            id.text("");
            ethnicity.text("");
            gender.text("");
            age.text("");
            location.text("");
            bbtype.text("");
            wfreq.text("");
            
            }
        }
    });
    
    
}
init();
