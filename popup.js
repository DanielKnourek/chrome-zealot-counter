let ZealotCount = undefined;
const ZealotCountdiv = document.createElement('div')
ZealotCountdiv.textContent = ZealotCount
document.body.appendChild(ZealotCountdiv)

document.addEventListener('DOMContentLoaded', function(){
    process()
        

    document.getElementById('setCounterStart').addEventListener('click', function (){
        setCounterStart(ZealotCount)
    }, false)
    
}, false)

function setCounterStart(value) {
    localStorage.setItem("counterStart", value); 
}

function setCount(res){
    ZealotCount = parseInt(res.count)
    ZealotCountdiv.innerHTML = "";
    ZealotCountdiv.appendChild(document.createTextNode(`Zealots killed: ${ZealotCount} `));
    ZealotCountdiv.appendChild(document.createElement('br'));
    ZealotCountdiv.appendChild(document.createTextNode(`in this sessin: ${ZealotCount - parseInt(localStorage.getItem("counterStart"))}`));

}

async function process(){

    const api_link = "https://api.hypixel.net" 
    const params_ = {
        key : 'badde73b-850a-4027-bda9-8a753c50e245',
        uuid: '2cac5693716a404dae32e3f4107c6c1a'
    }

    let querry = `${api_link}/player${strinfyParams(params_)}`;
    console.log(querry)

    await fetch(querry)
        .then(result => result.json())
        .then(({ player }) => {
            // Log the player's username
            console.log(player.displayname)

            for (const key in player.stats.SkyBlock.profiles) {
                if(player.stats.SkyBlock.profiles[key].cute_name == "Grapes"){
                    params_.profile = player.stats.SkyBlock.profiles[key].profile_id
                    break;
                }
            }
        })
    // console.log(params_.profile)
    
    let account = undefined
    
    querry = `${api_link}/skyblock/profile${strinfyParams(params_)}`;
    console.log(querry)

    killCounter(querry, params_.uuid)    
}

async function killCounter(querry, uuid) {
    let start = await getCount(querry, uuid);
    printCurrent(start, start)
    setCounterStart(start)

    setInterval(async function(){
        printCurrent(start, await getCount(querry, uuid))
    }, 5000)
}

function printCurrent(start, current){
    // console.log(`${start} | ${start-current}`)
    setCount({count: current})
}

async function getCount(querry, uuid){
    let account = {}
    await fetch(querry)
    .then(result => result.json())
    .then(({ profile }) => {
        account = profile.members[uuid]        
    })

    // console.log(account.stats.kills_zealot_enderman)
    return account.stats.kills_zealot_enderman;
}

function strinfyParams(params_) {
    let stringified = new Array()
    for (const key in params_) {        
        stringified.push(`${key}=${params_[key]}`);
    }
    return `?${stringified.join("&")}`
}
