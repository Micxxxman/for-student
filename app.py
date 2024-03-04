from flask import Flask,render_template,request,redirect
import smtplib

app=Flask(__name__)

#route() decorators
@app.route('/')
def home():
    return render_template('index2.html')

@app.route('/index2.html')
def index():
    return render_template('index2.html')



if __name__=='__main__':
    app.run(debug=True)
