const overview = document.querySelector(".overview");//profile info will appear
const username = "SK-CWD";//username on git hub
const repoList = document.querySelector(".repo-list");//displays the list of repos

//this async function will fetch info from my GitHub profile using API address
const pulledFromGitHub = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
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
    allRepos();
};

//async function to fetch all my repos
const allRepos = async function () {
    const res = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await res.json();
    // console.log(repoData);

    repoDescriptions(repoData);
};

//function will display information about each repo //Use repos as 
//a parameter so that the function accepts the data returned from your last API call
const repoDescriptions = function (repos) {
    for(const repo of repos){
        const eachRepo = document.createElement("li");
        eachRepo.classList.add("repo");
        eachRepo.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(eachRepo);
    }
};

