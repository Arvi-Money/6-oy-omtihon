import './loader.css'

function Loader() {
    window.addEventListener("load", function () {
      const loader = document.querySelector(".loader");
      loader.className += " hidden";
    });
  }
  
  export default Loader