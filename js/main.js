var list = [{
        desc: "rice",
        amount: "1",
        value: "5.40",
    },
    {
        desc: "juice",
        amount: "12",
        value: "1.99",
    },
    {
        desc: "meat",
        amount: "1",
        value: "15.00",
    },
];

function getTotal(list) {
    var total = 0;
    for (var key in list) {
        total += list[key].value * list[key].amount;
    }

    document.getElementById("valuePay").innerHTML = formatValue(valueForPay()-total) ;
    document.getElementById("totalValue").innerHTML = formatValue(total);
}

function setList (list) {

    var table = "<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></td></tr></thead><tbody>";
    for (var key in list) {
        var cores = document.getElementById("value").value < 1 ? "style ='color: red'" : "style ='color: green'"


        table +=
            "</td><td class=''>" +
            formatDesc(list[key].desc) +
            "</td><td class=''>" +
            formatAmount(list[key].amount)  +
            "</td><td class=''>" + formatValue(list[key].value) + '</td><td> <button class="btn btn-default" onclick="setUpdate(' +key +')">Edit</button> <button class="btn btn-default" onclick="deleteData(' +key +')">Delete</button></td></tr>';
    }
    table += "</tbody>";
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
}

function formatAmount(amount) {
    return parseInt(amount);
}

function formatValue(value) {
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");
    str = "R$ " + str;

    return str;
}


function addData(){
    if(!validation()){
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({
        desc: desc,
        amount: amount,
        value: value,
    });
    setList(list);
}

function setUpdate(id) {
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="' + id + '">';
}

function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("erros").style.display = "none"
}

function updateData() {
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = {
        "desc": desc,
        "amount": amount,
        "value": value
    };
    resetForm();
    setList(list);
}


function deleteData (id) {
    if (confirm("Deseja deletar esse item")) {
        if (id === list.length - 1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrayAuxIni = list.slice(0, id);
            var arrayAuxEnd = list.slice(id + 1);
            list = arrayAuxIni.concat(arrayAuxEnd)
        }
        setList(list)
    }
}

function validation(){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var valueToBuy = document.getElementById("valueToBuy").value; 
    var erros = "";
    // document.getElementById("btnAdd").style.display = "none";
    if(desc === ""){
        erros += '<p>Informe a descrição</p>';
    }
    if(amount === ""){
        erros += '<p>Informe uma quantidade</p>';
    } else if (amount != parseInt(amount)) {
        erros += '<p>Informe uma quantidade</p>';
    }

    if (valueToBuy === "") {
        erros += '<p>Informe valor em conta</p>';
    } else if (valueToBuy != parseInt(valueToBuy)) {
            erros += '<p>Informe valor correto</p>';

    }

    // if(value === ""){
    //     erros += '<p>Informe um valor válido</p>';
    // } else if (value != parseFloat(value)) {
    //     erros += '<p>Informe um valor válido</p>';
    // }

    if (erros != "") {
        document.getElementById("erros").style.display = "block"
        document.getElementById("erros").style.backgroundColor = "#81888e";
        document.getElementById("erros").style.color = "white";
        document.getElementById("erros").style.padding = "10px";
        document.getElementById("erros").style.margin = "10px";
        document.getElementById("erros").style.borderRadius = "13px";
        document.getElementById("erros").innerHTML = "<h3>Error:</h3>" + erros;
        return 0;
    } else {
        return 1;
    }
}

function deleteList () {
    if(confirm("Deseja deletar essa lista?")){
        list = [];
        setList(list);
    }
}

function saveListStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList)
    }
    setList(list);
}

function valueForPay(){
    var pay = document.getElementById("valueToBuy").value

    return pay;
}

initListStorage()
