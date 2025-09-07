function showDialog(dialogId){
    const dialog = document.getElementById(dialogId);
    dialog.showModal();
}

function navigation(){
     if(window.location.hash == ''){
         window.location.hash = 'bienvenido';
     }
     //console.log('page loaded, pointing to ' +  window.location.hash);
     const validMenuLinks = Array.from(document.querySelectorAll('a.pure-menu-link'));
     const validLinks = validMenuLinks.map(l => '#' + l.href.split('#')[1]);
     if(!validLinks.includes(window.location.hash)){
         window.location.hash = 'bienvenido';
         console.log('fixed, pointing to ' +  window.location.hash);
     }
     //click in the pointed menu item
     validMenuLinks.filter(l => l.href.endsWith(window.location.hash))[0].click()

     window.addEventListener("hashchange",(e) => {
         //console.log("The hash has changed! from " + e.oldURL + " to " + e.newURL);
         setTimeout(function() {
              //console.log('check if page is right after 0.5 secs');
              const expectedDiv = window.location.hash.substr(1);
              if(document.getElementById(expectedDiv) == null){
                 //console.log('is not right!');
                  //click in the pointed menu item
                 const theLinkArray = validMenuLinks.filter(l => l.href.endsWith(window.location.hash));
                 if(theLinkArray.length == 1){
                     theLinkArray[0].click()
                 }else{
                     validMenuLinks.filter(l => l.href.endsWith('bienvenido'))[0].click()
                 }
              }
         }, 500);

       },
       false,
     );
}