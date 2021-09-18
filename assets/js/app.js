//<!--============================= BUTTON humberger ================= -->
const allBoxes = document.querySelectorAll('.box');
const sideNav = document.querySelector('.navigation');
// sideNav
allBoxes.forEach(box=>{
    box.addEventListener('click',()=>{
            box.classList.toggle('active');
            sideNav.classList.toggle('active');
    })
});
const accBoxes = document.querySelectorAll('.contentBox');
accBoxes.forEach(acc=>acc.addEventListener('click',()=>{
    acc.classList.toggle('active');
}));
const btnSearch = document.querySelectorAll('.btn-search');
btnSearch.forEach(btn=>btn.addEventListener('click',()=>{
    btn.parentElement.classList.toggle('active');
}))
