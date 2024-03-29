
const item = document.querySelectorAll('.item');
function ativeLink(){
    item.forEach((list)=>
    list.classList.remove('ative'));
    this.classList.add('ative');
};

item.forEach((list)=>
list.addEventListener('click', ativeLink));
