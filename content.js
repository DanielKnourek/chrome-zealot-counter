
let loadMore = document.querySelector("button.kill-stat.show-all.enabled")
if(loadMore != null){
    loadMore.click()
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    let statList = Array.from(document.querySelectorAll(".top-kills .narrow-info-content .kill-stat"))
    let result = statList.filter(function(killstat){
        return killstat.querySelector(".kill-entity").innerText.includes("Zealot");
    })
    sendResponse({count: result[0].lastElementChild.textContent})
})