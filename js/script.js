const overview = document.querySelector(".overview");//profile info will appear
const username = "SK-CWD";//username on git hub
const repoList = document.querySelector(".repo-list");//displays the list of repos
const repoContainer = document.querySelector(".repos");//full container when clicked
const repoDetails = document.querySelector(".repo-data");//individual repo info (detials)

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

//click event on the unordered list with a class of “repo-list.”
repoList.addEventListener("click", function (e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        
        extraDetails(repoName);
    }
});

//async function to get repo information 
const extraDetails = async function (repoName) {
    const specificRepo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepo.json();
    console.log(repoInfo);

    //get specific repo info
    //get languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    //add each language to an empty array
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayExtraInfo(repoInfo, languages);
};

const displayExtraInfo = function (repoInfo, languages) {
    repoDetails.innerHTML = "";
    repoDetails.classList.remove("hide");
    repoContainer.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoDetails.append(div);
};

