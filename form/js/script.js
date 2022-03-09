let rxValidator = {
    handleSubmit: (event) => {
        event.preventDefault();

        let send = true;
        let inputs = form.querySelectorAll('input');

        rxValidator.clearErrors();

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = rxValidator.checkInput(input);

            if(check !== true) {
                send = false;
                rxValidator.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');

            for(let k in rules) {
                let rulesDetails = rules[k].split('=');

                switch(rulesDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rulesDetails[1]) {
                            return `Campo deverá conter pelo menos ${rulesDetails[1]} caracteres.`;
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'O e-mail digitado não é valido.';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError: (input, error) => {
        input.style.border = '2px solid #ff1c0b';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = `* ${error}`;

        input.parentElement.insertBefore(errorElement, input.ElementSiblin)
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style.border = 'none';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();

        }
    }
};

let form = document.querySelector('.b7-validator');

form.addEventListener('submit', rxValidator.handleSubmit);