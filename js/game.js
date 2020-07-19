const maxHits = 10;
let hits = 0;
let mishit = 0;
let firstHitTime = 0;

function round() {
  $('.game-field').removeClass("target");
  $('.game-field').removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $('.target').text(hits + 1);
  if (hits === 0) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $('.j-endGame').hide();
  if (mishit < 10) {
    $("#total-hits-played").text(hits - mishit);
  } else {
    $("#total-hits-played").text('0, вы достигли максимум промахов.');
  }
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
  $("#button-reload").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $('.target').text('');
    hits += 1;
    round();
  } else {
    $(event.target).addClass("miss");
    mishit += 1;
  }
}

function startGame() {
  $('#button-start').hide();
  round();
  $(".game-field").click(handleClick);
}

function init() {
  $("#button-start").click(function() {
    startGame();
  });
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
