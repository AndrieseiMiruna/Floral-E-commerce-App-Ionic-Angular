import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class RegisterPageForm{

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
        let form = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            repeatPassword: ['']
        });

        form.get('repeatPassword').setValidators(matchPasswordandRepeatPassword(form));

        return form;
    }

    getForm() : FormGroup {
        return this.form;
    }

}

function matchPasswordandRepeatPassword(form:FormGroup) : ValidatorFn {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');

    const validator = () => {
        return password.value == repeatPassword.value ? null : {instMatching:true}
    };

    return validator;
}