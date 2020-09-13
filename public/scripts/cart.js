//Variabile globale
var products = JSON.parse(localStorage.getItem('cart'));
var cartItems = [];
var cart_n = document.getElementById('cart_n');
var table = document.getElementById('table');
var total = 0;


// function tableHTML(i){
//     return `<tr>
//     <th scope="row">${i+1}</th>
//     <td><img style="width:90px;" src="${products[i].url}"></td>
//     <td>${products[i].name}</td>
//     <td>1</td>
//     <td>${products[i].pret}</td>
//     </tr>`;
// }
// function buy(){
//     var d = new Date();
//     var t = d.getTime();
//     var counter = t;
//     counter += 1;
//     let itemdb ={
//         id: counter,
//         order: counter-895,
//         total: total
//     }

//     fetch('http://localhost:3000/order' + counter, {
//         method: 'post',
//         headers: {
//                     "Content-type": "application/json"
//                 },
//                 body: JSON.stringify(itemdb)
//             }).then(function () {
//             swal({
//                 position: 'center',
//                 type: 'success',
//                 title: 'Achizitie facuta cu succes',
//                 text: `Comanda este : ${itemdb.order}`,
//                 showConfirmButton: true,
//                 timer: 5000
//             });
//             curata();
//     })
// }
// function curata(){
//     localStorage.clear();
//     for(let i = 0; i < products.length; i++){
//         table.innerHTML += tableHTML(i);
//         total = total + parseInt(products[i].pret);
//     }
//     total = 0 ;
//     table.innerHTML=`
//     <tr>
//     <th></th>
//     <th></th>
//     <th></th>
//     </tr>
//     `;
//     cart_n.innerHTML='';
//     document.getElementById('btnBuy').style.display = "none";
//     document.getElementById('btncurata').style.display = "none";
// }
// function render(){
//     for (let index = 0; index < products.length; index++) {
//         table.innerHTML += tableHTML(index);
//         total += parseInt(products[index].pret);
//     }
//     table.innerHTML +=`
//     <tr>
//     <th scope="col"></th>
//     <th scope="col"></th>
//     <th scope="col"></th>
//     <th scope="col"></th>
//     <th scope="col">Total: ${total}.00 RON</th>
//     </tr>
//     <tr>
//     <th scope="col"></th>
//     <th scope="col"></th>
//     <th scope="col"></th>
//     <th scope="col">
//         <button id="btncurata" onclick="curata()" class="btn text-white btn-warning">
//         Curata cosul de cumparaturi
//         </button>
//     </th>
//     <th scope="col">
//         <button id="btnBuy" onclick="buy()" class="btn btn-success">Cumpara</button>
//     </th>
//     </tr>`;
//     products=JSON.parse(localStorage.getItem("cart"));
//     cart_n.innerHTML = `[${products.length}]`;

// }

function getItems(){
    fetch('http://localhost:3000/posts')
    .then(function (response) {
        response.json().then(function (elements) {
            appendItems(elements);
            console.log(elements.length);
            if(elements.length == 0) document.getElementById("btnBuy").disabled = true;
        });
    });
}

function appendItems(elements){
        // localStorage.clear();
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }
            for(let i = 0; i < elements.length; i++){
                let tr1 = document.createElement("tr");
                let td = document.createElement("td");
                let img = document.createElement("img");
                img.style="width:90px";
                img.src=elements[i].url;
                let td2 = document.createElement("td");
                td2.innerHTML = elements[i].name;
                let td3 = document.createElement("td");
                td3.innerHTML = 1;
                let td4 = document.createElement("td");
                td4.innerHTML = elements[i].pret + ".00 RON";
                let td5 = document.createElement("td");
                let th = document.createElement("th");
                th.scope="row";
                th.innerHTML = i+1;
                th.innerHTML = "(" + th.innerHTML + ")";
                td5.innerHTML =`<button id="buto" onclick="deleteItem(${elements[i].id});" class=" fas fa-trash"></button>`;
                table.appendChild(tr1);
                tr1.appendChild(th);
                tr1.appendChild(td);
                td.appendChild(img);
                tr1.appendChild(td2);
                tr1.appendChild(td3);
                tr1.appendChild(td4);
                tr1.appendChild(td5);

                // td5.appendChild(button1);
                // table.innerHTML += `<tr>
                // <th scope="row">${i+1}</th>
                // <td><img style="width:90px;" src="${elements[i].url}"></td>
                // <td>${elements[i].name}</td>
                // <td>1</td>
                // <td>${elements[i].pret}</td>
                // <td><button onclick="(deleteCart(${elements[i].id}));" class="fas fa-trash"></button></td>
                // </tr>`;
                total += parseInt(elements[i].pret);
            }
            let tr2 = document.createElement("tr");
            let th2 = document.createElement("th");
            th2.scope = "col";
            let th3 = document.createElement("th");
            th3.scope = "col";
            let th4 = document.createElement("th");
            th4.scope = "col";
            let th5 = document.createElement("th");
            th5.scope = "col";
            let th6 = document.createElement("th");
            th6.scope = "col";
            th6.innerHTML = "Total " + total + ".00 RON";


            tr2.appendChild(th5);
            tr2.appendChild(th4);
            tr2.appendChild(th3);
            tr2.appendChild(th2);
            tr2.appendChild(th6);
            table.appendChild(tr2);

            let tr3 = document.createElement("tr");
            let th7 = document.createElement("th");
            th7.scope = "col";
            let th8 = document.createElement("th");
            th8.scope = "col";
            let th9 = document.createElement("th");
            th9.scope = "col";
            let th10 = document.createElement("th");
            th10.scope = "col";
            let th12 = document.createElement("th");
            th12.scope = "col";
            cart_n.innerHTML = `<style>.red{color: red;}</style><b class="red">[</b>` + `${elements.length}`+ `<b class="red">]</b>`;
            th12.innerHTML=`<button id="btnBuy" onclick="buy()" class="btn btn-success">Cumpara</button>`;
            tr3.appendChild(th9);
            tr3.appendChild(th8);
            tr3.appendChild(th7);
            tr3.appendChild(th10);
            tr3.appendChild(th12);
            table.appendChild(tr3);

}

function buy(){
    document.getElementById("btnBuy").disabled = false;
    var d = new Date();
    var t = d.getTime();
    var counter = t;
    counter += 1;
    let itemdb ={
        id: counter,
        order: counter-895,
        total: total
    }
    fetch('http://localhost:3000/order' + counter, {
        method: 'POST',
        headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(itemdb)
            }).then(response => {
                if (response.ok) {
                  return response.json()
                }
              }).then(function(){
            swal({
                position: 'center',
                type: 'success',
                title: 'Achizitie facuta cu succes',
                text: `Comanda este : ${itemdb.order}`,
                showConfirmButton: true,
                timer: 5000
            });
    })
    deleteAll();

}

function deleteAll(){
    fetch(`http://localhost:3000/posts/`)
    .then(function (response) {
        response.json().then(function (elements) {
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        for(let i = 0; i < elements.length; i++){
            fetch(`http://localhost:3000/posts/${elements[i].id}`, {
                    method: 'DELETE',
                }).then(function () {
                    total -= elements[i].pret;
                    getItems();
                });
        }
    });
})
}


requestSuccess = false;

function deleteItem(id) {
    swal({
        position: 'center',
        type: 'warning',
        title: 'Atentie!',
        text: `Esti sigur ca vrei sa il stergi?`,
        showConfirmButton: true,
        showCancelButton: true,
        timer: 5000
    }).then((ceva) => {
        if (ceva.value) {
            requestSuccess = true;
              if (requestSuccess) {
                fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'DELETE',
                }).then(function () {
                    fetch(`http://localhost:3000/posts`)
                    .then(function (response) {
                    response.json().then(function (elements) {
                    while (table.firstChild) {
                        table.removeChild(table.firstChild);
                    }
                    total = 0 ;
                    for(let i = 0; i < elements.length; i++){
                    total += parseInt(elements[i].pret);
                    }
                    location.reload();
                })
            })
            getItems();
                });
              }
            } else {}
          });
          
}

function render(){
    if ( document.URL.includes("index.html") )  getPromo();
    else if (document.URL.includes("prod.html")) getElements();
    else if (document.URL.includes("cart.html")) getItems();
    //localStorage.clear();
    // if(localStorage.getItem("cart")==null){

    // } else {
    //     products =  JSON.parse(localStorage.getItem("cart"));

    
    // fetch('http://localhost:3000/posts')
    //     .then(function (response) {
    //         response.json().then(function (elements) {
    //     for(let i = 0; i < elements.length; i++){
    //     cart_n.innerHTML = `<style>.red{color: red;}</style><b class="red">[</b>` + `${elements.length}`+ `<b class="red">]</b>`;
    //     }
    //   })
    // })

    // }
};