from flask import *

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def main_page():
    return render_template("index.html")
if __name__ == "__main__":
    app.run(debug=True, port=5008, threaded=True)