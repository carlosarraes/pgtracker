// let tableBody = document.querySelector('#dataD');

// const getData = async () => {
//     try{
//         const pegaData = await axios.get('https://api-apollo.pegaxy.io/v1/pegas/owner/user/0x3482541038d7002f6E22B001526b6FAfa71074eD');
//         dataToTable(pegaData);
//     }catch(e){
//         console.log(e);
//     }
// }

// const dataToTable = (data) => {
//     for(let key in data.data){
//         let nTr = document.createElement('tr');   
//         tableBody.append(nTr);
//         drawRow(data.data[key]);
//     }
// }

// const drawRow = row =>{
//     drawCell(row.id);
//     drawCell(row.name);
//     drawCell(row.breedType);
//     drawCell(row.winRate);
// }

// const drawCell = (cell) =>{
//     let nTd = document.createElement('td');
//     nTd.innerText = cell;
//     tableBody.append(nTd);
// }

// getData();
let myDate = new Date((Math.floor(new Date().getTime()/1000.0)-1296000)*1000);
console.log(`${myDate.getMonth()+1}/${myDate.getDate()}`);