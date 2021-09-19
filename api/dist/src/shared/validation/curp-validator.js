"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURPValidator = void 0;
const class_validator_1 = require("class-validator");
function isValidCurp(curp) {
    let re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/, validado = curp.match(re);
    if (!validado)
        return false;
    function digitoVerificador(curp17) {
        let diccionario = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ', lngSuma = 0.0, lngDigito = 0.0;
        for (let i = 0; i < 17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - (lngSuma % 10);
        if (lngDigito == 10)
            return 0;
        return lngDigito;
    }
    if (validado[2] != digitoVerificador(validado[1]).toString())
        return false;
    return true;
}
let CURPValidator = class CURPValidator {
    validate(value, validationArguments) {
        return isValidCurp(value);
    }
    defaultMessage(validationArguments) {
        return 'InvalidCurp';
    }
};
CURPValidator = __decorate([
    class_validator_1.ValidatorConstraint({ name: 'invalidCurp', async: false })
], CURPValidator);
exports.CURPValidator = CURPValidator;
//# sourceMappingURL=curp-validator.js.map