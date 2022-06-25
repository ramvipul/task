 const fs = require('fs');

let dataPacket={
    primaryResourceId:1,
    payload:'1',
    dataPacketIndex:1,
    IsLastChunk:false,
}
let dataPacket2={
    primaryResourceId:1,
    payload:'12',
    dataPacketIndex:2,
    IsLastChunk:false,
}
let dataPacket3={
    primaryResourceId:1,
    payload:'123',
    dataPacketIndex:3,
    IsLastChunk:true,
}
let dataPacket4={
    primaryResourceId:2,
    payload:'1234 12',
    dataPacketIndex:1,
    IsLastChunk:false,
}
let dataPacket5={
    primaryResourceId:3,
    payload:'1234 12',
    dataPacketIndex:1,
    IsLastChunk:false,
}
let dataPacket7={
    primaryResourceId:3,
    payload:'1234567 123',
    dataPacketIndex:2,
    IsLastChunk:true,
}
let dataPacket6={
    primaryResourceId:2,
    payload:'123456 123',
    dataPacketIndex:3,
    IsLastChunk:false,
}
let dataPacket8={
    primaryResourceId:2,
    payload:'123',
    dataPacketIndex:2,
    IsLastChunk:true,
}
let arrayPacket=[dataPacket4,dataPacket3,dataPacket,dataPacket2,dataPacket5,dataPacket6,dataPacket7,dataPacket8];
let allDataPacket=[]; 
for(let i=0; i<arrayPacket.length; i++){
    function ancillaryService(dataPacket){
       let data=dataPacket.payload;
        let convertedData=[];
        let words=data.split(' ');
        for(let i=0;i<words.length;i++){
            convertedData.push(words[i].length);
        }
        dataPacket.payload=convertedData;
      
        return dataPacket;
        
    }
    let ancillaryData= ancillaryService(arrayPacket[i]);
    allDataPacket.push(ancillaryData);
}
let sort=allDataPacket.sort((a,b)=> (a.primaryResourceId - b.primaryResourceId || a.dataPacketIndex-b.dataPacketIndex ));

let arrayOfResource=[]
for(let i=0; i<sort.length; i++){
    if(i==0){
        arrayOfResource.push(...sort[i].payload);
    }
    else if(sort[i].primaryResourceId==sort[i-1].primaryResourceId){
        arrayOfResource.push(...sort[i].payload);
    }
    else{
        fs.writeFileSync(`${sort[i-1].primaryResourceId}.txt`,JSON.stringify(arrayOfResource));
        arrayOfResource=[];
        arrayOfResource.push(...sort[i].payload);
    }
    if(i==sort.length-1){
    fs.writeFileSync(`${sort[i].primaryResourceId}.txt`,JSON.stringify(arrayOfResource));
    }
   
}
    

