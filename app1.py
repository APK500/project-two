from flask import Flask, render_template, jsonify, redirect
import pymongo

app = Flask(__name__)


conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.college_data

# mongo = pymongo(app)


@app.route("/")
def index():
    return render_template("index.html")



@app.route("/api/other")
def other():
    ##connect to database
    not_table = db.other.find()
    # print(not_table)
    ##get data
    dict_keys = []

    for each in not_table:
        print(each)
        new_dict = {}
        keys = list((each.keys()))
        for key in keys:
            if key== "_id":
                continue
            else:
                new_dict[key] = each[key]
        dict_keys.append(new_dict)
    
    return jsonify(dict_keys)


@app.route("/api/academics")
def academics():
    ##connect to database
    not_table = db.academics.find()
    # print(not_table)
    ##get data
    dict_keys = []

    for each in not_table:
        new_dict = {}
        keys = list((each.keys()))
        for key in keys:
            if key== "_id":
                continue
            else:
                new_dict[key] = each[key]
        dict_keys.append(new_dict)
    
    return jsonify(dict_keys)


@app.route("/api/demographics")
def demographics():
    ##connect to database
    not_table = db.demographics.find()
    # print(not_table)
    ##get data
    dict_keys = []

    for each in not_table:
        new_dict = {}
        keys = list((each.keys()))
        for key in keys:
            if key== "_id":
                continue
            else:
                new_dict[key] = each[key]
        dict_keys.append(new_dict)
    
    return jsonify(dict_keys)


@app.route("/api/admissions")
def admissions():
    ##connect to database
    not_table = db.admissions.find()
    # print(not_table)
    ##get data
    dict_keys = []

    for each in not_table:
        new_dict = {}
        keys = list((each.keys()))
        for key in keys:
            if key== "_id":
                continue
            else:
                new_dict[key] = each[key]
        dict_keys.append(new_dict)
    
    return jsonify(dict_keys)

@app.route("/api/earnings")
def earnings():
    ##connect to database
    not_table = db.earnings.find()
    # print(not_table)
    ##get data
    dict_keys = []

    for each in not_table:
        new_dict = {}
        keys = list((each.keys()))
        for key in keys:
            if key== "_id":
                continue
            else:
                new_dict[key] = each[key]
        dict_keys.append(new_dict)
    
    return jsonify(dict_keys)


@app.route("/api/cost")
def cost():
    ##connect to database
    not_table = db.cost.find()
    # print(not_table)
    ##get data
    dict_keys = []

    for each in not_table:
        new_dict = {}
        keys = list((each.keys()))
        for key in keys:
            if key== "_id":
                continue
            else:
                new_dict[key] = each[key]
        dict_keys.append(new_dict)
    
    return jsonify(dict_keys)


@app.route("/api/overall")
def overall():
    ##connect to database
    not_table = db.overall.find()
    # print(not_table)
    ##get data
    dict_keys = []

    for each in not_table:
        new_dict = {}
        keys = list((each.keys()))
        for key in keys:
            if key== "_id":
                continue
            else:
                new_dict[key] = each[key]
        dict_keys.append(new_dict)
    
    return jsonify(dict_keys)

if __name__ == '__main__':
    app.run(debug=True)

