import random, copy
from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import IntegerField

# Configurations
app = Flask(__name__)
app.config['SECRET_KEY'] = 'TRANSRIGHTS'

import random, copy
original_questions = {
 #Format is 'question':[options]
 'About how many things can people remember?':['7 things','6 things','8 things','5 things'],
 'How does chunking help you remember?':['Both of the other answers (excluding the None answer)',
    'It allows you to group things into larger blocks so you don\'t have to remember every invidual thing',
    'It makes you have to think about each object when you group them together, which forms deeper connections',
    'None of the other answers'],
 'What approach is best when you want to commit something to memory?':['Think about it the meaning and try to relate it to something personal',
  'Try to repeat it over and over in your head, to memorize it through repetition',
  'Write it down somewhere multiple times, so that you remember it better by the act of writing it down']
}

reasons = ['It\'s about 7. More specifically, people say 7 plus or minus 2. How come we say plus or minus two, and not just 7?',
'Deep connections are vital for forming memory. Thinking about what you''re learning deeply is key to remembering. Chunking makes you think about each object to group them, and since they\'re grouped you don\'t have to remember everything at once, too. That\'s why both the answers are corect',
'Again, deep and meaningful connections are key. Although you can remember things through repetition, it\'s much faster and easier by trying to remember them through making connections. How do you study? Do you use repetition?'];

questions = copy.deepcopy(original_questions)

def shuffle(questions_shuffled):
    keys = list(questions)
    random.shuffle(keys)
    for key in keys:
        random.shuffle(questions[key])
        questions_shuffled[key] = questions[key]
    return questions_shuffled;

# print(questions_shuffled)


# Forms
class memtestForm(FlaskForm):
    attempt = IntegerField('attempt')

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/memtest_1', methods=['GET', 'POST'])
def memtest_1():
    form = memtestForm()
    print(form.errors)
    return render_template("memtest_1.html", form=form)

@app.route('/m1')
def m1():
    return render_template('m1.html')

@app.route('/memtest_2', methods=['GET', 'POST'])
def memtest_2():
    form = memtestForm()
    print(form.errors)
    return render_template("memtest_2.html", form=form)

@app.route('/m2')
def m2():
    return render_template('m2.html')

@app.route('/quiz1')
def quiz1():
    questions_shuffled = {};
    questions_shuffled = shuffle(questions_shuffled);
    return render_template('quiz1.html', q = questions_shuffled, o = questions)

@app.route('/quiz1_results', methods=['POST'])
def quiz1_results():
    correct = 0;
    res = [];
    wrong = [];
    j = 0;
    for i in questions.keys():
        answered = request.form[i]
        if original_questions[i][0] == answered:
            correct += 1;
        else:
            wrong.append(i);
            res.append((reasons[j]));
        j += 1;
    print(wrong);
    return render_template('quiz1_results.html', w = wrong, c = correct, r = reasons, t = j, o = questions)

    '<h1>Correct Answers: <u>'+str(correct)+'</u></h1>'

@app.route('/m3')
def m3():
    return render_template('m3.html')

if __name__ == "__main__":
    app.run(debug=True)
