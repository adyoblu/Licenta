$(document).ready(function(){
    var ceva = $('#myCarousel');
    ceva.carousel({
        interval: 1000
    }); 
});
$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar.fixed-top");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

/*GET*/
function getElements() {
    fetch('http://localhost:3000/dogs')
        .then(function (response) {
            response.json().then(function (elements) {
                appendElementsToDOM(elements);
            });
        });
};

/*send mail*/
var ma = document.getElementById("mail");

function sendEmail() {
	Email.send({
    SecureToken: 'a3e73957-6e34-4286-b348-8b5d41e28d77',
	To : ma.value,
	From : "oneagheorhe@gmail.com",
	Subject : "Verificare email!",
	Body : "E-mail verificat! :D",
	}).then(function(){
        // swal({
        //     showConfirmButton: true,  
        //     showCloseButton: true,
        //     timer: 3000,
        //     type: 'success',
        //     title: 'Mail trimis cu succes!',
        // });
    }, function(){
        // swal({
        //     showConfirmButton: true,  
        //     showCloseButton: true,
        //     timer: 3000,
        //     type: 'error',
        //     title: 'Mail esuat!',
        // });
    });
}

//GLOBAL VARIABLES
var products=[];
var cartItems=[];
var cart_n = document.getElementById("cart_n");
var promotiiDIV = document.getElementById("itemdiv");
var promo = [
    {name : 'Promotie #1', pret: 10},
    {name : 'Promotie #2', pret: 12},
    {name : 'Promotie #3', pret: 15}
];
function HTMLpromo(){
    let URL = `imagini/111.jpg`
    let btn = `btnpromo`;
    return `
        <div class="row featurette">
        <div class="col-md-7">
            <h2 id="Promotii" style="padding-top:80px;">Promotii</h2>
            <p class="lead">ceva asdsadsadsa dasdasdsadsadassadasdas</p>
            <h3>${promo[0].pret}.00 RON</h3>
            <button type="button" onclick="cart2('${promo[0].name}'','${promo[0].pret}','${URL}','0','${btn}')" class="btn btn-sm btn-outline-secondary">
                <a style="color:inherit;" href="cart.html">Cumpara</a>
            </button>
            <button id="${btn}" type="button" onclick="cart('${promo[0].name}','${promo[0].pret}','${URL}','0','${btn}')" class="btn btn-sm btn-outline-secondary">Adauga in cos</button>
    </div>
    <div class="col-md-5">
        <img src = "imagini/111.jpg" width="400" height="500">
        </div>
    </div>
    `
}
let requestSuccess = false;

function notificare(){
    swal({
            showConfirmButton: true,  
            showCloseButton: true,
            showCancelButton: true,
            timer: 3000,
            title: 'Ești sigur că vrei să trimiți acest mail?',
            type: "warning"
        }).then((ceva) => {
            if (ceva.value) {
                requestSuccess = true;
        
                  if (requestSuccess) {
                    swal({
                        type: "success",
                        title:"Email trimis cu succes."
                    })
                  }
        
                } else {
                    swal({
                        type: "error",
                        title:"Email esuat."
                    })
                }
              });
}

function animation(){
    var da = swal({
        toast: true,
        position:'top-end',
        showCancelButton: true,
        cancelButtonText: 'Rămai aici',
        confirmButtonText: 'Du-te la coș',    
        showCloseButton: true,
        timer: 3000,
        type: 'success',
        title: 'Adaugat in cos',
    });
    da.then((ceva) => {
    if (ceva.value) {
        requestSuccess = true;

          if (requestSuccess) {
            window.location.href = ("./cart.html");
          }

        } else {}
      });
}

function cart(name, pret, url, con, btncart){
    var item = {
        name: name,
        pret: pret,
        url: url
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if(storage == null){
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `<style>.red{color: red;}</style><b class="red">[</b>` + `${products.length}`+ `<b class="red">]</b>`;
    // document.getElementById(btncart).style.display="none";
    animation();
}
function cart2(name, pret, url, con, btncart){
    var item={
        name: name,
        pret: pret,
        url: url
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if(storage == null){
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products .push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `<style>.red{color: red;}</style><b class="red">[</b>` + `${products.length}`+ `<b class="red">]</b>`;
    document.getElementById(btncart).style.display="none";
}
function render(){
    localStorage.clear();

    for(let i = 1; i <= 4; i++){
        promotiiDIV.innerHTML += `${HTMLpromo()}`;
    }
    if(localStorage.getItem("cart")==null){

    } else {
        products =  JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML = `[${products.length}]`;
    }
};

// function start(){
//     const { value: accept } = await Swal.fire({
//         title: 'Terms and conditions',
//         input: 'checkbox',
//         inputValue: 1,
//         inputPlaceholder:
//           'I agree with the terms and conditions',
//         confirmButtonText:
//           'Continue<i class="fa fa-arrow-right"></i>',
//         inputValidator: (result) => {
//           return !result && 'You need to agree with T&C'
//         }
//       })
      
//       if (accept) {
//         Swal.fire('You agreed with T&C :)')
//       }
// }