import requests
import pandas as pd
import numpy as np
import json
import csv
import pymongo

demographics_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?&_per_page=50&_fields=2015.student.demographics.women,2015.student.demographics.men,2015.student.demographics.age_entry,2015.student.demographics.avg_family_income,2015.student.demographics.race_ethnicity.black,2015.student.demographics.race_ethnicity.asian,2015.student.demographics.race_ethnicity.white,2015.student.demographics.race_ethnicity.hispanic,2015.student.demographics.race_ethnicity.nhpi,2015.student.demographics.race_ethnicity.unknown,2015.student.demographics.race_ethnicity.aian,2015.student.demographics.race_ethnicity.two_or_more,school.name&school.online_only=0&2015.student.size__range=5000..&api_key=TZzGbQIxCUsSuRlsV8kGenTldy3nkn1bAQOqjezi"
admissions_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?&_per_page=50&_fields=2015.admissions.sat_scores.average.overall,2015.admissions.admission_rate.overall,2015.admissions.act_scores.midpoint.cumulative,school.name&school.online_only=0&2015.student.size__range=5000..&api_key=TZzGbQIxCUsSuRlsV8kGenTldy3nkn1bAQOqjezi"
cost_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?&_per_page=50&_fields=2015.cost.avg_net_price.overall,2015.student.undergrads_with_pell_grant_or_federal_student_loan,school.name&school.online_only=0&2015.student.size__range=5000..&api_key=TZzGbQIxCUsSuRlsV8kGenTldy3nkn1bAQOqjezi"
earnings_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?&_per_page=50&_fields=2013.earnings.6_yrs_after_entry.median,2013.earnings.6_yrs_after_entry.working_not_enrolled.mean_earnings,2013.earnings.6_yrs_after_entry.working_not_enrolled.std_dev,2013.earnings.6_yrs_after_entry.working_not_enrolled.overall,2013.earnings.6_yrs_after_entry.not_working_not_enrolled.overall,school.name&school.online_only=0&2015.student.size__range=5000..&api_key=TZzGbQIxCUsSuRlsV8kGenTldy3nkn1bAQOqjezi"
overall_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?&_per_page=50&_fields=school.name,2015.student.size,location.lon,location.lat,school.state&school.online_only=0&2015.student.size__range=5000..&api_key=TZzGbQIxCUsSuRlsV8kGenTldy3nkn1bAQOqjezi"
other_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?&_per_page=50&_fields=school.instructional_expenditure_per_fte,school.tuition_revenue_per_fte,school.name&school.online_only=0&2015.student.size__range=5000..&api_key=TZzGbQIxCUsSuRlsV8kGenTldy3nkn1bAQOqjezi"
academics_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?&_per_page=50&_fields=2015.student.retention_rate.overall.full_time,2015.completion.rate_suppressed.overall,2015.academics.program_percentage.mathematics,2015.academics.program_percentage.business_marketing,2015.academics.program_percentage.communications_technology,2015.academics.program_percentage.language,2015.academics.program_percentage.visual_performing,2015.academics.program_percentage.engineering_technology,2015.academics.program_percentage.parks_recreation_fitness,2015.academics.program_percentage.agriculture,2015.academics.program_percentage.security_law_enforcement,2015.academics.program_percentage.computer,2015.academics.program_percentage.precision_production,2015.academics.program_percentage.humanities,2015.academics.program_percentage.library,2015.academics.program_percentage.psychology,2015.academics.program_percentage.social_science,2015.academics.program_percentage.legal,2015.academics.program_percentage.english,2015.academics.program_percentage.construction,2015.academics.program_percentage.military,2015.academics.program_percentage.communication,2015.academics.program_percentage.public_administration_social_service,2015.academics.program_percentage.architecture,2015.academics.program_percentage.ethnic_cultural_gender,2015.academics.program_percentage.resources,2015.academics.program_percentage.health,2015.academics.program_percentage.engineering,2015.academics.program_percentage.history,2015.academics.program_percentage.theology_religious_vocation,2015.academics.program_percentage.transportation,2015.academics.program_percentage.physical_science,2015.academics.program_percentage.science_technology,2015.academics.program_percentage.biological,2015.academics.program_percentage.family_consumer_science,2015.academics.program_percentage.philosophy_religious,2015.academics.program_percentage.personal_culinary,2015.academics.program_percentage.multidiscipline,2015.academics.program_percentage.mechanic_repair_technology,school.name&school.online_only=0&2015.student.size__range=5000..&api_key=TZzGbQIxCUsSuRlsV8kGenTldy3nkn1bAQOqjezi"

url_list = [demographics_url, admissions_url, cost_url, earnings_url, overall_url, other_url, academics_url]


page = 1
demographics_url.split('&', 1)[0] + '&_page=' + str(page) + '&' + demographics_url.split('&', 1)[1]

url = demographics_url
init_college_scorecard_api = requests.get(url)
init_college_data = init_college_scorecard_api.json()
init_college_data['metadata']
int(np.ceil(init_college_data["metadata"]["total"]/init_college_data['metadata']["per_page"]))

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
client.drop_database('college_data')
db = client.college_data

for url in url_list:
    
    print('loading url: ' + str(url_list.index(url)))
    
    # Get initial metadata of URL (pages, keys)
    init_college_scorecard_api = requests.get(url)
    init_college_data = init_college_scorecard_api.json()
    init_dict_keys = list(init_college_data["results"][1].keys())
    print(init_dict_keys)

#     program_list = []
#     for each in init_dict_keys:
#         if each.startswith("id"):
#             continue
#         else:
#             program_list.append(each)
#     print(program_list)

    full_data_dict = {}
    sub_data_list = []
    
    # Loop for number of pages in API call
    for j in range(0,int(np.ceil(init_college_data["metadata"]["total"]/init_college_data['metadata']["per_page"]))):
        page = j
        url_1 = url.split('&', 1)[0]
        url_2 = url.split('&', 1)[1]
        college_scorecard_api = requests.get(url_1 + '&_page=' + str(page) + '&' + url_2)
        college_data = college_scorecard_api.json()
        for i in range(len(college_data['results'])): 
    #         sub_data_list = []
            data_dict = {}
        
            for k in range(len(college_data["results"][i])):
                data_dict[init_dict_keys[k].replace(".","_")] = college_data["results"][i][init_dict_keys[k]]

            if "_fields=2015.student.demographics.women" in url:
                demographics = db.demographics.find()
                db.demographics.insert_one(data_dict)
            if "_fields=2015.admissions.sat_scores.average.overall" in url:
                admissions = db.admissions.find()
                db.admissions.insert_one(data_dict)
            if "_fields=2015.cost.avg_net_price.overall" in url:
                cost = db.cost.find()
                db.cost.insert_one(data_dict)
            if "_fields=2013.earnings.6_yrs_after_entry.median" in url:
                earnings = db.earnings.find()
                db.earnings.insert_one(data_dict)
            if "_fields=school.name,2015.student.size" in url:
                overall = db.overall.find()
                db.overall.insert_one(data_dict)
            if "_fields=school.instructional_expenditure_per_fte" in url:
                other = db.other.find()
                db.other.insert_one(data_dict)
            if "_fields=2015.student.retention_rate.overall" in url:
                academics = db.academics.find()
                db.academics.insert_one(data_dict)

