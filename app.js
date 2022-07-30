const tableBody = document.querySelector('#dataD');
const myDate = new Date((Math.floor(new Date().getTime())-1382400000));
const sBtn = document.querySelector('#searchButton');
const loadDiv = document.querySelector('.loading');
const midDiv = document.querySelector('.mid');
const inputDiv = document.querySelector('.inputSection');
const walletInput = document.querySelector('#walletInput');

// Epochs e data
console.log(`${myDate.getMonth()+1}/${myDate.getDate()}`);

// Get data from Apollo API
const getData = async (wallet) => {
    try{
        const pegaData = await axios.get(`https://api-apollo.pegaxy.io/v1/pegas/owner/user/${wallet}`);
        // Creates the Object
        const pegaInfo = await fillObject(pegaData.data);
        return pegaInfo;
    }catch(e){
        console.log(e);
    }
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
        let lastItem = pegaEarnData.data.pop();
        if (lastItem == null){
            pegaObj.lastDate = `null`;
        }else{
            let epochDate = new Date(lastItem.epoch*1000);
            pegaObj.lastDate = `${epochDate.getMonth()+1}/${epochDate.getDay()}`;
        }
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

// const drawTable = (tableData) =>{
//     console.log(tableData);
// }

sBtn.addEventListener('click', ()=>{
    loadDiv.style.display = "flex";
    inputDiv.classList.toggle('hide');
    let apolloData = getData(walletInput.value)
        .then((res) => {
            loadDiv.style.display = "none";
            midDiv.classList.toggle('hide');
            apolloData = res;
            apolloData.forEach(emp => {
                let row = document.createElement('tr');
                
                Object.entries(emp).forEach(([key, value]) => {
                    let cell = document.createElement('td');
                    let textNode = document.createTextNode(value);
                    if ((key == "energy")&&(value>20)){
                        cell.classList.toggle('danger');
                    }else if((key == "energy")&&(value>=15)){
                        cell.classList.toggle('warning');
                    }else if((key == "energy")&&(value>=0)){
                        cell.classList.toggle('success');
                    }
                    cell.appendChild(textNode);
                    row.appendChild(cell);
                })

                tableBody.appendChild(row)
            });
        }).catch((rej) => {
            console.log('Error', rej);
        });
})

// Function test
// const pegaTest = async () => {
//     const pegaEarnData = await axios.get(`https://api-apollo.pegaxy.io/v1/pegas/5379/earnings?since=${myDate/1000}`)
//     let lastItem = pegaEarnData.data.pop();
//     console.log(lastItem.epoch)
// }