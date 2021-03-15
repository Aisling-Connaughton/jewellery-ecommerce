import { FormControl, ValidationErrors } from "@angular/forms";

export class DreamValidators {

    // whitespace validation
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {

        // check if string only whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {
            return {'notOnlyWhitespace': true};
        }
        else {
        // valid
            return null;
        }
        
    }
}
