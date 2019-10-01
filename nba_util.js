import $ from 'jQuery';

export const getAllStats = () => {
  return (
    $.ajax({
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/stats"
    })
  );
};

export const getAllAvgs = () => {
  return (
    $.ajax({
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/season_averages"
    })
  )
}

export const getAllPlayers = () => {
  return (
    $.ajax({
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/players"
    })
  );
};

export const getPlayer = (id) => {
  return (
    $.ajax({
      method: "GET",
      url: `https://www.balldontlie.io/api/v1/players/${id}`
    })
  );
};

export const getAllTeams = () => {
  return (
    $.ajax({
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/teams"
    })
  )
}

export const getTeam = (id) => {
  return (
    $.ajax({
      method: "GET",
      url: `https://www.balldontlie.io/api/v1/teams/${id}`
    })
  );
};

export const getAllGames = () => {
  return (
    $.ajax({
      method: "GET",
      url: "https://www.balldontlie.io/api/v1/games"
    })
  )
}

export const getGame = (id) => {
  return (
    $.ajax({
      method: "GET",
      url: `https://www.balldontlie.io/api/v1/games/${id}`
    })
  );
};

getAllStats();