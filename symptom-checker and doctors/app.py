from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)

#Alzheimer's disease - Increased memory loss and confusion. Inability to learn new things.
# : Influenza: pain in the muscles, chills fatigue and fever
#Diabetes - Are very thirsty. Lose weight without trying. Are very hungry.




db = {
'alzheimers' : ["loss of memory", "confusion", "inability to learn"] ,
'influenza' : ["muscle pain", 'chills', 'fatigue', 'fever'],
'diabetes' : ['thirsty', 'weight loss', 'increase in hunger']
}

diseases = ['alzheimers', 'influenza', 'diabetes']



description = [
"Alzheimer's disease is a progressive neurologic disorder that causes the brain to shrink (atrophy) and brain cells to die. Alzheimer's disease is the most common cause of dementia — a continuous decline in thinking, behavioral and social skills that affects a person's ability to function independently.",
"Influenza is a viral infection that attacks your respiratory system — your nose, throat and lungs. Influenza is commonly called the flu, but it's not the same as stomach 'flu' viruses that cause diarrhea and vomiting. For most people, the flu resolves on its own.",
"Diabetes is a disease that occurs when your blood glucose, also called blood sugar, is too high. Blood glucose is your main source of energy and comes from the food you eat. Insulin, a hormone made by the pancreas, helps glucose from food get into your cells to be used for energy."
]

doctors = [
"Dr Thomas Mathew",
"Dr Neha Mishra",
"Dr. Sampath Satish Kumar"
]

numbers = [
"Ph. Number: 098802 47582",
"Ph. Number: 1800 102 5555",
"Ph. Number: 080 2572 2999"
]

job = [
"Neurologist",
"Infectious disease physician",
"Endocrinologist"
]

cost = [
"$5 Consultation fee at hospital",
"$6 Consultation fee at hospital",
"$5.5 Consultation fee at hospital"
]

locations = [

"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408.74550977577627!2d77.63060637144109!3d12.929268740032752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1460aa79efbb%3A0x3e6d62d359115e81!2sDr%20Thomas%20Mathew%2C%20Neurologist!5e0!3m2!1sen!2sin!4v1623456269165!5m2!1sen!2sin",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.052043347244!2d77.64858473573877!3d12.958527010940076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15ade900744f%3A0x110151dafa6492b0!2sDr%20Neha%20Mishra%20%7C%20Best%20Infectious%20disease%20specialist%20near%20me%20in%20old%20airport%20road%20bangalore!5e0!3m2!1sen!2sin!4v1623456224460!5m2!1sen!2sin",
"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d687.4647469758261!2d77.6363698872519!3d12.914927400568676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae148e0f3a3a79%3A0x14f5bbafa851fbf!2sDr.%20Sampath%20Satish%20Kumar!5e0!3m2!1sen!2sin!4v1623456308992!5m2!1sen!2sin"

]

images = [
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxzt0N5k94RfZrwFnElbx13dPIZSFt4z_WLQ&usqp=CAU",
"data:image/jpeg;base64,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",
"data:image/jpeg;base64,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"
]

#db.values() = the lists




@app.route("/", methods = ["POST", "GET"])
def symptom_checker():
	if(request.method == "POST"):
		symptom = request.form.get("symptom")
		symptom = symptom.lower()
		count = 0
		for i in db.values():

			if(symptom in i):
				disease = diseases[count]
				description1 = description[count]
				map1 = locations[count]
				image = images[count]
				doc_name = doctors[count]
				job1 = job[count]
				cost1 = cost[count]
				ph_number = numbers[count]
				disease = disease.capitalize()
				return render_template("symptom_checker.html", disease = disease, description1 = description1, map1 = map1, image = image, doctor = doc_name, job = job1, cost = cost1, number = ph_number)
			else:
				count = count+1
	else:
		return render_template("symptom_checker.html", disease = '', description1 = '')


if(__name__ == "__main__"):
	app.run(debug = True)
