from flask import Flask, render_template, request,make_response
from flask import redirect
from flask import jsonify
import json

from flaskext.mysql import MySQL
app = Flask(__name__)
mysql = MySQL()

# Step_4
app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3306
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'medtb21'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university'

# Step_3
mysql.init_app(app)

app = Flask(__name__)


@app.route('/')
def index():
	return render_template('index.html')

@app.route('/data_table')
def index1():
	return render_template('data_table.html')

@app.route('/data_analyses')
def index2():
	return render_template('data_analyses.html')

@app.route('/api/ajouter', methods=["POST"]) 
def insertStudent(): 
    print("cooking")
    # recuperation des données du formulaire
    matricule = request.form["valMatricule"]
    nom = request.form["valNom"] 
    prenom = request.form["valPrenom"]
    sexe = request.form["valSexe"]
    specialite = request.form["valSpecialite"] 
    annee = request.form["valAnnee"]
    moyenne = request.form["valMoyenne"]
    # connexion a la bd 
    conn = mysql.connect()
    cursor=conn.cursor()
    # requete sql insert 
    req = "INSERT INTO resultats VALUES("+annee+', '+matricule+', "'+nom+'", "'+prenom+'", "'+sexe+'", "'+specialite+'", '+moyenne+')'
    cursor.execute(req)
    # on confirme la requete
    conn.commit()
    cursor.close() 
    # On peut retourner le id de la personne créée
    json_data=[{'matricule':int(matricule)}]
    # envoi des données sous format json 
    return make_response(jsonify(json_data), 201)

@app.route('/api/modifier/<string:id>', methods=["PUT"]) 
def updatePerson(id):
    # recupération des données du formulaire
    matricule = request.form["valMatricule1"]
    nom = request.form["valNom1"] 
    prenom = request.form["valPrenom1"]
    sexe = request.form["valSexe1"]
    specialite = request.form["valSpecialite1"] 
    annee = request.form["valAnnee1"]
    moyenne = request.form["valMoyenne1"]
    conn = mysql.connect()
    cursor=conn.cursor()
    # requete sql update 
    cursor.execute("UPDATE resultats set "
                            'matricule='+matricule+''
                            ', nom="'+nom+'"'
                            ', prenom ="'+prenom+'"'
							', sexe="'+sexe+'"'
                            ', specialite ="'+specialite+'"'
							', annee='+annee+''
                            ', moyenne ='+moyenne+''
                            ' where matricule ='+id)

    # confirmer la requete                         
    conn.commit()
    cursor.close()
 
    # envoi des données sous format json
    return make_response ("Record updated", 200)

@app.route('/api/supprimer/<string:id>/<string:annee>',methods=["DELETE"]) 
def deletePerson(id,annee):
    # connexion a la bd 
    conn =mysql.connect()
    cursor =conn.cursor()    
    # requete sql delete 
    # cursor.execute("USE db_persons")
    cursor.execute("DELETE FROM resultats where matricule="+id+" and annee = "+annee)
    conn.commit()
    cursor.close()
    return make_response("Record deleted", 204)
	
@app.route('/api/data')
def doGetData():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee, COUNT(matricule) as nbr_etudaints FROM resultats group by annee")	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]
	cursor.close()
	json_data=[]	
	for result in data:
		json_data.append(dict(zip(row_headers,result)))						
	return jsonify(json_data)

@app.route('/api/data2')
def doGetData2():
    data = {"years": [], "datasets": []}

    conn = mysql.connect()
    cursor = conn.cursor()

    # Fetch distinct years
    cursor.execute("SELECT DISTINCT annee FROM resultats")
    years_tuple = cursor.fetchall()
    years_list = [item[0] for item in years_tuple]
    data["years"] = years_list

    # Fetch distinct majors (specialités)
    cursor.execute("SELECT DISTINCT specialite FROM resultats")
    major_tuple = cursor.fetchall()
    major_list = [item[0] for item in major_tuple]

    for major in major_list:
        cursor.execute("SELECT COUNT(*) FROM resultats WHERE specialite=%s GROUP BY annee", (major,))
        student_count_tuple = cursor.fetchall()
        student_count_list = [item[0] for item in student_count_tuple]
        data["datasets"].append({"label": major, "data": student_count_list})
    cursor.close()
    conn.close()	
    return jsonify(data)

@app.route('/api/data3/<int:year>')
def doGetData3(year):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT specialite, COUNT(matricule) as nbr_etudaints FROM resultats where annee="+str(year)+" group by specialite")	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]
	cursor.close()
	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))						
	return jsonify(json_data)

@app.route('/api/data4')
def doGetData4():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute(" SELECT specialite, COUNT(matricule) as nbr_etudaints FROM resultats where annee=2021 group by specialite")	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]
	cursor.close()
	json_data=[]	
	for result in data:
		json_data.append(dict(zip(row_headers,result)))						
	return jsonify(json_data)

@app.route('/api/data5/<int:year>')
def doGetData5(year):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select matricule,nom,prenom,specialite,max(moyenne) as max from resultats where annee = "+str(year)+" group by specialite")	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]
	cursor.close()
	json_data=[]	
	for result in data:
		json_data.append(dict(zip(row_headers,result)))						
	return jsonify(json_data)

@app.route('/api/data5_1')
def doGetData5_1():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select matricule,nom,prenom,specialite,annee,max(moyenne) as max from resultats group by annee")	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]
	cursor.close()
	json_data=[]	
	for result in data:
		json_data.append(dict(zip(row_headers,result)))						
	return jsonify(json_data)

@app.route('/api/data6/<int:year>/<string:specialite>')
def doGetData6(year,specialite):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute(" SELECT (COUNT(CASE WHEN moyenne >= 10 THEN 1 END) / COUNT(*)) * 100 AS pass_percentage, (COUNT(CASE WHEN moyenne< 10 THEN 1 END) / COUNT(*)) * 100 AS fail_percentage FROM resultats where annee ="+str(year)+" and specialite = '"+str(specialite)+"'")	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]
	cursor.close()
	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))						
	return jsonify(json_data)

@app.route('/api/data7/<year>/<string:major>')
def doGetData7(year,major):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	if(major=='specialite'):
		cursor.execute("SELECT matricule,CONCAT(nom, ' ', prenom) AS full_name,sexe,specialite,moyenne,annee FROM resultats where annee = "+str(year)+" and specialite = "+str(major))	
	else :
		cursor.execute("SELECT matricule,CONCAT(nom, ' ', prenom) AS full_name,sexe,specialite,moyenne,annee FROM resultats where annee = "+str(year)+" and specialite = '"+str(major)+"'")	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]
	cursor.close()
	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))						
	return jsonify(json_data)

@app.route('/api/data8/<year>')
def doGetData8(year):
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT specialite,SUM(CASE WHEN sexe = 'H' THEN 1 ELSE 0 END) AS male_count,    SUM(CASE WHEN sexe = 'F' THEN 1 ELSE 0 END) AS female_count FROM resultats where annee = "+str(year)+" GROUP BY annee, specialite")	
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]
	cursor.close()
	json_data=[]	
	for result in data:
		json_data.append(dict(zip(row_headers,result)))						
	return jsonify(json_data)	
	
if __name__ == '__main__':
	app.run(debug=True, port=5000)
	
	