let ZealotCount = undefined;
const ZealotCountdiv = document.createElement('div')
ZealotCountdiv.textContent = ZealotCount
document.body.appendChild(ZealotCountdiv)

document.addEventListener('DOMContentLoaded', function(){
    chrome.tabs.query({currentWindow: true, active: true}, 
        function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, 'hi', setCount)
        })
        
    function setCount(res){
        ZealotCount = parseInt(res.count)
        ZealotCountdiv.textContent = `Zealots killed: ${ZealotCount} <br> in this sessin: ${ZealotCount - parseInt(localStorage.getItem("counterStart"))}`

    }
    document.getElementById('setCounterStart').addEventListener('click', function (){
        setCounterStart(ZealotCount)
    }, false)
    
}, false)

function setCounterStart(value) {
    localStorage.setItem("counterStart", value); 
}
