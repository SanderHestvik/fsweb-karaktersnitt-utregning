let karakterer = document.getElementsByTagName("tr")
let list = []
let dict = {"A":5, "B":4, "C":3, "D":2, "E":1}
let total_grade_points = 0
let total_student_points = 0
let total_subject_with_grades = 0
let average = 0
let grades_dict = {}
let resultater = document.getElementById("mineResultaterTittel") //Endrer et element som allerede er på siden


for (let item of karakterer){
    if ((item.className === "none") || (item.className === "resultatTop")) //De klassene som inneholder karakterer for faget
    {
        let temp =[]
        for (let x of item.childNodes){
            if (x.className === "col2Emne"){ //Legger til emnenavn
                temp.push(x.childNodes[3].childNodes[1].innerText)
            }
            if (x.className === "col6Resultat textAlignRight"){ //Finner resultatkolonnen
                if(!(x.childNodes[x.childNodes.length-1].innerText in dict)){ //Sjekker om faget har karakter, stopper løkken hvis ikke
                    break
                }
                points = dict[x.childNodes[x.childNodes.length-1].innerText] //Gjør bokstavkarakter om til poeng
                temp.push(points); //Index 4 inneholder karakteren som string

            }
            else if (x.className === "col7Studiepoeng textAlignRight"){
                temp.push(x.childNodes)//Hvis karakteren (Ingen studiepoeng) er forbedret vil childnodes være tom, fikser i neste loop
                let input = document.createElement("input") //Legger til checkbox med hver karakter, slik at man manuelt kan ignorere karakterer
                input.setAttribute("type", "checkbox")
                input.setAttribute("checked", "true")
                input.addEventListener("change", update)
                x.appendChild(input)
                temp.push(input)
            }
        }
        if((temp.length > 1)){ //Hvis listen bare har 1 element betyr det at faget ikke hadde karakter
            list.push(temp)
        }
    }
}

function update(){
    total_subject_with_grades = 0
    total_student_points = 0
    total_grade_points = 0
    Object.keys(grades_dict).forEach( x => {
        if(grades_dict[x][2].checked) {
            total_subject_with_grades++
            total_grade_points += grades_dict[x][0] * grades_dict[x][1]
            total_student_points += grades_dict[x][1]
        }
        }
    )
    average = (total_grade_points/total_student_points).toFixed(2)
    console.log("Total points (grade*student points): " + total_grade_points)
    console.log("Total student points: " + total_student_points)
    console.log("Total subjects with grades: " + total_subject_with_grades)
    console.log("Average: " + average)
    resultater.innerText = "Du har fått karakter i " + total_subject_with_grades + " fag, og har et snitt på " + average
}


list = list.reverse() //Slik at elementet som inneholder studiepoeng kommer først
list.forEach(x => {
    if (x[0] in grades_dict){
            if(x[1]> grades_dict[x[0]][0]){
                grades_dict[x[0]][0] = x[1]
                let temp = grades_dict[x[0]][2]
                grades_dict[x[0]][2] = x[3]
                temp.parentNode.removeChild(temp) //Fjerner checkbox fra den karakteren som ikke er telt med
            }
            else{
                x[3].parentNode.removeChild(x[3])
            }

    }
    else {
        grades_dict[x[0]] = [x[1], parseFloat(x[2][2].innerText.replace(",", ".")), x[3]]
    }

})

update()
console.log(grades_dict)


