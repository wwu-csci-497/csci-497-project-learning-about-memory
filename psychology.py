from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import IntegerField

# Configurations
app = Flask(__name__)
app.config['SECRET_KEY'] = 'TRANSRIGHTS'

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

    # if form.validate_on_submit():
        # print(form.attempt.data)
        # return '<h1>You typed {}'.format(form.attempt.data)
        # return('', 204)
    print(form.errors)

    return render_template("memtest_1.html", form=form)

if __name__ == "__main__":
    app.run(debug=True)
