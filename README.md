# highstocks-selectable-libe-chart
Grafico de linha com suporte a seleção de pontos através de ranges (drag)


# Exemplo

```javascript
function genSignal(){
        baseTimestamp = new Date().getTime();
        var data = [];
        var j = 0;
        for(var i=0;i<100000;i++){
            if(i%500===0){
                data.push([baseTimestamp,20])
            }else if(i%350===0){
                data.push([baseTimestamp,-20])
            }
            else{
                data.push([baseTimestamp,(Math.abs((((Math.tan((i+30)%90)))))%10)+0])
            
            }
            baseTimestamp += 1000 * 600
            
        }
        
        return data;
}

chart = new SelectableChart('container',{
            name: "dados",
            data: genSignal(),
            color:"black"
    },null,(selecteds)=>{console.log(selecteds[0])});
```


# Exibindo Seleção
```javascript
chart = new SelectableChart('container',{
            name: "dados",
            data: genSignal(),
            color:"black"
    },null,(selecteds)=>{console.log(selecteds[0])});

chart.showSelecteds()
```

# Escondendo Seleção
```javascript
chart = new SelectableChart('container',{
            name: "dados",
            data: genSignal(),
            color:"black"
    },null,(selecteds)=>{console.log(selecteds[0])});

chart.hideSelecteds()
```