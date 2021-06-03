const counter = new kill_counter(document.querySelector("#ZealotCount"), "Zealots")

document.addEventListener('DOMContentLoaded', function(){
    process()
        
    document.getElementById('setCounterStart').addEventListener('click', function (){
        counter.resetStart()
    }, false)
    
}, false)

async function process(){

    const api_link = "https://api.hypixel.net" 
    const params_ = {
        key : 'badde73b-850a-4027-bda9-8a753c50e245',
        uuid: '2cac5693716a404dae32e3f4107c6c1a'
    }

    let querry = `${api_link}/player${strinfyParams(params_)}`;

    await fetch(querry)
        .then(result => result.json())
        .then(({ player }) => {
            // Log the player's username
            // console.log(player.displayname)

            for (const key in player.stats.SkyBlock.profiles) {
                if(player.stats.SkyBlock.profiles[key].cute_name == "Grapes"){
                    params_.profile = player.stats.SkyBlock.profiles[key].profile_id
                    break;
                }
            }
        })
    
    let account = undefined
    
    querry = `${api_link}/skyblock/profile${strinfyParams(params_)}`;

    killCounter(querry, params_.uuid)    
}

async function killCounter(querry, uuid) {
    let start = await getCount(querry, uuid);
    counter.setValue(start)

    setInterval(async function(){
        counter.setValue(await getCount(querry, uuid))
    }, 5000)
}

async function getCount(querry, uuid){
    let account = {}
    await fetch(querry)
    .then(result => result.json())
    .then(({ profile }) => {
        account = profile.members[uuid]        
    })

    return account.stats.kills_zealot_enderman;
}

function strinfyParams(params_) {
    let stringified = new Array()
    for (const key in params_) {        
        stringified.push(`${key}=${params_[key]}`);
    }
    return `?${stringified.join("&")}`
}
