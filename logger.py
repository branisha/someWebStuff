from datetime import datetime
import os


class Logger(object):
    def __init__(self, log_file="/var/log/python_flask_server/python_server.log"):
        self._datetime_format_string = "%x-%X"
        self._log_file = log_file

    def getCurrTime(self):
        return datetime.now().strftime(self._datetime_format_string)

    def logEntry(self, e):
        with open(self._log_file, "a+") as f:
            f.write(self.getCurrTime() + ": ")
            f.write(e)
            f.write('\n')
        print(self.getCurrTime() + " " + e)

if(__name__ == "__main__"):
    log = Logger()

    log.logEntry("sss")
