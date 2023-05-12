const searchBar = document.getElementById('search');
const items = document.getElementsByClassName('items');

searchBar.addEventListener('keyup', (e) => {
    const value = e.target.value.toUpperCase()
    for (let i = 0; i < items.length; i++) {
        const careerName = items[i].getElementsByTagName("h3")[0];
        const txtValue = careerName.textContent || careerName.innerText;
        if (txtValue.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          items[i].style.display = "";
        } else {
          items[i].style.display = "none";
        }
    }
})
