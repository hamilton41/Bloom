const choosingTool = `
    <iframe src="" frameborder="0" id="choosing-tool-iframe"></iframe>
    <div class="choosing-tool">
    <div class="choosing-tool-select selected" id="template1">
        <p>版面一</p>
    </div>
    <div class="choosing-tool-select" id="template2">
        <p>版面二</p>
    </div>
    <div class="choosing-tool-complete">
        <p>選擇完成</p>
    </div>
    </div>
`;

document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('body').insertAdjacentHTML('beforeend', choosingTool);
    chooseTemplate('template1');
    const choosingSelector = document.querySelectorAll('.choosing-tool-select');
    const choosingComplete = document.querySelector('.choosing-tool-complete');
    for(let i=0;i<choosingSelector.length;i++){
        choosingSelector[i].addEventListener('mouseenter',function(){
            if(!choosingSelector[i].classList.contains('selected')){
                document.querySelector('.choosing-tool-select.selected').classList.remove('selected');
                choosingSelector[i].classList.add('selected');
                let templateId = choosingSelector[i].getAttribute('id');
                chooseTemplate(templateId);
            }
        });
    }
    choosingComplete.addEventListener('click',function(){
        let choosingId = document.querySelector('.choosing-tool-select.selected').getAttribute('id');
        window.location.href = choosingId + '/index.html';
    });
});

function chooseTemplate(chooseId){
    chooseId = chooseId + '/index.html';
    var choosingToolIframe = document.querySelector('#choosing-tool-iframe');
    choosingToolIframe.setAttribute('src',chooseId);

}