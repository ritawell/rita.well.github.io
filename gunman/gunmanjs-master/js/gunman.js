(function () {
    function Gunman() {
        var __self = this;

        this.domElems = {
            gameArea: document.querySelector('.game_area'),
            life: document.querySelector('.game_life'),
            bandito: document.querySelector('.enemy'),
            menu: document.querySelector('.game_menu'),
            resultText: document.querySelector('.menu_result'),
            btnMenuStart: document.querySelector('.menu__btn-start'),
            level: document.querySelector('.game_level'),
            status: document.querySelector('.game_status'),
            btnNextLevel: document.querySelector('.game_btn-next-level'),
            aim: document.querySelector('.game_aim'),
            bag: document.querySelector('.calc-bag'),
            coins: document.querySelector('.bag-coins')
        };

        this.soundsForGame = {
            death: new Audio('styles/sounds/death.m4a'),
            fire: new Audio('styles/sounds/fire.m4a'),
            fault: new Audio('styles/sounds/foul.m4a'),
            intro: new Audio('styles/sounds/intro.m4a'),
            shot: new Audio('styles/sounds/shot.m4a'),
            wait: new Audio('styles/sounds/wait.m4a'),
            win: new Audio('styles/sounds/win.m4a')
        };

        this.init = function () {
            __self.domElems.btnMenuStart.addEventListener('click', __self.newGame);

            __self.countLifes = 3;
            __self.countBantitos = 5;
            __self.level = 0;
            __self.canFire = false;
            __self.fault = false;
            __self.shootTime = 2000;
        };

        this.newGame = function (levelForBegining) {
            if (!Number(levelForBegining)) {
                __self.countLifes = 3;
                __self.newCountLifes();
                __self.domElems.bandito.className = 'enemy';
                __self.domElems.coins.className = 'bag-coins';
            }
            __self.level = +levelForBegining || 1;
            __self.canFire = false;
            __self.fault = false;

            __self.domElems.bag.classList.remove('calc-bag_hide');

            __self.domElems.menu.classList.add('game_menu_hide');
            __self.domElems.gameArea.classList.add('game_area_bg' + __self.level);

            __self.domElems.bandito.addEventListener('transitionend', __self.startFight);
            __self.domElems.bandito.addEventListener('mousedown', __self.playerHit);

            __self.domElems.level.textContent = 'Level ' + __self.level;
            __self.domElems.level.classList.remove('game_level-hide');

            __self.domElems.life.classList.remove('game_life_hide');
            __self.domElems.resultText.textContent = ''
            __self.domElems.resultText.classList.add('menu_result_hide');

            __self.domElems.bandito.style.left = '';
            if (__self.domElems.bandito.classList.contains('enemy_move')) {
                __self.domElems.bandito.classList.remove('enemy_move');
            }
            setTimeout(function(){
                __self.startMove();
                __self.soundsForGame.intro.play();
            }, 50);
        };

        this.startMove = function () {
            setTimeout(function () {
                __self.domElems.bandito.classList.add('enemy_move');
                __self.clearAnimation();
                __self.enemyWalk();
            }, 50);
        };

        this.startFight = function () {
            __self.soundsForGame.intro.pause();
            __self.soundsForGame.intro.currentTime = 0;
            __self.enemyStay();
            __self.soundsForGame.wait.play();
            setTimeout(function () {
                if (!__self.fault) {
                    console.log('FIRE! canFire!');
                    __self.domElems.status.textContent = 'FIRE!';
                    __self.domElems.status.classList.add('game_status-show');
                    __self.canFire = true;
                    __self.enemyReady();
                    __self.soundsForGame.fire.play();
                    var time = __self.shootTime - (__self.level * 300);
                    setTimeout(__self.gunmanHit, time);
                }
            }, 1000);
        };


        this.gunmanHit = function () {
            if (__self.canFire) {
                __self.domElems.bandito.removeEventListener('mousedown', __self.playerHit);
                __self.canFire = false;
                __self.soundsForGame.shot.play();
                __self.enemyHit();
                __self.domElems.status.textContent = 'Gunman won!';
                __self.soundsForGame.death.play();
                setTimeout(__self.gameOver, 6000);
            }
        };

        this.gameOver = function () {
            __self.countLifes--;
            __self.checkCountLifes();
            __self.domElems.status.textContent = '';
            __self.domElems.status.classList.remove('game_status-show');
            if (__self.countLifes > 0) {
                __self.checkCountLifes();
                __self.newGame(__self.level);
            } else {
                __self.domElems.menu.classList.remove('game_menu_hide');
                __self.domElems.resultText.textContent = 'You lose, but never give up!'
                __self.domElems.resultText.classList.remove('menu_result_hide');
                __self.domElems.level.classList.add('game_level-hide');
                __self.domElems.btnNextLevel.removeEventListener('click', __self.nextLevel);
                __self.domElems.btnNextLevel.classList.remove('game_btn-next-level-show');
                __self.clearAnimation();
            }
        };

        this.checkCountLifes = function () {
            for (var i = 3; i > __self.countLifes; i--) {
                var domLifeImg = document.querySelector('.life__' + i);
                domLifeImg.classList.add('life_img_hide');
            }
        };

        this.newCountLifes = function () {
            for (var i = 1; i < 4; i++) {
                var domLifeImg = document.querySelector('.life__' + i);
                domLifeImg.classList.remove('life_img_hide');
            }
        };

        this.playerHit = function (e) {
            __self.domElems.bandito.removeEventListener('mousedown', __self.playerHit);

            var clickX = e.clientX - __self.domElems.gameArea.offsetLeft - __self.domElems.aim.offsetWidth / 2;
            var clickY = e.clientY - __self.domElems.gameArea.offsetTop - __self.domElems.aim.offsetHeight / 2;
            __self.domElems.aim.style.left = clickX + 'px';
            __self.domElems.aim.style.top = clickY + 'px';

            __self.domElems.aim.classList.remove('game_aim_hide');
            setTimeout(function () {
                __self.domElems.aim.classList.add('game_aim_hide');
            }, 1300);

            if (__self.canFire) {
                __self.canFire = false;
                __self.soundsForGame.shot.play();
                __self.enemyDown();
                setTimeout(__self.enemyDead, 1500);
                __self.domElems.status.textContent = 'You won!';

                var prevLevel = __self.level - 1;
                __self.domElems.coins.classList.remove('bag-coins_level' + prevLevel);
                __self.domElems.coins.classList.add('bag-coins_level' + __self.level);

                setTimeout(function() {
                    __self.soundsForGame.win.play();
                }, 1000);

                setTimeout(function () {
                    if (__self.level != 5) {
                        __self.domElems.btnNextLevel.addEventListener('click', __self.nextLevel);
                        __self.domElems.btnNextLevel.classList.add('game_btn-next-level-show');
                    } else {
                        __self.domElems.btnNextLevel.click();
                    }
                }, 2000);
            } else {
                __self.fault = true;
                __self.domElems.bandito.removeEventListener('transitionend', __self.startFight);
                __self.soundsForGame.intro.pause();
                __self.soundsForGame.intro.currentTime = 0;
                __self.soundsForGame.shot.play();
                __self.domElems.bandito.classList.remove('enemy_move');
                __self.clearAnimation();
                __self.domElems.status.textContent = 'Fault!';
                __self.domElems.status.classList.add('game_status-show');
                setTimeout(function() {
                    __self.soundsForGame.fault.play();
                }, 1000);
                setTimeout(__self.gameOver, 4000);
            }
        };

        this.nextLevel = function () {
            __self.domElems.gameArea.classList.remove('game_area_bg' + __self.level);
            if (__self.level < __self.countBantitos) {
                __self.clearAnimation();
                __self.domElems.status.textContent = '';
                __self.domElems.status.classList.remove('game_status-show');
                __self.domElems.bandito.classList.remove('enemy_' + __self.level);
                __self.domElems.btnNextLevel.classList.remove('game_btn-next-level-show');
                __self.level++;
                __self.domElems.bandito.classList.add('enemy_' + __self.level);
                __self.newGame(__self.level);
            } else {
                __self.domElems.resultText.innerHTML = "Congratulations, you won!!! <br /> <span style='font-size: 18px;'>Don't forget your gold!</span>"
                __self.domElems.resultText.classList.remove('menu_result_hide');
                __self.domElems.menu.classList.remove('game_menu_hide');
                __self.clearAnimation();
                __self.domElems.status.textContent = '';
                __self.domElems.status.classList.remove('game_status-show');
                __self.domElems.btnNextLevel.classList.remove('game_btn-next-level-show');
            }
        };

        this.enemyWalk = function () { // legs animation
            __self.clearAnimation();
            __self.domElems.bandito.classList.add('enemy_' + __self.level + '-walk');
        };

        this.enemyStay = function () {
            __self.clearAnimation();
            __self.domElems.bandito.classList.add('enemy_' + __self.level + '-stay');
        };

        this.enemyReady = function () {
            __self.clearAnimation();
            __self.domElems.bandito.classList.add('enemy_' + __self.level + '-ready');
        };

        this.enemyDown = function () {
            __self.clearAnimation();
            __self.domElems.bandito.classList.add('enemy_' + __self.level + '-down');
            __self.domElems.gameArea.classList.add('game_victory');
        };

        this.enemyDead = function () {
            __self.clearAnimation();
            __self.domElems.bandito.classList.add('enemy_' + __self.level + '-dead');
        };

        Gunman.prototype.enemyHit = function () {
            __self.clearAnimation();
            __self.domElems.bandito.classList.add('enemy_' + __self.level + '-hit');
            __self.domElems.gameArea.classList.add('game_hit');
        };

        this.clearAnimation = function () {
            for (var j = 1; j <= __self.countBantitos; j++) {
                __self.domElems.bandito.classList.remove('enemy_' + j + '-walk');
                __self.domElems.bandito.classList.remove('enemy_' + j + '-stay');
                __self.domElems.bandito.classList.remove('enemy_' + j + '-ready');
                __self.domElems.bandito.classList.remove('enemy_' + j + '-hit');
                __self.domElems.bandito.classList.remove('enemy_' + j + '-down');
                __self.domElems.bandito.classList.remove('enemy_' + j + '-dead');
                __self.domElems.gameArea.classList.remove('game_hit');
                __self.domElems.gameArea.classList.remove('game_victory');
            }
        };

    }

    var gunman = new Gunman();
    gunman.init();
})();
/**
 * Created by Ritok on 05.01.2016.
 */
