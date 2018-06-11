from flask import Flask, render_template, jsonify, redirect
import pandas as pd
import pymongo

app = Flask(__name__)


conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.college_data



@app.route("/")
def index():
    return render_template("index2.html")


@app.route("/names")
def names():

    not_table = db.other.find()

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


    sample_names = []

    
    for sample in dict_keys:
        sample_names.append(sample["school_name"])

    print(len(sample_names))
    return jsonify(sample_names)



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


@app.route("/api/other/<school>")
def other_school(school):
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
    tuition_revenue = {}
    for every in dict_keys:
        if every["school_name"] == school:
            tuition_revenue["School Spending per Student"] = every["school_instructional_expenditure_per_fte"]
            tuition_revenue["Tuition Revenue per Student"] = every["school_tuition_revenue_per_fte"]   
   
    return jsonify(tuition_revenue)


@app.route("/api/other/rank")
def other_rank():
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


    dict_keys_df = pd.DataFrame(dict_keys)

    dict_keys_df = dict_keys_df.dropna(axis=0,how ="any")

    dict_keys_df["Payment Difference"] = dict_keys_df["school_tuition_revenue_per_fte"]-dict_keys_df["school_instructional_expenditure_per_fte"]

    rank_list = []

    for i in range(len(dict_keys_df.index)):
        rank_list.append(i+1)

    dict_keys_df = dict_keys_df.sort_values(by = ["Payment Difference"], ascending=True)

    dict_keys_df["Rank"] = rank_list

    dict_keys_df = dict_keys_df[['Rank', 'school_name', 'Payment Difference']]
        
    new_dict_keys = {}

    school_names = dict_keys_df["school_name"].values.tolist()
    payment_differences = dict_keys_df["Payment Difference"].values.tolist()

    new_dict_keys["school_name"] = school_names
    new_dict_keys["Payment Difference"] = payment_differences

    # print(dict_keys_df.head(100))
    
    return (dict_keys_df.to_csv(index=False))
    # return jsonify(new_dict_keys)




@app.route("/api/cost/rank")
def cost_rank():
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

    dict_keys_df = pd.DataFrame(dict_keys)

    dict_keys_df = dict_keys_df.dropna(axis=0,how ="any")

    dict_keys_df["Earnings per Dollar (Cost)"] = round(dict_keys_df["2013_earnings_6_yrs_after_entry_median"]/dict_keys_df["2013_cost_attendance_academic_year"], 2)

    dict_keys_df = dict_keys_df.sort_values(by = ["Earnings per Dollar (Cost)"], ascending=False)

    rank_list = []

    for i in range(len(dict_keys_df.index)):
        rank_list.append(i+1)

    dict_keys_df["Rank"] = rank_list

    dict_keys_df = dict_keys_df[['Rank', 'school_name', 'Earnings per Dollar (Cost)']]

    dict_keys_df.to_csv("Spend_Rank.csv")
    
    new_dict_keys = {}

    school_names = dict_keys_df.head(100)["school_name"].values.tolist()
    payment_differences = dict_keys_df.head(100)["Earnings per Dollar (Cost)"].values.tolist()

    new_dict_keys["school_name"] = school_names
    new_dict_keys["Payment Difference"] = payment_differences

    # print(dict_keys_df.head(100))
    
    # return jsonify(new_dict_keys)
    return (dict_keys_df.to_csv(index=False))

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

@app.route("/api/academics/<school>")
def academics_school(school):
    ##connect to database
    not_table = db.academics.find()
    # print(not_table)
    ##get data
    dict_keys = []

    for each in not_table:
        # print(each)
        new_dict = {}
        keys = list((each.keys()))
        for key in keys:
            if key== "_id":
                continue
            else:
                new_dict[key] = each[key]
        dict_keys.append(new_dict)

    school_program_data = []

    for every in dict_keys[0].keys():
        if every.startswith("2015_academics_program_percentage"):
            school_program_data.append(every)
        else:
            continue


    for uni in dict_keys:
        if uni["school_name"] == school:
            school_percentages = {}
            print(uni["school_name"])
            for some in school_program_data:
                school_percentages[some] = uni[some]

    
    return jsonify(school_percentages)



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



@app.route("/api/demographics/<school>")
def demographics_school(school):
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

    school_demographic_data = []
    for every in dict_keys[0].keys():
        if every.startswith("2015_student_demographics_race"):
            school_demographic_data.append(every)
        else:
            continue

    for uni in dict_keys:
        if uni["school_name"] == school:
            demographic_percentages = {}
            print(uni["school_name"])
            for some in school_demographic_data:
                demographic_percentages[some] = uni[some]

    
    return jsonify(demographic_percentages)

@app.route("/api/demographics/gender/<school>")
def demographics_gender(school):
    not_table = db.demographics.find()
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
    gender_demographics = {}

    for uni in dict_keys:
        if uni["school_name"] == school:
            gender_demographics["Average Age"] = uni["2015_student_demographics_age_entry"]
            gender_demographics["Average Income"] = uni["2015_student_demographics_avg_family_income"]
            gender_demographics["Percentage of Women"] = uni["2015_student_demographics_women"]
            gender_demographics["Percentage of Men"] = uni["2015_student_demographics_men"]
    
    return jsonify(gender_demographics)



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

