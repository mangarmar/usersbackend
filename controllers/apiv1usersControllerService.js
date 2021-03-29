'use strict'
const axios = require("axios");

module.exports.getUsers = async function getUsers(req, res, next) {
let userRequest = await axios.get('https://api.github.com/orgs/governify/members')
let users = userRequest.data;
let userList = [];
await Promise.all(users.map(async (user) => {
  let resultUser = {
    name: user.login,
    avatar: user.avatar_url,
    repositories: [] 
  }
  let repoRequest = await axios.get('https://api.github.com/users/'+ user.login +'/repos')
  repoRequest.data.forEach(repo => {
    resultUser.repositories.push({
      name: repo.name,
      commits: repo.size
    });
  })
  userList.push(resultUser);
}))

  res.send(userList);
};

module.exports.addUser = function addUser(req, res, next) {
  res.send({
    message: 'This is the mockup controller for addUser'
  });
};