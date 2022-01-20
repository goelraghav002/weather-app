let flipped = document.querySelector('.btn_more_info button');
let frontDisplay = document.querySelector('.front');
let backDisplay = document.querySelector('.back');


flipped.addEventListener('click', function(){
    if(frontDisplay.classList.contains('front_display')){
        frontDisplay.classList.remove('front_display');
    }
    else{
        frontDisplay.classList.add('front_display');

    }

});

flipped.addEventListener('click', function(){
    if(backDisplay.classList.contains('back_display')){
        backDisplay.classList.remove('back_display');
    }
    else{
        backDisplay.classList.add('back_display');
    }
});