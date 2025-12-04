
   // created mole and time interval variabled, and a seconds and minutes variables for tracking
    let moleInterval = null;
    let timeInterval = null;
    let seconds = 0;  
    let minutes = 0;
    let score = 0;
    let boardCreated = false;

    function startup() {
      if (boardCreated) return;
      boardCreated = true;

      const table = document.createElement('table');
      document.getElementById('gameBoard').appendChild(table);

      for (let row = 0; row < 3; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 3; col++) {
          const td = document.createElement('td');

          td.addEventListener('click', () => {
            if (td.style.backgroundColor === 'brown') {
              score++;
              document.getElementById('score').textContent = 'Score: ' + score;
              td.style.backgroundColor = 'green'; // remove mole immediately
            }
          });

          td.addEventListener('mouseenter', () => td.style.borderColor = 'orange');
          td.addEventListener('mouseleave', () => td.style.borderColor = 'black');

          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
    }


    function placeMole() {
      const cells = document.querySelectorAll('#gameBoard td');
      if (!cells.length) return;

      cells.forEach(cell => cell.style.backgroundColor = 'green');

      const randomIndex = Math.floor(Math.random() * cells.length);
      const moleCell = cells[randomIndex];
      moleCell.style.backgroundColor = 'brown';

      // remove this mole after 800ms (if not hit)
      setTimeout(() => {
        if (moleCell.style.backgroundColor === 'brown') {
          moleCell.style.backgroundColor = 'green';
        }
      }, 800);
    }

    // ----- timer -----
    function startTimer() {
      // reset
      seconds = 0;
      minutes = 0;
      updateDisplay();

      // clear any existing timer
      if (timeInterval) clearInterval(timeInterval);

      timeInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        updateDisplay();

        // end at 1:00
        if (minutes === 1 && seconds === 0) {
          endGame();
        }
      }, 1000);
    }

    function updateDisplay() {
      const s = seconds < 10 ? '0' + seconds : seconds;
      const m = minutes < 10 ? '0' + minutes : minutes;
      document.getElementById('timeDisplay').textContent = `${m}:${s}`;
    }

    function stopTimer() {
      if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = null;
      }
    }

    // ----- start / end game -----
    function startGame() {
      // create board if not already created
      startup();

      // reset score and display
      score = 0;
      document.getElementById('score').textContent = 'Score: 0';
      document.getElementById('displayScore').textContent = '';

      // ensure any existing intervals are cleared before starting
      if (moleInterval) {
        clearInterval(moleInterval);
        moleInterval = null;
      }
      stopTimer();

      // start timer
      startTimer();

      // start mole movement every 1000ms
      moleInterval = setInterval(placeMole, 1000);
      // place first mole immediately so player doesn't wait
      placeMole();
    }

    function endGame() {
      // stop both intervals
      if (moleInterval) {
        clearInterval(moleInterval);
        moleInterval = null;
      }
      stopTimer();

      document.getElementById('displayScore').textContent = `Time's up! Your Score: ${score}`;
      // visually clear any mole
      document.querySelectorAll('#gameBoard td').forEach(t => t.style.backgroundColor = 'green');
    }

    // wire the start button
    document.getElementById('startBtn').addEventListener('click', startGame);

    startup();
  