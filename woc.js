const form = document.forms[0];

// //set array of letters
// const letters = ['a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//Answers
// hint category: answer string
const answers = [{
    Games: 'monopoly'
  },
  {
    Food: 'lasagna'
  },
  {
    Sports: 'rugby'
  },
  {
    Clothing: 'cardigan'
  },
  {
    Accessories: 'scrunchie'
  },
  {
    Movies: 'titanic'
  },
  {
    Colors: 'navy'
  },
  {
    Games: 'tetris'
  },
  {
    Food: 'alfredo'
  },
  {
    Sports: 'lacross'
  },
  {
    Clothing: 'blouse'
  },
  {
    Accessories: 'anklet'
  },
  {
    Movies: 'gladiators'
  },
  {
    Colors: 'aqua'
  },
  {
    Games: 'pinball'
  },
  {
    Food: 'asparagus'
  },
  {
    Sports: 'hockey'
  },
  {
    Clothing: 'overalls'
  },
  {
    Accessories: 'glasses'
  },
  {
    Movies: 'frozen'
  },
  {
    Colors: 'maroon'
  }
];

const randAns = answers[random(answers)];
const randCat = Object.keys(randAns);
const randWord = Object.values(randAns)[0];
const wrdLetters = randWord.split('');
wrdLetters.map(function(x) {
  return x.toUpperCase()
})
const wrdLength = wrdLetters.length;

function random(arr) {
  return Math.floor(Math.random() * arr.length);
}
const prevGuesses = [];
const inputs = form.querySelectorAll('input[type=text]');

// display test message
document.querySelector('.hint').innerText = 'Hint: ' + randCat;


// Begin Game
(function newGame() {

  //Game Logic
  var count = 0;

  //Display Letter Boxes?
  (function displayBoxes() {
    for (i = 0; i < wrdLength; i++) {
      const wrdBox = document.querySelector('.word');
      const newDiv = document.createElement('div');
      newDiv.className = 'ltrbox';
      newDiv.innerHTML = '<span class="ltr"></span>';
      wrdBox.appendChild(newDiv);
    }
  })();

  function clearMsgDiv() {
    timeoutId = setTimeout(function() {
      document.querySelector('.message').innerHTML = '';
    }, 3000);
  }


  //Event Listener for Submissions
  form.addEventListener('submit', function(event) {
    event.preventDefault(); //to prevent page refresh
    var guess = document.querySelector('#guessForm').value;

    //Prevent Duplicates and push user input into Array
    for (var i = 0; i < inputs.length; i++) {
      if (prevGuesses.indexOf(inputs[i].value) != -1) {
        inputs[i].style.backgroundColor = "#ffd4de";
        document.querySelector('.message').innerHTML = "<span class='msgfade'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i>Guess Must Be Unique</span>";
        clearMsgDiv();

        form.guessForm.value = ''; //clear form on submission
        return false;
      } else
        prevGuesses.push(inputs[i].value);
      i++;
      document.querySelector('.sofar').classList.remove('hidden');
      document.querySelector('.guessedltrs').innerHTML = prevGuesses.join(" | ");
    }

    for (var j = 0; j < inputs.length; j++) {
      inputs[j].addEventListener('focus', function() {
        this.style.backgroundColor = "white";
      });
    }


    if (guess == " " || guess == null || guess == parseInt(guess, 10)) {
      document.querySelector('.message').innerHTML = "<span class='msgfade'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i>Guess Must Be a Letter</span>";
      clearMsgDiv();
      form.guessForm.value = ''; //clear form on submission
      return false;
    } else {

      //check for letter matches from guess
      var re = new RegExp('[' + randWord + ']', 'gi');
      var guessMatch = re.test(guess);
      if (guessMatch) {
        count++;

        //display occurances in an array to use as indexes
        var ltrOccur = [];
        var idx = wrdLetters.indexOf(guess);
        while (idx != -1) {
          ltrOccur.push(idx);
          idx = wrdLetters.indexOf(guess, idx + 1);
        }

        // write what it should do with indexes "occurances"
        var ltrBoxes = document.querySelectorAll('.ltrbox');
        for (let i = 0; i < ltrOccur.length; i++) {
          //i++;
          var index = ltrOccur[i];
          ltrBoxes[index].innerHTML = '<div class="ltr">' + wrdLetters[index] + '</div>';
        }

      } else {
        document.querySelector('.message').innerHTML = "<span class='msgfade'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i>Nope, Guess Again!</span>";
        clearMsgDiv();
      };

      // Win Game Logic

      // return array with only unique values
      var unique = wrdLetters.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      });

      //compare unique array against matches
      if (count === unique.length) {
        document.querySelector('.formWrap').innerHTML = '<div class="youwin"><i class="fa fa-trophy" aria-hidden="true"></i>You Win!</div><button class="newgamebtn" onclick="location.reload()">New Game</button>';


        const newGameBtn = document.querySelector('.newgamebtn');

        //remove word from array after win
        for (var i = answers.length - 1; i >= 0; i--) {
          if (answers[i] === randAns) {
            answers.splice(i, 1);
            break;
          }
        }

      }

      form.guessForm.value = '';
    }

  }); // end Event Listener

})(); //end newGame
