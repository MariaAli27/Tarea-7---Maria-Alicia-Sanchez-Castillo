(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .navbar-reduce
   */
  let selectHNavbar = select('.navbar-default')
  if (selectHNavbar) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        selectHNavbar.classList.add('navbar-reduce')
        selectHNavbar.classList.remove('navbar-trans')
      } else {
        selectHNavbar.classList.remove('navbar-reduce')
        selectHNavbar.classList.add('navbar-trans')
      }
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }

    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Search window open/close
   */
  let body = select('body');

  on('click', '.navbar-toggle-box', function(e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function(e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })

  /**
   * Intro Carousel
   */
  new Swiper('.intro-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property carousel
   */
  new Swiper('#property-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.propery-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * News carousel
   */
  new Swiper('#news-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.news-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonial carousel
   */
  new Swiper('#testimonial-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonial-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property Single carousel
   */
  new Swiper('#property-single-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.property-single-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  /**
   * ==========================================
   * TAREA 7 - CARGAR PROPIEDADES DESDE EL API
   * ==========================================
   */

  $(document).ready(function() {

    $.ajax({

      url: "https://si0sgs.github.io/EstateAgency/datos/propiedades.json",

      type: "GET",

      dataType: "json",

      success: function(datos) {

        let html = "";

        $.each(datos.propiedades, function(index, propiedad) {

          html += `
            <div class="col-md-4">

              <div class="card-box-a card-shadow">

                <div class="img-box-a">

                  <img
                    src="${propiedad.imagen}"
                    alt=""
                    class="img-a img-fluid">

                </div>

                <div class="card-overlay">

                  <div class="card-overlay-a-content">

                    <div class="card-header-a">

                      <h2 class="card-title-a">

                        <a href="#">
                          ${propiedad.clasificacion}
                        </a>

                      </h2>

                      <p class="link-a">
                        ${propiedad.descripcion}
                      </p>

                    </div>


                    <div class="card-body-a">

                      <div class="price-box d-flex">

                        <span class="price-a">

                          ${propiedad.tipo} | $ ${propiedad.precio}

                        </span>

                      </div>

                    </div>


                    <div class="card-footer-a">

                      <ul class="card-info d-flex justify-content-around">


                        <li>

                          <h4 class="card-info-title">
                            Area
                          </h4>

                          <span>

                            ${propiedad.detalle.area}m

                            <sup>2</sup>

                          </span>

                        </li>


                        <li>

                          <h4 class="card-info-title">
                            Rooms
                          </h4>

                          <span>
                            ${propiedad.detalle.rooms}
                          </span>

                        </li>


                        <li>

                          <h4 class="card-info-title">
                            Floors
                          </h4>

                          <span>
                            ${propiedad.detalle.floors}
                          </span>

                        </li>


                        <li>

                          <h4 class="card-info-title">
                            Garages
                          </h4>

                          <span>
                            ${propiedad.detalle.garages}
                          </span>

                        </li>


                      </ul>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          `;

        });


        $("#datosPropiedades").html(html);

      },


      error: function(error) {

        console.log(
          "Error al cargar las propiedades:",
          error
        );

      }

    });

  });
let latitud;
let longitud;
let apiKey ="1d165b282a856c52d6a8bd9b408d5b74";

navigator.geolocation.getCurrentPosition(function(posicion) {
  latitud = posicion.coords.latitude;
  longitud = posicion.coords.longitude;

  console.log("Latitud:", latitud);
  console.log("Longitud:", longitud);
});
$("#tblw").click(function() {

  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather",
    type: "GET",
    dataType: "json",
    data: {
      lat: latitud,
      lon: longitud,
      appid: apiKey,
      units: "metric"
    },

    success: function(datos) {

      $("#lug").text(datos.name);
      $("#tem").text(datos.main.temp + " °C");
      $("#hum").text(datos.main.humidity + " %");
      $("#vie").text(datos.wind.speed);

      $("#tiempoIcon").attr(
        "src",
        "https://openweathermap.org/img/w/" +
        datos.weather[0].icon +
        ".png"
      );

    },

 error: function(error) {
  console.log("Error al consultar el clima:", error);
}

  });

});

})()