

const menuDashboard =
document.getElementById("menuDashboard");

const menuInsights =
document.getElementById("menuInsights");

const menuRelatorios =
document.getElementById("menuRelatorios");


/* ÁREAS */

const areaDashboard =
document.getElementById("areaDashboard");

const areaInsights =
document.getElementById("areaInsights");

const areaRelatorios =
document.getElementById("areaRelatorios");


/* NAVEGAÇÃO */

menuDashboard.onclick = () => {

    areaDashboard.style.display = "block";

    areaInsights.style.display = "none";

    areaRelatorios.style.display = "none";

};


menuInsights.onclick = () => {

    areaDashboard.style.display = "none";

    areaInsights.style.display = "block";

    areaRelatorios.style.display = "none";

};


menuRelatorios.onclick = () => {

    areaDashboard.style.display = "none";

    areaInsights.style.display = "none";

    areaRelatorios.style.display = "block";

};


/* ELEMENTOS */

const tbody =
document.querySelector("tbody");

const descItem =
document.querySelector("#desc");

const amount =
document.querySelector("#amount");

const type =
document.querySelector("#type");

const btnNew =
document.querySelector("#btnNew");


const incomes =
document.querySelector(".incomes");

const expenses =
document.querySelector(".expenses");

const total =
document.querySelector(".total");


const insightsArea =
document.querySelector("#insights");


/* ARRAY */

let items;


/* BOTÃO ADICIONAR */

btnNew.onclick = () => {

    if (
        descItem.value === "" ||
        amount.value === "" ||
        type.value === ""
    ) {

        return alert(
            "Preencha todos os campos!"
        );

    }


    items.push({

        desc: descItem.value,

        amount: Math.abs(amount.value).toFixed(2),

        type: type.value,

    });


    setItensBD();

    loadItens();


    descItem.value = "";

    amount.value = "";

};


/* DELETAR */

function deleteItem(index) {

    items.splice(index, 1);

    setItensBD();

    loadItens();

}

window.deleteItem = deleteItem;


/* INSERIR ITEM */

function insertItem(item, index) {

    let tr =
    document.createElement("tr");


    tr.innerHTML = `
    
        <td>
            ${item.desc}
        </td>

        <td>
            R$ ${item.amount}
        </td>

        <td>
            ${
                item.type === "Entrada"
                ? "🟢 Entrada"
                : "🔴 Saída"
            }
        </td>

        <td>

            <button
                class="buttonDelete"
                onclick="deleteItem(${index})">

                X

            </button>

        </td>

    `;


    tbody.appendChild(tr);

}


/* CARREGAR */

function loadItens() {

    items = getItensBD();

    tbody.innerHTML = "";


    items.forEach((item, index) => {

        insertItem(item, index);

    });


    getTotals();

}


/* CÁLCULOS */

function getTotals() {

    const amountIncomes = items

        .filter(
            (item) =>
            item.type === "Entrada"
        )

        .map(
            (transaction) =>
            Number(transaction.amount)
        );


    const amountExpenses = items

        .filter(
            (item) =>
            item.type === "Saída"
        )

        .map(
            (transaction) =>
            Number(transaction.amount)
        );


    const totalIncomes = amountIncomes

        .reduce(
            (acc, cur) => acc + cur,
            0
        )

        .toFixed(2);


    const totalExpenses = Math.abs(

        amountExpenses.reduce(
            (acc, cur) => acc + cur,
            0
        )

    ).toFixed(2);


    const totalItems = (

        totalIncomes - totalExpenses

    ).toFixed(2);


    incomes.innerHTML =
    totalIncomes;

    expenses.innerHTML =
    totalExpenses;

    total.innerHTML =
    totalItems;


    gerarInsights(
        totalIncomes,
        totalExpenses,
        totalItems
    );

}


/* INSIGHTS */

function gerarInsights(
    receitas,
    gastos,
    saldo
){

    insightsArea.innerHTML = "";


    if(gastos > receitas){

        insightsArea.innerHTML += `

            <p>
                ⚠ Seus gastos estão maiores
                que suas entradas.
            </p>

        `;

    }


    if(saldo > 0){

        insightsArea.innerHTML += `

            <p>
                ✅ Seu saldo atual está positivo.
            </p>

        `;

    }


    if(gastos > receitas * 0.7){

        insightsArea.innerHTML += `

            <p>
                💡 Você pode economizar reduzindo despesas.
            </p>

        `;

    }


    if(gastos < receitas * 0.5){

        insightsArea.innerHTML += `

            <p>
                🚀 Excelente controle financeiro.
            </p>

        `;

    }

}


/* LOCAL STORAGE */

const getItensBD = () =>

    JSON.parse(
        localStorage.getItem("db_items")
    ) ?? [];


const setItensBD = () =>

    localStorage.setItem(
        "db_items",
        JSON.stringify(items)
    );


loadItens();
