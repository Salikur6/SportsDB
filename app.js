const allPlayers = () => {
    document.getElementById('parent-card').innerHTML = '';
    document.getElementById('spinner').style.display = "block";

    const searchInput = document.getElementById('search-box');
    const searchValue = searchInput.value;

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.player == null) {
                document.getElementById('spinner').style.display = "block";
            } else {

                showPlayers(data.player)

            }
        })



    searchInput.value = '';
}


const showPlayers = (player) => {
    document.getElementById('spinner').style.display = "none";
    const parentCard = document.getElementById('parent-card');
    // parentCard.innerHTML = '';

    for (const data of player) {
        // console.log(data)
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card text-center py-4">
                <div>
                    <img width="335" src="${data.strThumb}">
                </div>
                <h3>Name: ${data.strPlayer}</h3>
                <h4 class="mt-2">Country: ${data.strNationality}</h4>
                <div class="my-3">
                    <button class="btn btn-danger">delete</button>
                    <button onclick="details('${data.idPlayer}')" class="btn btn-success">details</button>
                </div>
            </div>
        `
        parentCard.appendChild(div);
    }
}


const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`

    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.players[0]))
}

const displayDetails = (data) => {

    if (data.strGender == 'Male') {
        document.getElementById('male').style.display = 'block';
        document.getElementById('female').style.display = 'none';
    } else {
        document.getElementById('male').style.display = 'none';
        document.getElementById('female').style.display = 'block';
    }

    const rightContainer = document.getElementById('right-side');
    rightContainer.innerHTML = `
        <img class="w-100" src="${data.strCutout}">
        <h2>Name: ${data.strPlayer}</h2>
        <h4>Country: ${data.strNationality}</h4>
        <h5>Date of Birth: ${data.dateBorn}</h5>
        <a href="${data.strFacebook}">Facebook</a>
        <p>Description: ${data.strDescriptionEN}</p>
    `
}