

/*
-----------Attribute	Type	Values	Notes----------------

period	integer	0, 1, 2, 3, 4	
  0 will be returned for games that have not started. 4 will be returned when a game is either complete or in the 4th quarter.

status	string	{start_time}, 1st Qtr, 2nd Qtr, Halftime, 3rd Qtr, 4th Qtr, Final	
  {start_time} looks something like "7:00 pm ET", which indicates that the game has not started yet.

time	string	{time_in_period}, " "	
  ${time_in_period} looks something like "3:44". " " is an empty string that is returned when game has not started or is complete.

-----------Attribute	Type	Values	Notes----------------
*/

//GET ALL APIS
// const getAllStats = `https://www.balldontlie.io/api/v1/stats?seasons[]=${2018}&seasons[]=${2015}&player_ids[]=${1}&player_ids[]=${2}&postseason=true`;
export const getAllStats = "https://www.balldontlie.io/api/v1/stats"
/*---------QUERY PARAMETERS---------
?page=0
?per_page=25 (max 100)
dates[]=yyyy-mm-dd
seasons[]=yyyy
team_ids[]=1
postseaso=boolean
start_date=yyyy-mm-dd
end_date=yyyy-mm-dd
*/


export const getAllAvgs = "https://www.balldontlie.io/api/v1/season_averages";
/*---------QUERY PARAMETERS---------
?season=yyyy (default is current)
?player_ids[]=1
*/

export const getAllPlayers = "https://www.balldontlie.io/api/v1/players";
/*---------QUERY PARAMETERS---------
?page=0
?per_page=25 (max 100)
?search=davis
*/

export const getAllTeams = "https://www.balldontlie.io/api/v1/teams";
/*---------QUERY PARAMETERS---------
?page=0
?per_page=25 (max 100)

*/


export const getAllGames = "https://www.balldontlie.io/api/v1/games";
/*---------QUERY PARAMETERS---------
?page=0
?per_page=25 (max 100)
dates[]=yyyy-mm-dd
seasons[]=yyyy
team_ids[]=1
postseaso=boolean
start_date=yyyy-mm-dd
end_date=yyyy-mm-dd
*/


//GET SINGLE API
export const getPlayer = `https://www.balldontlie.io/api/v1/players/`;
export const getTeam = `https://www.balldontlie.io/api/v1/teams/`;
export const getGame = `https://www.balldontlie.io/api/v1/games/`;
