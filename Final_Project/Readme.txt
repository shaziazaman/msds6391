Instructions for installing flask:

conda install -c anaconda flask=0.12.2

Based on OS:
>export FLASK_APP=hello.py
or
>set FLASK_APP=hello.py

create a hello.py with following code:

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

Now run flask server as following:
>python -m flask run