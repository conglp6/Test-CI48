import { BaseComponent } from "../Challenge B/BaseComponent.js";
const dataQues = [];
let index = 0;
let count = 0;

class Component extends BaseComponent {
    constructor() {
        super();
    }
    render() {
        this._shadowRoot.innerHTML = /*html*/ `
        <style>
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
            }
            .container__quiz{
                height:100vh;
                background: #607a94;
            }
            .quiz{
                background: #001427;
                color: #ccc;
                height:auto;
                background-size:100%;
                background-repeat:no-repeat;
                width: 60%;
                display:flex;
                justify-content:center;
                align-items:center;
                height:500px;
                border-radius:10px;  
            }
            .questions{
            text-align:center;
            }
            .btn{
                min-width: 200px;
                text-align: center;
            }
            b{
                color:#00B050;
            }
        </style>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" >
            <div class="container__quiz d-flex justify-content-center align-items-center">
                <div class="quiz">
                    <div class="questions"></div>
                </div>
            </div>
        `;
        //render data API
        this.renderData();
    }
    async renderData(question) {
        let response = await fetch(
            "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
        );
        const data = await response.json();
        dataQues.push(data.results);
        if (index > 4) {
            alert(`Tổng số điểm bạn nhận được là : ${count} điểm`);
            this._shadowRoot.querySelector(".questions").innerHTML = `
            <h1>Chúc mừng bạn đã hoàn thành Quiz!!</h1>
            <a href="/Challenge B/index.html">Làm lại Quiz App</a>
            `;
            return;
        }
        // random answer
        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue,
                randomIndex;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
        let randomAnswer = [
            dataQues[0][index].incorrect_answers[0],
            dataQues[0][index].incorrect_answers[1],
            dataQues[0][index].incorrect_answers[2],
            dataQues[0][index].correct_answer,
        ];
        let random = [];
        random.push(shuffle(randomAnswer));
        this._shadowRoot.querySelector(".questions").innerHTML = /*html*/ `
        <h1>Quiz App!</h1>
        <h3>${dataQues[0][index].question}</h3>
        <br>
        <br>
        <button class="btn btn-primary">${random[0][0]}</button>
        <br>
        <br>
        <button class="btn btn-primary">${random[0][1]}</button>
        <br>
        <br>
        <button class="btn btn-primary">${random[0][2]}</button>
        <br>
        <br>
        <button class="btn btn-primary">${random[0][3]}</button>
        <br>
        <br>
        <br>
        <p> Điểm hiện tại của bạn: <b class="count">${count}</b> điểm!</p>
        `;
        this.question();
    }
    question() {
        let btnCick = [...this._shadowRoot.querySelectorAll(".btn")];
        btnCick.forEach((item) => {
            item.addEventListener("click", () => {
                if (item.innerText != dataQues[0][index].correct_answer) {
                    alert("Bạn được cộng 0đ");
                    index++;
                } else {
                    alert("Bạn được cộng 100đ");
                    count += 100;
                    index++;
                }
                this.renderData();
            });
        });
    }
}

window.customElements.define("ques-component", Component);