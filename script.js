import axios from 'axios';
let questions = []
let correct_answers = []
const form = document.querySelector('form')
async function fetchQuestions(){
    const { data } = await axios.get('https://opentdb.com/api.php?amount=10&category=9&type=multiple');
    questions = data.results;
    questions.forEach((question, index) => {
        let answers = [...question['incorrect_answers'],question['correct_answer']]
        correct_answers.push(question['correct_answer'].replaceAll(' ','_')) 
        let index1 = Math.round(Math.random()*3)
        let index2 = Math.round(Math.random()*3)
        while(index1 === index2)
            index2 = Math.round(Math.random()*3)
        let index3 = Math.round(Math.random()*3)
        while(index3===index2 || index3===index1)
            index3 = Math.round(Math.random()*3)
        let index4 = Math.round(Math.random()*3)
        while(index4===index2 || index4===index1 || index4===index3)
            index4 = Math.round(Math.random()*3)
        let html =`<div class="questionWrapper">
        <p class="question">
        ${10-index}. ${question['question']}
        </p>
        <div class="answerWrapper">
            <div class="answer">
                <input
                type="radio"
                id=${`${answers[index1]}`.replaceAll(' ','_')}
                name=${`q${10-index}`}
                value=${`${answers[index1]}`.replaceAll(' ','_')}
                checked
                /> 
                <label for=${`${answers[index1]}`.replaceAll(' ','_')}>${answers[index1]}</label>
            </div>
            <div class="answer">
                <input
                type="radio"
                id=${`${answers[index2]}`.replaceAll(' ','_')}
                name=${`q${10-index}`}
                value=${`${answers[index2]}`.replaceAll(' ','_')}
                />
                <label for=${`${answers[index2]}`.replaceAll(' ','_')}>${answers[index2]}</label>
            </div>
            <div class="answer">
                <input
                type="radio"
                id=${`${answers[index3]}`.replaceAll(' ','_')}
                name=${`q${10-index}`}
                value=${`${answers[index3]}`.replaceAll(' ','_')}
                />
                <label for=${`${answers[index3]}`.replaceAll(' ','_')}>${answers[index3]}</label>
            </div>
            <div class="answer">
                <input
                type="radio"
                id=${`${answers[index4]}`.replaceAll(' ','_')}
                name=${`q${10-index}`}
                value=${`${answers[index4]}`.replaceAll(' ','_')}
                />
                <label for=${`${answers[index4]}`.replaceAll(' ','_')}>${answers[index4]}</label>
            </div>
        </div>
    </div>`
    if(form)
        form.innerHTML = html + form?.innerHTML;
    });
    return correct_answers
}
fetchQuestions();
form?.addEventListener('submit',(event)=>{
    event.preventDefault()
    let score = 0
    const answer = [
        form.q1.value,
        form.q2.value,
        form.q3.value,
        form.q4.value,
        form.q5.value,
        form.q6.value,
        form.q7.value,
        form.q8.value,
        form.q9.value,
        form.q10.value,
    ]
    answer.forEach((ans, index)=>{
        if (ans === correct_answers[9-index]){
            score += 1
            document.getElementById(ans).parentElement.parentElement.parentElement.style.backgroundColor = '#49ea49';
        }else{
            document.getElementById(ans).parentElement.parentElement.parentElement.style.backgroundColor = '#ff7b7b';
        }
    })
    scrollTo(0,0)
    const scoreLabel = document.querySelector('.result > .score')
    scoreLabel.textContent = `Your Score ${score}/${answer.length}`
    scoreLabel.parentElement.classList.remove('hide')
    console.log(answer)
    console.log(correct_answers)
    console.log(score)
})

document.querySelector('.reload').addEventListener('click',()=>{
    const scoreLabel = document.querySelector('.result > .score')
    scoreLabel.parentElement.classList.add('hide')
    correct_answers.forEach((answer)=>{
        document.getElementById(answer).parentElement.parentElement.parentElement.removeAttribute('style')
        
    })
})





