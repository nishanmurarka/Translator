tags=document.querySelectorAll("select");
translateBtn=document.querySelector("button");
exchangebtn=document.querySelector(".exchange");
fromtextarea=document.querySelector(".from-text");
totextarea=document.querySelector(".to-text");
icons=document.querySelectorAll(".row i");

tags.forEach((tag,i) => {
    
    for(const [key,value] of Object.entries(countries))
    {
        let option;
        if((key=="en-GB"&&i==0)||(key=="hi-IN"&&i==1))
        {
            option=`<option value="${key}" selected>${value}</option>`;
        }
        else{
            option= `<option value="${key}">${value}</option>`;
        }
        
        tag.insertAdjacentHTML("beforeend",option);
    }
});
fromtextarea.addEventListener("keyup", () => {
    if(!fromtextarea.value) {
        totextarea.value = "";
    }
});
function translateFunction(event)
{
    const fromcountry=tags[0].value;
    const tocountry=tags[1].value;
    var fromtext=fromtextarea.value;
    if(event!=null){
        fromtext+=event.key;
    }
    if(!fromtext) return;
    totextarea.setAttribute("placeholder", "Translating...");
    let url=`https://api.mymemory.translated.net/get?appid=4ef69430f5866babccd0&q=${fromtext}!&langpair=${fromcountry}|${tocountry}`;
    fetch(url).then(
        function(response){
            return response.json();
        }
    ).then(
        function(data){
            data.matches.forEach(data => {
                if(data.id === 0) {
                    totextarea.value = data.translation;
                }
            });
            totextarea.setAttribute("placeholder", "Translation");
            totextarea.value=data.responseData.translatedText;
        }
    );
};

translateBtn.addEventListener("click",()=>{
    translateFunction(null);
});
// document.addEventListener("keypress",function(event){
//     translateFunction(event);
// });


icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        
        
        
        if(target.classList.contains("fa-copy"))
        {
            if(target.id=="from")
            navigator.clipboard.writeText(fromtextarea.value);
            else
            navigator.clipboard.writeText(totextarea.value);
        }
        else
        {
            
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromtextarea.value);
                utterance.lang = tags[0].value;
            } 
            else {
                
                utterance = new SpeechSynthesisUtterance(totextarea.value);
                utterance.lang = tags[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });

});

exchangebtn.addEventListener("click",function(){
    exchangeicon=document.querySelector(".fa-exchange-alt");
    exchangeicon.classList.add("pressed");
        setTimeout(()=>{
            exchangeicon.classList.remove("pressed");
        },100);
    let templang=tags[0].value;
    tags[0].value=tags[1].value;
    tags[1].value=templang;
    let temptext=fromtextarea.value;
    fromtextarea.value=totextarea.value;
    totextarea.value=temptext;

});
bb=document.querySelectorAll(".fa-copy")[0];

bb.addEventListener("click",()=>{
    console.log(bb);
    bb.classList.add("pressed");
    setTimeout(()=>{
        bb.classList.remove("pressed");
    },100);
});
