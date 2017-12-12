<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Wheel of Chance</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://use.fontawesome.com/6b7272baf0.js"></script>
</head>

<body>
  <div class="container">
    <h1>Guess the Word!</h1>
    <div class="game">
      <div class="word"></div>
      <span class="hint">Loading...</span>
      <span class="message"></span>
      <div class="formWrap">
        <form id="gameForm">
          <label for="guessForm">Guess a Letter</label>
          <input type="text" name="guess" id="guessForm" maxlength="1" autofocus="autofocus" autocomplete="off">
          <button type="submit" value="Guess!" form="gameForm">Submit</button>
        </form>
      </div>
      <div class="sofar hidden">So far, you've guessed:<span class="guessedltrs"></span></div>
    </div>
  </div>

  <script src="woc.js"></script>
</body>

</html>
