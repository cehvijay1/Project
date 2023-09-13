from flask import Flask, render_template, request
import pandas as pd
import requests
from io import StringIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_sql', methods=['POST'])
def run_sql():
    # Get the SQL query from the POST request
    sql_query = request.form.get('sql_query')

    # Fetch the CSV data from the URL
    csv_url = 'http://65.1.85.13/vijay/clean_df.csv'
    response = requests.get(csv_url)

    if response.status_code == 200:
        # Read the CSV data into a DataFrame
        csv_data = response.text
        df = pd.read_csv(StringIO(csv_data))

        # Execute the SQL query on the DataFrame
        result = df.query(sql_query)

        # Convert the result to an HTML table
        result_html = result.to_html(classes='table table-bordered')

        return render_template('result.html', result=result_html)
    else:
        return "Failed to fetch CSV data from the URL."

if __name__ == '__main__':
    app.run(debug=True)
