/*const element = document.getElementById("ssnInputControl");

function showMessage() {
}*/

const ssnInputControl = document.getElementById('ssnInputControl');

ssnInputControl.addEventListener('input', function(event){

    //Remove non-numeric characters using a regular expression

    this.value = this.value.replace(/[^0-9]/g,'');

});



    /*const togglePassword = document.getElementById('togglePassword');

    togglePassword.addEventListener('click',function(e){

        e.preventDefault();//prevent the default link behaviour (scrolling to top)

        const type = ssnInputControl.getAttribute('type') === 'password' ? 'text':

        ssnInputControl.setAttribute('type',type);

        //Update the link text

        this.textContent = type === 'password' ? 'Show' : 'Hide';
});*/

const undefinedplaceholder = document.getElementById('undefinedplaceholder');

undefinedplaceholder.addEventListener('input', function(event){

    //Remove non-numeric characters using a regular expression

    this.value = this.value.replace(/[^0-9]/g,'');
});
