
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const heading = $('header h2');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const repeatBtn = $('.btn.btn-repeat');
const prevBtn = $('.btn.btn-prev');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn.btn-next');
const randomBtn = $('.btn.btn-random');
const audio = $('#audio');
const progress = $('#progress');
const playlist = $('.playlist');

const MY_WEB_KEY = 'BLA BLA BLA';

const app = {
    currentIndex: 0,
    isPlaying: false,    
    isRepeat: false,
    isRandom: false,
    songs: [
        {
            name: 'Cứ Ngỡ Là Anh',
            singer: 'Đinh Tùng Huy',
            path: './songs/Cứ Ngỡ Là Anh - Đinh Tùng Huy.mp3',
            image: './images/cu-ngo-la-anh.jpg'
        },
        {
            name: 'Muộn Rồi Mà Sao Còn',
            singer: 'Sơn Tùng M-TP',
            path: './songs/Muộn Rồi Mà Sao Còn - Sơn Tùng M-TP.mp3',
            image: './images/muon-roi-ma-sao-con.jpg'
        },
        {
            name: 'Kẹo Bông Gòn',
            singer: 'H2K, TRUNKY',
            path: './songs/Kẹo Bông Gòn - H2K, TRUNKY - Bài hát, lyrics.mp3',
            image: './images/keo-bong-gon.jpg'
        },
        {
            name: 'Sài Gòn Hôm Nay Mưa',
            singer: 'JSOL, Hoàng Duyên',
            path: './songs/Sài Gòn Hôm Nay Mưa - JSOL, Hoàng Duyên.mp3',
            image: './images/sai-gon-hom-nay-mua.jpg'
        },
        {
            name: 'The Playah',
            singer: 'SOOBIN, SlimV',
            path: './songs/The Playah (Special Performance) - SOOBIN, SlimV.mp3',
            image: './images/playah.jpg'
        },
        {
            name: 'Cứ Ngỡ Là Anh',
            singer: 'Đinh Tùng Huy',
            path: './songs/Cứ Ngỡ Là Anh - Đinh Tùng Huy.mp3',
            image: './images/cu-ngo-la-anh.jpg'
        },
        {
            name: 'Muộn Rồi Mà Sao Còn',
            singer: 'Sơn Tùng M-TP',
            path: './songs/Muộn Rồi Mà Sao Còn - Sơn Tùng M-TP.mp3',
            image: './images/muon-roi-ma-sao-con.jpg'
        },
        {
            name: 'Kẹo Bông Gòn',
            singer: 'H2K, TRUNKY',
            path: './songs/Kẹo Bông Gòn - H2K, TRUNKY - Bài hát, lyrics.mp3',
            image: './images/keo-bong-gon.jpg'
        },
        {
            name: 'Sài Gòn Hôm Nay Mưa',
            singer: 'JSOL, Hoàng Duyên',
            path: './songs/Sài Gòn Hôm Nay Mưa - JSOL, Hoàng Duyên.mp3',
            image: './images/sai-gon-hom-nay-mua.jpg'
        },
        {
            name: 'The Playah',
            singer: 'SOOBIN, SlimV',
            path: './songs/The Playah (Special Performance) - SOOBIN, SlimV.mp3',
            image: './images/playah.jpg'
        }
    ],
    config: JSON.parse(localStorage.getItem(MY_WEB_KEY)) || {},
    saveStorage: function() {
        localStorage.setItem(MY_WEB_KEY, JSON.stringify({
            isRepeat: this.isRepeat,
            isRandom: this.isRandom
        }));
    },
    render: function() {
        let htmls = this.songs.map((song, index) => `
            <div class="song${ index === this.currentIndex ? ' active' : ''}" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${ song.image }')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `).join('');
        playlist.innerHTML = htmls;
    },
    loadCurrentSong: function() {
        const song = this.songs[this.currentIndex];
        audio.src = song.path;
        heading.innerText = song.name;
        cdThumb.style.backgroundImage = `url('${song.image}')`;
    },    
    playSong: function() {
        audio.play();
    },
    pauseSong: function() {
        audio.pause();        
    },
    playRandomSong: function() {
        do {
            var random = Math.floor(Math.random() * this.songs.length);
        } while (random === this.currentIndex)

        this.currentIndex = random;

        this.render();
        this.loadCurrentSong();
        this.playSong();
    },
    nextSong: function() {    
        this.currentIndex ++;
        if (this.currentIndex === this.songs.length) {
            this.currentIndex = 0;
        }
        this.render();
        this.loadCurrentSong();
        this.playSong();

        if (this.isPlaying === false) {
            this.isPlaying = true;
            player.classList.toggle('playing',this.isPlaying);
        }
    },    
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0 ) {
            this.currentIndex = this.songs.length - 1;
        }

        this.render();
        this.loadCurrentSong();
        this.playSong(); 

        if (this.isPlaying === false) {
            this.isPlaying = true;
            player.classList.toggle('playing',this.isPlaying);
        }
    },
    defineProperties: function() {
        Object.defineProperties(this, {
            'isRepeat': {
                value: this.config['isRepeat'] || false,
            },
            'isRandom': {
                value: this.config['isRandom'] || false,
            }
        })
    },
    handleEvent: function() {
        const _this = this;
        const cdOW = cd.offsetWidth;  
        const cdAnimation = cdThumb.animate([{transform: 'rotate(360deg)'}],{
            iterations: 'Infinity',
            duration: 5000,
        })
        cdAnimation.pause();

        // Scroll
        window.onscroll = function() {
            const scroll = window.scrollY;
            let cdWidth = cdOW - scroll;   
            if (cdWidth < 0) { cdWidth = 0};
            cd.style.width = cdWidth + 'px';
        }
        
        // Play and Pause song
        playBtn.onclick = function() {
            if (!_this.isPlaying) {
                _this.playSong();
            } else {
                _this.pauseSong();
            }
        }

        // Change status playing bar
        audio.ontimeupdate = function() {
            if (audio.duration) {
                progress.value = (audio.currentTime / audio.duration) * 100;
            } else {
                progress.value = 0;
            }
        }

        // Change slider when playing
        progress.oninput = function() {
            audio.currentTime = progress.value / 100 * audio.duration;
        }
        
        audio.onplay = function() {   
            console.log('onplay');
            _this.isPlaying = true;   
            player.classList.add('playing'); 
            cdAnimation.play();
        }

        audio.onpause = function() {
            console.log('onpause');
            _this.isPlaying = false;   
            player.classList.remove('playing'); 
            cdAnimation.pause();
        }

        audio.onended = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else if (_this.isRepeat) {
                _this.playSong();
            } else {
                _this.nextSong();
            }
        }

        // Change song
        prevBtn.onclick = function() {
            _this.prevSong();
        }
        
        nextBtn.onclick = function() {
            _this.nextSong();
        }
        
        // Repeat song
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat;
            this.classList.toggle('active', _this.isRepeat);  
            _this.saveStorage();          
        }

        // Random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            this.classList.toggle('active', _this.isRandom);
            _this.saveStorage();  
        }        

        playlist.onclick = function(e) {
            if (e.target.closest('.song:not(.active)')) {
                const selectedSong = e.target.closest('.song:not(.active)');
                let index = Number(selectedSong.dataset.index);
                _this.currentIndex = index;
                _this.render();
                _this.loadCurrentSong();
                _this.playSong();

                if(_this.isPlaying === false) {
                    _this.isPlaying = true;
                    player.classList.toggle('playing',this.isPlaying);
                }
            }
        }
    },
    start: function () {
        this.defineProperties();
        
        this.handleEvent();

        this.loadCurrentSong();

        this.render();

        repeatBtn.classList.toggle('active', this.isRepeat);
        randomBtn.classList.toggle('active', this.isRandom);
    }
}
app.start();