let tableBody = document.querySelector('#dataD');
let myDate = new Date((Math.floor(new Date().getTime())-1382400000));

// Epochs e data
console.log(`${myDate.getMonth()+1}/${myDate.getDate()}`);

// Get data from Apollo API
const getData = async () => {
    try{
        const pegaData = await axios.get('https://api-apollo.pegaxy.io/v1/pegas/owner/user/0x3482541038d7002f6E22B001526b6FAfa71074eD');
        // Creates the Object
        const pegaInfo = await fillObject(pegaData.data);
        drawTable(pegaInfo);
    }catch(e){
        console.log(e);
    }
}

const drawTable = (tableData) =>{
    console.log(tableData);
}

const fillObject = async (pegaData) =>{
    let pegaInfo = [];
    for(let key of pegaData){
        let pegaObj = {
            id: key.id, 
            name: key.name, 
            energy: key.energy, 
            type: key.breedType, 
            gender: key.gender, 
            breedCount: key.breedCount, 
            winRate: (Math.floor(key.winRate*100)).toString()+'%',
        }
        const pegaEarnData = await axios.get(`https://api-apollo.pegaxy.io/v1/pegas/${key.id}/earnings?since=${(myDate/1000)}`);
        let total = Math.floor(sumEarned(pegaEarnData.data));
        let dataLength = pegaEarnData.data.length;
        pegaObj.totalEarned = total;
        pegaObj.days = dataLength;
        pegaObj.earnDay = Math.floor(total/dataLength);
        pegaObj.lastDate = pegaEarnData.data[dataLength-1].epoch;
        pegaInfo.push(pegaObj);
    }
    return pegaInfo;
}

const sumEarned = data =>{
    let totalEarned = 0;
    for (let key of data){
        totalEarned += key.ownerPegaRewards;
    }
    return totalEarned;
    
}

const pegaEarn = async (id) => {
    try{
    const pegaEarnData = await axios.get(`https://api-apollo.pegaxy.io/v1/pegas/${id}/earnings?since=${(Math.floor(myDate.getTime()/1000))}`);
    sumEarned(pegaEarnData.data);
    console.log(pegaEarnData.data[14].epoch)
    } catch(e){
        console.log(e);
    }
}

getData();

//Function test
// const pegaTest = async () => {
//     const pegaEarnData = await axios.get(`https://api-apollo.pegaxy.io/v1/pegas/5379/earnings?since=${myDate/1000}`)
//     sumPegaEarnings(pegaEarnData.data);
// }