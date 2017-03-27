// JavaScript File

;
(function() {
    function randomInteger(min, max) {
        var rand = min + Math.random() * (max - min)
        rand = Math.round(rand);
        return rand;
    }

    function Game(board) {
        this.board = board;
        this.board.addEventListener("click", this.flipFlopClick.bind(this));
    }

    Game.prototype.generateBoard = function() {
        this.items = 16;

        var icons = [{
            "icon": "glyphicon glyphicon-euro",
            "color": "#FF69B4",
            "placed": 0
        }, {
            "icon": "glyphicon glyphicon-heart",
            "color": "#DDA0DD",
            "placed": 0
        }, {
            "icon": "glyphicon glyphicon-star",
            "color": "#EECFA1",
            "placed": 0
        }, {
            "icon": "glyphicon glyphicon-user",
            "color": "#00BFFF",
            "placed": 0
        }, {
            "icon": "glyphicon glyphicon-lock",
            "color": "#00FF7F",
            "placed": 0
        }, {
            "icon": "glyphicon glyphicon-home",
            "color": "#FFF68F",
            "placed": 0
        }, {
            "icon": "glyphicon glyphicon-plane",
            "color": "#FFC1C1",
            "placed": 0
        }, {
            "icon": "glyphicon glyphicon-usd",
            "color": "#AB82FF",
            "placed": 0
        }, ];

        var counter = 0;
        var result = '';
        for (var i = 15; i >= 0; i--) {
            do {
                var index = randomInteger(0, 7);
            } while (icons[index].placed == 2 && counter <= 15);
            result += '<div class="Cell" data-index="' + index + '"><div class="frontFace"></div><div class="backFace" style="background-color:' + icons[index].color + '"><span class="' + icons[index].icon + '"></span></div></div>';
            counter++;
            icons[index].placed++;

        };
        return result;
    };

    Game.prototype.generateMessage = function() {
        var msg = document.createElement('div');
        msg.className = "messageBox display";
        msg.innerHTML = [
            '<h1>',
            'Игра закончена',
            '</h1>',
            '<p> Все таблички были открыты за ',
            this.timer,
            ' секунд и ',
            this.clicked,
            ' кликов',
            '</p>',
            '<button class="restartGameBtn">Начать заново</button>'
        ].join('');
        return msg;
    }

    Game.prototype.start = function() {
        this.timer = 0;
        this.clicked = 0;
        this.intervalId = setInterval(this.interval.bind(this), 1000);
        this.board.innerHTML = this.generateBoard();
    };

    Game.prototype.endGame = function() {
        clearInterval(this.intervalId);
        this.board.appendChild(this.generateMessage());
    };

    Game.prototype.interval = function() {
        this.timer += 1;
        if (this.timer % 5 == 0) {
            var msg = document.createElement('div');
            msg.className = "seconds";
            msg.innerHTML = ['Прошло ', this.timer, ' секунд'].join('');
            document.body.appendChild(msg);
            setTimeout(function() {
                msg.parentNode.removeChild(msg);
            }, 1000);
        }
    }

    Game.prototype.flipFlopClick = function(event) {
        this.cur = this.cur || [];
        var self = this;
        var target = event.target;
        var parent = target.parentNode;
        if (target.classList.contains("frontFace")) {
            parent.classList.add("Active");

            self.cur.push(parent);
            self.clicked += 1;
            if (self.clicked > 0 && self.clicked % 10 == 0) {
                var msg = document.createElement('div');
                msg.className = "clicks";
                msg.innerHTML = ['Сделано ', self.clicked, ' кликов'].join('');
                document.body.appendChild(msg);
                setTimeout(function() {
                    msg.parentNode.removeChild(msg);
                }, 2000);
            }
            if (self.cur.length > 1) {

                if (self.cur.length > 2) {
                    setTimeout(function() {
                        self.cur.map(function(item) {
                            item.classList.remove('Active');
                        });
                        self.cur.length = 0;
                    }, 500);
                }
                else {
                    setTimeout(function() {
                        self.cur.map(function(item) {
                            item.classList.remove('Active');
                        });
                        self.cur.length = 0;
                    }, 500);
                    if (self.cur[0].dataset.index == self.cur[1].dataset.index) {
                        self.cur[0].classList.add('Drop');
                        self.cur[1].classList.add('Drop');
                        self.items -= 2;
                    }
                    if (self.items == 0) {
                        self.endGame();
                    }
                }
            }
        }

        if (target.classList.contains("restartGameBtn")) {
            parent.classList.remove('display');
            self.start();
        }
    }

    Game.prototype.render = function() {
        this.board.innerHTML = generateBoard();
    }

    window.onload = function() {
        var board = document.getElementsByClassName("Board")[0];
        var game = new Game(board);
        game.start();
    };
})();
