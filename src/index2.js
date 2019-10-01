import {
  select,
  json
} from 'd3';

import * as NBALinks from '../nba_util';
//Remember to add ids at the end for single API calls
let playerId;
let teamId;
let gameId;
let queryString = '/?';

let teams = [];
let playersOnTeam = [];

const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

json(NBALinks.getAllTeams + queryString + "per_page=30")
  .then(data => {
    data.data.forEach(team => {
      let teamData = {
        id: team.id,
        name: team.full_name,
        abbrev: team.abbreviation,
        city: team.city,
        conference: team.conference,
        division: team.divison
      };
      teams.push(teamData);
    });

  });

// json(NBALinks.getAllPlayers + queryString + `search=stephen_curry`)
//   .then(data => {
//     console.log(data);
//   })

