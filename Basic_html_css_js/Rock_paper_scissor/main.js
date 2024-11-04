let jatekos_pont = 0
let gep_pont = 0
let dontetlen_pont = 0
let körök_száma = 0

const jatekos_pont_span = document.getElementById( "jatekos_pont" )
const gep_pont_span = document.getElementById( "gep_pont" )
const  donetlen_pont_span = document.getElementById("dontetlen_pont")

const eredmeny_jelzo_div = document.querySelector(".eredmeny_jelzo")

const eredmeny_p = document.querySelector(".eredmeny > p")
const összes_kör = document.getElementById("körök_száma")

const rock_div = document.getElementById("kő")
const paper_div = document.getElementById("papír")
const scissor_div = document.getElementById("olló")

function átalakit(lépés)
{
    if (lépés ===  'k') return "Kő";

    if(lépés === 'p') return "Papír";
    return "Olló"
}
function  random_választás()
{
    const lehetőségek = ["k", "p", "o"];
    const random_választás = Math.floor((Math.random() *3));

    return lehetőségek[random_választás]
}

function nyert(felhasznalo)
{
    jatekos_pont++;
    jatekos_pont_span.innerHTML= jatekos_pont;
    gep_pont_span.innerHTML = gep_pont;
    eredmeny_p.innerHTML = átalakit(felhasznalo)+"(játékos) nyert";
    körök_száma++;
    összes_kör.innerHTML = körök_száma;
}
function vesztett(gép)
{   
    gep_pont++;
    jatekos_pont_span.innerHTML= jatekos_pont;
    gep_pont_span.innerHTML = gep_pont;
    eredmeny_p.innerHTML = átalakit(gép)+"(gép) nyert";
    körök_száma++;
    összes_kör.innerHTML = körök_száma;
}
function döntetlen()
{   
    dontetlen_pont++;
    donetlen_pont_span.innerHTML = dontetlen_pont;
    eredmeny_p.innerHTML = "Döntetlen";

    körök_száma++;
    összes_kör.innerHTML = körök_száma;
}

function game(felhasznalo)
{
    const gép_választás = random_választás()
    
    switch (felhasznalo + gép_választás) 
    {   //nyertes
        case "ko": ;
        case "pk":
        case "op":
            nyert(felhasznalo, gép_választás);
            console.log("Nyertes");
            break;
        //vesztes
        case "ok":
        case "kp":
        case "po":
            vesztett(felhasznalo, gép_választás);
            console.log("Vesztes");
            break;
        //döntetlen
        case "kk":
        case "pp":
        case "oo":
            döntetlen(felhasznalo, gép_választás);
            console.log("Döntetlen");
            break;
    }
}

function main()
{
    rock_div.addEventListener('click', function()
    {    
        game("k")
    })

    scissor_div.addEventListener('click', function()
    {   
        game("o")
    })

    paper_div.addEventListener('click', function()
    {   
        game("p")
    })
}

main();

