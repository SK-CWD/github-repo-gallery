const overview = document.querySelector(".overview");//profile info will appear
const username = "SK-CWD";//username on git hub

//this async function will fetch info from my GitHub profile using API address
const pulledFromGitHub = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);

    displayInfo(data);
};

pulledFromGitHub();

//this function below will display the fetched user info to my webpage.
const displayInfo = function (data){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;

    overview.append(div);
};

