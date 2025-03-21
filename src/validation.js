export const isValidName = (name) => /^[a-zA-ZÀ-ÿ '-]+$/.test(name);
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPostalCode = (postalCode) => /^\d{5}$/.test(postalCode);
export const isValidBirthdate = (birthdate) => {
    const date = new Date(birthdate);
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 18;
};

export const validateForm = (form) => {
    const errors = {};
    if (!isValidName(form.name)) errors.name = "Nom invalide.";
    if (!isValidName(form.surname)) errors.surname = "Prénom invalide.";
    if (!isValidEmail(form.email)) errors.email = "Email invalide.";
    if (!isValidBirthdate(form.birthdate)) errors.birthdate = "Vous devez avoir au moins 18 ans.";
    if (!isValidName(form.city)) errors.city = "Ville invalide.";
    if (!isValidPostalCode(form.postalCode)) errors.postalCode = "Code postal invalide.";
    return errors;
};