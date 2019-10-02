import {
  select,
  json
} from 'd3';


import * as NBALinks from '../nba_util';

//Remember to add ids at the end for single API calls
// let playerId;
// let teamId;
// let gameId;
// let queryString = '/?';

// let teams = [];
// let playersOnTeam = [];

// const svg = select('svg');
// const width = +svg.attr('width');
// const height = +svg.attr('height');

// let i = 1;
// let totalPages = 32;
// let stats = [];
// let games = [];
// let players = [];

// while (i <= 60) {

//   json(NBALinks.getAllPlayers + queryString + `per_page=100&page=${i}`)
//     .then(data => {
//       players.push(data);
//     })
//     .then(() => {
//       console.log(players);
//     });
////////////////////////
//   json(NBALinks.getAllStats + queryString + `seasons[]=2018&postseason=false&per_page=100&page=${i}`)
//     .then(data => {
//       data.data.forEach(stat => {
//         stats.push(stat);
//         games.push(stat.game);
//         let player = {
//           name: stat.player.first_name + ' ' + stat.player.last_name,
//           position: stat.player.position,
//           team: stat.team.full_name,
//           height: stat.player.height_feet + ' "' + stat.player.height_inches,
//           playerId: stat.player.id,
//           teamId: stat.team.id
//         }
//         players.push(player);
//       });
//     })
//     .then(() => {
//       console.log(players)
//     });

//   i++;
// }

// json(NBALinks.getAllTeams + queryString + "per_page=30")
//   .then(data => {
//     data.data.forEach(team => {
//       let teamData = {
//         id: team.id,
//         name: team.full_name,
//         abbrev: team.abbreviation,
//         city: team.city,
//         conference: team.conference,
//         division: team.divison
//       };
//       teams.push(teamData);
//     });
//     console.log(teams);
//   });

// json(NBALinks.getAllPlayers + queryString + 'search=stephen_curry')
//   .then(data => {
//     playerId = data.id;
//   });

// json(NBALinks.getAllStats + queryString + `page=1&seasons[]=2018&postseason=false&player_ids[]=${playerId}per_page=100`)
//   .then(data => {
//     console.log(data);
//   });

// let promises = [];
// const requests = [(NBALinks.getAllPlayers + queryString + 'search=stephen_curry'), (NBALinks.getAllStats + queryString + `page=1&seasons[]=2018&postseason=false&per_page=100`)];

// requests.forEach(url => {
//   promises.push(json(url));
// });

// Promise.all(promises).then(data => {
//   console.log(data);
// })
