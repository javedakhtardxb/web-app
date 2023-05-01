export function Validation(formData, steps) {
    const errors = {};

    if(steps === "step-1") {
        if (formData.fullname === "") {
            errors.fullname = "Name is required";
        }
    
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            errors.email = 'Invalid email address';
        }
    
        if (formData.phonenumber === "") {
            errors.phonenumber = "Phone is required";
        }
    } else if(steps === "step-2") {
        if (formData.projectname === "") {
            errors.projectname = "Project name is required";
        }

        if (formData.permittype === "") {
            errors.permittype = "Permit type is required";
        }

        if (formData.permitscope === "") {
            errors.permitscope = "Permit scope is required";
        }
    } else if (steps === "step-3") {
        if (formData.cardnumber === "") {
            errors.cardnumber = "Card number is required";
        }

        if (formData.cardholdername === "") {
            errors.cardholdername = "Card holder name is required";
        }

        if (formData.cardexpirydate === "") {
            errors.cardexpirydate = "Card expiry date is required";
        }

        if (formData.cvcnumber === "") {
            errors.cvcnumber = "CVC number is required";
        }
    }

    return errors;

}