function random_1to6(){
    let x = Math.floor(Math.random()*10)+1;
    return x;
}

function openList(){
    
    let people = ["제갈예진", "목승엽", "정윤석", "권유현"];
    for(let i=0; i<people.length; i++)
    {
        document.write("<div class='listBox'>");
        document.write("<div class='left'>");
        document.write("<img src='./img/profile/" + random_1to6()+".jpg'></div>");
        document.write("<div class='right'>");
        document.write(people[i]+"</div></div>");
    }
}