from flask import Flask, url_for, render_template, redirect, session, request
from os import urandom
import binascii
import threading
import atexit
import signal
import sys
from logger import Logger

app = Flask(__name__)
flask_logger = Logger()
curr_password = "DontLookImNaked"


def getIpFromRequest(request):
    return request.environ.get('HTTP_X_REAL_IP', request.remote_addr)


@app.before_request
def before_request():
    # DEBUUUUG
    session["auth"] = True

    client_ip = getIpFromRequest(request)
    if(not session.get("new_access")):
        flask_logger.logEntry("new client connected on " + str(client_ip))
        session["new_access"] = True


@app.route('/login', methods=['GET', ])
def login_form():
    if(session.get('auth')):
        return redirect("/")
    return render_template("login_form.html", error=request.args.get("error"))


@app.route('/auth', methods=['POST', 'GET'])
def auth_user():
    error = None
    if (request.method == 'POST'):
        password = request.form["password"]
        if(password == curr_password):
            session['auth'] = True
            flask_logger.logEntry("New user authenticaed")
            return redirect("/")
        else:
            error = "Invalid password"
            flask_logger.logEntry("user failed to auth")
            return redirect(url_for("login_form", error=error))
    return redirect("/")


@app.route('/pass', methods=['GET', 'POST'])
def pass_me():
    error = None
    if(request.method == 'POST'):
        key = request.form["key"]
        new_pass = request.form["password"]
        if(key == app.secret_key.decode()):
            if(len(new_pass) < 4):
                log_string = "User from " + \
                    getIpFromRequest(
                        request) + " tried to changed password," + \
                    " but was too short"
                error = "Password too short"
                flask_logger.logEntry(log_string)
            else:
                # global bad!
                # TODO
                # should make a subclass of app, and store data there

                global curr_password
                curr_password = new_pass

                log_string = "User from " + \
                    getIpFromRequest(request) + \
                    " changed password to " + curr_password
                flask_logger.logEntry(log_string)

                return redirect(url_for("login_form",
                                        error="Password changed"))
        else:
            log_string = ("User from " +
                          getIpFromRequest(
                              request) + " tried to changed password" +
                          ", but secret key was mismatched")
            flask_logger.logEntry(log_string)
            error = "Secret key mismatch"

    return render_template("change_pass.html", error=error)


@app.route('/')
def hello_world():

    # return 'Hello, World!'
    if(session.get('auth') is not True):
        return redirect("login")
    return render_template("index.html")


def start_server(ip, port, debug):
    app.run(ip, port, debug)


def stop_server():
    flask_logger.logEntry("Server shutting down")


if __name__ == "__main__":
    # setup vars
    SECRET_KEY = binascii.hexlify(urandom(12))
    SERVER_IP = "0.0.0.0"
    SERVER_PORT = 5000
    DEBUG_FLAG = True

    flask_logger.logEntry("Staring server")
    app.secret_key = SECRET_KEY

    # Ccant start on thread when debug
    # thread1 = threading.Thread(target=start_server, args=(
    #     SERVER_IP, SERVER_PORT, DEBUG_FLAG))
    # thread1.start()

    flask_logger.logEntry("Server started on: " +
                          SERVER_IP + ":" + str(SERVER_PORT))
    flask_logger.logEntry("Server secret key: " + str(SECRET_KEY.decode()))

    atexit.register(stop_server)

    start_server(SERVER_IP, SERVER_PORT, DEBUG_FLAG)
