(function() {
    emailjs.init("user_Xx2tk9mFk4g14KdTdKzUt");
})();

$(document).ready(function(){
    var ceva = $('#myCarousel');
    ceva.carousel({
        interval: 1000
    }); 
    cart_n.innerHTML = `<style>.red{color: red;}</style><b class="red">[</b>` + `0`+ `<b class="red">]</b>`;
});

$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar.fixed-top");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});


/*GET*/

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

//GLOBAL VARIABLES
var products = [];
var cartItems=[];
var cart_n = document.getElementById("cart_n");
var promotiiDIV = document.getElementById("itemdiv");
let btn = `btnpromo`;
const list = document.getElementById("ceva");

function getElements() {
    let v1 = getUrlParameter("myVar1");
    
    fetch('http://localhost:3000/produse' + v1)
        .then(function (response) {
            response.json().then(function (elements) {
                for (let i = 0; i < elements.length; i++) {
                    if(v1 == 15 || v1 == 16 || v1 == 17) elements[i].unitate = "metru^2";
                    else elements[i].unitate = "Unitate";
                    list.innerHTML += `<div class="col-lg-4">
                                        <div class="grid-item Apple border iamcenter">
                                        <div class="item py-2 iamcenter" style="width: 200px;">
                                        <div class="product font-rale">
                                        <a href="#"><img src="${elements[i].url}" alt="product1" class="img-fluid"></a>
                                        <div class="text-center">
                                        <h6>${elements[i].name}</h6>
                                        <div class="rating text-warning font-size-12">
                                        ${'<span><i class="fas fa-star"></i></span>'.repeat(elements[i].stars)}
                                        ${'<span><i class="far fa-star"></i></span>'.repeat(5-elements[i].stars)}
                                        </div>
                                        <div class="price py-2">
                                        <span>${elements[i].pret}.00 RON/${elements[i].unitate}</span>
                                        </div>
                                        <button id="${'btn'}" type="submit" class="btn btn-warning font-size-12" onclick="cart('${elements[i].name}', '${elements[i].pret}', '${elements[i].url}','0','btn')">Adaugă în coș</button>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        `;
                                        
                                    }
            });
        });
};


function getPromo(){
    fetch('http://localhost:3000/promotii')
    .then(function (response) {
        response.json().then(function (elements) {
            if(promotiiDIV){
            for(let i = 0; i < elements.length; i++){
                promotiiDIV.innerHTML += `${HTMLpromo(elements[i].name,elements[i].pret,elements[i].url,elements[i].descriere, elements[i].pretOLD)}`;
            }
        }
        });
    });
};

/*send mail*/

var ma = document.getElementById("mail");


function sendEmail() {
    today = new Date();
    var h = today.getHours();
    var min = today.getMinutes();
    var s = today.getSeconds();
    var day = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    if(day < 10) day = "0" + day;
    if(m < 10) m = "0" + m;
    var data =  day + "-" + m + "-" + y;

    var templateParams = {
        "to_name" : ma.value,
        "from_name" : 'oneagheorhe@gmail.com',
        "date" : "ziua de: " + data +  ", la ora:" + h + ":" + min + ":" + s + "."
    };
      var userId = 'user_Xx2tk9mFk4g14KdTdKzUt';

      emailjs.send('service_4vctffn', 'template_0ke7', templateParams, userId)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          location.reload();
        }, function(error) {
          console.log('FAILED...', error);
        })

    

	// Email.send({
    // Host : "smtp.gmail.com",
    // SecureToken: 'a3e73957-6e34-4286-b348-8b5d41e28d77',
	// To : ma.value,
	// From : "oneagheorhe@gmail.com",
	// Subject : "Verificare email!",
    // Body : "E-mail verificat! :D",
    // Attachments : [
    //     {
    //         name : "verified.png",
    //         path:"https://www.nicepng.com/png/detail/73-730077_verify-users-via-e-mail-verified-user.png"
    //     }]
	// }).then(function(){
    //     swal({
    //         showConfirmButton: true,  
    //         showCloseButton: true,
    //         timer: 1000,
    //         type: 'success',
    //         title: 'Mail trimis cu succes!'
    //     });
    // })

}

function HTMLpromo(name, pret, url, descriere, pretOLD){ 
    var item = {
        name: name,
        pret: pret,
        url: url,
        descriere: descriere,
        pretOLD: pretOLD
    }
    // <button type="button" onclick="cumpar('${item.name}','${item.pret}','${item.url}','0','${btn}')" class="btn btn-sm btn-outline-secondary">
    //             <a style="color:inherit;" href="cart.html">Cumpără</a>
    //         </button>
    return `
        <div class="row featurette">
        <div class="col-md-7">
            <h2 id="Promotii" style="color: green; padding-top:80px; font-weight: bold;">${item.name}</h2>
            <p class="lead">${item.descriere}</p>
            <h3 style="color: red; font-weight: bold; text-decoration: line-through;">${item.pretOLD}.00 RON</h3>
            <h3 style="color: red; font-weight: bold;">${item.pret}.00 RON</h3>
            <button id="${btn}" type="button" onclick="cart('${item.name}','${item.pret}','${item.url}','0','${btn}')" class="btn btn-sm btn-outline-secondary">Adaugă în coș</button>
    </div>
    <div class="col-md-5">
        <img src = '${item.url}' width="400" height="500">
        </div>
    </div>
    `
}

let requestSuccess = false;
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

    fetch('http://localhost:3000/posts', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(item)
    }).then(response => {
        if (response.ok) {
          return response.json()
        }
      }).then(function(elements){

        fetch('http://localhost:3000/posts')
        .then(function (response) {
            response.json().then(function (elements) {
        for(let i = 0; i < elements.length; i++){
        cart_n.innerHTML = `<style>.red{color: red;}</style><b class="red">[</b>` + `${elements.length}`+ `<b class="red">]</b>`;
        }
      })
    })
    
    cart_n.innerHTML = `<style>.red{color: red;}</style><b class="red">[</b>` + `${elements.length}`+ `<b class="red">]</b>`;
    animation();

    })
}


// function cumpar(name, pret, url, con, btncart){
//     var item={
//         name: name,
//         pret: pret,
//         url: url
//     }

//     fetch('http://localhost:3000/posts', {
//         method: 'post',
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(item)
//     }).then(response => {
//         if (response.ok) {
//           return response.json()
//         }
//       }).then(function(elements){  
//         render();
//     cart_n.innerHTML = `<style>.red{color: red;}</style><b class="red">[</b>` + `${elements.length}`+ `<b class="red">]</b>`;
//     getItems();
//     })
// }

function render(){
    if ( document.URL.includes("index.html") )  getPromo();
    else if (document.URL.includes("prod.html")) getElements();
    else if (document.URL.includes("cart.html")) getItems();
    fetch('http://localhost:3000/posts')
        .then(function (response) {
            response.json().then(function (elements) {
        for(let i = 0; i < elements.length; i++){
        cart_n.innerHTML = `<style>.red{color: red;}</style><b class="red">[</b>` + `${elements.length}`+ `<b class="red">]</b>`;
        }
      })
    })
};
