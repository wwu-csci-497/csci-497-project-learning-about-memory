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

if __name__ == "__main__":
    app.run(debug=True)
