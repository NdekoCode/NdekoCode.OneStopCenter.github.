//<!--============================= BUTTON humberger ================= -->
const allBoxes = document.querySelectorAll('.box');
const sideNav = document.querySelector('.navigation');
// sideNav
allBoxes.forEach(box=>{
    box.addEventListener('click',()=>{
            box.classList.toggle('active');
            sideNav.classList.toggle('active');
    })
})
