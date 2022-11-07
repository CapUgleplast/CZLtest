new Vue({
    el: '#app',
    data: {
        queueArr: [1],
        transpose: 548,
        transposeVel: 1,
        elvState: true,
        levelEvents: [],
        tablet: document.getElementsByClassName("levelTablet"),
        lvlDir: 6
    }
    ,
    methods: {
        addQueue: function (level ,event) {
            if (event.target.checked && level !== this.queueArr[0]) {
                this.queueArr.push(level);
                this.levelEvents.push(event.target);
                event.target.disabled = true;
                console.log(this.queueArr);
                console.log(this.levelEvents);
                this.moveElv(event);
            }
            else {
                event.target.checked = false;
            }
        },

        moveElv: function (event){
            if(this.elvState) {
                let levUps = this.queueArr[1] - this.queueArr[0];
                if(levUps > 0){
                    this.transposeVel = levUps;
                }
                else {
                    this.transposeVel = -levUps;
                }
                this.transpose += 137 * -levUps;

                if(levUps > 0){
                    this.lvlDir = 5;
                }else{
                    this.lvlDir = 6;
                }
                this.levelCleaner(event);
                console.log(event);
                this.elvState = false;

            }
        },

        levelCleaner: function (event) {
            this.queueArr = Array.prototype.slice.call(this.queueArr);
            this.queueArr.shift()
            setTimeout(() => {
                this.levelEvents[0].checked = false;
                this.levelEvents[0].disabled = false;
                this.levelEvents.shift();
                this.setDelay(event);
            }, this.transposeVel*1000)
            console.log(this.queueArr);
        },

        setDelay: function (event) {
            setTimeout(() => {
                this.elvState = true;
                this.tablet.textContent = this.queueArr[0].toString();
                if(this.queueArr.length > 1){
                    this.moveElv(event);
                }
            }, 3000);
        }


    },
    computed: {
        style() {
            return {transform: 'translateY(' + this.transpose + 'px)', transition: 'all '+ this.transposeVel +'s ease-in-out'}
        },
        levelNum() {
            return this.queueArr[0];
        },
        levelArrow() {
            return this.lvlDir;
        }
    }
})
