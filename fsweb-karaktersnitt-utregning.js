let karaktererGrid = document.getElementsByTagName("tr");
let list = [];
let GradesDict = {"A":5, "B":4, "C":3, "D":2, "E":1};
let total_grade_points = 0;
let total_student_points = 0;
let total_subject_with_grades = 0;
let average = 0;
let grades_dict = {};
let resultater = document.getElementById("mineResultaterTittel"); //Endrer et element som allerede er på siden


for (let row of karaktererGrid){
    if ((row.className === "none") || (row.className === "resultatTop")) //De klassene som inneholder karaktererGrid for faget
    {
        let temp =[];
        for (let cell of row.childNodes){
            if (cell.className === "col2Emne"){ //Legger til emnenavn
                temp.push(cell.childNodes[3].childNodes[1].innerText)
            }
            if (cell.className === "col6Resultat textAlignRight"){ //Finner resultatkolonnen
                if(!(cell.childNodes[cell.childNodes.length-1].innerText in GradesDict)){ //Sjekker om faget har karakter, stopper løkken hvis ikke
                    break
                }
                points = GradesDict[cell.childNodes[cell.childNodes.length-1].innerText] //Gjør bokstavkarakter om til poeng
                temp.push(points); //Index 4 inneholder karakteren som string

            }
            else if (cell.className === "col7Studiepoeng textAlignRight"){
                if(cell.childNodes.length < 3){
                    break
                }
                temp.push(cell.childNodes);//Hvis karakteren (Ingen studiepoeng) er forbedret vil childnodes være tom, fikser i neste loop
                let input = document.createElement("input"); //Legger til checkbox med hver karakter, slik at man manuelt kan ignorere karaktererGrid
                input.setAttribute("type", "checkbox");
                input.setAttribute("checked", "true");
                input.addEventListener("change", update);
                cell.appendChild(input);
                temp.push(input)
            }
        }
        if((temp.length > 2)){ //Hvis listen bare har 1 element betyr det at faget ikke hadde karakter
            list.push(temp)
        }
    }
}

function update(){
    total_subject_with_grades = 0;
    total_student_points = 0;
    total_grade_points = 0;
    Object.keys(grades_dict).forEach( x => {
        if(grades_dict[x][2].checked) {
            total_subject_with_grades++;
            total_grade_points += grades_dict[x][0] * grades_dict[x][1];
            total_student_points += grades_dict[x][1]
        }
        }
    );
    average = (total_grade_points/total_student_points).toFixed(2);
    console.log("Total points (grade*student points): " + total_grade_points);
    console.log("Total student points: " + total_student_points);
    console.log("Total subjects with grades: " + total_subject_with_grades);
    console.log("Average: " + average);
    resultater.innerText = ((total_subject_with_grades >1) ? ("I de " + total_subject_with_grades + " fagene") : ("I faget"))
        + " du har valgt, har du et snitt på " + average;
    if(total_subject_with_grades === 0) {resultater.innerText = "Du har ikke valgt noen fag"}
}

list.forEach(x => {
    if(x[2][2].innerText === 0 || x[2][2].innerText === "0"){ //Ignorerer fag med 0 studiepoeng
        x[3].parentNode.removeChild(x[3])
    }
    else {
        grades_dict[x[0]] = [x[1], parseFloat(x[2][2].innerText.replace(",", ".")), x[3]]
    }

});

update();


