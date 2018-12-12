let karakterer = document.getElementsByTagName("tr")
let list = []
let dict = {"A":5, "B":4, "C":3, "D":2, "E":1}
total_points = 0
total_grades = 0
for (let item of karakterer){
    if ((item.className === "none") || (item.className === "resultatTop")) //De klassene som inneholder karakterer for faget
    {
        item.childNodes.forEach(x => {
                if (x.className === "col6Resultat textAlignRight"){ //Finner resultatkolonnen
                    list.push(x.childNodes[4].innerText); //Index 4 inneholder karakteren som string
                }
            }
        )
    }
}
list.forEach(x => {
    if (x in dict){
        total_points += dict[x]
        total_grades ++
    }
})
console.log(list)
console.log("Total points: " + total_points)
console.log("Total grades: " + total_grades)
console.log("Average: " + total_points/total_grades)
let resultater = document.getElementById("mineResultaterTittel") //Endrer et element som allerede er på siden
resultater.innerText = "Du har fått karakter i " + total_grades + " fag, og har et snitt på " + total_points/total_grades